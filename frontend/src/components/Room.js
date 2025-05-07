import React, {Component} from "react";
import { useParams } from "react-router-dom";


class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.getRoomDetails();
    }

    getRoomDetails(){
        fetch('/api/get-room' + '?code=' + this.props.roomCode)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                })
            });
    }

    render(){
        return (<div>
            <h3>Room code: {this.props.roomCode}</h3>
            <p>Votes: {this.state.votesToSkip}</p>
            <p>Guest can pause: {this.state.guestCanPause.toString()}</p>
            <p>Host: {this.state.isHost.toString()}</p>
        </div>);
    }

};

const RoomWrapper = () => {
    const { roomCode } = useParams();
    return <Room roomCode={roomCode} />;
};

export default RoomWrapper;
