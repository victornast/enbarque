import { loadTask } from './../services/task';
import React, { Component } from 'react';
import { deleteTask } from './../services/task';
import EditTask from './../components/forms/EditTask';
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
    const apiCall = await deleteTask(this.state.task._id);
    // hier: success auf true setzen, dann redirect to ....
    // console.log('apiCall: ', apiCall);
  };

  render() {
    console.log('this.state.task', this.state.task);
    //console.log('this.props.location: ', this.props.location);

    return this.state.loaded ? (
      <React.Fragment>
        <h1> {this.state.task.headline}</h1>
        <h3>{this.state.task.description}</h3>
        <br />
        <div className="technical-information">
          <small>
            {' '}
            🕑 
            {this.state.task.duration / 60 === 1
              ? this.state.task.duration / 60 + ' hour'
              : this.state.task.duration / 60 + ' hours'}{' '}
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
