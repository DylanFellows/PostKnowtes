import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class CreateKnowte extends Component {
    constructor() {
        super();

        this.state = {
            isNewKnowte: false,
            knowteCreated: false,
            title: '',
            subject: '',
            body: '',
            knowtes: [],
            error: ''
        };
    }

    passKnowtesState = (aPropValue) => {
        this.props.callback(aPropValue);
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

    displayNewKnowteDiv = () => {
        this.setState({ isNewKnowte: true });
    }

    createKnowte = () => {
        axios.post(`http://localhost:3001/api/knowtes/${this.state.title}/${this.state.subject}/${this.state.body}/5bf44aca53a030c85cd24898`)
        .then((result) => {
            this.setState({ knowteCreated: result.data.success });
            this.setState({ isNewKnowte: false});
            axios.get(`http://localhost:3001/api/knowtes`).then((response) => {
                this.setState({ knowtes: response.data });
                this.passKnowtesState(this.state.knowtes);
                return this.setState({
                    title: '',
                    subject: '',
                    body: '',
                    knowtes: []
                }) 
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                error: "Missing Required Fields!"
            });
        });
    }

    closeNewKnowteDiv = () => {
        this.setState({
            isNewKnowte: false,
            title: '',
            subject: '',
            body: '',
            error: ''
        });
    }

    render() {
        return (
            <div>

                <div>
                    <button className='btn btn-dark' onClick={this.displayNewKnowteDiv}>Create Knowte</button>
                </div>

                {this.state.isNewKnowte ?

                    <div className="newKnowteDiv">
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

                        <button className='btn btn-dark' onClick={this.createKnowte}>Submit Knowte</button>
                        <button className='btn btn-dark' onClick={this.closeNewKnowteDiv}>Cancel Knowte</button>

                    </div>
                    : ""
                }

            </div>
        )
    }
}

CreateKnowte.propTypes = {
    callback: PropTypes.func,
}