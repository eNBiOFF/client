import React from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { createStore } from 'redux';
import { SignInForm } from './screen/sign_in/sign-in.component';
import { SignUp } from './screen/sign_up/sign-up.component';

// const store = createStore(reducer)
function App() {
  return (
    <div className='content'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInForm />} />
          <Route path='/sign_up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
