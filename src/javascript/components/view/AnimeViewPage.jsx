import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import "../../../scss/anime-view.scss";
import ApiRequest from '../../request/ApiRequest';
import { Paper, Typography, Chip } from '@material-ui/core';
import ScoreDistributionGraph from './ScoreDistributionGraph';
import * as Vibrant from 'node-vibrant'
import CharacterView from './CharacterView';
import VideoPreview from '../media/VideoPreview';
import Appbar from '../appbar/Appbar';

@observer
export default class AnimeViewPage extends React.Component {
    @observable metadata = {};
    @observable episodes = [];
    @observable bannerProminence = {};
    request = new ApiRequest();

    static TVDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

    setBackdropImage() {
        if(!this.metadata.tvdbResult.backdrop_path) return;
        
        document.body.style.backgroundImage = `url(${AnimeViewPage.TVDB_IMAGE_BASE}${this.metadata.tvdbResult.backdrop_path})`;
        document.body.classList.add('series-backdrop');
    }

    async computeColorProminence() {
        // Doesn't work.
        // ideas to make it work, have an api endpoint fetch it for us.

        const fetchResult = await fetch(this.metadata.result.bannerImage);
        const blobImage = await fetchResult.blob();

        const reader = new FileReader();
        reader.onloadend = async () => {
            const img = new Image();
            img.src = reader.result;

            const palette = await Vibrant.from(img).getPalette();
            this.bannerProminence = palette;
        };
        reader.readAsDataURL(blobImage);
        
        console.log(palette);
    }

    componentWillUnmount() {
        document.body.style.backgroundImage = `url("/Resources/Images/spiration dark.png")`;
        document.body.classList.remove('series-backdrop');
    }

    async fetchMediaData() {
        const scanFetchResponse = await this.request.get('scanMedia', {
            path: this.props.match.params.path
        });
        const metadata = await scanFetchResponse.json();
        this.metadata = metadata;

        // this.computeColorProminence();
        this.setBackdropImage();
    }

    async fetchEpisodes() {
        const episodesFetchResponse = await this.request.get('scanEpisodes', {
            path: this.props.match.params.path,
            name: this.props.match.params.anime
        });
        const episodes = await episodesFetchResponse.json();
        this.episodes = episodes;
    }

    componentDidMount() {
        this.fetchMediaData();
        this.fetchEpisodes();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.path !== prevProps.match.params.path) {
            this.fetchMediaData();
            this.fetchEpisodes();
        }
    }

    @computed get infoBits() {
        return (
            <React.Fragment>
                <div className="info-bit">
                    <div className="title">Episode Duration</div>
                    <div className="data">{this.metadata.result.duration} mins</div>
                </div>
                <div className="info-bit">
                    <div className="title">Source</div>
                    <div className="data source-name">{this.metadata.result.source ? this.metadata.result.source.toLowerCase() : 'Not Found'}</div>
                </div>
                <div className="info-bit">
                    <div className="title">Average Score</div>
                    <div className="data">{this.metadata.result.averageScore} out of 100</div>
                </div>
                <div className="info-bit">
                    <div className="title">Studio{this.metadata.result.studios.edges.length > 1 && 's'}</div>
                    <div className="data">
                    {this.metadata.result.studios.edges.map(edge => (
                        <span key={edge.node.name} className={`studio ${edge.isMain ? 'main' : 'secondary'}`}>{edge.node.name}</span>
                    ))}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    get episodesRender() {
        return (
            <section className="episodes-container">
                {this.episodes.map(episode => <VideoPreview episode={episode} path={this.props.match.params.path} anime={this.props.match.params.anime} key={episode.fileName} />)}
            </section>
        );
    }

    @computed get ifLoaded() {
        if(!this.metadata.result) {
            return null;
        }

        return (
            <React.Fragment>
                <Appbar pageName={this.metadata.result.title.romaji} />
                <section className="anime-banner" style={{ backgroundImage: `url(${this.metadata.result.bannerImage})` }} />
                <section className="graduation-gradient" />
                <Paper className="prelim-info" elevation={2}>
                    <section style={{ backgroundImage: `url(${this.metadata.result.coverImage.large})` }} className="anime-cover-image" />
                    <section className="details">
                        <section className="score-container">
                            {this.infoBits}
                        </section>
                        <section className="textual">
                            <Typography variant="h3">{this.metadata.result.title.romaji}</Typography>
                            <section className="genres">
                                {this.metadata.result.genres.map(genre => <Chip key={genre} className="genre" label={genre} />)}
                            </section>
                            <Typography className="description" dangerouslySetInnerHTML={{__html: this.metadata.result.description}} />
                        </section>
                    </section>
                </Paper>
                <Paper className="episodes" elevation={2}>
                    <Typography variant="h4">Episodes</Typography>

                    {this.episodesRender}
                </Paper>
                <Paper className="graph-info" elevation={2}>
                    <Typography variant="h4">Statistics</Typography>
                    <br />
                    <Typography variant="h6">Scores (out of 100)</Typography>
                    <ScoreDistributionGraph data={this.metadata.result.stats.scoreDistribution} />
                </Paper>
                <Paper className="characters-info" elevation={2}>
                    <Typography variant="h4">Characters</Typography>

                    <CharacterView characters={this.metadata.result.characters.edges} />
                </Paper>
            </React.Fragment>
        )
    }

    render() {
        return (
            <section className="anime-view-page">
                {this.ifLoaded}
            </section>
        )
    }
}