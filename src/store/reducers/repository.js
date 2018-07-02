import * as actionTypes from '../actions/actionTypes';
import utils from '../../services/utils';

const initialState = {
  repository: {},
  repositoryList: [],
  contributorList: [],
  favoritesIds: [],
  repositoryLoading: false,
  repositoryListLoading: false,
  contributorListLoading: false
};

/* Repository List */
const getRepositoryListStart = (state, action) => {
  return utils.updateObject(state, {
    repositoryListLoading: true
  });
};

const getRepositoryListSuccess = (state, action) => {
  return utils.updateObject(state, {
    repositoryList: action.repositoryList,
    repositoryListLoading: false
  });
};

const getRepositoryListFail = (state, action) => {
  return utils.updateObject(state, {
    repositoryListLoading: false
  });
};
/* Repository List End */


/* Repository */
const getRepositoryStart = (state, action) => {
  return utils.updateObject(state, {
    repositoryLoading: true
  });
};

const getRepositorySuccess = (state, action) => {
  return utils.updateObject(state, {
    repository: action.repository,
    repositoryLoading: false
  });
};

const getRepositoryFail = (state, action) => {
  return utils.updateObject(state, {
    repositoryLoading: false
  });
};
/* Repository End */

/* Contributor List */
const getContributorListStart = (state, action) => {
  return utils.updateObject(state, {
    contributorListLoading: true
  });
};

const getContributorListSuccess = (state, action) => {
  return utils.updateObject(state, {
    contributorList: action.contributorList,
    contributorListLoading: false
  });
};

const getContributorListFail = (state, action) => {
  return utils.updateObject(state, {
    contributorListLoading: false
  });
};

const emptyContributorList = (state, action) => {
  return utils.updateObject(state, {
    contributorList: []
  });
};
/* Contributor List End */

/* Favorites */
const updateFavoritesIds = (state, action) => {
  return utils.updateObject(state, {
    favoritesIds: action.favoritesIds
  });
};
/* Favorites End */


const repositoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actionTypes.GET_REPOSITORY_LIST_START: return getRepositoryListStart(state, action);
  case actionTypes.GET_REPOSITORY_LIST_SUCCESS: return getRepositoryListSuccess(state, action);
  case actionTypes.GET_REPOSITORY_LIST_FAIL: return getRepositoryListFail(state, action);

  case actionTypes.GET_REPOSITORY_START: return getRepositoryStart(state, action);
  case actionTypes.GET_REPOSITORY_SUCCESS: return getRepositorySuccess(state, action);
  case actionTypes.GET_REPOSITORY_FAIL: return getRepositoryFail(state, action);

  case actionTypes.GET_CONTRIBUTOR_LIST_START: return getContributorListStart(state, action);
  case actionTypes.GET_CONTRIBUTOR_LIST_SUCCESS: return getContributorListSuccess(state, action);
  case actionTypes.GET_CONTRIBUTOR_LIST_FAIL: return getContributorListFail(state, action);
  case actionTypes.EMPTY_CONTRIBUTOR_LIST: return emptyContributorList(state, action);

  case actionTypes.SET_FAVORITES_IDS: return updateFavoritesIds(state, action);
  default:
    return state;
  }
};

export default repositoryReducer;