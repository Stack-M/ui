import React from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Select, MenuItem, Switch } from '@material-ui/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import GeneralLoggingCard from './GeneralLoggingCard';

@observer
export default class GeneralSettings extends React.Component {
    @observable languages = {
        eng: 'English'
    };
    @observable selectedLanguage = 'eng';

    render() {
        return (
            <section className="settings-type-container">
                <Typography variant="h4">General</Typography>
                <Paper elevation={8} className="settings-card">
                    <Typography variant="h6" className="title">Language</Typography>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText primary="App language" secondary="The primary language the app will use" />
                            <Select value={this.selectedLanguage}>
                                {Object.entries(this.languages).map((entry) => (
                                    <MenuItem value={entry[0]} key={entry[0]}>{entry[1]}</MenuItem>
                                ))}
                            </Select>
                        </ListItem>
                    </List>
                </Paper>
                <Paper elevation={8} className="settings-card">
                    <Typography variant="h6" className="title">Updates</Typography>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText primary="Update mode" secondary="Choose wheater the server updates itself or if you will manually update it" />
                            <Select value={'automatic'}>
                                <MenuItem value="manual">Manual</MenuItem>
                                <MenuItem value="automatic">Automatic</MenuItem>
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Auto server restart" secondary="Restart the server automatically after an update" />
                            <Switch checked={true} />
                        </ListItem>
                    </List>
                </Paper>
                <Paper className="settings-card" elevation={8}>
                    <Typography variant="h6" className="title">Reporting</Typography>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText primary="Send anonymous usage reports" secondary="Allow the server to send anonymous usage reports so we can streamline the UX without any hassle" />
                            <Switch checked={true} />
                        </ListItem>
                    </List>
                </Paper>
                <GeneralLoggingCard />
            </section>
        );
    }
}