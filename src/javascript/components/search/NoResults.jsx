import React from 'react';
import { Typography } from '@material-ui/core';

export default function NoResults(props) {
  return (
    <section className="no-results-container">
      <Typography variant="h1">No results found</Typography>
      <br />
      <Typography>{props.reason}</Typography>
    </section>
  );
}