import React  from 'react';
import PropTypes from 'prop-types';

const ContributorRow = (props) => {
  const { contributor } = props;

  return (
    <tr>
      <td className="uk-text-left avatar">
        <img src={contributor.avatar_url} alt="" />
      </td>

      <td className="uk-text-left">
        <a href={contributor.html_url} target="_blank">{contributor.name}</a>
      </td>

      <td className="uk-text-left">
        <p>{contributor.login}</p>
      </td>

      <td className="uk-text-right">
        <p>{contributor.public_repos || 0}</p>
      </td>

      <td className="uk-text-right">
        <p>{contributor.followers || 0}</p>
      </td>

      <td className="uk-text-right">
        <p>{contributor.following || 0}</p>
      </td>
    </tr>
  );
};

ContributorRow.propTypes = {
  contributor: PropTypes.object
};

export default  ContributorRow;