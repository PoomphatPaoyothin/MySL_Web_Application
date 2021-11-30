import React, { useEffect, useState } from "react";
import Follow from "./Follow";
import './Profile.css';
import Stat from "./Stat";
import Above from "./Above";
import ProfileService from "./ProfileService";



const Profile=(props:any)=>{
    const myid = localStorage.getItem('id');
    const userId = props.match.params.id;
    const [ismyid,setIsmyid] = useState<boolean>(false);
    const [isid,setIsid] = useState<boolean>(false);

    const Ismyuserid=() => {
        setIsmyid(myid===userId)
    }

    const Isuseid=() =>{
        ProfileService.fetchuserprofile(userId)
        .then(res => {
            console.log(res)
            if(res==undefined)
            {
                console.log('set id false');
                setIsid(false)
            }
            else{
                console.log('set id true');
                setIsid(true)
            }
        })
    }



    useEffect(()=>{
        Ismyuserid()
        Isuseid()
    },[])
    
    return(
        <div>
        {isid &&
        <div className='container'>
            <Above id={userId} ismyid={ismyid}/>
            <Stat id={userId}/>
            <Follow id={userId}/>
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