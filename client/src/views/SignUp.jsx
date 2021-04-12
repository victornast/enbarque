import React, { Component } from 'react';
import { signUp } from './../services/authentication';
import { Redirect } from 'react-router-dom';

import './../SignUp.scss';

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
    password: '',
    success: false
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
    const response = await signUp(formData).then((res) => {
      //console.log('res: ', res);
      this.setState({
        success: true
      });
    });
  };

  render() {
    return this.state.success ? (
      <Redirect to="/dashboard"></Redirect>
    ) : (
      <div>
        <h1>Register your organization</h1>
        <form onSubmit={this.handleFormSubmission}>
          <div className="organisationAndAdminContainer">
            <div className="company-info">
              <h2>Company Info</h2>
              <label htmlFor="name-input">Organization</label>
              <input
                id="name-input"
                type="text"
                placeholder="name of your organization"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="website-input">Website</label>
              <input
                id="website-input"
                type="text"
                placeholder="website of your organization"
                name="website"
                value={this.state.website}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="emailCorp-input">
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
              />
              <br />
              <label htmlFor="logo-input" className="upload-button">
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
              </div>
              <input />
              <div>
                <h4>Address</h4>
                <label htmlFor="street-input">Street</label>
                <input
                  id="street-input"
                  type="text"
                  placeholder="address of your organization"
                  name="street"
                  value={this.state.street}
                  onChange={this.handleInputChange}
                  required
                />
                <br />
                <label htmlFor="postcode-input">Postcode</label>
                <input
                  id="postcode-input"
                  type="text"
                  placeholder="address of your organization"
                  name="postcode"
                  value={this.state.postcode}
                  onChange={this.handleInputChange}
                  required
                />
                <br />
                <label htmlFor="city-input">City</label>
                <input
                  id="city-input"
                  type="text"
                  placeholder="address of your organization"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  required
                />
                <br />
                <label htmlFor="country-input">Country</label>
                <input
                  id="country-input"
                  type="text"
                  placeholder="address of your organization"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleInputChange}
                  required
                />
                <br />
              </div>
            </div>
            <div className="admin-info">
              <h2>Administrator Info</h2>
              <label htmlFor="admin-firstName-input">First Name</label>
              <input
                id="admin-firstName-input"
                type="admin"
                placeholder="Your first name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="admin-lastName-input">Last Name</label>
              <input
                id="admin-lastName-input"
                type="admin"
                placeholder="Your last name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="avatar-input" className="upload-button">
                Avatar
              </label>
              <input
                id="avatar-input"
                type="file"
                name="avatar"
                onChange={this.handleFileInputChange}
              />
              <br />
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="email"
                placeholder="Your email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                placeholder="A secure password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <button className="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
