import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import Sign_in from "../Login/Sign in/Sign_in";
import WordCategory from "../WordCategory/WordCategory";



const Home = () =>{
    const [isLogin,setIsLogin] = useState<boolean>(false)
    const checkpage = () =>{
        if(localStorage.id !== undefined){
            setIsLogin(true);
        }
    }
    useEffect(()=>{
        // console.log('check page')
        checkpage()
    },[])
   
    return(
        <div >
            {!isLogin && <Sign_in />}
            {isLogin && <WordCategory />}
        </div>
    )
}

export default Home