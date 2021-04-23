import React, { Component } from 'react';
import SelectGroup from './SelectGroup';

import {
  getLevelOptions,
  getPositionOptions,
  getRoleOptions
} from '../../services/userOptions';
import { addUser } from '../../services/user';

class AddUser extends Component {
  state = {
    levels: [],
    positions: [],
    roles: [],
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    role: '',
    level: '',
    user: this.props.user,
    loaded: false
  };
  async componentDidMount() {
    const levelObjectArray = await getLevelOptions();
    let levels = [];
    levelObjectArray.map((levelObject) =>
      levels.push(levelObject.name)
    );
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
      loaded: true
    });
  }

  // username and password should be generated automatically
  handleFormSubmission = async (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      position,
      role,
      level
    } = this.state;

    await addUser({
      firstName,
      lastName,
      email,
      position,
      role,
      level
    });
    this.props.toggleForm();
    this.props.onAddUser();
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSelectChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  cancelForm = () => {
    this.props.toggleForm();
  };
  render() {
    return (
      this.state.loaded && (
        <form
          className="eb-add-user eb-form"
          onSubmit={this.handleFormSubmission}
        >
          <legend className="eb-form__legend">
            New employee profile
          </legend>

          <label className="eb-form__label" htmlFor="firstName-input">
            First Name
          </label>
          <input
            id="firstName-input"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            className="eb-form__input"
          />

          <label className="eb-form__label" htmlFor="firstName-input">
            Last Name
          </label>
          <input
            id="lastName-input"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            className="eb-form__input"
          />

          <label className="eb-form__label" htmlFor="email-input">
            Email
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            className="eb-form__input"
          />

          <div className="eb-form__inline-section eb-form-inline-section">
            <div className="eb-form-inline-section__item">
              <label className="eb-form__label">Position</label>
              <SelectGroup
                name="position"
                options={this.state.positions}
                onUpdate={(value) =>
                  this.handleSelectChange('position', value)
                }
              />
            </div>

            <div className="eb-form-inline-section__item">
              <label className="eb-form__label">Level</label>
              <SelectGroup
                name="level"
                options={this.state.levels}
                onUpdate={(value) =>
                  this.handleSelectChange('level', value)
                }
              />
            </div>

            <div className="eb-form-inline-section__item">
              <label className="eb-form__label">Role</label>
              <SelectGroup
                name="role"
                options={this.state.roles}
                onUpdate={(value) =>
                  this.handleSelectChange('role', value)
                }
              />
            </div>
          </div>

          <div className="eb-form-button-group eb-form__button-group">
            <button
              onClick={this.cancelForm}
              className="eb-form__action eb-button"
            >
              Cancel
            </button>
            <button className="eb-form__action eb-button eb-button--primary">
              Save
            </button>
          </div>
        </form>
      )
    );
  }
}

export default AddUser;
