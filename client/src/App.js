import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Nav from './components/smart/Nav.js';
import Home from './components/smart/Home.js';
import './css/style.css';
import './App.css';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      isLoggedIn: '',
      currentUser: '',
      id: ''
    };
  }

  getIsLoggedInState = (params) => {
    this.setState({
      isLoggedIn: params
    })
    //alert('Logged in state from nav.js in app.js' + this.state.isLoggedIn);
  }

  getIdState = (params) => {
    this.setState({
      id: params
    })
    alert('State of id in app.js from nav.js' + this.state.id);
  }

  getCurrentUserState = (params) => {
    this.setState({
      currentUser: params
    })
    //alert('Current user state from nav.js in app' + this.state.currentUser);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav passIdStateCallback={this.getIdState} passIsLoggedInStateCallback={this.getIsLoggedInState} passCurrentUserStateCallback={this.getCurrentUserState} />
          <Home isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser} id={this.state.id} />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  passIsLoggedInStateCallback: PropTypes.func,
  passIdStateCallback: PropTypes.func,
  passCurrentUserStateCallback: PropTypes.func
}

