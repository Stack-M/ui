import React from 'react';
import VideoControls from './VideoControls';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Subtitles from './subtitle/Subtitles';

@observer
export default class VideoPlayer extends React.Component {
  @observable videoRef = React.createRef();

  componentDidMount() {
  }

  render() {
    return (
      <section className={`video-player`}>
        {this.videoRef.current && <Subtitles {...this.props} videoRef={this.videoRef} />}
        <video className="video-element" src={this.props.source} ref={this.videoRef} autoPlay>
          {/* <track label="English" srcLang="en" kind="subtitles" src={this.props.subs} default /> */}
        </video>
        {this.videoRef.current && <VideoControls videoRef={this.videoRef} {...this.props} />}
      </section>
    )
  }
}