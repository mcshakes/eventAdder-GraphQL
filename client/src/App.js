import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./components/Auth";
import BookingsPage from "./components/Bookings";
import EventsPage from "./components/Events";

import MainNavigation from "./components/navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import './App.css';

class App extends React.Component {

  state = {
    token: null,
    userId: null
  }
  
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  }

  logout = () => {
    this.setState({ token: null, userId: null });
  };


  render() {
    return (
      <BrowserRouter>

        <AuthContext.Provider 
          value={{token: this.state.token, 
                  userId: this.state.userId, 
                  login: this.login, 
                  logout: this.logout}}
          >

          <MainNavigation />

          <main className="main-content">
            <Switch>

              {this.state.token && <Redirect from="/" to="/events" exact/>}
              {this.state.token && <Redirect from="/auth" to="/events" exact/>}

              {!this.state.token && <Route path="/auth" component={ AuthPage } />}

              <Route path="/events" component={ EventsPage } />
              a
              {this.state.token && <Route path="/bookings" component={ BookingsPage } />}

              {!this.state.token && <Redirect to="/auth" exact/>}
            </Switch>
            
          </main>
        </AuthContext.Provider>

      </BrowserRouter>

    )
  };
}

export default App;
