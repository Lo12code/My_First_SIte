import React, {Component} from 'react';
import RoomJoinPage from './RoomJoinPage';
import Room from "./Room";
import CreateRoomPage from './CreateRoomPage';
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from 'react-router-dom';

export default class HomePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Router basename='frontend/'>
                <Routes>
                    <Route exact path='/' element={<p>This is the homepage</p>} />
                    <Route path='/join' element={<RoomJoinPage />} />
                    <Route path='/create' element={<CreateRoomPage />} />
                    <Route path='/room/:roomCode' element={<Room />} />
                </Routes>
            </Router>
        );
    }

}