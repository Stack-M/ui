import React from 'react';
import Switch from '../components/Switch';
import IntermissionScreen from '../components/intermission/IntermissionScreen';
import { observable, computed } from 'mobx';
import { observer } from "mobx-react";
import { MuiThemeProvider } from '@material-ui/core';
import { MaterialTheme } from './material-ui-theme';
import ApiRequest from '../request/ApiRequest';
import DevTools from 'mobx-react-devtools';

@observer
export default class App extends React.Component {
    @observable websocketConnection = null;

    // Will request the app status from the server
    // so as to wheather ask for initial setup or jump right in,
    // on the user side
    async getStatus() {
        const request = new ApiRequest();
        const response = await request.get('serverStatus');
        return response;
    }

    componentDidMount() {
        // Establish a websocket connection to the server
        this.websocketConnection = new WebSocket(`ws://localhost:8050/server-ws`);
    }

    getHandlers() {
        return {
            getStatus: () => this.getStatus()
        };
    }

    @computed get view() {
        if(this.websocketConnection) {
            return (
                <Switch
                    websocketConnection={this.websocketConnection}
                    handlers={this.getHandlers()}
                />
            );
        }

        return <IntermissionScreen message="Starting... Establishing connection..." />;
    }

    render() {
        return (
            <MuiThemeProvider theme={MaterialTheme}>
                {this.view}
                {/* <DevTools /> */}
            </MuiThemeProvider>
        )
    }
}