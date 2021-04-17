import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { createTask } from './../services/task';
import { getPositionOptions } from './../services/userOptions';
import './../CreateTask.scss';

class CreateTask extends Component {
  state = {
    headline: '',
    description: '',
    position: [],
    checkboxes: {},
    duration: '',
    success: false
  };
  async componentDidMount() {
    const position = await getPositionOptions();
    this.setState({ position });
    console.log('this.state.position: ', this.state.position);
    this.setState({
      checkboxes: position.reduce(
        (accumulator, item) => ({
          ...accumulator,
          [item._id]: false
        }),
        {}
      )
    });
    // this.setState({
    //   checkboxes: position.reduce((options, option) => ({
    //     ...options,
    //     [option]: false
    //   }))
    // });
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

  selectAllCheckboxes = (isSelected) => {
    Object.keys(this.state.checkboxes).forEach((checkbox) => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState((prevState) => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);
  deselectAll = () => this.selectAllCheckboxes(false);

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
      position: selectedCheckboxes,
      duration: this.state.duration
    };
    await createTask(formData).then((res) => {
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
          <h4>Suited for the following position:</h4>
          <button className="de-select_all" onClick={this.selectAll}>
            Select all
          </button>
          <button className="de-select_all" onClick={this.deselectAll}>
            Deselect all
          </button>
          {this.state.position.map((position) => {
            return (
              <div key={position._id}>
                <label>{position.name}</label>
                <input
                  type="checkbox"
                  name={position._id}
                  checked={this.state.checkboxes[position._id]}
                  onChange={this.handleCheckboxChange}
                  className="form-check-input"
                  id={position._id}
                />
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
            required
          >
            <option value="" disabled>
              Select...
            </option>
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
            {/* <option value="other" name="duration">
              specify time manually...
            </option> */}
          </select>
          <br />
          {/* {this.state.duration === 'other' ? (
            <input
              type="text"
              name="duration"
              value=""
              placeholder="time in minutes"
              onChange={this.handleInputChange}
            />
          ) : (
            ''
          )} */}
          <br />
          <button className="submit">Create Task</button>
        </form>
      </div>
    );
  }
}
export default CreateTask;
