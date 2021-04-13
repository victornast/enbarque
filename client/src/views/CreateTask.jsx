import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createTask } from './../services/task';
import './../CreateTask.scss';

class CreateTask extends Component {
  state = {
    headline: '',
    description: '',
    priority: 'select',
    organization: '',
    position: '',
    duration: 'select',
    success: false
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const formData = {
      headline: this.state.headline,
      description: this.state.description,
      priority: this.state.priority,
      organization: this.state.organization,
      position: this.state.position,
      duration: this.state.duration
    };
    await createTask(formData).then((res) => {
      console.log('res: ', res);
      this.setState({
        success: true
      });
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };

  handleFileInputChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    this.setState({
      [name]: file
    });
  };

  render() {
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
          <label
            htmlFor="description-input"
            style={{ display: 'none' }}
          >
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
          <h4>Suited for the following positions:</h4>
          <label htmlFor="position-input">junior</label>
          <input
            type="checkbox"
            name="position"
            value="junior"
            onChange={this.handleInputChange}
          />
          <label htmlFor="position-input">intermediate</label>
          <input
            type="checkbox"
            name="position"
            value="intermediate"
            onChange={this.handleInputChange}
          />
          <label htmlFor="position-input">senior</label>
          <input
            type="checkbox"
            name="position"
            value="senior"
            onChange={this.handleInputChange}
          />
          <label htmlFor="position-input">expert</label>
          <input
            type="checkbox"
            name="position"
            value="expert"
            onChange={this.handleInputChange}
          />
          <br />
          <h4>Priority</h4>
          <label
            htmlFor="description-input"
            style={{ display: 'none' }}
          >
            Priority
          </label>
          <select
            name="priority"
            onChange={this.handleInputChange}
            value={this.state.priority}
          >
            <option value="1" name="priority">
              1st Priority
            </option>
            <option value="2" name="priority">
              2nd Priority
            </option>
            <option value="3" name="priority">
              3rd Priority
            </option>
          </select>
          <br />
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
              placeholder="time"
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
