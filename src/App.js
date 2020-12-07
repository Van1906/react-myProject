import React from 'react';
import './App.css';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {



  return (
    <div>
      <NavMenu />

      <Switch>
        <Route path='/' exact component = { ToDo }/>
        <Route path='/task' exact component = { ToDo }/>
        <Route path='/about' exact component = { About }/>
        <Route path='/task/:id' exact component = { SingleTask }/>
        <Route path='/contact' exact component = { Contact }/>
        <Route path='/404' exact component = { NotFound }/>
        <Redirect to='/404'/>
      </Switch>
    </div>
  );
}

export default App;
