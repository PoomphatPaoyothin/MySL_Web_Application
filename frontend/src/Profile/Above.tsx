import React, { useEffect, useState } from "react";
import './Profile.css';
import propic from '../Picture/profile/Profile.png'
import ProfileService from "./ProfileService";
import { userInfo } from "./InterfaceProfile";
import { useHistory } from "react-router";

const Above=(props:any|null)=>{
    const [objuser,setObjuser] = useState<userInfo>()
    const history = useHistory();
    
    const fetchuserprofile=()=>{
        return(
            ProfileService.fetchuserprofile(props.id)
            .then(res=>{
                setObjuser(res);
            })
        )
    }

    const gotoEdit=() =>{
        history.push(`/editprofile/${props.id}`)
    }

    useEffect(()=>{
        fetchuserprofile()
    },[])
    return(
        <div className='above'>

            <div  className='propicPos'>
                <img src={propic} className='propic'/>
            </div>

            <div className='namePos'>
                <div className='nameuser'>{objuser?.User_prefix_name} {objuser?.User_name} {objuser?.User_name}</div>
                <img src={'https://cdn.discordapp.com/attachments/912175328066142240/915088056124584086/nameProfile.png'} className='nameProfileBox'/>
            </div>

            <div className='followingAbovePos'>
                <div>
                    Following
                </div>
                <div className='nOfollowingAbove'>
                    {objuser?.following_amount}
                </div>
            </div>

            <div className='followerAbovePos'>
                <div>
                    Follower
                </div>
                <div className='nOfollowerAbove'>
                {objuser?.follower_amount}

                </div>
            </div>

            {props.ismyid &&
            <div className='editProfileButtonPos'>
                <img src = 'https://cdn.discordapp.com/attachments/912175328066142240/915093553565298748/Pencil.png' className='pencilPos'/>
                <button className='editProfileButton' onClick={gotoEdit}>EDIT PROFILE</button>
            </div>
            }

            
            {!props.ismyid &&
            <div className='followProfileButtonPos'>
                <button className='followProfileButton'>Follow</button>
            </div>
            }

        </div>
    )
}

export default Above