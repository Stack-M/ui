import React from 'react';
import { Paper, LinearProgress, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ApiRequest from '../../request/ApiRequest';
import EyeIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import SneakViewIcon from '@material-ui/icons/PageviewOutlined';
import { Link } from 'react-router-dom';

@observer
export default class ResultItem extends React.Component {
  @observable info = null;
  request = new ApiRequest();

  async fetchInfo() {
    const fetchRequest = await this.request.get('scanMedia', {
      path: Buffer.from(this.props.path).toString('base64')
    });
    this.info = await fetchRequest.json();
  }

  componentDidMount() {
    this.fetchInfo();
  }

  getDescription() {
    // use the tmdb description first.
    // if not present use the anilist one

    if(this.info.tvdbResult.overview) {
      return this.info.tvdbResult.overview;
    } else {
      return this.info.result.description.replace(/\<br\>/g, '').replace(/<br \/\>/g, '');
    }
  }

  render() {
    return (
      <Paper className="search-result-item" elevation={1}>
        {this.info ? (
          <React.Fragment>
            <div className="banner" style={{ backgroundImage: `url(${this.info.result.bannerImage})` }} />
            <section className="details">
              <div className="cover" style={{ backgroundImage: `url(${this.info.result.coverImage.medium})` }} />
              <div className="names">
                <Typography variant="h5">{this.info.result.title.romaji}</Typography>
              </div>

              <Typography className="description" dangerouslySetInnerHTML={{ __html: this.getDescription().substr(0, 100) + '...' }}></Typography>

              <section className="button-container">
                <Link to={`/media/${Buffer.from(this.props.path).toString('base64')}/${this.props.name}`} className="action-button">
                  <EyeIcon />
                  <span className="action">
                    View
                  </span>
                </Link>
                
                <button className="action-button">
                  <SneakViewIcon />
                  <span className="action">
                    Sneak Peek
                  </span>
                </button>
              </section>
            </section>
          </React.Fragment>
        ): (
          <section className="loader-container">
            <LinearProgress style={{ width: '90%' }} />
          </section>
        )}
      </Paper>
    );
  }
}