import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import translations from '../../translations/notFound404.json';
import './NotFound404.scss';

class NotFound404 extends PureComponent {
  static propTypes = {
    addTranslation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    props.addTranslation(translations);
  }

  render() {
    return (
      <div className="row align-items-center justify-content-center h-100">
        <div className="page-not-found col-auto">
          <p><Translate id="notFound404.message" /></p>
        </div>
      </div>
    );
  }
}

export default withLocalize(NotFound404);
