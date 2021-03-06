import React, { useEffect, useState } from "react";
import Follow from "./Follow";
import './Profile.css';
import Stat from "./Stat";
import Above from "./Above";
import ProfileService from "./ProfileService";
import { useHistory } from "react-router-dom";
import RegisterService from "../Register/RegisterService";
import UploadProfile from "./UploadProfile";



const Profile=(props:any)=>{
    const history=useHistory()
    const myid = localStorage.getItem('id');
    const userId = props.match.params.id;
    const [ismyid,setIsmyid] = useState<boolean>(false);
    const [isid,setIsid] = useState<boolean>(false);
    const [userinfo,setUserinfo] = useState<any>()
    const [myid2,setMyid2] = useState<any>();

    const Ismyuserid=() => {
        setIsmyid(myid===userId)
    }

    const Isuseid=() =>{
        ProfileService.fetchuserprofile(userId)
        .then(res => {
            if(res==undefined)
            {
                setIsid(false)
            }
            else{
                setIsid(true)
            }
        })
    }

///////////////////////////////////////////////////////////////////////////////////
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
            // else if(userinfo.register_stat == 3)
            // {
            //     history.push(`/`)
            // }
        }

    },[userinfo])


///////////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        Ismyuserid()
        Isuseid()
    },[])
    
    return(
        <div>
        {isid &&
        <div className='containerprofile'>
            <Above id={userId} ismyid={ismyid} myid={myid}/>
            <Stat id={userId}/>
            {/* <Follow id={userId}/> */}
        </div>
        }

        {!isid &&
        <div className='container'>
            no user
        </div>
        }
        </div>

    )
}

export default Profile