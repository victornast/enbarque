import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { findTasks } from './../services/task';
import './../ListTasks.scss';
import SingleTask from './../views/SingleTask';

class ListTasks extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: '', loaded: false };
  }

  async componentDidMount() {
    const tasks = await findTasks();
    console.log('tasks: ', tasks);
    console.log('tasks.allTasks: ', tasks.allTasks);
    this.setState({ tasks: [...tasks.allTasks], loaded: true });
    console.log('this.state.tasks: ', this.state.tasks);
    console.log('this.state.tasks: ', typeof this.state.tasks);
    console.log('this.state.tasks[0]: ', this.state.tasks[0]);
  }

  render() {
    console.log('this.props.user: ', this.props.user);
    return this.state.loaded ? (
      <React.Fragment>
        <h1>All tasks</h1>
        <table>
          <thead className="coloredColumn">
            <tr>
              <th>Headline</th>
              <th>Description</th>
              <th>Duration</th>
            </tr>
          </thead>
          {this.state.tasks.map((task) => {
            return (
              <tbody>
                <tr key={task._id}>
                  <td valign="top">
                    <Link
                      key={task._id}
                      to={{
                        pathname: `/tasks/${task._id}`,
                        state: { task }
                      }}
                    >
                      {task.headline}
                    </Link>
                  </td>
                  <td>{task.description}</td>
                  <td valign="top">
                    {task.duration / 60 === 1
                      ? task.duration / 60 + ' hour'
                      : task.duration / 60 + ' hours'}{' '}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>

        <p>{this.state.tasks.name}</p>
      </React.Fragment>
    ) : (
      []
    );
  }
}

export default ListTasks;
