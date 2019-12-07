/* eslint-disable sonarjs/no-small-switch */
import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTranslation, getTranslate } from 'react-localize-redux';
import translations from '../translations/auth.json';
import { DOMAIN_URL, TYPE_HTTP } from '../Settings';
import getParamsURI from '../utils/URI';
import * as authActions from '../actions/AuthActions';
import { createNotification } from '../actions/NotifyActions';
import { NOTIFICATION_TYPE_ERROR } from '../constants/notify';
import Preloader from '../components/Preloader/Preloader';

class Auth extends PureComponent {
  static propTypes = {
    auth: PropTypes.shape({
      authError: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    authActions: PropTypes.shape({
      authVK: PropTypes.func.isRequired,
      authIG: PropTypes.func.isRequired,
      createError: PropTypes.func.isRequired,
      clearError: PropTypes.func.isRequired,
    }).isRequired,
    addTranslation: PropTypes.func.isRequired,
  };

  static redirectToBack() {
    const locationAuth = window.localStorage.getItem('locationAuth');
    if (!!locationAuth && /^\/[\w/]+$/.test(locationAuth)) {
      window.localStorage.removeItem('locationAuth');
      window.location = TYPE_HTTP + DOMAIN_URL + locationAuth;
    } else {
      window.location = TYPE_HTTP + DOMAIN_URL;
    }
  }

  constructor(props) {
    super(props);
    // Получаем данные URL
    this.params = getParamsURI();
    props.addTranslation(translations);
    Auth.redirectToBack = ::Auth.redirectToBack;
    this.createNotifyError = ::this.createNotifyError;
  }

  componentDidMount() {
    const PARAMS = this.params;
    const { props } = this;
    const { match } = props;
    const {
      authVK, authIG, createError,
    } = props.authActions;
    // Проверяем есть ли параметры с Роутера
    if (match) {
      // Проверяем есть ли параметр code в URL
      if (PARAMS.code) {
        // В соответствии с параметром из Роутера /auth/{type} выполняем нужную авторизацию
        switch (match.params.type) {
          case 'vk':
            authVK(PARAMS.code, Auth.redirectToBack);
            break;
          case 'ig':
            authIG(PARAMS.code, Auth.redirectToBack);
            break;
          default:
            // Редирект если не указан тип авторизации в URL
            Auth.redirectToBack();
        }
      }
      if (PARAMS.error) {
        createError();
      }
    }
  }

  componentDidUpdate() {
    const { props } = this;
    const { authError } = props.auth;
    const { clearError } = props.authActions;
    if (authError) {
      switch (authError) {
        case 'csrf':
          this.createNotifyError(authError);
          break;
        default:
          this.createNotifyError();
      }
      clearError();
    }
  }

  createNotifyError(errorType = 'default') {
    const { props } = this;
    props.createNotification({
      header: props.translate('auth.error.header'),
      message: props.translate(`auth.error.${errorType}`),
      type: NOTIFICATION_TYPE_ERROR,
    });
  }

  render() {
    const { props } = this;
    const { loading } = props.auth;
    return (
      (loading) ? <Preloader message={props.translate('auth.preloaderMessage')} /> : null
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    translate: getTranslate(state.localize),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    createNotification: (config) => {
      dispatch(createNotification(config));
    },
    addTranslation: translate => dispatch(addTranslation(translate)),
  };
}

export default hot(connect(mapStateToProps, mapDispatchToProps)(Auth));
