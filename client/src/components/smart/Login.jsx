import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        isLoggedIn: '',
        error: '',
        id: '',
        currentUser: ''
    };

    passIsLoggedInState = (aPropValue) => {
        this.props.passIsLoggedInStateCallback(aPropValue);
    }
    
    passIdState = (aPropValue) => {
        this.props.passIdStateCallback(aPropValue);
    }

    passCurrentUserState = (aPropValue) => {
        this.props.passCurrentUserStateCallback(aPropValue);
    }
    

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


    handleLogin = (evt) => {
        this.clearMsgState();
        evt.preventDefault();
        if (!this.state.username) {
            this.setState({ msg: '' });
            return this.setState({ error: ' Username is required' });
        }
        if (!this.state.password) {
            return this.setState({ error: ' Password is required' });
        }
        this.getUser();
        return this.setState({ error: '' });
    }

    getUser = () => {
        axios.get(`http://localhost:3001/api/Login/${this.state.username}/${this.state.password}`)
            .then((result) => {
                this.setState({
                    isLoggedIn: result.data.isLoggedIn,
                    currentUser: result.data.currentUser,
                    id: result.data.id
                })
                this.passIsLoggedInState(this.state.isLoggedIn);
                this.passCurrentUserState(this.state.currentUser);
                this.passIdState(this.state.id);
                if (!result.data.isLoggedIn) {
                    this.setState({ error: "Invalid Username/Password!" });
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
                    <Button onClick={this.handleLogin} type='submit' color="primary">Login</Button>

                    {
                        this.state.error ?
                            <h6 className="invalidLoginMsg" data-test="error" onClick={this.clearMsgState}>
                                <button className="closeBtn" onClick={this.clearMsgState}><label className="closeBtnLbl">✖</label></button>
                                {this.state.error}
                            </h6>
                            : ""
                    }
                </form>
            </div>
        )
    }

}

Login.propTypes = {
    passIsLoggedInStateCallback: PropTypes.func,
    passIdStateCallback: PropTypes.func,
    passCurrentUserStateCallback: PropTypes.func,
}