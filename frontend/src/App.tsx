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
import Navigatebar from "./Navbar/Navigatebar";
import Home from "./Home/Home"
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";


const App = () => {
  const id = localStorage.getItem('accesToken')


  return(
    <Router>
      
      <div>
      <Navigatebar/>
        <Switch>
          <Route path='/' exact component={Home} />

          <Route path='/lesson'  component={Lesson} />

          <Route path='/nav' component={Navigatebar} />

          <Route path='/profile/:id' component={Profile} />

          <Route path='/editprofile/:id' component={EditProfile} />


        </Switch>
      </div>
    </Router>
  )
}

export default App;