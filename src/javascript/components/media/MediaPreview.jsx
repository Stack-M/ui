import React from 'react';
import ApiRequest from '../../request/ApiRequest';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import SneakPeek from './SneakPeek';
import { Link } from 'react-router-dom';

@observer
export default class MediaPreview extends React.Component {
    request = new ApiRequest();
    @observable bannerImageUri = '';
    @observable metadata = {};
    @observable sneakPeek = false;

    async fetchMediaData() {
        const scanFetchResponse = await this.request.get('scanMedia', {
            path: Buffer.from(this.props.path).toString('base64')
        });
        const metadata = await scanFetchResponse.json();

        if(metadata.error) {
            console.log('error fetching media data', metadata.error);
            return;
        }

        this.metadata = metadata;
        this.setCoverImage();
    }

    setCoverImage() {
        if(this.metadata.result) {
            this.bannerImageUri = this.metadata.result.coverImage.large;
        }
    }

    showSneakPeek(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.sneakPeek = true;
    }

    closeSneakPeek(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.sneakPeek = false;
    }

    componentDidMount() {
        this.fetchMediaData();
    }

    render() {
        return (
            <Link to={`/media/${Buffer.from(this.props.path).toString('base64')}/${this.props.name}`} className="media-preview" style={{ backgroundImage: `url(${this.bannerImageUri})` }}>
                {this.sneakPeek && <SneakPeek metadata={this.metadata} path={this.props.path} dirName={this.props.name} onClose={(ev) => this.closeSneakPeek(ev)} />}
                <section className="overlay">
                    <div className="name">{this.metadata.result && this.metadata.result.title.romaji}</div>
                    <Button color="primary" size="small" variant="text" onClick={(ev) => this.showSneakPeek(ev)} style={{ marginTop: '.5rem' }}>Sneak Peek</Button>
                </section>
            </Link>
        )
    }
}