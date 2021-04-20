import React, { Component } from 'react';

import EmployeeList from './../employees/EmployeeList';
import AddUser from '../forms/AddUser';
import Greeting from './../dashboard/Greeting';

import { findUsers } from '../../services/organization';
import { findPlans } from '../../services/onboarding';
import './ManagerDashboard.scss';

class ManagerDashboard extends Component {
  state = {
    employees: [],
    plans: [],
    loaded: false,
    createForm: false
  };

  async componentDidMount() {
    this.loadEmployees();
    const onboardingProcesses = await findPlans();

    this.setState({
      plans: onboardingProcesses,
      loaded: true
    });
  }
  loadEmployees = async () => {
    const users = await findUsers();
    this.setState({
      employees: users
    });
  };

  toggleCreateAnUserForm = () => {
    this.setState({
      createForm: !this.state.createForm
    });
  };

  render() {
    const manager = this.props.user;
    const plans = this.state.plans;
    return (
      <div className="manager-dashboard">
        {this.state.loaded && (
          <>
            <Greeting user={this.props.user} />
            <div className="list-header">
              <h4>Employees:</h4>
              <button
                className="toggle-form__button"
                onClick={this.toggleCreateAnUserForm}
              >
                Add a new employee
              </button>
            </div>
            {this.state.createForm && (
              <AddUser
                toggleForm={this.toggleCreateAnUserForm}
                onAddUser={this.loadEmployees}
              />
            )}
            <EmployeeList
              employees={this.state.employees}
              user={manager}
              plans={plans}
            />
          </>
        )}
      </div>
    );
  }
}

export default ManagerDashboard;
