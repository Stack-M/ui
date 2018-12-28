import React from 'react';
import { Paper, Typography, ListItem, List, ListItemText, Switch, TextField, Button } from '@material-ui/core';

export default class GeneralLoggingCard extends React.Component {
    render() {
        return (
            <Paper className="settings-card" elevation={8}>
                <Typography variant="h6" className="title">Logging</Typography>
                <List dense>
                    <ListItem>
                        <ListItemText primary="Debug logging" secondary="Wheather to log server-debug level stuff" />
                        <Switch checked={false} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Log directory" secondary="Where to store the server logs" />
                        <TextField placeholder="Directory" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="View logs" secondary="View the logs right here in your browser" />
                        <Button color="secondary" variant="contained" size="small">View</Button>
                    </ListItem>
                </List>
            </Paper>
        )
    }
}