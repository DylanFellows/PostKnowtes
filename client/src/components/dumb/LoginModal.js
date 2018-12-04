import React from 'react';
import ReactModal from 'react-modal';
import Login from '../smart/Login.jsx';
import PropTypes from 'prop-types';
import SignUpModal from './SignUpModal.js';


export default class LoginModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      isLoggedIn: false,
      currentUser: '',
      id: ''
    };
  }

  passIsLoggedInState = (aPropValue) => {
    console.log(this.state.isLoggedIn);
    this.props.passIsLoggedInStateCallback(aPropValue);
  }
  
  
  passIdState = (aPropValue) => {
    this.props.passIdStateCallback(aPropValue);
  }
  

  passCurrentUserState = (aPropValue) => {
    console.log(this.state.currentUser);
    this.props.passCurrentUserStateCallback(aPropValue);
  }

  getIsLoggedInState = (params) => {
    this.setState({
      isLoggedIn: params
    })
    this.passIsLoggedInState(this.state.isLoggedIn);
    if (params) {
      this.closeModal();
    } else {
      this.setState({ error: "Invalid User/Password!" });
    }
  }


  getIdState = (params) => {
    this.setState({
      id: params
    })
    this.passIdState(this.state.id);
    if (params) {
      this.closeModal();
    } else {
      this.setState({ error: "No Id Was Found!" })
    }

  }
  

  getCurrentUserState = (params) => {
    this.setState({
      currentUser: params
    })
    this.passCurrentUserState(this.state.currentUser);
    
    if (params) {
      this.closeModal();
    } else {
      this.setState({ error: "No Current User Present!" })
    }
    
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'rgb(104, 104, 211)';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <SignUpModal/>
        <button className='login btn btn-outline-light' onClick={this.openModal}>Login</button>,
        <ReactModal
          className="Modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          contentLabel="Example Modal">

          <label className="xBtn" onClick={this.closeModal}>✖</label>
          <h2 ref={subtitle => this.subtitle = subtitle}>Login</h2>
          <Login passIsLoggedInStateCallback={this.getIsLoggedInState} passIdStateCallback={this.getIdState} passCurrentUserStateCallback={this.getCurrentUserState} />
        </ReactModal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  passIsLoggedInStateCallback: PropTypes.func,
  passIdStateCallback: PropTypes.func,
  passCurrentUserStateCallback: PropTypes.func,
}

