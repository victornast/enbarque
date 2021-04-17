import { loadTask } from './../services/task';
import React, { Component } from 'react';
// import { useLocation } from 'react-router-dom';

class SingleTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      loaded: false
    };
  }

  async componentDidMount() {
    const { pathname } = this.props.location;
    const task = await loadTask(pathname.slice(7));
    console.log('pathname.slice(7): ', pathname.slice(7));
    console.log('task: ', task);
    this.setState({ task, loaded: true });
  }

  render() {
    console.log('this.state.task', this.state.task);
    console.log('this.props.location: ', this.props.location);

    return this.state.loaded ? (
      <React.Fragment>
        <h1> {this.state.task.headline}</h1>

        <p>{this.state.task.description}</p>
        <small>{this.state.task.duration} hours</small>
      </React.Fragment>
    ) : (
      []
    );
  }
}

export default SingleTask;
