import React, { Component } from "react";
import SelectGroup from "./SelectGroup";
import { levelOptions, positionOptions, roleOptions } from "./../../common";

//
class AddUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    role: "",
    level: "",
  };
  // username and password should be generated automatically

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, position, role, level } = this.state;
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSelectChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <h1>Add an employee profile</h1>

        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="firstName-input">First name</label>
          <input
            id="firstName-input"
            type="text"
            placeholder="Max"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
          <label htmlFor="lastName-input">Last name</label>
          <input
            id="lastName-input"
            type="text"
            placeholder="Mustermann"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />

          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            placeholder="Your email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label>Position</label>
          <SelectGroup
            name="position"
            values={positionOptions}
            onUpdate={(value) => this.handleSelectChange("position", value)}
          />

          <label>Level</label>
          <SelectGroup
            name="level"
            values={levelOptions}
            onUpdate={(value) => this.handleSelectChange("level", value)}
          />

          <label>Role assigned for the onboarding process</label>
          <SelectGroup
            name="role"
            values={roleOptions}
            onUpdate={(value) => this.handleSelectChange("role", value)}
          />

          <button>Save</button>
        </form>
      </div>
    );
  }
}

export default AddUser;
