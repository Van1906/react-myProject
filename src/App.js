import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import Spinner from './components/Spinner/Spinner'
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux';

function App(props) {
  const {errorMessage, successMessage, loading} = props
  if(errorMessage){
    toast.error(errorMessage);
  }

  if(successMessage){
    toast.success(successMessage);
  }


  return (
    <>
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

    <ToastContainer
    position="bottom-left"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />

    {loading && <Spinner />}
    </>
  );
};

const mapStateToProps =(state)=>{
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    loading: state.loading
  };
};

export default connect(mapStateToProps, null)(App);
