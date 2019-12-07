import React, { Fragment, PureComponent } from 'react';
import { withLocalize } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import globalTranslations from '../translations/global.json';
import '../styles/scss/app.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../containers/Header';
import { META_TITLE } from '../Settings';
import Notify from '../containers/Notify/Notify';

class MainLayout extends PureComponent {
  static propTypes = {
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.element.isRequired,
    // eslint-disable-next-line react/require-default-props
    activeLanguage: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]),
    ),
    // eslint-disable-next-line react/require-default-props
    initialize: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const languages = [
      { name: 'Русский', code: 'ru' },
      { name: 'English', code: 'en' },
    ];
    const defaultLanguage = window.localStorage.getItem('language') || languages[0].code;
    const { initialize } = this.props;
    initialize({
      languages,
      translation: globalTranslations,
      options: {
        defaultLanguage,
        renderToStaticMarkup,
      },
    });
  }

  render() {
    const { meta, children, activeLanguage } = this.props;
    if (!!meta.title && !!activeLanguage) {
      const activeLang = activeLanguage.code;
      document.title = (activeLang === 'en')
        ? `${meta.titleEN} | ${META_TITLE}`
        : `${meta.title} | ${META_TITLE}`;
    }
    if (meta.desc) {
      document.querySelector('meta[name="description"]').setAttribute('content', meta.desc);
    }
    if (meta.keywords) {
      document.querySelector('meta[name="keywords"]').setAttribute('content', meta.keywords);
    }
    return (
      <Fragment>
        <header>
          <Header />
        </header>
        <section>
          <Notify />
          {children}
        </section>
        <footer>
          <div className="text-center">
            <h1>FOOTER</h1>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default withLocalize(MainLayout);
