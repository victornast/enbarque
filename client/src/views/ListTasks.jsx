import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { findTasks } from './../services/task';
import './ListTasks.scss';

class ListTasks extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: '', loaded: false };
  }

  async componentDidMount() {
    const allTasks = await findTasks();
    this.setState({
      tasks: [...allTasks],
      loaded: true
    });
  }

  render() {
    return this.state.loaded ? (
      <article className="eb-list-task">
        <h2>All tasks</h2>

        <Link
          className="eb-list-task__action eb-button eb-button--primary eb-button--compact"
          to="/tasks/create"
        >
          Create New Task
        </Link>

        <table className="eb-list-task__table eb-table">
          <thead>
            <tr>
              <th className="eb-table__head-cell">Headline</th>
              <th className="eb-table__head-cell">Duration</th>
              <th className="eb-table__head-cell">Suited Positions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task, key) => {
              return (
                <tr key={task._id}>
                  <td className="eb-table__cell">
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
                  <td className="eb-table__cell">
                    🕑 
                    {task.duration === 1
                      ? task.duration + ' hour'
                      : task.duration + ' hours'}
                  </td>
                  <td className="eb-table__cell">
                    {task.position.map((el) => {
                      return <p key={el._id}>👤 {el.name}</p>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    ) : (
      []
    );
  }
}

export default ListTasks;
