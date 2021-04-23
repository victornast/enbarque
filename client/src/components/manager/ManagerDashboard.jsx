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
      this.state.loaded && (
        <article className="eb-manager-dashboard">
          <h2 className="sr-only">Manager Dashboard</h2>

          <Greeting user={this.props.user} />

          <section className="eb-manager-dashboard-add-employee">
            <h3 className="sr-only">Add New Employee</h3>
            <button
              className="eb-manager-dashboard-add-employee__action eb-button eb-button--primary eb-button--compact"
              onClick={this.toggleCreateAnUserForm}
            >
              Add a new employee
            </button>
            {this.state.createForm && (
              <div className="eb-manager-dashboard-add-employee__form">
                <AddUser
                  toggleForm={this.toggleCreateAnUserForm}
                  onAddUser={this.loadEmployees}
                />
              </div>
            )}
          </section>

          <section className="list-header">
            <h3>Employees:</h3>
            <EmployeeList
              employees={this.state.employees}
              user={manager}
              plans={plans}
            />
          </section>
        </article>
      )
    );
  }
}

export default ManagerDashboard;
