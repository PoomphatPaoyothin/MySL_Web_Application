import React from "react";
import Sign_in from './Login/Sign in/Sign_in';
import {
  BrowserRouter as Router,
  Routes,//Switch
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return(
    <Router>
      <div>
        <Routes>
          <Route path='/'>
            <Sign_in />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;