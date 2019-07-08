import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./components/Auth";
import BookingsPage from "./components/Bookings";
import EventsPage from "./components/Events";

import MainNavigation from "./components/navigation/MainNavigation";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />

      <main className="main-content">
        <Switch>
          <Redirect from="/" to="/auth" exact/>
          <Route path="/auth" component={ AuthPage } />
          <Route path="/events" component={ EventsPage } />
          <Route path="/bookings" component={ BookingsPage } />
        </Switch>
        
      </main>

    </BrowserRouter>

  );
}

export default App;
