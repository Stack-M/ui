import React from 'react';
import {BrowserRouter as Router, Route, Switch as RouteSwitch} from 'react-router-dom';
import SplashPage from './splash/SplashPage';
import SetupPage from './setup/SetupPage';
import DashboardPage from './dashboard/DashboardPage';
import AnimeViewPage from './view/AnimeViewPage';
import SettingsPage from './settings/SettingsPage';
import AnimePlayer from './player/AnimePlayer';
import SearchPage from './search/SearchPage';

export default class Switch extends React.Component {
    render() {
        return (
            <Router>
                <RouteSwitch>
                    <Route exact path='/' component={(props) => <SplashPage {...props} {...this.props} />} />
                    <Route exact path='/setup' component={(props) => <SetupPage {...props} {...this.props} />} />
                    <Route exact path='/dashboard' component={(props) => <DashboardPage {...props} {...this.props} />} />
                    <Route exact path="/media/:path/:anime" component={(props) => <AnimeViewPage {...props} {...this.props} />} />
                    <Route exact path="/settings" component={(props) => <SettingsPage {...props} {...this.props} />} />
                    <Route exact path="/watch/:path/:root/:anime/:episode" component={(props) => <AnimePlayer {...props} {...this.props} />} />
                    <Route exact path="/search" component={(props) => <SearchPage {...props} {...this.props} />} />
                </RouteSwitch>
            </Router>
        );
    }
}