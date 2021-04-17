import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { signOut, verify } from './services/authentication';
import React, { Component } from 'react';

import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './views/Dashboard';
import ManagerDashboard from './views/ManagerDashboard';
import Onboarding from './views/Onboarding';

import CreateOnboarding from './views/CreateOnboarding';

import Employees from './views/Employees';
import OrgSettings from './views/OrgSettings';
import Account from './views/Account';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import SignOut from './views/SignOut';
import ListTasks from './views/ListTasks';

// added in the branch to test
//import AddUser from "./components/forms/AddUser";
import CreateTask from './views/CreateTask';

class App extends Component {
  state = {
    user: null,
    loaded: false
  };

  async componentDidMount() {
    const user = await verify();
    this.handleUserChange(user);
    this.setState({ loaded: true });
  }

  handleUserChange = (user) => {
    this.setState({
      user
    });
  };

  handleSignOut = async () => {
    await signOut();
    this.handleUserChange(null);
  };

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            {/* Route /task is here only temporarily: */}
            <ProtectedRoute
              exact
              path="/task"
              authorized={this.state.user}
              redirect="/task"
              render={(props) => (
                <ListTasks {...props} user={this.state.user} />
              )}
            />
            {/* Route /task is here only temporarily */}
            <ProtectedRoute
              exact
              path="/dashboard"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <Dashboard {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              exact
              path="/manager-dashboard"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <ManagerDashboard {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              exact
              path="/user/team"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <Employees {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              exact
              path="/onboarding"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <Onboarding {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              exact
              path="/onboarding/create/:id"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <CreateOnboarding {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              exact
              path="/corp/settings"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <OrgSettings {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              exact
              path="/auth/verify"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => <Account {...props} user={this.state.user} />}
            />
            <Route
              exact
              path="/auth/signup"
              render={(props) => (
                <SignUp {...props} onUserChange={this.handleUserChange} />
              )}
            />

            <Route
              exact
              path="/auth/signin"
              render={(props) => (
                <LogIn {...props} onUserChange={this.handleUserChange} />
              )}
            />
            <ProtectedRoute
              exact
              path="/task/create"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <CreateTask {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              exact
              path="/auth/signout"
              authorized={this.state.user}
              redirect="/auth/signin"
              render={(props) => (
                <SignOut
                  {...props}
                  user={this.state.user}
                  onSignOut={this.handleSignOut}
                />
              )}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
