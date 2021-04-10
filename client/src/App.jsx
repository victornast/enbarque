import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
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
  );
}

export default App;
