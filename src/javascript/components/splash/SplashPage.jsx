import React from 'react';
import { LinearProgress, Typography } from "@material-ui/core";
import "../../../scss/splash.scss";
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import MediumLogo from '../logos/MediumLogo';

@observer
export default class SplashPage extends React.Component {
    @observable redirectToSetup = false;
    @observable redirectToDashboard = false;

    componentDidMount() {
        this.fetchServerStatus();
    }

    async fetchServerStatus() {
        const handlers = this.props.handlers;
        const response = await handlers.getStatus();
        const status = await response.json();
        if(status['showSetup']) {
            this.redirectToSetup = true;
        } else {
            this.redirectToDashboard = true;
        }
    }

    render() {
        return (
            <main className="splash-page">
                { this.redirectToSetup && <Redirect to='/setup' /> }
                { this.redirectToDashboard && <Redirect to='/dashboard' /> }
                <section className="brand-container">
                    <Typography variant="h3" color="secondary">Stack-M</Typography>
                    <br />
                    <Typography>
                        Stack-M is a media server for your locally stored animes. We index stuff right
                        from Anilist's database, and you can provide your unique identifications when
                        your animes are way too obscure!
                    </Typography>
                </section>
                <section className="progress-container">
                    <LinearProgress />
                    <span className="message"><Typography>Hold tight while we warm up things.</Typography></span>
                </section>
            </main>
        );
    }
}