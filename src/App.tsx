import React, {useState} from "react";
import Sign_in from './Login/Sign in/Sign_in';
type AppProps ={
    message?: string
}

const App = (prop:AppProps) => {
  return(
    <Sign_in />
  )
}

export default App;