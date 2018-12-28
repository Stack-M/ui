import React from 'react';
import { ListItemText, ListItem, LinearProgress, Avatar } from '@material-ui/core';
import ApiRequest from '../../request/ApiRequest';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {Link} from 'react-router-dom';

@observer
export default class SearchResultItem extends React.Component {
    request = new ApiRequest();
    @observable metadata = null;

    async fetchMediaData() {
        const scanFetchResponse = await this.request.get('scanMedia', {
            path: Buffer.from(this.props.anime.path).toString('base64')
        });
        const metadata = await scanFetchResponse.json();

        if(metadata.error) {
            console.log('error fetching media data', metadata.error);
            return;
        }

        this.metadata = metadata;
    }

    componentDidMount() {
        this.fetchMediaData();
    }

    getDescription() {
        // use the tmdb description first.
        // if not present use the anilist one

        if(this.metadata.tvdbResult.overview) {
            return this.metadata.tvdbResult.overview;
        } else {
            return this.metadata.result.description;
        }
    }

    detailsRender() {
        return (
            <section className="details">
                <span style={{ fontSize: '.7rem' }} className="orignal-name">Orignal name: {this.metadata.result.title.romaji}</span>
                {/* <span className="air-date">{this.metadata.seasons[0].air_date}</span> */}
                <div dangerouslySetInnerHTML={{ __html: this.getDescription().length > 200 ? this.getDescription().substr(0, 200) + '...' : this.getDescription() }} className="description" />
            </section>
        )
    }

    renderAfterMetadata() {
        return (
            <React.Fragment>
                <Avatar className="small-view" src={this.metadata.result.coverImage.medium} />
                <section className="anime-cover" style={{ backgroundImage: `url(${this.metadata.result.coverImage.medium})` }} />
                <ListItemText primary={this.props.anime.name} secondary={this.detailsRender()} />
            </React.Fragment>
        )
    }

    renderLoading() {
        return (
            <LinearProgress color="secondary" />
        );
    }

    render() {
        return (
            <ListItem onClick={this.props.resetSearch} button className="search-result-item" component={Link} to={`/media/${Buffer.from(this.props.anime.path).toString('base64')}/${this.props.anime.name}`}>
                {this.metadata ? this.renderAfterMetadata() : this.renderLoading()}
            </ListItem>
        );
    }
}