import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import Loadable from 'react-loadable';
import MainLayout from './layouts/MainLayout';
import configureStore from './store/configureStore';
import { META_DESC, META_KEYWORDS } from './Settings';
import Preloader from './components/Preloader/Preloader';

const store = configureStore();

// Кастомный роутер с указанием параметра layout
function RouteWL({
  layout,
  component,
  title,
  titleEN,
  desc,
  keywords,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => React.createElement(layout, {
        props,
        meta: {
          title, titleEN, desc, keywords,
        },
      }, React.createElement(component, props))
    }
    />
  );
}

const loadableOptions = {
  loading: Preloader,
  delay: 300,
};

const App = Loadable({
  loader: () => import('./containers/App'),
  ...loadableOptions,
});

const RandomPage = Loadable({
  loader: () => import('./components/RandomPage/RandomPage'),
  ...loadableOptions,
});

const Auth = Loadable({
  loader: () => import('./containers/Auth'),
  ...loadableOptions,
});

const NotFound404 = Loadable({
  loader: () => import('./components/NotFound404/NotFound404'),
  ...loadableOptions,
});

render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <BrowserRouter>
        <Switch>
          {/* MAIN */}
          <RouteWL
            exact
            path="/"
            component={App}
            layout={MainLayout}
            desc={META_DESC}
            keywords={META_KEYWORDS}
          />

          <RouteWL
            exact
            path="/random"
            component={RandomPage}
            layout={MainLayout}
            title="Случайное число"
            titleEN="Random number"
            desc={META_DESC}
            keywords={META_KEYWORDS}
          />

          {/* USER */}
          <RouteWL
            exact
            path="/user/settings"
            component={App}
            layout={MainLayout}
            title="Настройки"
            titleEN="Settings"
          />

          {/* AUTH */}
          <RouteWL
            exact
            path="/auth/:type"
            component={Auth}
            layout={MainLayout}
            title="Авторизация"
            titleEN="Authorization"
          />

          {/* NOT FOUND 404 */}
          <RouteWL
            component={NotFound404}
            layout={MainLayout}
            title="Страница не найдена"
            titleEN="Page not found"
          />
        </Switch>
      </BrowserRouter>
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root'),
);
