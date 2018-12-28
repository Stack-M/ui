import React from 'react';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import Action from './Action';

export default class Actions extends React.Component {
    render() {
        return (
            <section className="actions">
                <Action link={true} to="/dashboard" icon={<HomeIcon />} name="Dashboard" />
                <Action onClick={this.props.onClose} icon={<RefreshIcon />} name="Re-index" />
                <Action link={true} to="/settings" icon={<SettingsIcon />} name="Settings" />
            </section>
        );
    }
}