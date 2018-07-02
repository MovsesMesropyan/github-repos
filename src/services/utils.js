const utility = {

  setDataToStorage: (key, value) => {
    localStorage[key] = JSON.stringify(value);
  },

  getDataFromStorage: (key) => {
    return localStorage[key] ? JSON.parse(localStorage[key]) : null;
  },

  deleteDataFromStorage: (key) => {
    localStorage.removeItem(key);
  },

  updateObject: (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
  },

  sortBy: (repositoryList, sortBy, orderBy) => {
    return repositoryList.sort((_a, _b) => {
      let a, b;

      a = _a[sortBy] || 0;
      b = _b[sortBy] || 0;
      return (a - b) * orderBy;
    });
  }
};

export default utility;