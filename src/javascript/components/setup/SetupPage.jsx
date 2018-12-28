import React from 'react';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import "../../../scss/setup.scss";
import { observer } from 'mobx-react';
import DirectorySelector from '../directory/DirectorySelector';
import { observable } from 'mobx';
import RightArrow from '@material-ui/icons/KeyboardArrowRight';
import ApiRequest from '../../request/ApiRequest';
import { Redirect } from 'react-router-dom';

@observer
export default class SetupPage extends React.Component {
    @observable path = '';
    @observable libName = '';
    @observable redirectToDahsboard = false;
    request = new ApiRequest();

    componentDidMount() {
        document.body.style.background = 'linear-gradient(to right, #141e30, #243b55)';
    }

    componentWillUnmount() {
        document.body.style.background = 'url("/Resources/Images/spiration dark.png")';
    }

    changePath(path) {
        this.path = path;
    }

    changeLibName(name) {
        this.libName = name;
    }

    async proceed() {
        if(this.libName.trim().length === 0 || this.path.trim().length === 0) {
            // Probably show a snackbar, perhaps?
            return;
        }

        const setupResponse = await this.request.get('setup', {
            path: Buffer.from(this.path).toString('base64'),
            libraryName: this.libName
        });
        const response = await setupResponse.json();

        if(response.processing) {
            // Take the user to the dashboard then

            this.redirectToDahsboard = true;
        }
    }

    render() {
        return (
            <section className="setup-page">
                {this.redirectToDahsboard && <Redirect to="/dashboard" />}
                <Paper className="container" elevation={12}>
                    <Typography variant="h2" className="page-title-big">Let's get you set up!</Typography>
                    <Typography className="page-subtitle">
                        First thing's first, lets select a directory for your anime library.
                    </Typography>
                    <section className="nav-buttons">
                        <Button
                            size="large" 
                            color="primary" 
                            variant="contained" 
                            disabled={this.libName.trim().length === 0 || this.path.trim().length === 0}
                            onClick={() => this.proceed()}
                        >
                            Proceed <RightArrow />
                        </Button>
                    </section>
                    <TextField
                        onChange={(ev) => this.changeLibName(ev.target.value)} 
                        label="Library Name" 
                        autoFocus 
                        value={this.libName}
                        className="lib-name-input"
                        fullWidth
                        placeholder="Eg. Anime"
                     />
                    <DirectorySelector onComplete={(path) => this.changePath(path)} />
                </Paper>
            </section>
        );
    }
}