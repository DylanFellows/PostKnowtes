import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import DisplayKnowtes from '../dumb/DisplayKnowtes.js';
import CreateKnowte from './CreateKnowte.jsx';

var PORT = 'http://localhost:3001';

export default class Home extends Component {

    state = {
        knowtes: [],
        isLoggedIn: false
    }

    gatherNewKnowtes = (params) => {
        this.setState({
            knowtes: params
        })
    }

    gatherKnowtes = () => {
        axios.get(`${PORT}/api/knowtes`).then((response) => {
            console.log(response.data);
            this.setState({ knowtes: response.data });
        })
    }

    componentDidMount = () => {
        this.gatherKnowtes();
    }

    render() {
        return (
            <div className="allKnowteDiv">
                {this.props.isLoggedIn ?
                    <CreateKnowte callback={this.gatherNewKnowtes} />
                    : ""
                }
                <br></br>
                {
                    this.state.knowtes.map((knowte, index) =>
                        <DisplayKnowtes key={index} user={knowte.fromUserId.username} title={knowte.title} subject={knowte.subject} body={knowte.body}
                            createdAt={knowte.createdAt} />
                    )
                }
                <br></br>
            </div>
        )
    }
}

CreateKnowte.propTypes = {
    callback: PropTypes.func,
}
