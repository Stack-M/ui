import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import ApiRequest from '../../request/ApiRequest';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import blue from '@material-ui/core/colors/blue';
import NoDirectoryNode from './NoDirectoryNode';
import { Button } from '@material-ui/core';
import Node from './Node';

@observer
export default class DirectorySelector extends React.Component {
    @observable path = '';
    @observable nodes = [];
    @observable os = '';
    request = new ApiRequest();

    async getRootFs() {
        const response = await this.request.get('rootFs');
        const rootFolders = await response.json();

        this.nodes = rootFolders.nodes;
        this.os = rootFolders.os;
        this.path = '';
    }

    componentDidMount() {
        this.getRootFs();
    }

    @computed get computedPath() {
        if(this.path.length === 0) {
            return 'Device root';
        }
        return this.path;
    }

    async forward(path) {
        const response = await this.request.get('fsTraverse', {
            path: this.path !== '' ? Buffer.from(`${this.path}${path}`).toString('base64') : btoa(path)
        });
        
        const directories = await response.json();

        this.path = directories.path;
        this.nodes = directories.nodes;
    }

    async back() {
        if(this.path === '') return;

        const pathParts = this.path.split('/');
        pathParts.pop();
        pathParts.pop();
        let oneStepDownPath = pathParts.join('/');

        if(oneStepDownPath !== '') oneStepDownPath += '/';

        if(oneStepDownPath === '') {
            this.getRootFs();
            return;
        }

        const response = await this.request.get('fsTraverse', {
            path: Buffer.from(oneStepDownPath).toString('base64')
        });

        const directories = await response.json();

        this.path = directories.path;
        this.nodes = directories.nodes;
    }

    @computed get backwardsNode() {
        if(this.path === '') {
            return null;
        }

        return (
            <section className="node" onClick={() => this.back()}>
                <section className="icon" style={{ background: blue[500] }}>
                    <BackArrowIcon />
                </section>
                <section className="text">
                    Up one level
                </section>
            </section>
        )
    }

    @computed get displayNodes() {
        if(this.nodes.length === 0) {
            return <NoDirectoryNode />;
        }

        return this.nodes.map(node => (
            <Node clickHandler={() => this.forward(node)} text={node} key={node} />
        ));
    }

    startSetup() {
        this.props.onComplete(this.path);
    }
    
    render() {
        return (
            <section className="directory-selector">
                <section className="path">
                    <div className="text">{this.computedPath}</div>
                    <Button variant="text" color="secondary" size="small" disabled={this.path === ''} onClick={() => this.startSetup()}>
                        Select Directory
                    </Button>
                </section>
                <section className="nodes">
                    {this.backwardsNode}
                    {this.displayNodes}
                </section>
            </section>
        );
    }
}