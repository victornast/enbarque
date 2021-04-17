import React from 'react';
import { Component } from 'react';
import { loadUser } from '../services/user';
import './../Account.scss';
import { Divider, Avatar } from '@material-ui/core';

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
            <div>
              <div className="align">
                <h1 className="margin">{user.firstName}'s profile </h1>
                <Avatar src={user.avatar}></Avatar>
              </div>

              <Divider />

              <div className="row">
                <div className="column">
                  {' '}
                  <p>
                    <span className="text">Full name: </span>{' '}
                    {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <span className="text">Email: </span> {user.email}
                  </p>
                  <p>
                    <span className="text">Organization:</span>{' '}
                    {user.organization}
                  </p>
                </div>
                <div className="column">
                  {' '}
                  <p>
                    {' '}
                    <span className="text">Position: </span>{' '}
                    {user.position}
                  </p>
                  <p>
                    <span className="text">Level: </span> {user.level}
                  </p>
                  <p>
                    {' '}
                    <span className="text">Role: </span>{' '}
                    {user.role.name}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    );
  }
}

export default Account;
