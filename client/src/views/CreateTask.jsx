import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { createTask } from './../services/task';
import { getPositionOptions } from './../services/userOptions';

class CreateTask extends Component {
  state = {
    headline: '',
    description: '',
    position: [],
    checkboxes: {},
    duration: 0,
    success: false
  };
  async componentDidMount() {
    const position = await getPositionOptions();
    this.setState({ position });
    this.setState({
      checkboxes: position.reduce(
        (accumulator, item) => ({
          ...accumulator,
          [item._id]: false
        }),
        {}
      )
    });
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCheckboxChange = (event) => {
    const { name } = event.target;
    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  selectAllCheckboxes = (isSelected) => {
    Object.keys(this.state.checkboxes).forEach((checkbox) => {
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

    Object.keys(this.state.checkboxes)
      .filter((checkbox) => this.state.checkboxes[checkbox])
      .forEach((checkbox) => {
        selectedCheckboxes.push(checkbox);
      });

    const formData = {
      headline: this.state.headline,
      description: this.state.description,
      position: selectedCheckboxes,
      duration: this.state.duration
    };

    await createTask(formData).then((res) => {
      this.setState({
        success: true
      });
    });
    this.props.history.push('/tasks');
  };

  render() {
    return this.state.success ? (
      <Redirect to="/dashboard"></Redirect>
    ) : (
      <article className="eb-create-task">
        <h2>Create Task</h2>
        <form
          className="eb-create-task__form eb-form"
          onSubmit={this.handleFormSubmission}
        >
          <label className="eb-form__label" htmlFor="headline-input">
            Task Name
          </label>
          <input
            id="headline-input"
            type="text"
            placeholder="Task Name"
            name="headline"
            className="eb-form__input"
            value={this.state.headline}
            onChange={this.handleInputChange}
            required
          />

          <label className="eb-form__label" htmlFor="description-input">
            Description
          </label>
          <textarea
            id="description-input"
            placeholder="description of the task"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
            required
            className="eb-form__textarea"
            rows="5"
          />

          <label className="eb-form__label" htmlFor="duration-input">
            Estimated Time Requirement
          </label>
          <select
            name="duration"
            id="duration"
            value={this.state.duration}
            onChange={this.handleInputChange}
            required
            className="eb-form__input"
          >
            <option value={1} name="duration">
              1h
            </option>
            <option value={2} name="duration">
              2h
            </option>
            <option value={3} name="duration">
              3h
            </option>
            <option value={4} name="duration">
              half a day
            </option>
            <option value={5} name="duration">
              5h
            </option>
            <option value={6} name="duration">
              6h
            </option>
            <option value={7} name="duration">
              7h
            </option>
            <option value={8} name="duration">
              whole day
            </option>
          </select>

          <fieldset className="eb-form__fieldset">
            <legend className="eb-form__legend">
              Suited for the following position:
            </legend>

            {this.state.position.map((position) => {
              return (
                <label
                  className="eb-form__checkbox eb-form-checkbox"
                  key={position._id}
                >
                  <input
                    type="checkbox"
                    name={position._id}
                    checked={this.state.checkboxes[position._id]}
                    onChange={this.handleCheckboxChange}
                    className="eb-form-checkbox__input"
                    id={position._id}
                  />
                  <span className="eb-form-checkbox__text">
                    {position.name}
                  </span>
                </label>
              );
            })}

            <button
              className="eb-form__filter eb-button eb-button--compact"
              onClick={this.selectAll}
            >
              Select all
            </button>
            <button
              className="eb-form__filter eb-button eb-button--compact"
              onClick={this.deselectAll}
            >
              Deselect all
            </button>
          </fieldset>

          <button className="eb-form__action eb-button eb-button--primary">
            Create Task
          </button>
        </form>
      </article>
    );
  }
}
export default CreateTask;
