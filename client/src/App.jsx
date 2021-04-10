import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SignUp from './views/SignUp';

function App() {
  return (
    <React.Fragment>
      <div className="App">enbarque</div>
      <Router>
        <Link to="/auth/sign-up">Sign Up</Link>
        <Route path="/auth/sign-up" component={SignUp} exact />
      </Router>
    </React.Fragment>
=======
import Navbar from './components/Navbar/Navbar';
import Dashboard from './views/Dashboard';
import Onboarding from './views/Onboarding';
import Employees from './views/Employees';
import OrgSettings from './views/OrgSettings';
import Account from './views/Account';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/user/team" component={Employees} />
          <Route exact path="/onboarding" component={Onboarding} />
          <Route exact path="/corp/settings" component={OrgSettings} />
          <Route exact path="/corp/user/:id" component={Account} />
        </Switch>
      </Router>
    </>
>>>>>>> 9869840aac2d23ca582590d2fe5899b9ccdf9f97
  );
}

export default App;
