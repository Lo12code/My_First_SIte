import React, { Component } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
    PlayArrow as PlayArrowIcon,
    Pause as PauseIcon,
    SkipNext as SkipNextIcon    
} from "@mui/icons-material";


export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip-song", requestOptions);
  }

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;

    return (
      <Card>
        <Grid container height="600px">
          <Grid item justifyContent="flex-start" alignItems="center" xs={6} sx={{ height: "100%" }}>
              {this.props.image_url ? (
                <img src={this.props.image_url} height="100%" width="100%" />
              ) : (
                <Box width="100%" height="100%" bgcolor="#eee" />
              )}
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{ height: "100%" }}>
            <Grid item>
              <Typography component="h5" variant="h5">
                {this.props.title ? this.props.title : "No music playing"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="subtitle1">
                {this.props.artist ? this.props.artist : "No music playing"}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => {
                this.props.is_playing ? this.pauseSong() : this.playSong();
              }}>
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => this.skipSong()}>
                <SkipNextIcon /> {this.props.votes} / {this.props.votes_required}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }
}