import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        error: '',
        msg: ''
    };


    handleUserChange = (evt) => {
        this.setState({
            username: evt.target.value
        })
    }

    handlePassChange = (evt) => {
        this.setState({
            password: evt.target.value
        })
    }

    handleSignup = (evt) => {
        this.clearMsgState();
        evt.preventDefault();
        if (!this.state.username) {
            this.setState({ msg: '' });
            return this.setState({ error: ' Username is required' });
        }
        if (!this.state.password) {
            return this.setState({ error: ' Password is required' });
        }
        this.createUser();
        return this.setState({ error: '' });
    }

    createUser = () => {
        axios.post(`http://localhost:3001/api/SignUp/${this.state.username}/${this.state.password}`)
            .then((result) => {
                if (result.data.success) {
                    this.setState({ msg: "Sign up successful, welcome!" })
                } else {
                    this.setState({ error: 'User already exists' })
                }
            })
    }

    clearMsgState = () => {
        this.setState({
            error: '',
            msg: ''
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input className="uname form-control text-center" maxLength="20" type="text" name="username" autoComplete="off" onChange={this.handleUserChange} placeholder="Username" />
                    <br></br>
                    <input className="pword form-control text-center" maxLength="20" type="password" name="password" autoComplete="off" onChange={this.handlePassChange} placeholder="Password" />
                    <br></br>
                    <Button onClick={this.handleSignup} type='submit' color="primary">Sign up</Button>

                    {
                        this.state.error ?
                            <h6 className="invalidLoginMsg" data-test="error" onClick={this.clearMsgState}>
                                <button className="closeBtn" onClick={this.clearMsgState}><label className="closeBtnLbl">✖</label></button>
                                {this.state.error}
                            </h6>
                            : ""
                    }

                    {this.state.msg ?
                        <h6 className="msg" onClick={this.clearMsgState}>
                            <button className="closeBtn" onClick={this.clearMsgState}><label className="closeBtnLbl">✖</label></button>
                            {this.state.msg}
                        </h6>
                        : ""
                    }
                </form>
            </div>
        )
    }

}
