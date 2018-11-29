import React from 'react';
import ReactModal from 'react-modal';
import { Button } from 'reactstrap';


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
            contentLabel="Example Modal">
   
   <label className="xBtn" onClick={this.closeModal}>✖</label>

            <h2 ref={subtitle => this.subtitle = subtitle}>Sign Up</h2>

            <form>
              <input className="uname form-control text-center" maxLength="20" type="text" placeholder="Username"/>
              <br></br>
              <input className="pword form-control text-center" maxLength="20" type="text" placeholder="Password"/>
              <br></br>
              <Button color="primary">Sign Up</Button>
            </form>
          </ReactModal>
          </div>
      );
    }
  }

export default SignInModal;
  