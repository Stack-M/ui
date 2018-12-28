import React from 'react';
import "../../../scss/settings.scss";
import Appbar from '../appbar/Appbar';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import GeneralSettingsIcon from '@material-ui/icons/SettingsOutlined';
import PlayerIcon from '@material-ui/icons/PlayArrowOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import LibraryIcon from '@material-ui/icons/VideoLibrary';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import GeneralSettings from './GeneralSettings';

@observer
export default class SettingsPage extends React.Component {
    @observable navState = 0;

    @computed get renderContent() {
        if(this.navState === 0) {
            return <GeneralSettings />;
        }
        return null;
    }

    render() {
        return (
            <section className="settings-page">
                <Appbar pageName="Settings" />
                {this.renderContent}
                <BottomNavigation className="bottom-nav" value={this.navState} onChange={(ev, value) => this.navState = value}>
                    <BottomNavigationAction label="General" icon={<GeneralSettingsIcon />} />
                    <BottomNavigationAction label="Player" icon={<PlayerIcon />} />
                    <BottomNavigationAction label="Sync" icon={<RefreshIcon />} />
                    <BottomNavigationAction label="Libraries" icon={<LibraryIcon />} />
                </BottomNavigation>
            </section>
        );
    }
}