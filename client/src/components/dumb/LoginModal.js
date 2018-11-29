import React from 'react';
import ReactModal from 'react-modal';
import Login from '../smart/Login.jsx';
import PropTypes from 'prop-types';


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

  passLoggedInState = (aPropValue) => {
    this.props.callback(aPropValue);
  }

  passIdState = (aPropValue) => {
    this.props.callback(aPropValue)
  }

  passCurrentUserState = (aPropValue) => {
    this.props.callback(aPropValue)
  }

  getLoggedInState = (params) => {
    this.setState({
      isLoggedIn: params
    })
    this.passLoggedInState(params);
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
    this.passIdState(params);
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
    this.passCurrentUserState(params);
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
    console.log(this.state.id);
    console.log(this.state.currentUser);
  }

  render() {
    return (
      <div>
        <button className='login btn btn-outline-light' onClick={this.openModal}>Login</button>

        <ReactModal
          className="Modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          contentLabel="Example Modal">

          <label className="xBtn" onClick={this.closeModal}>✖</label>
          <h2 ref={subtitle => this.subtitle = subtitle}>Login</h2>
          <Login callback={this.getLoggedInState && this.getIdState && this.getCurrentUserState} />
        </ReactModal>

      </div>
    );
  }
}

LoginModal.propTypes = {
  callback: PropTypes.func
}

