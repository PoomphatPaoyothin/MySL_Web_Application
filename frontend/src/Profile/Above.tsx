import React, { useEffect, useState } from "react";
import './Profile.css';
import propic from '../Picture/profile/Profile.png'
import ProfileService from "./ProfileService";
import { userInfo } from "./InterfaceProfile";
import { useHistory } from "react-router";

const Above=(props:any|null)=>{
    const [objuser,setObjuser] = useState<userInfo>()
    const [isfollowing, setIsfollowing] = useState<string>()
    const [tmp, setTmp] = useState<any[]>()
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


    const fetchfollowing=()=>{
        ProfileService.fetchfollowing(props.myid)
        .then(res=>{
            setTmp(res)
            let size = res.length
            if(size == 0)
            {
                setIsfollowing('ติดตาม')
            }
            for(let i=0; i<size; i++)
            {
                if(res[i].User_followingID == props.id)
                {
                    setIsfollowing('กำลังติดตาม')
                }
                else
                {
                    setIsfollowing('ติดตาม')
                }
            }
        })
    }
    const follow=()=>{
        if(isfollowing == 'ติดตาม')
        {
            const followerobj={
                userid1: props.id,
                userid2: props.myid
            }
    
            const followingobj={
                userid1: props.myid,
                userid2: props.id
            }
            ProfileService.Postfollower(followerobj)
            ProfileService.Postfollowing(followingobj)
            ProfileService.Patchfollowingamount(props.myid)
            ProfileService.Patchfolloweramount(props.id)
        }
        else{
            const followerobj={
                userid1: props.id,
                userid2: props.myid
            }
    
            const followingobj={
                userid1: props.myid,
                userid2: props.id
            }
            ProfileService.Postunfollower(followerobj)
            ProfileService.Postunfollowing(followingobj)
            ProfileService.Patchunfollowingamount(props.myid)
            ProfileService.Patchunfolloweramount(props.id)
        }


    }
    useEffect(()=>{
        fetchuserprofile()
        fetchfollowing()
    },[])

    useEffect(()=>{
        fetchfollowing()
    },[tmp])
    return(
        <div className='above'>

            <div  className='propicPos'>
                <img src={propic} className='propic'/>
            </div>

            <div className='namePos'>
                <div className='nameuser'>{objuser?.User_prefix_name} {objuser?.User_name} {objuser?.User_surname}</div>
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
                <button className='followProfileButton' onClick={follow}>{isfollowing}</button>
            </div>
            }

        </div>
    )
}

export default Above