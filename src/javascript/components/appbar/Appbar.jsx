import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Paper } from '@material-ui/core';
import BarSearch from './BarSearch';
import "../../../scss/appbar.scss";
import PeripherialsIcon from '@material-ui/icons/Dashboard';
import CloseIcon from '@material-ui/icons/Close';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import CurrentProcessesDisplay from './CurrentProcessesDisplay';
import Actions from './Actions';
import NewPageBarSearch from './NewPageBarSearch';

@observer
export default class Appbar extends React.Component {
    @observable peripherialVisibility = false;
    @observable positionCoordinates = {
        x: 0,
        y: 0
    };

    togglePeripherialVisibilty(ev) {
        ev.persist();
        this.peripherialVisibility = !this.peripherialVisibility;
        this.positionCoordinates.x = ev.clientX;
        this.positionCoordinates.y = ev.clientY;
    }

    @computed get peripherialsView() {
        if(this.peripherialVisibility) {
            return (
                <Paper className="peripherials" elevation={16}>
                    <Typography variant="h6">Current</Typography>
                    <CurrentProcessesDisplay />
                    <Typography variant="h6">Actions</Typography>
                    <Actions onClose={(ev) => this.togglePeripherialVisibilty(ev)} />
                </Paper>
            );
        } else {
            return null;
        }
    }

    componentDidMount() {
        document.title = `Stack-M · ${this.props.pageName};`
    }

    componentDidUpdate(prevProps) {
        if(prevProps.pageName !== this.props.pageName) {
            document.title = `Stack-M · ${this.props.pageName}`;
        }
    }

    render() {
        return (
            <AppBar position="fixed" color="default">
                <Toolbar className="app-toolbar">
                    <IconButton style={{ marginRight: '.5rem' }} onClick={(ev) => this.togglePeripherialVisibilty(ev)}>
                        {this.peripherialVisibility ? <CloseIcon /> : <PeripherialsIcon />}
                    </IconButton>
                    {this.peripherialsView}
                    
                    <Typography variant="h6" color="inherit">
                        {this.props.pageName}
                    </Typography>

                    <NewPageBarSearch onChange={this.props.onSearchChange} />

                    {/* <Button variant="extendedFab" color="default"><SettingsIcon style={{ marginRight: '.35rem' }} /> Settings</Button> */}
                </Toolbar>
            </AppBar>
        );
    }
}