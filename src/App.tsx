import React from 'react';
import './App.css';
import Index from './components/index';
import { TrackerDataProvider } from './components/context';
import Auth from './pages/auth';
import useToken from './utils/useToken';

function App() {
  const { token, setToken } = useToken();

  //useEffect(() => {
  //  void fetch('/auth/session')
  //    .then((data: Response) => data.json())
  //    .then((data) => setToken(data));
  //}, []);

  // configured routes to display the pages and added a check to display the Login component on every route if the user is not yet logged into the application.
  if (!token) {
    return <Auth setSessionToken={setToken} />;
  }

  return (
    <TrackerDataProvider>
      <Index />
    </TrackerDataProvider>
  );
}

export default App;
