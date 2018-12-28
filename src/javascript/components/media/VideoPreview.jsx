import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import ApiRequest from '../../request/ApiRequest';
import { Button } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

@observer
export default class VideoPreview extends React.Component {
    @observable imageUri = '';

    async fetchResources() {
        const thumbnailImageFetchRequest = await fetch(`${ApiRequest.API_SERVER_HOST}${this.props.episode.thumbnail}`);

        const image = await thumbnailImageFetchRequest.blob();
        const fileReader = new FileReader();
        fileReader.onload = () => this.imageUri = fileReader.result;
        fileReader.readAsDataURL(image);
    }

    componentDidMount() {
        this.fetchResources();
    }

    render() {
        return (
            <section className="video-preview" style={{ height: '210px' }}>
                <section className="screen-cap" style={{ backgroundImage: `url(${this.imageUri})` }}>
                    <section className="duration">{this.props.episode.duration}</section>
                    <section className="button-overlay">
                        <div className="buttons">
                            <Button variant="fab" color="secondary" component={Link} to={`/watch/${(
                                Buffer.from(`${Buffer.from(`${this.props.path}`, 'base64').toString()}${this.props.episode.fileName}`).toString('base64')
                            )}/${this.props.path}/${this.props.anime}/${this.props.episode.episodeIdentifier}`}><PlayIcon /></Button>
                            <Button variant="fab" color="default"><AddIcon /></Button>
                        </div>
                    </section>
                </section>
                <section className="details">
                    {this.props.episode.episode}
                    {/* <section className="file-name">
                        {this.props.episode.fileName}
                    </section> */}
                </section>
            </section>
        );
    }
}