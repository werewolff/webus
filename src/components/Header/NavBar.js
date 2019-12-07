import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux';
import translations from '../../translations/navbar.json';
import './NavBar.scss';

class NavBar extends PureComponent {
  static propTypes = {
    addTranslation: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    props.addTranslation(translations);
  }

  render() {
    const { children } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink to="/" className="navbar-brand">GIVEAWAY TIME</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#TogglerMainMenu"
          aria-controls="#TogglerMainMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="#TogglerMainMenu">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-link">
                <Translate id="navbar.main" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/random" activeClassName="active" className="nav-link">
                <Translate id="navbar.random" />
              </NavLink>
            </li>
          </ul>
          {children}
        </div>
      </nav>
    );
  }
}

export default withLocalize(NavBar);
