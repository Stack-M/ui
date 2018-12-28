import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import VolumeIcon from '@material-ui/icons/VolumeUp';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';

@observer
export default class VideoControls extends React.Component {
  @observable volumeBarVisibility = false;
  @observable playing = true;
  @observable volume = 1;
  @observable currentPosition = 0;
  @observable currentSeconds = 0;

  componentDidMount() {
    this.attachKeyboardHandlers();
    if(this.props.videoRef.current) {
      this.props.videoRef.current.addEventListener('timeupdate', (ev) => {
        this.currentPosition = (this.props.videoRef.current.currentTime / this.props.videoRef.current.duration) * 100;
      });
    }
  }

  skipVideo(duration) {
    this.props.showControls();
    this.currentPosition = ((this.props.videoRef.current.currentTime + duration) / this.props.videoRef.current.duration) * 100;
    this.props.videoRef.current.currentTime = (this.currentPosition / 100) * this.props.videoRef.current.duration;
  }

  reverseVideo(duration) {
    this.props.showControls();
    this.currentPosition = ((this.props.videoRef.current.currentTime - duration) / this.props.videoRef.current.duration) * 100;
    this.props.videoRef.current.currentTime = (this.currentPosition / 100) * this.props.videoRef.current.duration;
  }

  changeVolume(volume) {
    const currentVolume = this.volume * 100;

    if((currentVolume + volume) > 100) {
      this.volume += (100 - currentVolume) / 100;
      return;
    }

    if((currentVolume - volume) > 100) {
      this.volume = 0;
      return;
    }
    
    this.volume += volume / 100;
  }

  attachKeyboardHandlers() {
    document.body.addEventListener('keydown', (ev) => ev.keyCode === 39 ? this.skipVideo(15) : null);
    document.body.addEventListener('keydown', (ev) => ev.keyCode === 37 ? this.reverseVideo(15) : null);
    document.body.addEventListener('keydown', (ev) => ev.keyCode === 38 ? this.changeVolume(10) : null);
    document.body.addEventListener('keydown', (ev) => ev.keyCode === 40 ? this.changeVolume(-10) : null);
    document.body.addEventListener('keydown', (ev) => ev.keyCode === 32 ? this.togglePlaying() : null);
  }

  toggleVolumeBarVisibility() {
    this.volumeBarVisibility = !this.volumeBarVisibility;
  }

  @computed get playPauseButtonContent() {
    if(this.playing) {
      return <React.Fragment><PauseIcon style={{ marginRight: '.2rem', fontSize: '2.25rem' }} /> <b>Pause</b></React.Fragment>;
    }
    return <React.Fragment><PlayIcon style={{ marginRight: '.2rem', fontSize: '2.25rem' }} /> <b>Play</b></React.Fragment>;
  }

  togglePlaying() {
    if(this.playing) {
      this.props.videoRef.current.pause();
      this.playing = false;
    } else {
      this.props.videoRef.current.play();
      this.playing = true;
    }
  }

  handleVolumeChange(value) {
    this.volume = value / 100;
    this.props.videoRef.current.volume = this.volume;
  }

  seekToPosition(value) {
    this.currentPosition = value;
    this.props.videoRef.current.currentTime = (value / 100) * this.props.videoRef.current.duration;
  }

  goFullScreen() {
    this.props.fullScreenToggle();
  }

  render() {
    if(this.props.videoRef.current) {
      return (
        <section className={`video-controls ${this.props.visible && 'visible'}`}>
          <section className="seek-bar-container">
            <Slider
              value={this.currentPosition}
              onChange={(ev, value) => this.seekToPosition(value)}
            />
            <section className="time-container">
              {this.props.videoRef.current.duration}
            </section>
          </section>
          <section className="fine-control">
            <Button variant="extendedFab" color="secondary" onClick={() => this.togglePlaying()} tabIndex={-1}>{this.playPauseButtonContent}</Button>
            <IconButton onPointerEnter={() => this.toggleVolumeBarVisibility()} onPointerLeave={() => this.toggleVolumeBarVisibility()} className="volume-button"><VolumeIcon /></IconButton>
            {this.volumeBarVisibility && (
              <section className="volume-bar-container" onPointerEnter={() => this.volumeBarVisibility = true} onPointerLeave={() => this.volumeBarVisibility = false}>
                <Slider
                  value={this.volume * 100}
                  onChange={(event, value) => this.handleVolumeChange(value)}
                />
              </section>
            )}
            <IconButton className="fullscreen-button" onClick={() => this.goFullScreen()}><FullscreenIcon /></IconButton>
            <IconButton className="subs-button"><SubtitlesIcon /></IconButton>
            <IconButton className="info-button"><InfoIcon /></IconButton>
          </section>
        </section>
      );
    } else {
      return null;
    }
  }
}