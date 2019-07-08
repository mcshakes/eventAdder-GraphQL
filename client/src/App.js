import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./components/Auth";
import BookingsPage from "./components/Bookings";
import EventsPage from "./components/Events";

import MainNavigation from "./components/navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import './App.css';

class App extends React.Component {
  
  login = (token, userId, tokenExpiration) => {

  }


  render() {
    return (
      <BrowserRouter>

        <AuthContext.Provider value={{token: null, userId: null}}>
          <MainNavigation />

          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact/>
              <Route path="/auth" component={ AuthPage } />
              <Route path="/events" component={ EventsPage } />
              <Route path="/bookings" component={ BookingsPage } />
            </Switch>
            
          </main>
        </AuthContext.Provider>

      </BrowserRouter>

    )
  };
}

export default App;
