import React, { Component } from "react";
import { Link } from "react-router-dom";
import { findTasks } from "./../services/task";
import "./../ListTasks.scss";

class ListTasks extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: "", loaded: false };
  }

  async componentDidMount() {
    const allTasks = await findTasks();
    console.log("tasks: ", allTasks);
    console.log("tasks.allTasks: ", allTasks);
    this.setState({ tasks: [...allTasks], loaded: true });
    console.log("this.state.tasks: ", this.state.tasks);
    console.log("this.state.tasks: ", typeof this.state.tasks);
    console.log("this.state.tasks[0]: ", this.state.tasks[0]);
  }

  render() {
    console.log("this.props.user: ", this.props.user);
    return this.state.loaded ? (
      <React.Fragment>
        <h1>All tasks</h1>
        <Link to="/tasks/create">Create New Task</Link>
        <table>
          <thead className="coloredColumn">
            <tr>
              <th>Headline</th>
              <th>Description</th>
              <th>Suited Positions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task, key) => {
              return (
                <tr key={task._id}>
                  <td valign="top">
                    <Link
                      key={task._id}
                      to={{
                        pathname: `/tasks/${task._id}`,
                        state: { task },
                      }}
                    >
                      {task.headline}
                    </Link>
                  </td>
                  <td>{task.description}</td>
                  {this.state.task.map((el) => {
                    return <li>{el.position.name}</li>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <p>{this.state.tasks.name}</p>
      </React.Fragment>
    ) : (
      []
    );
  }
}

export default ListTasks;
