import React, { Component } from 'react';
import PropTypes from 'prop-types';
import message from "../../images/message.png";
import LoginModal from '../dumb/LoginModal.js';

export default class Nav extends Component {

    constructor() {
        super();

        this.state = {
            isLoggedIn: '',
            currentUser: '',
            id: ''
        };
    }


    passIsLoggedInState = (aPropValue) => {
        this.props.passIsLoggedInStateCallback(aPropValue);
    }

    passIdState = (aPropValue) => {
        this.props.passIdStateCallback(aPropValue)
    }

    passCurrentUserState = (aPropValue) => {
        this.props.passCurrentUserStateCallback(aPropValue)
    }

    getIsLoggedInState = (params) => {
        this.setState({
            isLoggedIn: params
        })
        this.passIsLoggedInState(this.state.isLoggedIn);
    }

    getIdState = (params) => {
        this.setState({
            id: params
        })
        this.passIdState(this.state.id);
    }

    getCurrentUserState = (params) => {
        this.setState({
            currentUser: params
        })
        this.passCurrentUserState(this.state.currentUser);
    }

    render() {
        return (
            <div className="topnav" >
                    <img className='icon' src={message} alt="favicon" width='2.5%' />
                    <h6 className="navHeader">Post Knowtes</h6>
                    <LoginModal passIsLoggedInStateCallback={this.getIsLoggedInState} passCurrentUserStateCallback={this.getCurrentUserState} passIdStateCallback={this.getIdState} />
            </div>
        );
    }
}

Nav.propTypes = {
    passIsLoggedInStateCallback: PropTypes.func,
    passIdStateCallback: PropTypes.func,
    passCurrentUserStateCallback: PropTypes.func
}
