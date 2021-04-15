import React, { Component } from "react";
import EmployeeList from "./../components/employees/EmployeeList";
import { findUsers } from "./../services/organization";
import { findPlans } from "./../services/onboarding";

class ManagerDashboard extends Component {
  state = {
    employees: [],
    plans: [],
  };

  async componentDidMount() {
    const users = await findUsers();
    this.setState({
      employees: users,
    });
    const onboardingProcesses = await findPlans();
    console.log(onboardingProcesses);
    this.setState({
      plans: onboardingProcesses || [],
    });
    console.log(this.state.plans);
  }

  render() {
    const manager = this.props.user;
    const plans = this.state.plans;
    return (
      <div>
        {!!this.state.employees.length && (
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
