import './App.scss';
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
  );
}

export default App;
