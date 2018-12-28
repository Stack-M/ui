import React from 'react';
import { Paper, Typography, Chip, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ApiRequest from '../../request/ApiRequest';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import VideoPreview from './VideoPreview';
import ScrollView from './ScrollView';

@observer
export default class SneakPeek extends React.Component {
    request = new ApiRequest();
    @observable episodes = [];

    blockPropagation(ev) {
        ev.stopPropagation();
        ev.preventDefault();
    }

    async fetchEpisodes() {
        const episodeFetchResponse = await this.request.get('scanEpisodes', {
            path: Buffer.from(this.props.path).toString('base64'),
            name: this.props.dirName
        });
        const episodes = await episodeFetchResponse.json();
        this.episodes = episodes;
    }

    componentDidMount() {
        this.fetchEpisodes();
    }

    @computed get episodesPreviewRender() {
        return this.episodes.map(episode => <VideoPreview height={210} episode={episode} path={this.props.path} key={episode.fileName} />);
    }

    render() {
        return (
            <section className="sneak-peek-modal" onClick={this.props.onClose}>
                <Paper className="sneak-peek" elevation={24} onClick={(ev) => this.blockPropagation(ev)}>
                    <section className="anime-banner" style={{ backgroundImage: `url(${this.props.metadata.result.bannerImage})` }}>
                        <section className="button-container">
                            <Button component={Link} to={`/media/${Buffer.from(this.props.path).toString('base64')}/${this.props.dirName}`} className="action-button" color="primary" variant="contained">Anime Page</Button>
                            <Button onClick={this.props.onClose} className="action-button" color="secondary" variant="contained">Close</Button>
                        </section>
                    </section>
                    <section className="anime-details">
                        <img src={this.props.metadata.result.coverImage.large} className="anime-cover-image" />
                        <header className="headers">
                            <Typography variant="h3">
                                {this.props.metadata.result.title.romaji}
                            </Typography>
                            <section className="tags">
                                {this.props.metadata.result.genres.map(genre => <Chip className="anime-genre" label={genre} key={genre} />)}
                            </section>
                            <Typography className="anime-description" dangerouslySetInnerHTML={{ __html: this.props.metadata.result.description.replace(/<br>/g, '') }}></Typography>
                        </header>
                        <main className="main-content">
                            <Typography variant="h5">Episodes</Typography>
                            <section className="episodes-preview">
                                <ScrollView height={210}>
                                    {this.episodesPreviewRender}
                                </ScrollView>
                            </section>
                        </main>
                    </section>
                </Paper>
            </section>
        );
    }
}