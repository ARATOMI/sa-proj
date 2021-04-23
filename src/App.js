import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Header from './Header'
import Body from './body'
import Navbar from './navbar'
import Testbody from './testbody'

import Home from './Home/Home'
import Projects from './Projects/Projects'
import Project from './Project/Project'
import About from './About/About'
import ErrorPage from './ErrorPage/ErrorPage'
import LoginPage from './LoginPage/LoginPage'


const url = 'https://45.67.230.70:5001';


function App() {

  const [user, setUser] = useState({
    "isLogined": false,
    "id": null,
    "token": null,
    "nickname": "Undefined",
    "email": "Undefined",
    "phoneNumber": "Undefined"
  });



  const logout = () => {
    setUser({
      "isLogined": false,
      "id": null,
      "token": null,
      "nickname": "Undefined",
      "email": "Undefined",
      "phoneNumber": "Undefined"
    });
  };

  return (
    <Router >
      <Header user={user} logout={logout} />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <LoginPage setUser={setUser} user={user} />
        </Route>
        <Route exact path='/projects'>
          <Projects user={user} />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/project/:id' children={<Project user={user} />}></Route>
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
