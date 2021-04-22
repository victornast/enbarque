import { loadTask } from './../services/task';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { deleteTask } from './../services/task';
import EditTask from './../components/forms/EditTask';
import { toast } from 'react-toastify';
import './../SingleTask.scss';
// import { useLocation } from 'react-router-dom';

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
    //console.log('pathname.slice(7): ', pathname.slice(7));
    //console.log('task: ', task);
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

    // hier: success auf true setzen, dann redirect to ....
  };

  notify = (message, type) => {
    toast.configure({
      autoClose: 2000,
      draggable: false,
      position: 'bottom-right'
    });
    toast.error(message);
  };

  render() {
    console.log('this.state.task', this.state.task);
    //console.log('this.props.location: ', this.props.location);
    return this.state.success ? (
      <Redirect to="/tasks" />
    ) : this.state.loaded ? (
      <React.Fragment>
        <h1> {this.state.task.headline}</h1>
        <h3>{this.state.task.description}</h3>
        <br />
        <div className="technical-information">
          <small>
            {' '}
            🕑 
            {this.state.task.duration / 1 === 1
              ? this.state.task.duration + ' hour'
              : this.state.task.duration + ' hours'}{' '}
          </small>
          <br />
          {this.state.task.position.map((task) => {
            return <small id={task._id}>👤 {task.name}  </small>;
          })}
        </div>
        <div className="buttons">
          <button onClick={this.toggleEditTaskForm}>Edit task</button>
          <button onClick={this.eraseTask}>Delete task</button>
        </div>
        {this.state.createForm && (
          <EditTask
            toggleForm={this.toggleEditTaskForm}
            task={this.state.task}
            //onAddUser={this.loadEmployees}
          />
        )}
      </React.Fragment>
    ) : (
      []
    );
  }
}

export default SingleTask;
