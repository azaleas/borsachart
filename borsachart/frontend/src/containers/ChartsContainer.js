import React, { Component } from 'react';

import VARIABLES from './../utils/variables';
import api from './../utils/Api';

import ChartComponent from './../components/ChartComponent';
import InputComponent from './../components/InputComponent';

const WebSocket = require('reconnecting-websocket');

const ws_scheme = window.location.protocol === 'https' ? 'wss' : 'ws';
const ws_path = ws_scheme + '://' + VARIABLES.URL;
const ws = new WebSocket(ws_path);

class ChartsContainer extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
            input: '',
            inputError: false,
            notFound: false,
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

    onInputChange = (event) =>{
        this.setState({
            input: event.target.value,
            inputError: false,
            notFound: false,
        });
    }

    onInputSubmit = (event) =>{
        this.searchSubmit();
    }

    handleKeyDown = (event) =>{
        if (event.key === "Enter"){
            this.searchSubmit();
        }
    }

    searchSubmit(){
        if (!this.state.input){
            this.setState({
                inputError: true,
            })
        }
        else{
            api.searchTicker(this.state.input)
                .then((response) => {
                    if(response === 404){
                        this.setState({
                            notFound: true,
                        })
                    }
                })
        }
    }

    render() {
        return (
            <div>
                <ChartComponent data={this.state.data} />
                <InputComponent 
                    data={this.state.data}
                    inputValue={this.state.input}
                    inputError={this.state.inputError}
                    notFound={this.state.notFound}
                    onInputChange={this.onInputChange}
                    handleKeyDown={this.handleKeyDown}
                    onInputSubmit={this.onInputSubmit} />
            </div>
        );
    }
}

export default ChartsContainer;