import React, { Component } from 'react';

import { findTasks } from './../services/task';
import './../ListTasks.scss';

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
    return this.state.loaded ? (
      <React.Fragment>
        <h1>All tasks</h1>
        <table>
          <thead>
            <tr>
              <th className="coloredColumn">Headline</th>
              <th>Description</th>
            </tr>
          </thead>
          {this.state.tasks.map((task) => {
            return (
              <tbody>
                <tr key={task._id}>
                  <td className="coloredColumn">
                    <a href={'/' + task._id + '/edit'}>{task.headline}</a>
                  </td>
                  <td>{task.description}</td>
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
