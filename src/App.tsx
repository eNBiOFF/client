import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { createStore } from 'redux';
import { SignInForm } from './screen/sign_in/sign-in.component';
import { SignUp } from './screen/sign_up/sign-up.component';
import { NavBar } from './components/nav-bar/nav-bar.component';
import { Messenger } from './components/messenger/messenger.component';
import { MainPage } from './screen/main/main.component';
import { Profile } from './screen/profile/profile';

// const store = createStore(reducer)
function App() {

  
  return (
    <div className='content'>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInForm />} />
          <Route path='/sign_up' element={<SignUp />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
