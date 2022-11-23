import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import Home from '../pages/home';
import Tracker from '../pages/tracker';
import Search from '../pages/search';
import ProtectedRoute from './protectedRoute/protectedRoute';
import ErrorBoundary from './errorBoundary/errorBoundary';
//how can i make the nav component not rerender on every url change

function Index() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute token={''}>
              <Home />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="tracker"
          element={
            <ProtectedRoute token={''}>
              <Tracker />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="search"
          element={
            <ProtectedRoute token={''}>
              <Search />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
      </Routes>
    </Router>
  );
}

export default Index;

{
  /*<Route
  path="/teams/:teamId"
  loader={({ params }) => {
    return fetchTeam(params.teamId);
  }}
/>;*/
}
