/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import './LanguageToggle.scss';
import ru from '../../img/languageToggle/ru.png';
import en from '../../img/languageToggle/en.png';

class LanguageToggle extends PureComponent {
  static propTypes = {
    setActiveLanguage: PropTypes.func.isRequired,
    activeLanguage: PropTypes.objectOf(String),
    languages: PropTypes.arrayOf(Object).isRequired,
  };

  static defaultProps = {
    activeLanguage: {},
  };

  constructor(props) {
    super(props);
    this.changeLanguage = ::this.changeLanguage;
  }

  changeLanguage(code) {
    const { setActiveLanguage } = this.props;
    setActiveLanguage(code);
    window.localStorage.setItem('language', code);
  }

  render() {
    const { languages, activeLanguage } = this.props;
    const flags = [ru, en];
    return (
      languages.map(lang => (lang.code === activeLanguage.code ? '' : (
        <img
          key={lang.code}
          alt=""
          className="language"
          src={flags.map(flag => (lang.code === flag.substr(-6, 2) ? flag : '')).join('')}
          onClick={() => this.changeLanguage(lang.code)}
        />
      )))
    );
  }
}

export default withLocalize(LanguageToggle);
