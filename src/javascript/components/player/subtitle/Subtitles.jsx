import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import Subtitle from './Subtitle';

@observer
export default class Subtitles extends React.Component {
  @observable currentlyDisplayedSubtitle = [];

  convertStrFormattedTime(str, ms = false) {
    const decimalPart = str.split('.')[1];
    const split = str.split('.')[0].split(':');
    const hours = parseInt(split[0], 10) * 60 * 60;
    const minutes = parseInt(split[1], 10) * 60;
    const seconds = parseInt(split[2], 10);

    const time = +(`${hours + minutes + seconds}.${decimalPart}`);

    return ms ? time * 1000 : time;
  }

  createBindingsForSubtitles(subtitles) {
    this.props.videoRef.current.addEventListener('timeupdate', ev => {
      const video = ev.target;

      this.currentlyDisplayedSubtitle = this.currentlyDisplayedSubtitle.filter(selectedSubtitle => (
        video.currentTime.toFixed(2) < this.convertStrFormattedTime(selectedSubtitle.timings.end).toFixed(2)
        && video.currentTime.toFixed(2) > this.convertStrFormattedTime(selectedSubtitle.timings.start).toFixed(2)
      ));

      subtitles.filter(subtitle => {
        if(
          this.convertStrFormattedTime(subtitle.timings.start) <= video.currentTime 
          && this.convertStrFormattedTime(subtitle.timings.end) >= video.currentTime
        ) {
          if((video.currentTime - this.convertStrFormattedTime(subtitle.timings.start)) < 1) {
            // Need to check if it is alredy being displayed
            return !this.currentlyDisplayedSubtitle.some(currentSubtitle => (
              currentSubtitle.timings.start === subtitle.timings.start
              && subtitle.text === currentSubtitle.text
            ));
          }
          return false;
        }
        return false;
      }).forEach(subtitle => {
        this.currentlyDisplayedSubtitle.push(subtitle);
      });
    });
  }

  componentDidMount() {
    const subtitles = this.props.subs.dialouges;

    this.createBindingsForSubtitles(subtitles);
  }

  @computed get subtitleToRender() {
    return (
      <React.Fragment>
        {this.currentlyDisplayedSubtitle.map(subtitle => (
          <Subtitle key={subtitle.timings.start} subtitle={subtitle} scaling={this.props.subs.scalingInfo} />
        ))}
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.subtitleToRender}
      </React.Fragment>
    )
  }
}