import React, { Component } from "react";
import EmployeeList from "./../components/employees/EmployeeList";
import AddUser from "./../components/forms/AddUser";
import { findUsers } from "./../services/organization";
import { findPlans } from "./../services/onboarding";
import "./ManagerDashboard.scss";
import { Link } from "react-router-dom";
import { FaThemeisle } from "react-icons/fa";

class ManagerDashboard extends Component {
  state = {
    employees: [],
    plans: [],
    loaded: false,
    createForm: false,
  };

  async componentDidMount() {
    this.loadEmployees();
    const onboardingProcesses = await findPlans();

    this.setState({
      plans: onboardingProcesses,
      loaded: true,
    });
  }
  loadEmployees = async () => {
    const users = await findUsers();
    this.setState({
      employees: users,
    });
  };

  toggleCreateAnUserForm = () => {
    this.setState({
      createForm: !this.state.createForm,
    });
  };

  render() {
    const manager = this.props.user;
    const plans = this.state.plans;
    return (
      <div className="manager-dashboard">
        {this.state.loaded && (
          <>
            <h1>Manager Dashboard</h1>
            <h3>Welcome back {manager.firstName}!</h3>
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
