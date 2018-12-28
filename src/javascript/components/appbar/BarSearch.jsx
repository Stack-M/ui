import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ApiRequest from '../../request/ApiRequest';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Paper, ListSubheader, List } from '@material-ui/core';
import SearchResultItem from './SearchResultItem';

@observer
export default class BarSearch extends React.Component {
    request = new ApiRequest();
    @observable medium = [];
    @observable query = '';
    @observable queryResults = [];
    @observable autoSuggestShow = false;

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

    showAutoSuggest() { this.autoSuggestShow = true; }

    hideAutoSuggest() { this.autoSuggestShow = false; }

    handleTyping(ev) {
        const query = ev.target.value.trim();
        if(query.length === 0) return this.emptySearchWarning();

        this.query = query;

        this.showResults();
    }

    emptySearchWarning() {
        this.queryResults = [];
        this.query = '';
        return false;
    }

    showResults() {
        const results = this.medium.filter(media => {
            const libraryNameContains = media.name.toLowerCase().includes(this.query.toLowerCase());
            const animeNamesContains = media.animes.filter(anime => anime.name.toLowerCase().includes(this.query.toLowerCase())).length > 0;

            return libraryNameContains || animeNamesContains;
        });
        const filteredResults = results.map(result => {
            const filteredAnimes = result.animes.filter(anime => anime.name.toLowerCase().includes(this.query.toLowerCase()));
            return {
                ...result,
                animes: filteredAnimes
            };
        });

        this.queryResults = filteredResults/*.forEach(result => /*result.animes.forEach(anime => console.log(anime.name)))*/;
    }

    componentDidMount() {
        this.fetchMedia();
    }

    resetSearch() {
        this.query = '';
        this.queryResults = [];
        this.autoSuggestShow = false;
    }

    @computed get autoSuggest() {
        if(!this.autoSuggestShow) return null;

        const resultsRender = () => (
            <List>
                {this.queryResults.map(result => (
                    <React.Fragment key={result.name}>
                        <ListSubheader style={{ background: '#424242' }}>{result.name}</ListSubheader>
                        {result.animes.map(anime => (
                            <SearchResultItem key={anime.path} anime={anime} resetSearch={() => this.resetSearch()} />
                        ))}
                    </React.Fragment>
                ))}
            </List>
        );

        const noResultRender = () => {
            if(this.query.trim().length === 0) {
                return (
                    <section className="no-result-message">
                        Start typing to get results
                    </section>
                );
            }

            return (
                <section className="no-result-message">
                    No animes or library found for your query :(
                </section>
            );
        }

        return (
            <Paper className="auto-suggest-container" elevation={24}>
                {this.queryResults.length === 0 ? noResultRender() : resultsRender()}
            </Paper>
        );
    }

    checkForBlur() {
        if(this.query.trim().length === 0) this.hideAutoSuggest();
    }

    render() {
        return (
            <section className="bar-search-container">
                <section className="search-container">
                    <input value={this.query} className="search-input" placeholder="Search for a media..." onFocus={() => this.showAutoSuggest()} onBlur={() => this.checkForBlur()} onChange={(ev) => this.handleTyping(ev)} />
                    <button className="search-button"><SearchIcon /></button>
                    {this.autoSuggest}
                </section>
            </section>
        )
    }
}