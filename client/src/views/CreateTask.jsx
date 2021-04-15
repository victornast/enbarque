import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { createTask } from './../services/task';
import { getPositionOptions } from './../services/userOptions';
import './../CreateTask.scss';

class CreateTask extends Component {
  state = {
    headline: '',
    description: '',
    priority: 'select',
    positions: [],
    checkboxes: {},
    duration: 1,
    success: false
  };
  async componentDidMount() {
    const positions = await getPositionOptions();
    this.setState({ positions });
    console.log('state after position setting: ', this.state);
    this.setState({
      checkboxes: positions.reduce((option) => ({
        [option]: false
      }))
    });
    console.log('this.state.checkboxes: ', this.state.checkboxes);
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
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
  handleCheckboxChange = (event) => {
    console.log(this.state);
    const { name } = event.target;
    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
    console.log('this.state.checkboxes: ', this.state.checkboxes);
  };
  handleFormSubmission = async (event) => {
    event.preventDefault();
    const selectedCheckboxes = [];
    console.log('this.state.checkboxes: ', this.state.checkboxes);
    Object.keys(this.state.checkboxes)
      .filter((checkbox) => this.state.checkboxes[checkbox])
      .forEach((checkbox) => {
        selectedCheckboxes.push(checkbox);
        console.log(checkbox, 'is selected.');
      });
    console.log('selectedCheckboxes: ', selectedCheckboxes);
    const formData = {
      headline: this.state.headline,
      description: this.state.description,
      priority: this.state.priority,
      organization: this.state.organization,
      positions: selectedCheckboxes,
      duration: this.state.duration
    };
    const response = await createTask(formData).then((res) => {
      console.log('res: ', res);
      this.setState({
        success: true
      });
    });
  };
  render() {
    //  console.log("this.state.checkboxes: ", this.state.checkboxes);
    return this.state.success ? (
      <Redirect to="/dashboard"></Redirect>
    ) : (
      <div>
        <h1>Create Task</h1>
        <form onSubmit={this.handleFormSubmission}>
          <h4>Task Headline</h4>
          <label htmlFor="headline-input" style={{ display: 'none' }}>
            Task
          </label>
          <input
            id="headline-input"
            type="text"
            placeholder="headline"
            name="headline"
            className="headline-input"
            value={this.state.headline}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <h4>Description</h4>
          <label htmlFor="description-input" style={{ display: 'none' }}>
            Description
          </label>
          <textarea
            id="description-input"
            placeholder="description of the task"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <br />
          <h4>Suited for the following positions:</h4>
          {this.state.positions.map((position) => {
            return (
              <div key={position._id}>
                <label>
                  <input
                    type="checkbox"
                    name={position.name}
                    checked={this.state.checkboxes[position.name]}
                    onChange={this.handleCheckboxChange}
                    className="form-check-input"
                    id={position.name}
                  />
                  {position.name}
                </label>
              </div>
            );
          })}
          <h4>Estimated Time Requirement</h4>
          <label htmlFor="duration-input" style={{ display: 'none' }}>
            Duration
          </label>
          <select
            name="duration"
            id="duration"
            value={this.state.duration}
            onChange={this.handleInputChange}
          >
            <option value="30" name="duration">
              30min
            </option>
            <option value="60" name="duration">
              1h
            </option>
            <option value="90" name="duration">
              1h 30min
            </option>
            <option value="120" name="duration">
              2h
            </option>
            <option value="150" name="duration">
              2h 30min
            </option>
            <option value="180" name="duration">
              3h
            </option>
            <option value="210" name="duration">
              3h 30min
            </option>
            <option value="240" name="duration">
              half a day
            </option>
            <option value="480" name="duration">
              whole day
            </option>
            <option value="other" name="duration">
              specify time manually...
            </option>
          </select>
          <br />
          {this.state.duration === 'other' ? (
            <input
              type="text"
              name="duration"
              value=""
              placeholder="time in minutes"
              onChange={this.handleInputChange}
            />
          ) : (
            ''
          )}
          <br />
          <button className="submit">Create Task</button>
        </form>
      </div>
    );
  }
}
export default CreateTask;
