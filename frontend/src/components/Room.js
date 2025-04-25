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
        this.roomCode = this.props.match.params.roomCode;
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
