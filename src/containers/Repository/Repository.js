import React, { Component } from 'react';
import { goBack } from 'redux-little-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import ContributorRow from '../../components/ContributorRow/ContributorRow';
import * as actions from '../../store/actions/index';
import './Repository.css';

class Repository extends Component {

  componentDidMount() {
    const pathname = this.props.router.pathname;
    const params = pathname.split('/');
    const owner = params[2], repo = params[3];
    this.props.onGetRepository(owner, repo);
    this.props.onGetContributorList(owner, repo);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.repository && nextProps.repository.owner) {
      document.title = nextProps.repository.owner.login || 'Repositories';
    }
  }

  back = () => {
    this.props.onGoBack();
  };

  render() {
    const {
      repository,
      favoritesIds,
      contributorList,
      repositoryLoading,
      contributorListLoading,
      onToggleFavorite
    } = this.props;
    let rows = [];

    if (contributorList.length) {
      rows = contributorList.map((contributor, i) => {
        return <ContributorRow key={contributor.id} contributor={contributor} />;
      });
    }

    return (
      <div className="uk-container repository">
        {(repositoryLoading || contributorListLoading) ?
          <div className="uk-text-center"><span data-uk-spinner=""></span></div> :
          <div>
            {repository.id ?
              <div>
                <div className={'header ' + ((repository && repository.id && (favoritesIds.indexOf(repository.id) > -1)) ? 'favorite' : '')}>
                  <h1>{repository.owner && repository.owner.login}</h1>
                  <i className="fas fa-star" onClick={() => onToggleFavorite(repository)}></i>
                </div>
                <div className="sub-header">
                  <p><span className="uk-text-bold">Created At: </span>{moment(repository.created_at).format('DD.MM.YYYY')}</p>
                  {repository.updated_at ? <p><span className="uk-text-bold">Updated At: </span>{moment(repository.updated_at).format('DD.MM.YYYY')}</p> : null}
                  <p><span className="uk-text-bold">Description: </span>{repository.description}</p>
                </div>
                <h3>Contributors List</h3>
                {contributorList.length ?
                  <table className="uk-table uk-table-small uk-table-justify">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="uk-text-left">Name</th>
                        <th className="uk-text-left">Login</th>
                        <th className="uk-text-right">Repositories</th>
                        <th className="uk-text-right">Followers</th>
                        <th className="uk-text-right">Following</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </table> :
                  <div className="uk-text-center"><p>List is empty</p></div>}
              </div> :
              <div>
                <p>Repository not found</p>
              </div>}
            <div className="uk-text-right">
              <button className="uk-button uk-button-primary uk-button-small" onClick={this.back}>Back</button>
            </div>
          </div>}
      </div>
    );
  };
}

const mapStateProps = state => {
  return {
    router: state.router,
    favoritesIds:  state.repository.favoritesIds,
    repository: state.repository.repository,
    contributorList: state.repository.contributorList,
    repositoryLoading: state.repository.repositoryLoading,
    contributorListLoading: state.repository.contributorListLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRepository: (owner, repos) => dispatch(actions.getRepository(owner, repos)),
    onGetContributorList: (owner, repos) => dispatch(actions.getContributorList(owner, repos)),
    onToggleFavorite: (repository) => dispatch(actions.toggleFavorite(repository)),
    onGoBack: () => dispatch(goBack())
  };
};

Repository.propTypes = {
  router: PropTypes.object,
  favoritesIds: PropTypes.array,
  repository: PropTypes.object,
  contributorList: PropTypes.array,
  repositoryLoading: PropTypes.bool,
  contributorListLoading: PropTypes.bool,
  onGetRepository: PropTypes.func,
  onGetContributorList: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  onGoBack: PropTypes.func
};

export default  connect(mapStateProps, mapDispatchToProps)(Repository);