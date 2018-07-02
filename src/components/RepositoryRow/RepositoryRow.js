import React  from 'react';
import { Link } from 'redux-little-router';
import PropTypes from 'prop-types';
import './RepositoryRow.css';

const RepositoryRow = (props) => {
  const { repository } = props;

  return (
    <tr className="repository-row">
      <td className="uk-text-left avatar">
        <img src={repository.owner.avatar_url} alt="" />
      </td>

      <td className="uk-text-left">
        <p className="uk-text-bold">{repository.owner.login}</p>
      </td>

      <td className="uk-text-left">
        <a href={repository.html_url} target="_blank">{repository.name}</a>
      </td>

      <td className="uk-text-left">
        <p>{repository.description}</p>
      </td>

      <td className={'uk-text-right ' + ((props.favoritesIds.indexOf(repository.id) > -1) ? 'favorite' : '')}>
        <i className="fas fa-star" onClick={() => props.toggleFavorite(repository)}></i>
      </td>

      <td className="uk-text-right">
        <Link href={'/repository/' + repository.owner.login + '/' + repository.name} className="uk-button uk-button-primary uk-button-small">Details</Link>
      </td>
    </tr>
  );
};

RepositoryRow.propTypes = {
  repository: PropTypes.object,
  favoritesIds: PropTypes.array,
  toggleFavorite: PropTypes.func
};

export default  RepositoryRow;