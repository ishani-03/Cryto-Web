import React , {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import Exchange from './components/Exchange';
import Entry from './components/Entry';
import NavBar from './components/NavBar';
import {Route , Link} from 'react-router-dom';

function App(){
  return(
    <div>
       <NavBar/>
       <Route excat path="/entry" component={Entry}/>
       <Route excat path="/exchange" component={Exchange}/>
       <h1></h1>

        
         {/* <Entry></Entry>  */}
         {/* <Exchange></Exchange>  */}
        {/* <TestEntry/> */}
        {/* <DisplayEntry></DisplayEntry> */}
        
      </div>
  )
}

export default App;