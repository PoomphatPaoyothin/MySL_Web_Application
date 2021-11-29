import React from "react";
import Sign_in from './Login/Sign in/Sign_in';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Link
import WordCategory from "./WordCategory/WordCategory";
import Lesson from "./Lesson/Lesson";
import Navbar from "./Navbar/Navbar";


const App = () => {
  const id = localStorage.getItem('accesToken')
  return(
    <Router>
      <div>
        {/* <Navbar /> */}

        <Switch>



          <Route path='/login'>
            <Sign_in />
          </Route>



          <Route path='/lesson'>
            <Lesson />
          </Route>
  
          <Route path='/'>
            <WordCategory />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App;