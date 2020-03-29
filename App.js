import React , {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import Exchange from './components/Exchange';
import Entry from './components/Entry';
//import TestEntry from './components/TestEntry';
import {Route , Link} from 'react-router-dom';



class App extends Component{
  render(){
    
    return(
      <div>
        
       <Route excat path="/" component={Entry}/>
        <Route excat path="/exchange" component={Exchange}/>
        
         <Entry></Entry> 
         <Exchange></Exchange> 
        {/* <TestEntry/> */}
        
      </div>
    )
  }
}

export default App