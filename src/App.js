import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginPage from './Login';
import TodoPage from './Todo';
import RegisterPage from './Register';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
          <Link className="nav-link" to="/todo">
            To-Do
          </Link>
        </div>
      </nav>
      <div className="container mt-5">
        <Switch>
          <Route exact path="/">
            <h1>Home Page</h1>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/todo">
            <TodoPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;