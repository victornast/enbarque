import React, { Component } from "react";
import EmployeeList from "./../components/employees/EmployeeList";
import { loadEmployees } from "./../services/user";

class ManagerDashboard extends Component {
  state = {
    employees: [],
  };

  async componentDidMount() {
    const employees = await loadEmployees();
    this.setState({
      employees,
    });
  }

  render() {
    return (
      <div>
        <h1>Manager Dashboard</h1>
        <EmployeeList employees={this.state.employees} />
      </div>
    );
  }
}

export default ManagerDashboard;
