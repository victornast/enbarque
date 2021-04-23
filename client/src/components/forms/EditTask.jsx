import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateTask } from './../../services/task';
import { getPositionOptions } from './../../services/userOptions';
import TextareaAutosize from 'react-textarea-autosize';

class EditTask extends Component {
  state = {
    loaded: false,
    headline: this.props.task.headline,
    description: this.props.task.description,
    position: [],
    checkboxes: {},
    duration: this.props.task.duration,
    id: this.props.task._id,
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
      ),
      loaded: true
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
      duration: this.state.duration,
      id: this.state.id
    };
    const response = await updateTask(this.state.id, formData);

    if (response.data.status === 'success') {
      this.notify('Edit successful!', 'success');
      setTimeout(() => {
        this.setState({ success: true });
      }, 3000);
    } else {
      this.notify('ERROR', 'error');
    }
  };

  handleSelectChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  cancelForm = () => {
    this.props.toggleForm();
  };

  notify = (message, type) => {
    toast.configure({
      autoClose: 3000,
      draggable: false,
      position: 'bottom-right'
    });

    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast.info(message);
    }
  };

  render() {
    return this.state.success ? (
      <Redirect to="/tasks" />
    ) : (
      <article className="eb-create-task edit-task">
        <h2>Edit task</h2>
        {this.state.loaded && (
          <form
            className="eb-create-task__form eb-form"
            onSubmit={this.handleFormSubmission}
          >
            <label className="eb-form__label" htmlFor="headline">
              Headline
            </label>
            <input
              id="headline"
              type="text"
              name="headline"
              value={this.state.headline}
              onChange={this.handleInputChange}
              className="eb-form__input"
            />
            <label className="eb-form__label" htmlFor="description">
              Description
            </label>
            <TextareaAutosize
              id="description-input"
              type="text"
              placeholder="Last Name"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              className="eb-form__textarea"
            />

            <label className="eb-form__label" htmlFor="duration">
              Duration
            </label>
            <select
              name="duration"
              id="duration"
              value={this.state.duration}
              onChange={this.handleInputChange}
              required
              className="eb-form__input"
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="1" name="duration">
                1h
              </option>
              <option value="2" name="duration">
                2h
              </option>
              <option value="3" name="duration">
                3h
              </option>
              <option value="4" name="duration">
                half a day
              </option>
              <option value="5" name="duration">
                5h
              </option>
              <option value="6" name="duration">
                6h
              </option>
              <option value="7" name="duration">
                7h
              </option>
              <option value="8" name="duration">
                whole day
              </option>
            </select>

            <fieldset className="eb-form__fieldset">
              <legend className="eb-form__legend">Positions</legend>
              <button
                type="button"
                className="eb-form__filter eb-button eb-button--compact"
                onClick={this.selectAll}
              >
                Select all
              </button>
              <button
                type="button"
                className="eb-form__filter eb-button eb-button--compact"
                onClick={this.deselectAll}
              >
                Deselect all
              </button>

              {this.state.position.map((position) => {
                return (
                  <label key={position._id} className="eb-form__label">
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

              <button className="eb-form__action eb-button eb-button--primary">
                Save
              </button>
              <button
                onClick={this.cancelForm}
                className="eb-form__action eb-button"
              >
                Cancel
              </button>
            </fieldset>
          </form>
        )}
      </article>
    );
  }
}

export default EditTask;
