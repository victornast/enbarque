import { BrowserRouter, Switch, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { signOut, verify } from './services/authentication';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <React.Fragment>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        <BrowserRouter>
          <header className="enbarque__header eb-header">
            <Link className="eb-header__logo" to="/">
              <h1 className="eb-logo eb-logo--standalone">
                <span className="sr-only">enbarque</span>
                <img
                  className="eb-logo__media"
                  src="/enbarque_logo.svg"
                  alt="enbarque Logo"
                  height="55px"
                />
              </h1>
            </Link>
            <nav>
              {this.state.user && (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/tasks/create">Create Task</Link>
                  <Link to={`/corp/user/${this.state.user._id}`}>Account</Link>
                  <button onClick={this.handleSignOut}>Sign Out</button>
                </>
              )}
            </nav>
          </header>
          {/* <Navbar user={this.state.user} /> */}
          {this.state.loaded && (
            <main>
              <Switch>
                {/* Route /task is here only temporarily: */}
                <ProtectedRoute
                  exact
                  path="/tasks"
                  authorized={this.state.user}
                  redirect="/tasks"
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
                  path="/corp/user/:id"
                  authorized={this.state.user}
                  redirect="/auth/signin"
                  render={(props) => (
                    <Account {...props} user={this.state.user} />
                  )}
                />

                <ProtectedRoute
                  exact
                  path="/tasks/create"
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
                    <SignUp {...props} onUserChange={this.handleUserChange} />
                  )}
                />
                <ProtectedRoute
                  exact
                  path="/auth/signin"
                  authorized={!this.state.user}
                  redirect="/dashboard"
                  render={(props) => (
                    <LogIn {...props} onUserChange={this.handleUserChange} />
                  )}
                />
                <ProtectedRoute
                  authorized={!this.state.user}
                  path="/welcome"
                  redirect="/dashboard"
                  render={(props) => (
                    <Welcome {...props} onUserChange={this.handleUserChange} />
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
          <footer>
            <p>
              <small>
                ©2021 Programming &amp; Design by Harumi Terayama, Katja Maasch,
                Matías Puletti &amp; Victor Nastasa
              </small>
            </p>
            <p>3rd Ironhack Project</p>
          </footer>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
