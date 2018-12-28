import React from 'react';
import { LinearProgress, Paper, Typography } from '@material-ui/core';

export default function VideoLoader(props) {
  return (
    <Paper className="video-loader">
      <LinearProgress variant="query" color="secondary" style={{ width: '500px' }} />
      <br />
      <Typography variant="body2" className="status">{props.status}</Typography>
    </Paper>
  );
}