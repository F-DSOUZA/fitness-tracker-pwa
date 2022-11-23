import React from 'react';
import './App.css';
import Index from './components/index';
import { TrackerDataProvider } from './utils/Context/context';
import { AuthProvider } from './utils/AuthContext/authContext';
import Auth from './pages/auth';
import { useAuthContext } from './utils/AuthContext/authContext';

function App() {
  const { token } = useAuthContext();

  // configured routes to display the pages and added a check to display the Login component on every route if the user is not yet logged into the application.
  if (!token) {
    return <Auth />;
  }

  return (
    <AuthProvider>
      <TrackerDataProvider>
        <Index />
      </TrackerDataProvider>
    </AuthProvider>
  );
}

export default App;
