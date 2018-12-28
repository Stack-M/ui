import React from 'react';
import ApiRequest from '../../request/ApiRequest';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import VideoPlayer from './VideoPlayer';
import VideoLoader from './VideoLoader';
import "../../../scss/player.scss";
import AnimePeekInfo from './AnimePeekInfo';

@observer
export default class AnimePlayer extends React.Component {
    @observable streamUri = null;
    @observable subtitles = null;
    @observable playerSectionRef = React.createRef();
    request = new ApiRequest();
    @observable mouseMovementTimeout = null;
    @observable showControls = false;

    async getSubtitles(params) {
        const fetchRequest = await this.request.get('watchSubtitle', params);

        const parsedSubtitles = await fetchRequest.json();

        this.subtitles = parsedSubtitles;

        return new Promise((resolve) => resolve(null));
    }

    setSourceUri(params) {
        const sourceUri = this.request.getRequestUri('watch', params);

        this.streamUri = sourceUri;

        return new Promise((resolve) => resolve(null));
    }

    showVideoControls() {
        this.showControls = true;

        // Also create a new timeout for the visibility to wear off
        clearTimeout(this.mouseMovementTimeout);
        this.mouseMovementTimeout = setTimeout(() => this.showControls = false, 2000);
    }

    startHandlingVideoControlVisibilityControl() {
        this.playerSectionRef.current.onmousemove = () => this.showVideoControls();
    }

    async fetchResources() {
        const { path, anime, episode } = this.props.match.params;

        await Promise.all([
            this.setSourceUri({
                path, anime, episode
            }),
            this.getSubtitles({
                path, anime, episode
            })
        ]);

        // We can do some stuff here after fetching resources
        this.startHandlingVideoControlVisibilityControl();
    }

    componentDidMount() {
        this.fetchResources();
    }

    @computed get videoRender() {
        if(!this.streamUri) {
            return (
                <VideoLoader status="Processing the video..." />
            );
        }
        if(!this.subtitles) {
            return (
                <VideoLoader status="Extracting subtitles..." />
            )
        }
        return <VideoPlayer source={this.streamUri} subs={this.subtitles} visible={this.showControls} showControls={() => this.showVideoControls()} fullScreenToggle={() => this.fullScreenToggle()} />;
    }

    fullScreenToggle() {
        this.playerSectionRef.current.requestFullscreen().then({}).catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
    }

    render() {
        return (
            <section className={`anime-player ${this.showControls && 'showCursor'}`} ref={this.playerSectionRef}>
                <AnimePeekInfo path={this.props.match.params.root} episode={this.props.match.params.episode} visible={this.showControls} />
                {this.videoRender}
            </section>
        );
    }
}