import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './PostInfoVK.scss';

class PostInfoVK extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(Object),
    likes: PropTypes.number,
    comments: PropTypes.number,
    reposts: PropTypes.number,
    text: PropTypes.string,
    views: PropTypes.number,
  };

  static defaultProps = {
    images: [],
    likes: 0,
    comments: 0,
    reposts: 0,
    text: '',
    views: 0,
  };

  render() {
    const {
      images, likes, comments, reposts, text, views,
    } = this.props;
    return (
      <div className="vk-post-info col-sm-6">
        <div className="vk-post-info__header">
          <div className="vk-post-info__logo" />
        </div>
        <div className="p-3">
          <pre>{text}</pre>
          <img
            src={images[0]}
            alt=""
          />
          <div className="vk-post-info__counters">
            <div className="vk-counters">
              <div className="vk-counters__icon vk-counters__icon_likes" />
              {(likes)
                ? (
                  <div className="vk-counters__count">
                    {likes}
                  </div>
                )
                : ''
              }
              {(comments)
                ? (
                  <React.Fragment>
                    <div className="vk-counters__icon vk-counters__icon_comment" />
                    <div className="vk-counters__count">
                      {comments}
                    </div>
                  </React.Fragment>
                )
                : ''
              }
              <div className="vk-counters__icon vk-counters__icon_share" />
              {(reposts)
                ? (
                  <div className="vk-counters__count">
                    {reposts}
                  </div>
                )
                : ''
              }
            </div>
            <div className="vk-post-info__views">
              {views}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostInfoVK;
