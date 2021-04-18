import { BrowserRouter, Switch, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { signOut, verify } from './services/authentication';
import React, { Component } from 'react';

// import Navbar from './components/Navbar/Navbar';
import Homepage from './views/Homepage';
import Dashboard from './views/Dashboard';
import Onboarding from './views/Onboarding';

import CreateOnboarding from './views/CreateOnboarding';
import OrgSettings from './views/OrgSettings';
import Account from './views/Account';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import SignOut from './views/SignOut';
import Welcome from './views/Welcome';
import ListTasks from './views/ListTasks';
import SingleTask from './views/SingleTask';

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
        <BrowserRouter>
          <nav>
            {(this.state.user && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/task/create">Create Task</Link>
                <Link to={`/corp/user/${this.state.user._id}`}>
                  Account
                </Link>
                <button onClick={this.handleSignOut}>Sign Out</button>
              </>
            )) || (
              <>
                <Link to="/auth/signin">Sign In</Link>
                <Link to="/auth/signup">Sign Up</Link>
              </>
            )}
          </nav>
          {/* <Navbar user={this.state.user} /> */}
          {this.state.loaded && (
            <main>
              <Switch>
                {/* Route /task is here only temporarily: */}
                <ProtectedRoute
                  exact
                  path="/tasks"
                  authorized={this.state.user}
                  redirect="/task"
                  render={(props) => (
                    <ListTasks {...props} user={this.state.user} />
                  )}
                />

                {/* Route /task is here only temporarily */}
                <ProtectedRoute
                  exact
                  path="/"
                  authorized={!this.state.user}
                  redirect="/dashboard"
                  component={Homepage}
                />
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
                    <CreateOnboarding
                      {...props}
                      user={this.state.user}
                    />
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
                  path="/corp/user/:id"
                  authorized={this.state.user}
                  redirect="/auth/signin"
                  render={(props) => (
                    <Account {...props} user={this.state.user} />
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
                  path="/auth/signup"
                  authorized={!this.state.user}
                  redirect="/dashboard"
                  render={(props) => (
                    <SignUp
                      {...props}
                      onUserChange={this.handleUserChange}
                    />
                  )}
                />
                <ProtectedRoute
                  exact
                  path="/auth/signin"
                  authorized={!this.state.user}
                  redirect="/dashboard"
                  render={(props) => (
                    <LogIn
                      {...props}
                      onUserChange={this.handleUserChange}
                    />
                  )}
                />
                <ProtectedRoute
                  authorized={!this.state.user}
                  path="/welcome"
                  redirect="/dashboard"
                  render={(props) => (
                    <Welcome
                      {...props}
                      onUserChange={this.handleUserChange}
                    />
                  )}
                />
                <ProtectedRoute
                  exact
                  path="/tasks/:id"
                  authorized={this.state.user}
                  redirect="/auth/signin"
                  render={(props) => (
                    <SingleTask {...props} user={this.state.user} />
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
            </main>
          )}
        </BrowserRouter>
      </>
    );
  }
}

export default App;
