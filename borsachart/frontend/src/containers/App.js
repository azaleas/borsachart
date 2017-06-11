import React, { Component } from 'react';

import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import NotFound from './../components/NotFound';
import ChartsContainer from './../containers/ChartsContainer';

import './../styles/App.css';

class App extends Component {

    render() {
        return (
            <div className="container">
                <Switch>
                    <Route exact path="/" component={ChartsContainer} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
