import React, { Component } from 'react';

import VARIABLES from './utils/variables';

import logo from './logo.svg';
import './App.css';

const WebSocket = require('reconnecting-websocket');

const ws_scheme = window.location.protocol === 'https' ? 'wss' : 'ws';
const ws_path = ws_scheme + '://' + VARIABLES.URL;
const ws = new WebSocket(ws_path);

class App extends Component {

    componentDidMount(){

        ws.addEventListener('message', (event) =>{
            let data = JSON.parse(event.data);
            console.log(data);
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
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;