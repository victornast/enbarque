import React from 'react';
import { Component } from 'react';
import { loadUser } from '../services/user';

class Account extends Component {
  state = {
    user: null
  };

  async componentDidMount() {
    const user = await loadUser(this.props.match.params.id);
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <main>
        {user && (
          <>
            <h1>{user.firstName}</h1>
            <h1>{user.lastName}</h1>

          </>
        )}
      </main>
    );
  }
}

export default Account;
