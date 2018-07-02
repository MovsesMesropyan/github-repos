import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RepositoryRow from '../../components/RepositoryRow/RepositoryRow';
import RepositoryListSorting from '../../components/RepositoryListSorting/RepositoryListSorting';
import * as actions from '../../store/actions/index';
import utils from '../../services/utils';
import './RepositoryList.css';


class RepositoryList extends Component {
  state = {
    sortBy: 'id',
    orderBy: 1
  };

  componentDidMount() {
    document.title = 'Repositories';
    this.props.onGetRepositoryList();
  }

  onSortBy = sortBy => {
    let orderBy = (this.state.sortBy === sortBy) ? (-1) * this.state.orderBy : 1;
    this.setState({sortBy, orderBy});
  };

  render() {
    const {
      router,
      favoritesIds,
      repositoryList,
      repositoryListLoading,
      onToggleFavorite
    } = this.props;
    const { sortBy, orderBy } = this.state;
    let rows = [];

    if(repositoryList.length) {
      utils.sortBy(repositoryList, sortBy, orderBy);

      rows = repositoryList.map((repository, i) => {
        return <RepositoryRow key={repository.id} repository={repository} favoritesIds={favoritesIds} toggleFavorite={onToggleFavorite} />;
      });
    }

    return (
      <div className="uk-container repository-list">
        <h1>{(router.pathname === '/favorites') ? 'Favorite' : 'Repository'} List</h1>
        {repositoryListLoading ?
          <div className="uk-text-center"><span data-uk-spinner=""></span></div> : repositoryList.length ?
            <div>
              <RepositoryListSorting onSortBy={this.onSortBy} sortBy={sortBy} orderBy={orderBy} />
              <table className="uk-table uk-table-small uk-table-justify">
                <thead>
                  <tr>
                    <th></th>
                    <th className="uk-text-left">Name</th>
                    <th className="uk-text-left">Repo Name</th>
                    <th className="uk-text-left">Description</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div> :
            <div className="uk-text-center"><p>List is empty</p></div>}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    router: state.router,
    repositoryList: state.repository.repositoryList,
    repositoryListLoading: state.repository.repositoryListLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRepositoryList: () => dispatch(actions.getRepositoryList()),
    onToggleFavorite: (repository) => dispatch(actions.toggleFavorite(repository))
  };
};

RepositoryList.propTypes = {
  router: PropTypes.object,
  favoritesIds: PropTypes.array,
  repositoryList: PropTypes.array,
  repositoryListLoading: PropTypes.bool,
  onGetRepositoryList: PropTypes.func,
  onToggleFavorite: PropTypes.func
};

export default  connect(mapStateToProps, mapDispatchToProps)(RepositoryList);