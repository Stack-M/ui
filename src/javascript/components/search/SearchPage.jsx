import React from 'react';
import "../../../scss/search.scss";
import Appbar from '../appbar/Appbar';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import NoResults from './NoResults';
import SpacerFromAppbar from '../appbar/SpacerFromAppbar';
import ApiRequest from '../../request/ApiRequest';
import ResultLibrary from './ResultLibrary';

@observer
export default class SearchPage extends React.Component {
  @observable results = [];
  @observable query = '';
  @observable medium = [];
  request = new ApiRequest();

  async fetchMedia() {
    const response = await this.request.get('serverLibraries');
    const libraries = await response.json();

    const media = libraries.map(async (library) => {
      const mediaResponse = await this.request.get('scanLibraryRoot', {
        path: Buffer.from(library.directory).toString('base64')
      });
      const medium = await mediaResponse.json();

      return new Promise((resolve, reject) => resolve({
        name: library.name,
        animes: medium
      }));
    });
    this.medium = await Promise.all(media);
  }

  @computed get renderResults() {
    if(this.query.length === 0) {
      return (
        <NoResults reason={`Start typing to search for an anime or a library`} />
      );
    }
    if(this.results.length === 0 && this.query.length !== 0) {
      return <NoResults reason={`No matches for the query '${this.query}'.`} />
    }

    return (
      <section className="search-results-container">
        {this.results.map(result => <ResultLibrary {...result} key={result.name} />)}
      </section>
    );
  }

  filter() {
    const results = this.medium.filter(media => {
      const libraryNameContains = media.name.toLowerCase().includes(this.query.toLowerCase());
      const animeNamesContains = media.animes.some(anime => anime.name.toLowerCase().includes(this.query.toLowerCase()));

      return libraryNameContains || animeNamesContains;
    });

    this.results = results.map(result => {
      const filteredAnimes = result.animes.filter(anime => anime.name.toLowerCase().includes(this.query.toLowerCase()));
      return {
          ...result,
          animes: filteredAnimes
      };
    });
  }

  changeQuery(query) {
    this.query = query;

    this.filter();
  }

  componentDidMount() {
    this.fetchMedia();
  }

  render() {
    return (
      <section className="search-page">
        <Appbar pageName="Search" onSearchChange={(ev) => this.changeQuery(ev.target.value)} />
        <SpacerFromAppbar />
        {this.renderResults}
      </section>
    );
  }
};