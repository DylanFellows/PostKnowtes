import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class CreateComment extends Component {
    constructor() {
        super();

        this.state = {
            isNewComment: false,
            commentCreated: false,
            body: '',
            comments: [],
            error: '',
            currentUser: '',
            id: ''
        };
    }

    passCommentsState = (aPropValue) => {
        this.props.passCommentsStateCallback(aPropValue);
    }

    handleBodyChange = (evt) => {
        this.setState({ 
            body: evt.target.value,
            error: ''
        });
        console.log(evt.target.value);
        console.log(this.props.id);
        console.log(this.props.knowteId);
    }

    displayNewCommentDiv = () => {
        this.setState({ isNewComment: true });
    }

    createComment = () => {
        axios.post(`http://localhost:3001/api/comments/${this.state.body}/${this.props.id}/${this.props.knowteId}`)
        .then((result) => {
            this.setState({ commentCreated: result.data.success });
            this.setState({ isNewComment: false })
            axios.get(`http://localhost:3001/api/comments`).then((response) => {
                this.setState({ comments: response.data });
                this.passCommentsState(this.state.comments);
                return this.setState({
                    body: '',
                    comments: []
                }) 
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                error: "Missing Required Fields!"
            });
        });
    }

    closeNewCommentDiv = () => {
        this.setState({
            isNewComment: false,
            body: '',
            error: ''
        });
    }

    render() {
        return (
            <div>
                {this.state.isNewComment ?
                    ""
                    :<button className='comment btn btn-outline-light' onClick={this.displayNewCommentDiv}>Comment</button>
                }
                {this.state.isNewComment ?

                    <div className="newCommentDiv">
                        <br></br>

                        <textarea rows="3" cols="80" name="comment" onChange={this.handleBodyChange} placeholder="Please Enter a Comment Here."></textarea>

                        {this.state.error ?
                        <div>
                            {this.state.error}
                        </div>
                        : ""
                        }

                        <br></br>

                        <button className='btn btn-dark' onClick={this.createComment}>Submit Comment</button>
                        <button className='btn btn-dark' onClick={this.closeNewCommentDiv}>Cancel Comment</button>

                    </div>
                    : ""
                }

            </div>
        )
    }
}

CreateComment.propTypes = {
    passCommentsStateCallback: PropTypes.func,
}