import React, { Component } from 'react';
import './../CreateTask.scss';

class CreateTask extends Component {
  state = {
    headline: '',
    description: '',
    priority: '',
    organizationId: '',
    position: ['junior', 'intermediate', 'senior', 'expert'],
    duration: ''
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const {
      headline,
      description,
      priority,
      organizationId,
      position,
      duration
    } = this.state;
    const data = new FormData();
    const values = {
      headline,
      description,
      priority,
      organizationId,
      position,
      duration
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
          <h4>Position</h4>
          <label htmlFor="position-input">junior</label>
          <input
            type="checkbox"
            name="position-1-input"
            value="junior"
            id="1"
            onChange={this.handleInputChange}
          />
          <label htmlFor="position-input">intermediate</label>
          <input
            type="checkbox"
            name="position-2-input"
            value="intermediate"
            id="2"
            onChange={this.handleInputChange}
          />
          <label htmlFor="position-input">senior</label>
          <input
            type="checkbox"
            name="position-3-input"
            value="senior"
            id="3"
            onChange={this.handleInputChange}
          />
          <label htmlFor="position-input">expert</label>
          <input
            type="checkbox"
            name="position-4-input"
            value="expert"
            id="4"
            onChange={this.handleInputChange}
          />
          <br />
          <h4>Priority</h4>
          <label htmlFor="description-input" style={{ display: 'none' }}>
            Priority
          </label>
          <select name="priority">
            <option value="1" name="priority" onChange={this.handleInputChange}>
              1st Priority
            </option>
            <option value="2" name="priority" onChange={this.handleInputChange}>
              2nd Priority
            </option>
            <option value="3" name="priority" onChange={this.handleInputChange}>
              3rd Priority
            </option>
          </select>
          <br />
          <button className="submit">Create Task</button>
        </form>
      </div>
    );
  }
}

export default CreateTask;
