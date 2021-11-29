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


const App = () => {
  const id = localStorage.getItem('accesToken')
  // const NavRoute = ({exact, path, component: Component}) => (
  //   <Route exact={exact} path={path} render={(props) => (
  //     <div>
  //       <Header/>
  //       <Component {...props}/>
  //     </div>
  //   )}/>
  // )

  return(
    <Router>
      <div>
        <Navigatebar/>
        <Switch>
          <Route path='/' exact component={Home} />

          <Route path='/lesson' component={Lesson} />

          <Route path='/nav' component={Navigatebar} />


        </Switch>
      </div>
    </Router>
  )
}

export default App;