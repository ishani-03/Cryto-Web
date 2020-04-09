import React from 'react';
import Navi from './Navi';
import Display_entry from './Display_entry';
import Entry from './Entry';
import Home from './Home';
import Exchange from './Exchange'
import Display_exchange from './Display_exchange'
import Test from './Test'
import TestEntry from './components/TestEntry'
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom';



function App() {
  return (
    <Router>
    <div>

      <Navi/>
      {/* <TestEntry/> */}
      <Route path="/" exact component={Home}/>
      <Route exact path="/exchange" component={Exchange}/>  
      <Route exact path="/entry"  component={Entry}/>
      <Switch>
      <Route path="/entry/:id"  component={Display_entry}/>
      <Route path="/exchange/:id"  component={Display_exchange}/>
      </Switch>
      
    </div>
    </Router>
  );
}



export default App;
