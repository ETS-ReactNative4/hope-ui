//Dependencias
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//Component
import './App.css';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import Client from './containers/Client/Client';
import Agent from './containers/Agent/Agent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/cliente" component={Client}/>
            <Route path="/agente" component={Agent}/>
            <Route path="/" exact component={Home}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;