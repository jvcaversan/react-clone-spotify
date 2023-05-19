import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './Components/Album';
import Favorites from './Components/Favorites';
import Login from './Components/Login';
import Search from './Components/Search';
import Profile from './Components/Profile';
import ProfileEdit from './Components/ProfileEdit';
import NotFound from './Components/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route exact path="/search" render={ (props) => <Search { ...props } /> } />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route
            exact
            path="/favorites"
            render={ (props) => <Favorites { ...props } /> }
          />
          <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
          <Route
            exact
            path="/profile/edit"
            render={ (props) => <ProfileEdit { ...props } /> }
          />
          <Route exact path="*" render={ (props) => <NotFound { ...props } /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
