import React, { Component } from "react";
import SelectGroup from "./SelectGroup";
//import { levelOptions, positionOptions, roleOptions } from "../common";
import {
  getLevelOptions,
  getPositionOptions,
  getRoleOptions,
} from "../../services/userOptions";
import { addUser } from "../../services/user";
import "./AddUser.scss";
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
    loaded: false,
  };
  // username and password should be generated automatically

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, position, role, level } = this.state;
    // console.log(firstName, lastName, email, possition, role, level);
    await addUser({
      firstName,
      lastName,
      email,
      position,
      role,
      level,
    });
    this.props.toggleForm();
    this.props.onAddUser();
  };

  async componentDidMount() {
    const levelObjectArray = await getLevelOptions();
    let levels = [];
    levelObjectArray.map((levelObject) => levels.push(levelObject.name));
    const roleObjectArray = await getRoleOptions();
    let roles = [];
    roleObjectArray.map((roleObject) => roles.push(roleObject.name));
    const positionObjectArray = await getPositionOptions();
    let positions = [];
    positionObjectArray.map((positionObject) =>
      positions.push(positionObject.name)
    );
    this.setState({
      levels,
      roles,
      positions,
      loaded: true,
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

  cancelForm = () => {
    console.log("cancelForm was called");
    this.props.toggleForm();
  };
  render() {
    // console.log("from AddUser", this.state.levels);
    // console.log("from AddUser", this.state.roles);
    // console.log("from AddUser", this.state.positions);
    return (
      <div className="add-user">
        <h3 className="add-user__header">New employee profile</h3>
        {this.state.loaded && (
          <form className="add-user-form" onSubmit={this.handleFormSubmission}>
            <div className="add-user-form__input-label-wrapper">
              <label className="add-user-form__lable" htmlFor="firstName-input">
                Name
              </label>
              <div className="add-user-form__name-inputs">
                <input
                  id="firstName-input"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  className="add-user-form__input"
                />
                <input
                  id="lastName-input"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  className="add-user-form__input"
                />
              </div>
            </div>
            <div className="add-user-form__input-label-wrapper">
              <label className="add-user-form__lable" htmlFor="email-input">
                Email
              </label>
              <input
                id="email-input"
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="add-user-form__input"
              />
            </div>
            <div className="add-user-form__options-wrapper">
              <div className="add-user-form__input-label-wrapper">
                <label className="add-user-form__lable">Position</label>
                <div className="add-user-form__option">
                  <SelectGroup
                    name="position"
                    options={this.state.positions}
                    onUpdate={(value) =>
                      this.handleSelectChange("position", value)
                    }
                  />
                </div>
              </div>
              <div className="add-user-form__input-label-wrapper">
                <label className="add-user-form__lable">Level</label>
                <div className="add-user-form__option">
                  <SelectGroup
                    name="level"
                    options={this.state.levels}
                    onUpdate={(value) =>
                      this.handleSelectChange("level", value)
                    }
                  />
                </div>
              </div>
              <div className="add-user-form__input-label-wrapper">
                <label className="add-user-form__lable">Role</label>
                <div className="add-user-form__option">
                  <SelectGroup
                    name="role"
                    options={this.state.roles}
                    onUpdate={(value) => this.handleSelectChange("role", value)}
                  />
                </div>
              </div>
            </div>
            <div className="add-form-button-group">
              <button className="add-form-button--save">Save</button>
              <div
                onClick={this.cancelForm}
                className="add-form-button--cancel"
              >
                Cancel
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default AddUser;
