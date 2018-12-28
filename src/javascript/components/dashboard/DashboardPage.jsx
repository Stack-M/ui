import React from 'react';
import { observable, computed } from 'mobx';
import WebsocketClient from '../../app-management/websocket/WebsocketClient';
import ApiRequest from '../../request/ApiRequest';
import { observer } from 'mobx-react';
import Library from '../media/Library';
import "../../../scss/dashboard.scss";
import Appbar from '../appbar/Appbar';
import NoLibraryDisplay from './NoLibraryDisplay';

@observer
export default class DashboardPage extends React.Component {
    @observable websocket = null;
    @observable libraries = [];
    request = new ApiRequest();

    async fetchLibraries() {
        const libResponse = await this.request.get('serverLibraries');
        const libraries = await libResponse.json();
        this.libraries = libraries;
    }

    componentDidMount() {
        this.websocket = new WebsocketClient(this.props.websocketConnection);

        this.fetchLibraries();
    }

    @computed get libraryRender() {
        if(this.libraries.length === 0) {
            return <NoLibraryDisplay />;
        }

        return this.libraries.slice().sort((a, b) => a.name.localeCompare(b)).map((library, index) => <Library conf={library} key={index} />);
    }

    render() {
        return (
            <section className="dashboard-page">
                <Appbar pageName="Dashboard" />
                {this.libraryRender}
            </section>
        );
    }
}