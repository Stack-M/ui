import React from 'react';
import { Typography, Button } from '@material-ui/core';
import ApiRequest from '../../request/ApiRequest';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import "../../../scss/media.scss";
import MediaPreview from './MediaPreview';
import ScrollView from './ScrollView';
import MediaLoadingDisplay from './MediaLoadingDisplay';
import ListView from './ListView';

@observer
export default class Library extends React.Component {
    request = new ApiRequest();
    @observable nodes = [];
    @observable expanded = false;

    async fetchNodes() {
        const scanFetchResponse = await this.request.get('scanLibraryRoot', {
            path: Buffer.from(this.props.conf.directory).toString('base64')
        });
        const nodes = await scanFetchResponse.json();
        this.nodes = nodes;
    }

    componentDidMount() {
        this.fetchNodes();
    }

    @computed get nodesRender() {
        if(this.nodes.length === 0) {
            return <MediaLoadingDisplay />;
        } 

        if(this.expanded) {
            return (
                <ListView>
                    {this.nodes.map((node, index) => <MediaPreview name={node.name} path={node.path} key={node.path} index={index} />)}
                </ListView>
            )
        }

        return (
            <ScrollView>
                {this.nodes.map((node, index) => <MediaPreview name={node.name} path={node.path} key={node.path} index={index} />)}
            </ScrollView>
        )
    }

    toggleExpanded() {
        this.expanded = !this.expanded;
    }

    render() {
        return (
            <section className="library-section">
                <Typography variant="h5" className="lib-name">
                    {this.props.conf.name}
                    
                    <Button size="small" color="secondary" style={{ marginLeft: '1rem' }} variant="text" onClick={() => this.toggleExpanded()}>
                        {this.expanded ? 'Collapse' : 'Expand'}
                    </Button>
                </Typography>
                {this.nodesRender}
            </section>
        )
    }
}