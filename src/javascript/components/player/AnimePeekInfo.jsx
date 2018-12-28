import React from 'react';
import ApiRequest from '../../request/ApiRequest';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Typography } from '@material-ui/core';

@observer
export default class AnimePeekInfo extends React.Component {
  @observable info = null;
  request = new ApiRequest();

  async fetchData() {
    const fetchRequest = await this.request.get('scanMedia', {
      path: this.props.path
    });
    const info = await fetchRequest.json();

    this.info = info;
  }

  componentDidMount() {
    this.fetchData();
  }

  getDescription() {
    // use the tmdb description first.
    // if not present use the anilist one

    if(this.info.tvdbResult.overview) {
      return this.info.tvdbResult.overview;
    } else {
      return this.info.result.description;
    }
  }

  render() {
    if(!this.info) return null;

    return (
      <section className={`anime-peek-info ${this.props.visible && 'visible'}`}>
        <section className="poster" style={{ backgroundImage: `url(${this.info.result.coverImage.large})` }} />
        <section className="details">
          <Typography variant="h4">Currently Watching</Typography>
          <Typography variant="h3" className="anime-name">
            {this.info.result.title.romaji}
            <Typography variant="h6">S01 &middot; E{this.props.episode}</Typography>
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: this.getDescription() }} variant="body2"></Typography>
        </section>
      </section>
    );
  }
}