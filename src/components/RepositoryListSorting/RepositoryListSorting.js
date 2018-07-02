import React  from 'react';
import PropTypes from 'prop-types';

import './RepositoryListSorting.css';

const RepositoryListSorting = (props) => {
  return (
    <div className="sort-by-wrapper uk-clearfix">
      <div className="sort-title">
        Sort by:
      </div>
      <div className={props.sortBy === 'id' ? 'active' : null} onClick={() => props.onSortBy('id')}>
        Id <i className={'fas ' + ((props.orderBy === 1) ? 'fa-arrow-down' : 'fa-arrow-up')} aria-hidden="true"></i>
      </div>
    </div>
  );
};

RepositoryListSorting.propTypes = {
  sortBy: PropTypes.string,
  orderBy: PropTypes.number,
  onSortBy: PropTypes.func
};

export default RepositoryListSorting;