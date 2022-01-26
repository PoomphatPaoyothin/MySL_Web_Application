import React, { useEffect, useState } from "react";
import './Profile.css';
import ProfileService from "./ProfileService";

const Follow=(props:any)=>{
    const [visible, setVisible] = useState<boolean>(false)
    const [followingobj, setFollowingobj] = useState<any[]>()
    const [followerobj, setFollowerobj] = useState<any[]>()


    const showfollower=()=>{
        setVisible(true)
    }
    const showfollowing=()=>{
        setVisible(false)
    }

    const fetchfollower=()=>{
        ProfileService.fetchfollower(props.id)
        .then(res=>{
            setFollowerobj(res)
        })
    }
    
    const fetchfollowing=()=>{
        ProfileService.fetchfollowing(props.id)
        .then(res=>{
            setFollowingobj(res)
        })
    }
    useEffect(()=>{
        console.log('followingobj',followingobj)
    },[followingobj])
    
    useEffect(()=>{
        fetchfollower()
        fetchfollowing()
    },[])
    return(
        <div className='follow'>
            <div className='multimiddle'>
                <button onClick={showfollowing} className="showfollowing">Following</button>
                <button onClick={showfollower} className="showfollower">Follower</button>
                
                
                {visible &&
                    <div>
                        {followingobj?.map((obj)=> (
                        <div>{obj.UserFollowingName}</div>
                        ))} 
                    </div>

                }
                
                {!visible &&
                    <div>
                        {followerobj?.map((obj)=> (
                        <div>{obj.UserFollowerName}</div>
                        ))} 
                    </div>
                }

            </div>


        </div>
    )
}

export default Follow