import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import Sign_in from "../Login/Sign in/Sign_in";
import RegisterService from "../Register/RegisterService";
import WordCategory from "../WordCategory/WordCategory";



const Home = () =>{
    const [isLogin,setIsLogin] = useState<boolean>(false)
    const [userinfo,setUserinfo] = useState<any>()
    const [myid2,setMyid2] = useState<any>();
    const myid =localStorage.getItem('id')
    const history=useHistory()

    const checkpage = () =>{
        if(localStorage.id !== undefined){
            setIsLogin(true);
        }
    }
    
    useEffect(()=>{
        // console.log('check page')
        checkpage()
    },[])
    useEffect(()=>{
        setMyid2(localStorage.getItem('id'))
    },[])
    useEffect(()=>{
        if(myid2)
        {
            RegisterService.fetchuserprofile(myid2)
            .then(res=>{
                setUserinfo(res)
            })
        }
    },[myid2])
    

    useEffect(()=>{
        if(userinfo !=undefined)
        {
            if(userinfo.register_stat == 1)
            {
                history.push(`/register/2/${myid}`)
            }
            else if(userinfo.register_stat == 2)
            {
                history.push(`/register/3/${myid}`)
            }
            else if(userinfo.register_stat == 3)
            {
                history.push(`/`)
            }
        }

    },[userinfo])
    return(
        <div >
            {!isLogin && <Sign_in />}
            {isLogin && <WordCategory />}
        </div>
    )
}

export default Home