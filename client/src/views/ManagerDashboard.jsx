import React, { Component } from "react";
import EmployeeList from "./../components/employees/EmployeeList";
import { findUsers } from "./../services/organization";

class ManagerDashboard extends Component {
  state = {
    employees: [],
  };

  async componentDidMount() {
    const users = await findUsers();
    this.setState({
      employees: users,
    });
  }

  render() {
    return (
      <div>
        {!!this.state.employees.length && (
          <>
            <h1>Manager Dashboard</h1>
            <EmployeeList employees={this.state.employees} />
          </>
        )}
      </div>
    );
  }
}

export default ManagerDashboard;
