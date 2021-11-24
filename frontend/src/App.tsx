import React from "react";
import Sign_in from './Login/Sign in/Sign_in';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return(
    <Router>
      <div>
        <Switch>
          <Route path='/signin'>
            <Sign_in />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;