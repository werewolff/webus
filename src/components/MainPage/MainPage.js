import React, { PureComponent } from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import translations from '../../translations/mainPage.json';
import InputPH from '../primitives/InputPH/InputPH';
import PostInfoVK from '../PostInfo/PostInfoVK';
import PostInfoIG from '../PostInfo/PostInfoIG';
import { getCookie } from '../../utils/Cookie';
import { COOKIE_TOKEN_NAME, IG_HREF, VK_HREF } from '../../Settings';
import './MainPage.scss';
import PostSettings from '../PostSettings/PostSettings';

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputPostValue: '',
      token: '',
      typePost: '',
      feedback: '',
      feedbackType: '',
      feedbackStyle: {},
    };
    const { addTranslation } = this.props;
    addTranslation(translations);
    this.inputPost = React.createRef();
    this.regexURL = /^(http:\/\/|https:\/\/)*(www\.)*(instagram|vk)\.com\/[\w#%&\-./:=?]+$/i;
    this.onChangeInputURL = ::this.onChangeInputURL;
  }

  componentDidMount() {
    const postURL = window.localStorage.getItem('postURL');
    this.setState({ token: getCookie(COOKIE_TOKEN_NAME) });
    if (!!postURL && this.regexURL.test(postURL)) {
      this.setState({ inputPostValue: postURL });
      window.localStorage.removeItem('postURL');
    }
  }

  onChangeInputURL(e) {
    let { value } = e.target;
    if (value.length >= 150) {
      value = value.slice(0, 150);
      this.setState({ inputPostValue: value });
    }
    this.setState({ inputPostValue: value });
    this.getDataPost(value);
  }

  getDataPost(value) {
    const { translate, getDataPost } = this.props;
    const { token } = this.state;
    if (value.length > 7) {
      if (this.regexURL.test(value)) {
        this.setState({ feedbackStyle: { opacity: 0 } });
        if (token) {
          this.setState({ typePost: value.match(/instagram.com|vk.com/i) });
          getDataPost(value, token);
        } else {
          const typeAuth = value.match(/instagram.com|vk.com/i);
          window.localStorage.setItem('postURL', value);
          switch (typeAuth[0]) {
            case 'vk.com':
              document.location = VK_HREF;
              break;
            case 'instagram.com':
              document.location = IG_HREF;
              break;
            default:
              break;
          }
        }
      } else {
        this.crearDataPost();
        this.setState({
          feedback: translate('mainPage.error.invalidURI'),
          feedbackType: 'invalid-feedback',
          feedbackStyle: { opacity: 1 },
        });
      }
    } else {
      this.crearDataPost();
      this.setState({ feedbackStyle: { opacity: 0 } });
    }
  }

  crearDataPost() {
    const { dataPost, clearDataPost } = this.props;
    if (dataPost !== null && !!dataPost.post_id) {
      clearDataPost();
    }
  }

  render() {
    const { dataPost, loading } = this.props;
    const {
      inputPostValue,
      typePost,
      feedback,
      feedbackType,
      feedbackStyle,
    } = this.state;
    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-giveaway col">
            <div className="row justify-content-center">
              <div className="col-auto">
                <InputPH
                  loading={loading}
                  placeholder={<Translate id="mainPage.placeholderInputURI" />}
                  inputParams={{
                    type: 'text',
                    value: inputPostValue,
                    ref: this.inputPost,
                    autoComplete: 'off',
                    required: 'required',
                  }}
                  inputEvents={{
                    onChange: this.onChangeInputURL,
                  }}
                  feedback={feedback}
                  feedbackType={feedbackType}
                  feedbackStyle={feedbackStyle}
                />
              </div>
            </div>
            <ReactCSSTransitionGroup
              component={React.Fragment}
              transitionName={{
                enter: 'post-info__enter',
                leave: 'post-info__leave',
              }}
              transitionEnterTimeout={100}
              transitionLeaveTimeout={1000}
            >
              {(dataPost !== null && !!dataPost.post_id && !!typePost[0])
                ? (
                  <div className="wrapper-post-info row flex-sm-row-reverse">
                    <PostSettings />
                    {(typePost[0] === 'vk.com')
                      ? <PostInfoVK {...dataPost} />
                      : <PostInfoIG {...dataPost} />
                    }
                  </div>
                )
                : ''
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withLocalize(MainPage);
