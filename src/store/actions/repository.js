import reposApi from '../../services/api';
import utils from '../../services/utils';
import UIkit from 'uikit';

import * as actionTypes from './actionTypes';


/* Repository List */
const processRepositoryList = (data, getState) => {
  const repositoryList = data;
  const pathname = (getState().router && getState().router.pathname) || '';
  let repoList = [];
  if(pathname && (pathname === '/favorites')) {
    let favoritesIds = utils.getDataFromStorage('GIT_REPOS_favorites') || [];
    for(let i=0; i<repositoryList.length; i++) {
      if(favoritesIds.indexOf(repositoryList[i].id) > -1) {
        repoList.push(repositoryList[i]);
      }
    }
  } else {
    repoList = repositoryList;
  }

  return repoList;
};

const getRepositoryListStart = () => {
  return {
    type: actionTypes.GET_REPOSITORY_LIST_START
  };
};

const getRepositoryListSuccess = (repositoryList) => {
  return {
    type: actionTypes.GET_REPOSITORY_LIST_SUCCESS,
    repositoryList
  };
};

const getRepositoryListFail = () => {
  return {
    type: actionTypes.GET_REPOSITORY_LIST_FAIL
  };
};

export const getRepositoryList = () => {
  return (dispatch, getState) => {
    dispatch(getRepositoryListStart());
    reposApi.getRepositoryList()
      .then(response => {
        if(response.data) {
          dispatch(getRepositoryListSuccess(processRepositoryList(response.data, getState)));
        } else {
          dispatch(getRepositoryListFail());
          UIkit.notification({
            message: 'Something went wrong fetching data',
            status: 'warning',
            timeout: 2000
          });
        }
      })
      .catch(error => {
        dispatch(getRepositoryListFail());
        UIkit.notification({
          message: 'Something went wrong fetching data',
          status: 'warning',
          timeout: 2000
        });
      });
  };
};

/* Favorites */
const updateFavoriteIds = (favoritesIds) => {
  return {
    type: actionTypes.SET_FAVORITES_IDS,
    favoritesIds
  };
};

export const getFavoriteIDs = () => {
  const favoritesIds = utils.getDataFromStorage('GIT_REPOS_favorites') || [];

  return (dispatch, getState) => {
    dispatch(updateFavoriteIds(favoritesIds));

  };
};

export const toggleFavorite = (repository) => {
  let favoritesIds = utils.getDataFromStorage('GIT_REPOS_favorites') || [];
  const index = favoritesIds.indexOf(repository.id);
  if (index > -1) {
    favoritesIds.splice(index, 1);
  } else {
    favoritesIds.push(repository.id);
  }

  utils.setDataToStorage('GIT_REPOS_favorites', favoritesIds);
  return (dispatch, getState) => {
    let repositoryList = (getState().repository && getState().repository.repositoryList) || [];
    dispatch(getRepositoryListSuccess(processRepositoryList(repositoryList, getState)));
    dispatch(updateFavoriteIds(favoritesIds));

  };
};
/* Favorites End */
/* Repository List End */

/* Repository */
const getRepositoryStart = () => {
  return {
    type: actionTypes.GET_REPOSITORY_START
  };
};

const getRepositorySuccess = (repository) => {
  return {
    type: actionTypes.GET_REPOSITORY_SUCCESS,
    repository
  };
};

const getRepositoryFail = () => {
  return {
    type: actionTypes.GET_REPOSITORY_FAIL
  };
};

export const getRepository = (owner, repos) => {
  return (dispatch, getState) => {
    dispatch(getRepositoryStart());
    reposApi.getRepository(owner, repos)
      .then(response => {
        if(response.data) {
          dispatch(getRepositorySuccess(response.data));
        } else {
          dispatch(getRepositoryFail());
          UIkit.notification({
            message: 'Something went wrong fetching data',
            status: 'warning',
            timeout: 2000
          });
        }
      })
      .catch(error => {
        dispatch(getRepositoryFail());
        UIkit.notification({
          message: 'Something went wrong fetching data',
          status: 'warning',
          timeout: 2000
        });
      });
  };
};
/* Repository End */

/* Contributor List */
const getContributorListStart = () => {
  return {
    type: actionTypes.GET_CONTRIBUTOR_LIST_START,
    contributorList: []
  };
};

const getContributorListSuccess = (contributorList) => {
  return {
    type: actionTypes.GET_CONTRIBUTOR_LIST_SUCCESS,
    contributorList
  };
};

const getContributorListFail = () => {
  return {
    type: actionTypes.GET_CONTRIBUTOR_LIST_FAIL,
    contributorList: []
  };
};

const emptyContributorList = () => {
  return {
    type: actionTypes.EMPTY_CONTRIBUTOR_LIST,
    contributorList: []
  };
};

export const getContributorList = (owner, repos) => {
  return (dispatch, getState) => {
    dispatch(getContributorListStart());
    reposApi.getRepositoryContributors(owner, repos)
      .then(response => {
        if(response.data) {
          dispatch(emptyContributorList());
          for(let i=0; i<response.data.length; i++) {
            reposApi.getUserDetails(response.data[i].url)
              .then(resp => {
                if(resp.data) {
                  const contributorList = getState().repository.contributorList;
                  let contributors = [...contributorList];
                  contributors.push(resp.data);
                  dispatch(getContributorListSuccess(contributors));
                } else {
                  dispatch(getContributorListFail());
                  UIkit.notification({
                    message: 'Something went wrong fetching data',
                    status: 'warning',
                    timeout: 2000
                  });
                }
              })
              .catch(error => {
                dispatch(getContributorListFail());
                UIkit.notification({
                  message: 'Something went wrong fetching data',
                  status: 'warning',
                  timeout: 2000
                });
              });
          }
        }
      })
      .catch(error => {
        dispatch(getContributorListFail());
        UIkit.notification({
          message: 'Something went wrong fetching data',
          status: 'warning',
          timeout: 2000
        });
      });
  };
};
/* Contributor List End */