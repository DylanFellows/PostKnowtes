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

  passLoggedInState = (aPropValue) => {
    this.props.callback(aPropValue);
  }

  getLoggedInState = (params) => {
    this.setState({
      isLoggedIn: params
    })
  }

  render() {
    return (  
      <BrowserRouter>
        <div className="App">
          <Nav callback={this.getLoggedInState} />
          <Home isLoggedIn={this.state.isLoggedIn} />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  callback: PropTypes.func
}

