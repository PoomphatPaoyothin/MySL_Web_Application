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
import Loadingpop from "./Loadingpop/Loadingpop";
import Camera from './Camera/Camera';
import Quiz from "./Lesson/Quiz";
import Test from "./Lesson/Test";
import Dashboard from "./Dashboard/Dashboard";
import UploadProfile from "./Profile/UploadProfile";

const App = () => {
  const id = localStorage.getItem('id')

  const notlogin=()=>(
    <div>
    <Route exact path='/' component={Home} />
    </div>
  )
  const login=()=>(
    <div>
      <Navigatebar/>
      <Route exact path='/' component={Home} />
    </div>
  )
  const islogin=()=>{
      console.log('id isssss', id)
      if(id)
      {
        return(login)
      }
      else
      {
        return(notlogin)
      }
  }
  const DefaultContainer = ()=>(
    <div>
      <Navigatebar/>
      <Route path='/lesson/:catId/:word'  component={Lesson} />
      <Route path='/profile/:id' component={Profile} />
      <Route path='/editprofile/:id' component={EditProfile} />
      <Route path='/quiz/:catId/:lessonId' component={Quiz} />
      <Route path='/webcam' component={Camera} />
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/test' component={UploadProfile} />

    </div>
  )

  const Register=()=>(
    <div>
      <Route path='/register/1' component={EmailPass} />
      <Route path='/register/2/:id' component={Confirm} />
      <Route path='/register/3/:id' component={Name} />

    </div>
  )

  const forgetpass=()=>(
      <div>
        <Route path='/forgetpass/1' component={Forget1} />
        <Route path='/forgetpass/2' component={Forget2} />
        <Route path='/forgetpass/3/:id' component={Forget3} />
      </div>
  )


  return(
    <Router>
      <div>
        <Switch>
        <Route  path='/(register)' component={Register} />
        <Route  path='/(forgetpass)' component={forgetpass} />
        <Route  path='/' exact component={islogin()} />
        <Route component={DefaultContainer} />



        </Switch>
      </div>
    </Router>
  )
}

export default App;