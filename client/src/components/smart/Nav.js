import React, { Component } from 'react';
import PropTypes from 'prop-types';
import favicon from "../../images/ficon.ico";
import LoginModal from '../dumb/LoginModal.js';
import SignInModal from '../dumb/SignInModal.js';

export default class Nav extends Component {

    constructor() {
        super();

        this.state = {
            isLoggedIn: '',
            currentUser: '',
            id: ''
        };
    }

    passLoggedInState = (aPropValue) => {
        this.props.callback(aPropValue);
    }

    getLoggedInState = (params) => {
        this.setState({
            isLoggedIn: params
        })
        this.passLoggedInState(params);
    }

    render() {
        return (
            <div className="topnav" >
                <a href='http://localhost:3000/'><img className='icon' src={favicon} alt="favicon" width='2.5%' /></a>
                <div className="userDiv">
                    <SignInModal />
                    <LoginModal callback={this.getLoggedInState} />
                </div>
            </div>
        )
    }
}

Nav.propTypes = {
    callback: PropTypes.func
}
