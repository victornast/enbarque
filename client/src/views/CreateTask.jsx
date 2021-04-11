import React, { Component } from 'react';

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
          <label htmlFor="headline-input">Task</label>
          <input
            id="headline-input"
            type="text"
            placeholder="headline"
            name="headline"
            value={this.state.headline}
            onChange={this.handleInputChange}
            required
          />
          <br />
          {/* <label htmlFor="position-input">Position</label>
          <input
            type="checkbox"
            name="position-1-input"
            value="junior"
            id="1"
            onChange={this.handleInputChange}
          >
            junior
          </input>
          <input
            type="checkbox"
            name="position-2-input"
            value="intermediate"
            id="2"
            onChange={this.handleInputChange}
          >
            intermediate
          </input>
          <input
            type="checkbox"
            name="position-3-input"
            value="senior"
            id="3"
            onChange={this.handleInputChange}
          >
            senior
          </input>
          <input
            type="checkbox"
            name="position-4-input"
            value="expert"
            id="4"
            onChange={this.handleInputChange}
          >
            expert
          </input> */}
          <br />
          <label htmlFor="description-input">Description</label>
          <textarea
            id="description-input"
            placeholder="description of the task"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
            required
          />
          <br />
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
          <button className="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default CreateTask;
