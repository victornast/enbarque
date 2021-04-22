import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateTask } from './../../services/task';
import { getPositionOptions } from './../../services/userOptions';
import TextareaAutosize from 'react-textarea-autosize';
//import { levelOptions, positionOptions, roleOptions } from "../common";
import './AddUser.scss';
import './EditTask.scss';
//
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
    //console.log('this.state.position: ', this.state.position);
    //console.log('this.props.task', this.props.task);
    const position = await getPositionOptions();
    this.setState({ position });

    this.setState({
      checkboxes: this.props.task.position.reduce(
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

  handleFileInputChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    this.setState({
      [name]: file
    });
  };

  handleCheckboxChange = (event) => {
    //console.log(this.state);
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
      duration: this.state.duration,
      id: this.state.id
    };
    const response = await updateTask(this.state.id, formData);
    console.log('response: ', response);
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
    console.log('cancelForm was called');
    this.props.toggleForm();
  };

  notify = (message, type) => {
    toast.configure({
      autoClose: 3000,
      draggable: false,
      position: 'bottom-right',
      closeOnClick: true,
      pauseOnHover: true
    });

    if (type === 'info') {
      toast.info(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast.info(message);
    }
  };

  render() {
    //console.log(this.props);
    //console.log('this.state.checkboxes', this.state.checkboxes);
    // console.log("from AddUser", this.state.roles);
    // console.log("from AddUser", this.state.positions);
    return this.state.success ? (
      <Redirect to="/tasks" />
    ) : (
      <div className="add-user">
        <h3 className="add-user__header">Edit task</h3>
        {this.state.loaded && (
          <form className="add-user-form" onSubmit={this.handleFormSubmission}>
            <div className="add-user-form__input-label-wrapper">
              <label className="add-user-form__lable" htmlFor="headline">
                Headline
              </label>
              <input
                id="headline"
                type="text"
                name="headline"
                value={this.state.headline}
                onChange={this.handleInputChange}
                className="add-user-form__input"
              />
              <label className="add-user-form__lable" htmlFor="description">
                Positions
              </label>
              {/* <textarea
                    id="description"
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    className="add-user-form__input"
                  /> */}
              <TextareaAutosize
                id="description-input"
                type="text"
                placeholder="Last Name"
                name="description"
                value={this.props.task.description}
                onChange={this.handleInputChange}
                className="add-user-form__input"
              />
            </div>
            <br />
            <button className="de-select_all" onClick={this.selectAll}>
              Select all
            </button>
            <button className="de-select_all" onClick={this.deselectAll}>
              Deselect all
            </button>
            <br />
            {this.state.position.map((position) => {
              return (
                <div key={position._id}>
                  <label>{position.name}</label>
                  <input
                    type="checkbox"
                    name={position._id}
                    checked={this.state.checkboxes[position.name]}
                    onChange={this.handleCheckboxChange}
                    className="form-check-input"
                    id={position._id}
                  />
                </div>
              );
            })}
            <br />
            <label htmlFor="duration" style={{ display: 'none' }}>
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
              <option value="1" name="duration" selected>
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

export default EditTask;
