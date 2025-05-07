import React, {Component} from 'react';
import RoomJoinPage from './RoomJoinPage';
import RoomWrapper from "./Room";
import CreateRoomPageWrapper from './CreateRoomPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
                    <Route path='/create' element={<CreateRoomPageWrapper />} />
                    <Route path='/room/:roomCode' element={<RoomWrapper />} />
                </Routes>
            </Router>
        );
    }

}
