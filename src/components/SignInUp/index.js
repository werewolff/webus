import React, { PureComponent } from 'react';
import SignIn from './SignIn';

export default class SignInUp extends PureComponent {
  render() {
    return (
      <SignIn
        {...this.props}
      />
    );
  }
}
