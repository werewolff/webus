import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainPage from '../components/MainPage/MainPage';
import * as mainPageActions from '../actions/MainPageActions';
import { createNotification } from '../actions/NotifyActions';

class App extends PureComponent {
  render() {
    const { props } = this;
    return (
      <MainPage
        {...props.mainPageActions}
        {...props.mainPage}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    mainPage: state.mainPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mainPageActions: bindActionCreators(mainPageActions, dispatch),
    createNotification: (config) => {
      dispatch(createNotification(config));
    },
  };
}

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
