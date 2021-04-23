import { loadTask } from './../services/task';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { deleteTask } from './../services/task';
import EditTask from './../components/forms/EditTask';
import { toast } from 'react-toastify';
import './SingleTask.scss';

class SingleTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      loaded: false,
      createForm: false,
      success: false
    };
  }

  async componentDidMount() {
    const { pathname } = this.props.location;
    const task = await loadTask(pathname.slice(7));
    this.setState({ task, loaded: true });
  }

  toggleEditTaskForm = () => {
    this.setState({
      createForm: !this.state.createForm
    });
  };

  eraseTask = async () => {
    await deleteTask(this.state.task._id);
    if (this.state.task._id)
      this.setState({
        success: false
      });
    this.notify('Task deleted!', 'error');
    await this.props.history.push('/tasks');
  };

  notify = (message, type) => {
    toast.configure({
      autoClose: 1000,
      draggable: false,
      position: 'bottom-right',
      hideProgressBar: true
    });
    toast.error(message);
  };

  render() {
    return this.state.success ? (
      <Redirect to="/tasks" />
    ) : this.state.loaded ? (
      <article className="eb-single-task">
        <h2> {this.state.task.headline}</h2>
        <ul className="eb-single-task__technical-details">
          <li>
            🕑 
            {this.state.task.duration === 1
              ? this.state.task.duration + ' hour'
              : this.state.task.duration + ' hours'}
          </li>
          {this.state.task.position.map((task) => {
            return <li key={task._id}>👤 {task.name}  </li>;
          })}
        </ul>
        <p>{this.state.task.description}</p>
        <div className="eb-single-task__buttons">
          <button
            className="eb-single-task__button eb-button"
            onClick={this.eraseTask}
          >
            Delete task
          </button>
          <button
            className="eb-single-task__button eb-button eb-button--primary"
            onClick={this.toggleEditTaskForm}
          >
            Edit task
          </button>
        </div>
        {this.state.createForm && (
          <EditTask
            toggleForm={this.toggleEditTaskForm}
            task={this.state.task}
          />
        )}
      </article>
    ) : (
      []
    );
  }
}

export default SingleTask;
