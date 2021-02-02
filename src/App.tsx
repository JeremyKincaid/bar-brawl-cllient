import './App.css';
import React from 'react';
import { Helmet } from "react-helmet";
import Auth from './components/Auth/Auth';
import User from './components/User/User';
import {Button} from '@material-ui/core';
import { Container } from 'reactstrap';

interface States{
  sessionToken: string;
  userId: number;
};


class App extends React.Component<{}, States> {
  constructor(states: States){
    super(states);
    this.updateToken.bind(this);
    this.clearToken.bind(this);
    this.state = {
      sessionToken: "",
      userId: 0
    }
  }


  updateToken = (newToken: string, userID: number) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', userID.toString());
  }

  clearToken = () => {
    localStorage.clear();
  }

  render() {
    if (localStorage.getItem('token') === null) {
      return (
        <div className="App">
          <Helmet>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap" rel="stylesheet"></link>
          </Helmet>
          <Auth updateToken={this.updateToken}/>
        </div>
      );
    }
    else {
      return (
        <Container className="App">
          <Helmet>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Helmet>
          <Button onClick={this.clearToken}>Logout</Button>
          <User userId={this.state.userId} sessionToken={this.state.sessionToken}/>
        </Container>
      );

    }
  }
}

export default App;