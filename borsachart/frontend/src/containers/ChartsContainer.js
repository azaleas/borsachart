import React, { Component } from 'react';

import VARIABLES from './../utils/variables';
import api from './../utils/Api';

import ChartComponent from './../components/ChartComponent';

const WebSocket = require('reconnecting-websocket');

const ws_scheme = window.location.protocol === 'https' ? 'wss' : 'ws';
const ws_path = ws_scheme + '://' + VARIABLES.URL;
const ws = new WebSocket(ws_path);

class ChartsContainer extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
        };
    }

    componentDidMount(){

        ws.addEventListener('message', (event) =>{
            let data = JSON.parse(event.data);
            this.setState({
                data,
            });
        });

        ws.onerror = (err) => {
            if (err.code === 'EHOSTDOWN') {
                console.log('server down');
            }
            else if (err.code === 'ETIMEDOUT'){
                console.log('time out');   
            }
            else{
                console.log(err.code);
            }
        };

        api.fetchFirstData()
            .then((response) => {
                this.setState({
                    data: response,
                });
            })
        /*ws.addEventListener('open', () => {
            // send ticker name for deletion
            ws.send('v');
        });*/

    }

    componentWillUnmount(){
        ws.close(1000, '');
        ws.onerror = (err) => {
            if (err.code === 'EHOSTDOWN') {
                console.log('server down');
            }
            else if (err.code === 'ETIMEDOUT'){
                console.log('time out');   
            }
            else{
                console.log(err.code);
            }
        };
    }

    render() {
        return (
            <div>
                <div className="graph-container">
                    <ChartComponent data={this.state.data} />
                </div>
                <div className="input-container">

                </div>
            </div>
        );
    }
}

export default ChartsContainer;