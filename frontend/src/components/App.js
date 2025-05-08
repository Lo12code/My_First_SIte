import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import HomePageWrapper from './HomePage';
import {BrowserRouter as Router} from 'react-router-dom';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<div className='center'>
            <Router basename='frontend/'>
            <HomePageWrapper />
            </Router>
        </div>);
    }

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
