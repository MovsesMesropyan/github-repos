import axios from 'axios';

const reposApi = {
  getRepositoryList: () => {
    return axios.get('https://api.github.com/repositories');
  },

  getRepository: (owner, repo) => {
    return axios.get(`https://api.github.com/repos/${owner}/${repo}`);
  },

  getRepositoryContributors: (owner, repo) => {
    return axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
  },

  getUserDetails: (url) => {
    return axios.get(url);
  }
};

export default reposApi;