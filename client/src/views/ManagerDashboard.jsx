import React, { Component } from "react";
import EmployeeList from "./../components/employees/EmployeeList";
import { findUsers } from "./../services/organization";
import { findPlans } from "./../services/onboarding";

class ManagerDashboard extends Component {
  state = {
    employees: [],
    plans: [],
    loaded: false,
  };

  async componentDidMount() {
    const users = await findUsers();
    const onboardingProcesses = await findPlans();

    this.setState({
      employees: users,
      plans: onboardingProcesses,
      loaded: true,
    });
  }

  render() {
    const manager = this.props.user;
    const plans = this.state.plans;
    return (
      <div>
        {this.state.loaded && (
          <>
            <h1>Manager Dashboard</h1>
            <h3>
              Manager: {manager.firstName} {manager.lastName}
            </h3>
            <h3>Employees:</h3>
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
