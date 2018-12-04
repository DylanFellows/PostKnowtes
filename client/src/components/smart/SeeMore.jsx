import React, { Component } from 'react';
import axios from 'axios';

export default class SeeMore extends Component {
    constructor() {
        super()

        this.state = {
            displayCommentsDiv: false,
            editingComment: false,
            id: '',
            comments: [],
            body: '',
            err: '',
            commentNumber: ''
        }
    }



    openCommentsDiv = () => {
        this.setState({
            displayCommentsDiv: true
        })
        this.gatherComments();
        console.log(this.props.id);
        console.log(this.state.comments);
    }

    closeCommentsDiv = () => {
        this.setState({
            displayCommentsDiv: false
        })
        this.gatherComments();
        this.cancelEdit();
    }


    gatherComments = () => {
        axios.get(`http://localhost:3001/api/comments`).then((response) => {
            this.setState({ comments: response.data });
        });
    }

    handleBodyChange = (evt) => {
        this.setState({
            body: evt.target.value,
            error: ''
        });
    }

    editComment = (evt) => {
        this.setState({
            editingComment: true,
            commentNumber: evt.target.id
        });
    }

    submitEdit = (evt) => {
        axios.put(`http://localhost:3001/api/editComment/${evt.target.id}/${this.state.body}`).then((response) => {    
            if(response){
                console.log('Update Successful!');
                this.cancelEdit();
                this.gatherComments();
            } else {
               console.log('Update Failed!')
            }
        })
    }

    deleteComment = (evt) => {
        axios.delete(`http://localhost:3001/api/deleteComments/${evt.target.id}`).then((response) => {
            if (response) {
                console.log('Delete Successful!');
                this.gatherComments();
            } else {
                console.log('Delete Failed!')
            }
        })
    }

    cancelEdit = () => {
        this.setState({
            editingComment: false,
            body: '',
            err: ''
        })
    }

    componentDidMount = () => {
        this.gatherComments();
    }

    render() {
        return (
            <div>
                {this.state.displayCommentsDiv ?
                    <div className='CommentsDiv'>
                        <button className="btn btn-outline-light" onClick={this.closeCommentsDiv}>Close</button>
                        {
                            this.state.comments.map((comment, index) =>
                                this.props.knowteId === comment.toKnowtesId._id && this.props.id === comment.fromUserId._id ?
                                    <div key={index} >
                                            <button id={index} className="editBtn btn btn-link" onClick={this.editComment}>Edit</button>
                                            <button id={comment._id} className="editBtn btn btn-link" onClick={this.deleteComment}>Delete</button>
                                            <div className="commentsDiv">
                                            Posted By: {comment.fromUserId.username} at {comment.createdAt.substring(0, 10)}
                                            <div>
                                                {comment.body}
                                            </div>
                                            {this.state.editingComment && index === parseInt(this.state.commentNumber) ?
                                            <div>
                                                <textarea rows="3" cols="80" name="comment" onChange={this.handleBodyChange} placeholder="Please Enter a Comment Here."></textarea>
                                                <button className="btn btn-link" id={comment._id} onClick={this.submitEdit}>Submit</button>
                                                <button className="btn btn-link" onClick={this.cancelEdit}>Cancel</button>
                                            </div>
                                                : ''
                                            }
                                        </div>

                                    </div>
                                    : this.props.knowteId === comment.toKnowtesId._id ?
                                        <div key={index} className="commentsDiv" >Posted By: {comment.fromUserId.username} <div>{comment.body}</div></div>
                                        : ''
                            )
                        }
                    </div>
                    : <button className='comment btn btn-outline-light' onClick={this.openCommentsDiv}>See More</button>
                }
            </div>
        )
    }
}
