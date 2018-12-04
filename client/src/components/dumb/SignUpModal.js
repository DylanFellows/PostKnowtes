import React from 'react';
import ReactModal from 'react-modal';
import SignUp from '../smart/SignUp.jsx';
//import { Button } from 'reactstrap';


class SignInModal extends React.Component {
    constructor() {
      super();
   
      this.state = {
        modalIsOpen: false
      };
    }
   
    openModal = () => {
      this.setState({modalIsOpen: true});
    }
   
    afterOpenModal = () => {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = 'rgb(104, 104, 211)';
    }
   
    closeModal = () =>{
      this.setState({modalIsOpen: false});
    }
   
    render() {
      return (
        <div>
          <button className='signUp btn btn-outline-light' onClick={this.openModal}>Sign Up</button>
  
          <ReactModal
            className="Modal"
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            contentLabel="Example Modal">
  
            <label className="xBtn" onClick={this.closeModal}>✖</label>
            <h2 ref={subtitle => this.subtitle = subtitle}>Sign Up</h2>
            <SignUp passIsLoggedInStateCallback={this.getIsLoggedInState} passIdStateCallback={this.getIdState} passCurrentUserStateCallback={this.getCurrentUserState} />
          </ReactModal>
        </div>
      );
    }
  }

export default SignInModal;
  