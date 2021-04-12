import React, { Component } from "react";
import SelectGroup from "../components/forms/SelectGroup";
//import { levelOptions, positionOptions, roleOptions } from "../common";
import {
  getLevelOptions,
  getPositionOptions,
  getRoleOptions,
} from "./../services/userOptions";
import { addUser } from "../services/user";

//
class AddUser extends Component {
  state = {
    levels: [],
    positions: [],
    roles: [],
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    role: "",
    level: "",
    user: this.props.user,
  };
  // username and password should be generated automatically

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, position, role, level } = this.state;
    const user = await addUser({
      firstName,
      lastName,
      email,
      position,
      role,
      level,
    });
  };

  async componentDidMount() {
    const id = this.state.user._id;
    const levels = await getLevelOptions(id);
    const roles = await getRoleOptions(id);
    const positions = await getPositionOptions(id);
    this.setState({
      levels,
      roles,
      positions,
    });
  }

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
    console.log("from AddUser", this.state.levels);
    console.log("from AddUser", this.state.roles);
    console.log("from AddUser", this.state.positions);
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
            options={this.state.positions}
            onUpdate={(value) => this.handleSelectChange("position", value)}
          />

          <label>Level</label>
          <SelectGroup
            name="level"
            options={this.state.levels}
            onUpdate={(value) => this.handleSelectChange("level", value)}
          />

          <label>Role assigned for the onboarding process</label>
          <SelectGroup
            name="role"
            options={this.state.roles}
            onUpdate={(value) => this.handleSelectChange("role", value)}
          />

          <button>Save</button>
        </form>
      </div>
    );
  }
}

export default AddUser;
