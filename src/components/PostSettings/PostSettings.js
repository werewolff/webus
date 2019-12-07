import React, { PureComponent } from 'react';
import './PostSettings.scss';

class PostSettings extends PureComponent {
  render() {
    return (
      <div className="post-settings col-sm-3">
        <div className="row justify-content-center">
          <div className="col text-center pt-2">
            <h5>Settings</h5>
          </div>
        </div>
        <hr />
        <p>Choose from:</p>
        <div className="form-group row align-items-center">
          <label className="col-3 col-sm-6" htmlFor="likes">Likes: </label>
          <div className="col">
            <input className="toggle" id="likes" type="checkbox" />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label className="col-3 col-sm-6" htmlFor="comments">Comments: </label>
          <div className="col">
            <input className="toggle" id="comments" type="checkbox" />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label className="col-3 col-sm-6" htmlFor="share">Share: </label>
          <div className="col">
            <input className="toggle" id="share" type="checkbox" />
          </div>
        </div>
        <hr />
        <p>Check in:</p>
        <div className="form-group row align-items-center">
          <label className="col-3 col-sm-6" htmlFor="check-likes">Likes: </label>
          <div className="col">
            <input className="toggle" id="check-likes" type="checkbox" />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label className="col-3 col-sm-6" htmlFor="followers">Followers: </label>
          <div className="col">
            <input className="toggle" id="followers" type="checkbox" />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label className="col-3 col-sm-6" htmlFor="check-share">Share: </label>
          <div className="col">
            <input className="toggle" id="check-share" type="checkbox" />
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <button type="button" className="btn-small">GO!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostSettings;
