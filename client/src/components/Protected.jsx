import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

class Protected extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    try {
      const { exp } = await jwtDecode(localStorage.token);
      if (exp < Math.floor(Date.now() / 1000)) {
        this.props.history.push('/login');
      }
    } catch (error) {
      console.log('Error with decoding token', error);
      this.props.history.push('/login');
      return;
    }
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}

export default Protected;
