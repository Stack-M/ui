import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Redirect } from 'react-router-dom';

@observer
export default class NewPageBarSearch extends React.Component {
  @observable redirect = false;
  @observable inputRef = React.createRef();

  moveToSearchPage() {
    if(window.location.pathname !== "/search") this.redirect = true;
  }

  focusIfSearchPage() {
    if(window.location.pathname === "/search") {
      this.inputRef.current.focus();
    }
  }

  componentDidMount() {
    this.focusIfSearchPage();
  }

  render() {
    return (
      <section className="bar-search-container">
        {this.redirect && <Redirect to="/search" />}
        <section className="search-container">
          <input ref={this.inputRef} className="search-input" placeholder="Search for a media..." onFocus={() => this.moveToSearchPage()} onChange={this.props.onChange} />
          <button className="search-button"><SearchIcon /></button>
        </section>
      </section>
    )
  }
}