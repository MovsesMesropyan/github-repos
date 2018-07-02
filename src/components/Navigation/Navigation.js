import React from 'react';
import { Link } from 'redux-little-router';
import PropTypes from 'prop-types';

import './Navigation.css';


const Navigation = (props) => {

  return (
    <div className="uk-sticky uk-sticky-fixed navigation-container" >
      <nav className="uk-navbar-container uk-navbar-transparent uk-container">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li><Link href="/" activeProps={{className: 'active'}}>Repositories</Link></li>
            <li><Link href="/favorites" activeProps={{className: 'active'}}>Favorites</Link></li>
          </ul>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/favorites">
                <span className={'favorite-wrapper ' + ((props.favoritesIds.length > 0) ? 'active' : '')}>
                  {(props.favoritesIds.length > 0) ? <span className="favorite-count">{props.favoritesIds.length}</span> : null}
                  <i className="fas fa-star"></i>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

Navigation.propTypes = {
  favoritesIds: PropTypes.array
};

export default Navigation;