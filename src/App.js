import React, { Component } from 'react';
import { Fragment } from 'redux-little-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './store/actions/index';
import Navigation from './components/Navigation/Navigation';
import RepositoryList from './containers/RepositoryList/RepositoryList';
import Repository from './containers/Repository/Repository';
import './App.css';


const exact = route => location => location.route === route;
const exactDepth = depth => location => {
  return location.route && (depth === location.route.split('/').length);
};

class App extends Component {

  componentDidMount() {
    this.props.onGetFavoriteIDs();
  }

  render() {
    const { favoritesIds } = this.props;

    return (
      <div className="App">
        <Navigation favoritesIds={favoritesIds} />
        <Fragment forRoute="/" withConditions={exact('/')}>
          <RepositoryList favoritesIds={favoritesIds} />
        </Fragment>
        <Fragment forRoute="/favorites" withConditions={exact('/favorites')}>
          <RepositoryList favoritesIds={favoritesIds} />
        </Fragment>
        <Fragment forRoute="/repository/:owner/:repo" withConditions={exactDepth(4)}>
          <Repository favoritesIds={favoritesIds} />
        </Fragment>
      </div>
    );
  }
}


const mapStateProps = state => {
  return {
    favoritesIds: state.repository.favoritesIds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetFavoriteIDs: (owner, repos) => dispatch(actions.getFavoriteIDs())
  };
};

App.propTypes = {
  favoritesIds: PropTypes.array,
  onGetFavoriteIDs: PropTypes.func
};

export default  connect(mapStateProps, mapDispatchToProps)(App);
