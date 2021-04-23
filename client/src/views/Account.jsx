import React from 'react';
import { Component } from 'react';
import { loadUser } from '../services/user';
import './Account.scss';
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
      user && (
        <article>
          <div className="align">
            <h1 className="margin">
              {user.firstName + ' ' + user.lastName}'s profile{' '}
            </h1>
            <Avatar src={user.avatar}></Avatar>
          </div>

          <Divider />
          <ul className="eb-account__details">
            <li>
              <span className="text">Full name: </span>
              {user.firstName} {user.lastName}
            </li>
            <li>
              <span className="text">Email: </span> {user.email}
            </li>
            <li>
              <span className="text">Position: </span>
              {user.position.name}
            </li>
            <li>
              <span className="text">Level: </span>
              {user.level.name}
            </li>
            <li>
              <span className="text">Role: </span>
              {user.role.name}
            </li>
          </ul>
        </article>
      )
    );
  }
}

export default Account;
