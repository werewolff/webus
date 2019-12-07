import { hot } from 'react-hot-loader/root';
import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/UserActions';
import NavBar from '../components/Header';
import SignInUp from '../components/SignInUp';
import { createNotification } from '../actions/NotifyActions';
import LanguageToggle from '../components/LanguageToggle/LanguageToggle';

class Header extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      user: PropTypes.object,
      getUserError: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      loading: PropTypes.bool.isRequired,
    }),
  };

  static defaultProps = {
    user: {
      user: null,
      getUserError: null,
      loading: false,
    },
  };

  render() {
    const { props } = this;
    return (
      <NavBar>
        <Fragment>
          <LanguageToggle />
          <SignInUp
            {...props.user}
            {...props.userActions}
            createNotification={props.createNotification}
          />
        </Fragment>
      </NavBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    createNotification: (config) => {
      dispatch(createNotification(config));
    },
  };
}

export default hot(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));
