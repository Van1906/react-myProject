import React from 'react';
import './App.css';
import FormHeader from './less3-homework/formHeader';
import FormFooter from './less3-homework/formFooter';
import Form from './less3-homework/form'

function App() {
  return (
    <div className='text-center'>
      <FormHeader text='PLEASE, FILL THE FORM'/>
      <Form name='Jhon'/>
      <FormFooter/>
    </div>
  );
}

export default App;
