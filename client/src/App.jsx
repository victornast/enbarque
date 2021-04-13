import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { signOut, verify } from './services/authentication';
import React, { Component, useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './views/Dashboard';
import Onboarding from './views/Onboarding';
import Employees from './views/Employees';
import OrgSettings from './views/OrgSettings';
import Account from './views/Account';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
// added in the branch to test
import AddUser from './views/AddUser';
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
            <ProtectedRoute
              exact
              path="/dashboard"
              render={(props) => (
                <Dashboard
                  {...props}
                  user={this.state.user}
                  authorized={this.state.user}
                />
              )}
              redirect="/auth/signin"
            />
            <Route exact path="/user/team" component={Employees} />
            <Route exact path="/onboarding" component={Onboarding} />
            <Route exact path="/corp/settings" component={OrgSettings} />
            <Route exact path="/corp/user/:id" component={Account} />
            <Route
              exact
              path="/auth/signup"
              render={(props) => (
                <SignUp {...props} onUserChange={this.handleUserChange} />
              )}
            />

            {/* temp testing route */}
            <Route
              exact
              path="/user/create"
              render={(props) => <AddUser {...props} user={this.state.user} />}
            />
            <Route
              exact
              path="/auth/login"
              render={(props) => (
                <LogIn {...props} onUserChange={this.handleUserChange} />
              )}
            />
            <Route exact path="/task/create" component={CreateTask} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
