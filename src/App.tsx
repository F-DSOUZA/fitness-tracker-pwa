import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from './components/index';
import { TrackerDataProvider } from './components/context';
import Auth, { sessionResponse } from './pages/auth';

function setSessionToken(userToken: sessionResponse) {
  console.log('setSessionToken', userToken);
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  if (tokenString !== null) {
    console.log('getSessionToken ', tokenString);
    const userToken = JSON.parse(tokenString) as sessionResponse;
    if (
      userToken &&
      userToken?.user &&
      typeof userToken?.user != 'string' &&
      'role' in userToken.user &&
      userToken.user.role === 'authenticated'
    ) {
      return userToken?.user?.token;
    }
  }
  return null;
}

function App() {
  const sessionToken = getToken();

  //useEffect(() => {
  //  void fetch('/auth/session')
  //    .then((data: Response) => data.json())
  //    .then((data) => setToken(data));
  //}, []);

  // configured routes to display the pages and added a check to display the Login component on every route if the user is not yet logged into the application.
  if (!sessionToken) {
    return <Auth setSessionToken={setSessionToken} />;
  }

  return (
    <TrackerDataProvider>
      <Index />
    </TrackerDataProvider>
  );
}

export default App;
