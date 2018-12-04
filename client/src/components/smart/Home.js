import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import DisplayKnowtes from '../dumb/DisplayKnowtes.js';
import CreateKnowte from './CreateKnowte.jsx';

var PORT = 'http://localhost:3001';

export default class Home extends Component {

    state = {
        knowtes: [],
        isLoggedIn: false,
        currentUser: '',
        id: '',
        knowteId: ''    
    }

    gatherNewKnowtes = (params) => {
        this.setState({
            knowtes: params
        });
        this.setState({
            knowtes: ''
        });
        this.setState({
            knowtes: params
        })
    }

    gatherKnowtes = () => {
        axios.get(`${PORT}/api/knowtes`).then((response) => {
            console.log(response.data);
            this.setState({
                knowtes: response.data,
            }); 
        })
    }

    componentDidMount = () => {
        this.gatherKnowtes();
    }

  

    render() {
        return (
            <div className="allKnowteDiv">
                {this.props.isLoggedIn ?
                    <CreateKnowte callback={this.gatherNewKnowtes} id={this.props.id} />
                    : ""
                }
                <br></br>
                        <DisplayKnowtes knowtes={this.state.knowtes} isLoggedIn={this.props.isLoggedIn} id={this.props.id} />
            </div>
        )
    }
}

Home.propTypes = {
    displayKnowtesStateCallback: PropTypes.func,
    callback: PropTypes.func,
}
