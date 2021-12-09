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
import EmailPass from "./Register/EmailPass";
import Confirm from "./Register/Confirm";
import Name from "./Register/Name";
import Forget1 from "./ForgetPassword/Forget1";
import Forget2 from "./ForgetPassword/Forget2";
import Forget3 from "./ForgetPassword/Forget3";


const App = () => {
  const id = localStorage.getItem('accesToken')


  return(
    <Router>
      
      <div>
      <Navigatebar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/nav' component={Navigatebar} />


          <Route path='/lesson/:catId/:word'  component={Lesson} />


          <Route path='/profile/:id' component={Profile} />

          <Route path='/editprofile/:id' component={EditProfile} />

          <Route path='/register/1' component={EmailPass} />
          <Route path='/register/2' component={Confirm} />
          <Route path='/register/3' component={Name} />

          <Route path='/forgetpass/1' component={Forget1} />
          <Route path='/forgetpass/2' component={Forget2} />
          <Route path='/forgetpass/3' component={Forget3} />





        </Switch>
      </div>
    </Router>
  )
}

export default App;