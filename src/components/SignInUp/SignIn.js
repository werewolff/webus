/* eslint-disable sonarjs/no-small-switch,default-case,camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import translations from '../../translations/signIn.json';
import { COOKIE_TOKEN_NAME, IG_HREF, VK_HREF } from '../../Settings';
import { getCookie } from '../../utils/Cookie';
import './SignIn.scss';
import imgVK from '../../img/auth/vk.png';
import imgIG from '../../img/auth/ig.png';
import { NOTIFICATION_TYPE_ERROR } from '../../constants/notify';
import Skeleton from '../Skeleton/Skeleton';

class SignIn extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      full_name: PropTypes.string,
      profile_picture: PropTypes.string,
    }),
    loading: PropTypes.bool.isRequired,
    getUserError: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    getUser: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired,
    addTranslation: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
    getUserError: null,
  };

  static redirectToAuth(e) {
    e.preventDefault();
    const authType = e.currentTarget.getAttribute('auth-type');
    if (/^\/[\w\-/]+$/.test(window.location.pathname)) {
      window.localStorage.setItem('locationAuth', window.location.pathname);
    }
    switch (authType) {
      case 'vk':
        document.location = VK_HREF;
        break;
      case 'ig':
        document.location = IG_HREF;
        break;
    }
  }

  constructor(props) {
    super(props);
    this.token = getCookie(COOKIE_TOKEN_NAME);
    props.addTranslation(translations);
    SignIn.redirectToAuth = ::SignIn.redirectToAuth;
    this.getUser = ::props.getUser;
    this.logOut = ::props.logOut;
    this.createNotifyError = ::this.createNotifyError;
  }

  componentDidMount() {
    const { user, getUserError } = this.props;
    const { username } = user;
    if (!!this.token && !username && !getUserError) {
      // Если есть токен и нет данных о пользователе, то выполняем запрос данных пользователя
      this.getUser(this.token);
    }
  }

  componentDidUpdate() {
    // Обработка ошибок
    const { getUserError, clearError, translate } = this.props;
    if (getUserError) {
      if (getUserError.error) {
        switch (getUserError.error) {
          case 504:
            this.createNotifyError(translate('signIn.error.504'));
            clearError();
            break;
          default:
            this.createNotifyError(translate('signIn.error.default'));
            clearError();
        }
      } else {
        this.createNotifyError(translate('signIn.error.default'));
        clearError();
      }
    }
  }

  createNotifyError(message) {
    const { createNotification, translate } = this.props;
    createNotification({
      header: translate('signIn.error.header'),
      message,
      type: NOTIFICATION_TYPE_ERROR,
    });
  }

  render() {
    const { user, loading } = this.props;
    const { username, full_name, profile_picture } = user;
    // eslint-disable-next-line no-mixed-operators
    if (!!username && !!this.token || loading) {
      // Возвращаем блок авторизации если есть токен и данные о пользователе
      return (
        <div className="user_block">
          <figure>
            {loading
              ? (
                <Skeleton
                  circle
                  width={40}
                  height={40}
                />
              )
              : (
                <img
                  src={profile_picture}
                  className="dropdown-toggle"
                  id="profileDropDown"
                  alt=""
                  data-toggle="dropdown"
                />
              )
            }
            <figcaption>
              {loading
                ? (
                  <Skeleton
                    width={100}
                  />
                )
                : (
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      id="profileDropDown"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <b>{full_name}</b>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="profileDropDown"
                    >
                      <Link to="/user/settings">
                        <Translate id="signIn.user.settings" />
                      </Link>
                      <div className="dropdown-divider" />
                      <a href="" onClick={::this.logOut}>
                        <Translate id="signIn.user.exit" />
                      </a>
                    </div>
                  </div>
                )
              }
            </figcaption>
          </figure>
        </div>
      );
    }

    return (
      <Translate>
        {({ translate }) => (
          <div className="sign_in">
            <ul>
              <li>
                <a
                  href=""
                  title={translate('signIn.auth.linkVK.title')}
                  auth-type="vk"
                  onClick={SignIn.redirectToAuth}
                >
                  <img src={imgVK} alt="" />
                </a>
              </li>
              <li>
                <a
                  href=""
                  title={translate('signIn.auth.linkIG.title')}
                  auth-type="ig"
                  onClick={SignIn.redirectToAuth}
                >
                  <img src={imgIG} alt="" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </Translate>
    );
  }
}

export default withLocalize(SignIn);
