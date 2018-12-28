import React from 'react';
import ResultItem from './ResultItem';
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class ResultLibrary extends React.Component {
  @observable libraryElement = React.createRef();

  attachScrollHandler() {
    this.libraryElement.current.addEventListener('mousewheel', ev => this.libraryElement.current.scrollOffset += 60);
  }

  componentDidMount() {
    this.attachScrollHandler();
  }

  render() {
    return (
      <section className="library" ref={this.libraryElement}>
        <Typography variant="h4" className="title">{this.props.name}</Typography>
        <div className="animes">
          {this.props.animes.map(anime => <ResultItem {...anime} key={anime.name} />)}
        </div>
      </section>
    );
  }
}