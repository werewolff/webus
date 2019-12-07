import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import translations from '../../translations/postInfoIG.json';
import './PostInfoIG.scss';

class PostInfoIG extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(Object),
    likes: PropTypes.number,
    text: PropTypes.string,
    activeLanguage: PropTypes.objectOf(String),
    addTranslation: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    images: [],
    likes: 0,
    text: '',
    activeLanguage: {},
  };

  constructor(props) {
    super(props);
    props.addTranslation(translations);
  }

  render() {
    const {
      images, likes, text, activeLanguage, translate,
    } = this.props;
    const { code } = activeLanguage;
    let likesText = translate('postInfoIG.likesCount');
    if (likes > 1) {
      if (code === 'en') likesText += 's';
      if (code === 'ru') {
        likesText = likesText.replace('ка', 'ок');
      }
    }
    return (

      <div className="ig-post-info col-sm-6">
        <div className="ig-post-info__header">
          <div className="ig-post-info__logo">
            <span />
            <div />
            <span />
          </div>
        </div>
        <div className="ig-post-info__img">
          <img
            src={images[0]}
            alt=""
          />
        </div>
        <div className="ig-post-info__body">
          <div className="ig-post-info__icons">
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
          </div>
          <div className="ig-post-info__likes">
            <span>{`${likes} `}</span>
            {likesText}
          </div>
          <pre>
            {text}
          </pre>
        </div>
      </div>
    );
  }
}

export default withLocalize(PostInfoIG);
