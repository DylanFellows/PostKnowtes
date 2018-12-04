import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SeeMore from '../smart/SeeMore.jsx';
import CreateComment from '../smart/CreateComment.jsx';
import axios from 'axios';

export default class DisplayKnowtes extends Component {
    constructor() {
        super()

        this.state = {
            isLoggedIn: false,
            id: '',
            knowteId: '',
            knowtes: [],
            comments: [],
            isEditing: false,
            knowteEdited: false,
            knowteNumber: 1,
            error: '',
            title: '',
            subject: '',
            body: ''
        }
    }

    gatherKnowtes = () => {
        axios.get(`http://localhost:3001/api/knowtes`).then((response) => {
            //console.log(response.data);
            this.setState({
                knowtes: response.data,
            });
        })
    }

    gatherComments = () => {
        axios.get('http://localhost:3001/api/comments').then((response) => {
            console.log(response.data);
            this.setState({
                comments: response.data
            })
        })
    }

    startEdit = (evt) => {
        this.setState({
            isEditing: true,
            knowteNumber: evt.target.id
        })
    }

    handleTitleChange = (evt) => {
        this.setState({
            title: evt.target.value,
            error: ''
        });
    }

    handleSubjectChange = (evt) => {
        this.setState({
            subject: evt.target.value,
            error: ''
        });
    }

    handleBodyChange = (evt) => {
        this.setState({
            body: evt.target.value,
            error: ''
        });
    }

    editKnowte = (evt) => {
        alert(evt.target.id);
        axios.put(`http://localhost:3001/api/editKnowte/${evt.target.id}/${this.state.title}/${this.state.subject}/${this.state.body}`)
            .then((result) => {
                this.setState({ knowteEdited: result.data.success });
                this.setState({ isEditing: false });
                axios.get(`http://localhost:3001/api/knowtes`).then((response) => {
                    this.setState({ knowtes: response.data });
                    return this.setState({
                        title: '',
                        subject: '',
                        body: '',
                    })
                });
            }).catch((error) => {
                console.log(error);
                this.setState({
                    error: "Missing Required Fields!"
                });
            });
    }

    deleteKnowte = (evt) => {
        axios.delete(`http://localhost:3001/api/deleteKnowtes/${evt.target.id}`).then((response) => {
            if (response) {
                console.log('Delete Successful!');
                axios.get(`http://localhost:3001/api/knowtes`).then((response) => {
                    console.log('Gathering Knowtes...');
                    this.setState({ knowtes: response.data });
                });
            } else {
                console.log('Delete Failed!')
            }
        })
    }

    closeEditKnowteDiv = () => {
        this.setState({
            isEditing: false,
            title: '',
            subject: '',
            body: ''
        });
    }

    componentDidMount = () => {
        this.gatherKnowtes();
        this.gatherComments();
    }

    gettingNewKnowtes = () => {
        this.setState({
            knowtes: this.props.knowtes
        });
        console.log(this.state.knowtes)
    }

    render() {
        return (
            <div className="singleKnowteDiv">
                {this.state.knowtes.map((knowte, index) =>
                    <div className="singleKnowte" key={index}>
                        {this.props.id === knowte.fromUserId._id ?
                        <div>
                            <button id={index} className="editKnowteBtn btn btn-outline-primary" onClick={this.startEdit}>Edit Knowte</button>
                            <button id={knowte._id} className="editKnowteBtn btn btn-outline-danger" onClick={this.deleteKnowte}>Delete Knowte</button>
                        </div>
                            : ''
                        }
                        {this.state.isEditing && index === parseInt(this.state.knowteNumber) ?
                            <div key={index} className="newKnowteDiv">
                                <br></br>
                                <input className="subject-inpt text-center" maxLength="25" size="25" type="text" name="subject" autoComplete="off" onChange={this.handleSubjectChange} placeholder="Subject" />


                                <br></br><br></br>

                                <textarea rows="3" cols="80" name="title" onChange={this.handleTitleChange} placeholder="Title"></textarea>

                                <br></br>

                                <textarea rows="6" cols="80" name="body" onChange={this.handleBodyChange} placeholder="Enter New Knowte Text"></textarea>

                                <br></br>
                                {this.state.error ?
                                    <div>
                                        {this.state.error}
                                    </div>
                                    : ""
                                }
                                <br></br>

                                <button id={knowte._id} className='btn btn-dark' onClick={this.editKnowte}>Finish Edit</button>
                                <button className='btn btn-dark' onClick={this.closeEditKnowteDiv}>Cancel Edit</button>

                            </div>
                            : ''
                        }
                        <div className="knowteHeaderDiv">
                            <label className="subject">
                                {knowte.subject}
                            </label>
                        </div>
                        <div className="detailDiv">
                            <label className="username">Posted By: {knowte.fromUserId.username} on</label><label className="smallFont">{knowte.createdAt.substring(0, 10)}</label>
                        </div>
                        <div className="titleDiv">
                            <h2 className="title">
                                {knowte.title}
                            </h2>
                        </div>
                        <br></br>
                        <div className="panel bodyDiv">
                            <h6 className="knowteBody">
                                {knowte.body}
                            </h6>
                        </div>
                        <div className="seeMore">
                            <SeeMore comments={this.state.comments} knowteId={knowte._id} isLoggedIn={this.props.isLoggedIn} id={this.props.id} />
                            {this.props.isLoggedIn ?
                                <CreateComment passCommentsStateCallback={this.gatherComments} id={this.props.id} knowteId={knowte._id} />
                                :
                                ''
                            }
                        </div>

                        <br></br>
                        <hr></hr>
                        <br></br>
                    </div>
                )
                }
                <p>Copyright © 2018 Post Knowtes</p>
            </div>
        )
    }
}

DisplayKnowtes.propTypes = {
    passCommentsStateCallback: PropTypes.func
}
