import React, {Component} from 'react';
import RoomJoinPage from './RoomJoinPage';
import RoomWrapper from "./Room";
import CreateRoomPageWrapper from './CreateRoomPage';
import {
    Grid,
    Button,
    ButtonGroup,
    Typography
} from '@mui/material';
import {Routes, Route, Link, Navigate, useNavigate} from 'react-router-dom';

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount(){
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code,
                })
            });
    }

    renderHomePage() {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <Typography variant="h3" compact="h3">
                House Party
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button color="primary" to="/join" component={Link}>
                  Join a Room
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  Create a Room
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        );
    }

    clearRoomCode(){
      this.setState({
        roomCode: null
      });
    }

    render(){
        return (
                <Routes>
                    <Route path='/' element={
                        this.state.roomCode ? (<Navigate to={`/room/${this.state.roomCode}`} />) : (this.renderHomePage())
                    } />
                    <Route path='/join' element={<RoomJoinPage />} />
                    <Route path='/create' element={<CreateRoomPageWrapper />} />
                    <Route 
                      path='/room/:roomCode'
                      render={() => {
                        return <RoomWrapper {...props} leaveRoomCallback={this.clearRoomCode} />
                      }}
                    />
                </Routes>
        );
    }

}

const HomePageWrapper = () => {
    const navigate = useNavigate();
    return <HomePage navigate={navigate} />;
};

export default HomePageWrapper;
