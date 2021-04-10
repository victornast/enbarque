import React, { Component } from 'react';
import './../SignUp.scss';

class SignUp extends Component {
  state = {
    name: '',
    website: '',
    address: {
      street: '',
      postcode: '',
      city: '',
      country: ''
    },
    emailCorp: '',
    logo: '',
    admin: {
      firstName: '',
      lastName: ''
    },
    avatar: '',
    email: '',
    password: ''
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const {
      name,
      website,
      emailCorp,
      address,
      logo,
      admin,
      email,
      password
    } = this.state;
    const data = new FormData();
    const values = {
      name,
      address,
      logo,
      website,
      emailCorp,
      admin,
      email,
      password
    };
    for (let key in values) {
      data.append(key, values[key]);
    }
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

  render() {
    return (
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
              <label htmlFor="logo-input">Logo</label>
              <input
                id="logo-input"
                type="file"
                name="logo"
                onChange={this.handleFileInputChange}
              />
              <div>
                <h4>Address</h4>
                <label htmlFor="street-input">Street</label>
                <input
                  id="street-input"
                  type="text"
                  placeholder="address of your organization"
                  name="street"
                  value={this.state.address.street}
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
                  value={this.state.address.postcode}
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
                  value={this.state.address.city}
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
                  value={this.state.address.country}
                  onChange={this.handleInputChange}
                  required
                />
                <br />
              </div>
            </div>
            <div>
              <h2>Administrator Info</h2>
              <label htmlFor="admin-firstName-input">First Name</label>
              <input
                id="admin-firstName-input"
                type="admin"
                placeholder="Your first name"
                name="firstName"
                value={this.state.admin.firstName}
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
                value={this.state.admin.lastName}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="avatar-input">Avatar</label>
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
