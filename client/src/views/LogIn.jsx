import React, { Component } from 'react';
import { signIn } from './../services/authentication';

import './LogIn.scss';

class LogIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = await signIn({ email, password });
    this.props.onUserChange(user);
    this.props.history.push('/dashboard');
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <article className="eb-login">
        <h2 className="eb-login__headline">Log In</h2>
        <form
          className="eb-login__form eb-form"
          onSubmit={this.handleFormSubmission}
        >
          <label className="eb-form__label" htmlFor="email-input">
            Email
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="james@example.com"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            className="eb-form__input"
          />

          <label className="eb-form__label" htmlFor="password-input">
            Password
          </label>
          <input
            id="password-input"
            type="password"
            placeholder="A secure password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            className="eb-form__input"
          />

          <button className="eb-form__action eb-button eb-button--primary">
            Log In
          </button>
        </form>
      </article>
    );
  }
}

export default LogIn;
