import React, { Component } from 'react';
import { signUp } from './../services/authentication';

import './SignUp.scss';

class SignUp extends Component {
  state = {
    name: '',
    website: '',
    street: '',
    postcode: '',
    city: '',
    country: '',
    emailCorp: '',
    logo: '',
    firstName: '',
    lastName: '',
    avatar: '',
    email: '',
    password: ''
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    this.setState({
      [name]: file
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const formData = {
      name: this.state.name,
      website: this.state.website,
      emailCorp: this.state.emailCorp,
      street: this.state.street,
      postcode: this.state.postcode,
      city: this.state.city,
      country: this.state.country,
      logo: this.state.logo,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    signUp(formData).then((res) => {
      this.props.onUserChange(res);
      this.props.history.push('/dashboard');
    });
  };

  render() {
    return (
      <article className="eb-signup">
        <h2 className="eb-signup__headline">
          Register your organization
        </h2>
        <form
          className="eb-signup__form eb-form "
          onSubmit={this.handleFormSubmission}
        >
          <fieldset className="eb-form__fieldset">
            <legend className="eb-form__legend">Manager Info</legend>
            <label
              className="eb-form__label"
              htmlFor="admin-firstName-input"
            >
              First Name
            </label>
            <input
              id="admin-firstName-input"
              type="admin"
              placeholder="Your first name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
              required
              className="eb-form__input"
            />

            <label
              className="eb-form__label"
              htmlFor="admin-lastName-input"
            >
              Last Name
            </label>
            <input
              id="admin-lastName-input"
              type="admin"
              placeholder="Your last name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
              required
              className="eb-form__input"
            />

            {/* <label htmlFor="avatar-input" className="upload-button">
              Avatar
            </label>
            <input
              id="avatar-input"
              type="file"
              name="avatar"
              onChange={this.handleFileInputChange}
            /> */}

            <label className="eb-form__label" htmlFor="email-input">
              Email
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="Your email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
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
              required
              className="eb-form__input"
            />
          </fieldset>

          <fieldset className="eb-form__fieldset">
            <legend className="eb-form__legend">Company Info</legend>

            <label className="eb-form__label" htmlFor="name-input">
              Organization
            </label>
            <input
              id="name-input"
              type="text"
              placeholder="name of your organization"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
              className="eb-form__input"
            />

            <label className="eb-form__label" htmlFor="website-input">
              Website
            </label>
            <input
              id="website-input"
              type="text"
              placeholder="website of your organization"
              name="website"
              value={this.state.website}
              onChange={this.handleInputChange}
              required
              className="eb-form__input"
            />

            <label className="eb-form__label" htmlFor="emailCorp-input">
              Default Organization Email
            </label>
            <input
              id="emailCorp-input"
              type="email"
              placeholder="mail of your organization"
              name="emailCorp"
              value={this.state.mail}
              onChange={this.handleInputChange}
              required
              className="eb-form__input"
            />

            {/* <label htmlFor="logo-input" className="upload-button">
              Logo
            </label>
            <div className="fileUpload">
              <span>Upload</span>
              <input
                type="file"
                className="upload"
                id="logo-input"
                name="logo"
                onChange={this.handleFileInputChange}
              />
            </div> */}

            <fieldset className="eb-form__fieldset eb-form__fieldset--secondary">
              <legend className="eb-form__legend eb-form__legend--secondary">
                Address
              </legend>

              <label className="eb-form__label" htmlFor="street-input">
                Street
              </label>
              <input
                id="street-input"
                type="text"
                placeholder="street"
                name="street"
                value={this.state.street}
                onChange={this.handleInputChange}
                required
                className="eb-form__input"
              />

              <label
                className="eb-form__label"
                htmlFor="postcode-input"
              >
                Postcode
              </label>
              <input
                id="postcode-input"
                type="text"
                placeholder="postcode"
                name="postcode"
                value={this.state.postcode}
                onChange={this.handleInputChange}
                required
                className="eb-form__input"
              />

              <label className="eb-form__label" htmlFor="city-input">
                City
              </label>
              <input
                id="city-input"
                type="text"
                placeholder="city"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
                required
                className="eb-form__input"
              />

              <label className="eb-form__label" htmlFor="country-input">
                Country
              </label>
              <input
                id="country-input"
                type="text"
                placeholder="country"
                name="country"
                value={this.state.country}
                onChange={this.handleInputChange}
                required
                className="eb-form__input"
              />
            </fieldset>
          </fieldset>

          <button className="eb-form__action eb-button eb-button--primary">
            Sign Up
          </button>
        </form>
      </article>
    );
  }
}

export default SignUp;
