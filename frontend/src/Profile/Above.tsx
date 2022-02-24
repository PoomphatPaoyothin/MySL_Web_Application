import React, { useEffect, useState } from "react";
import './Profile.css';
import propic from '../Picture/profile/propic2.png'
import ProfileService from "./ProfileService";
import { userInfo } from "./InterfaceProfile";
import { useHistory } from "react-router";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';


const Above=(props:any|null)=>{
    const {promiseInProgress}  = usePromiseTracker()
    const [objuser,setObjuser] = useState<userInfo>()
    const [isfollowing, setIsfollowing] = useState<string>()
    const [tmp, setTmp] = useState<any[]>()
    const [tmp2, setTmp2] = useState<boolean>(false)
    const history = useHistory();
    const controller = new AbortController()
    const [visible,setVisible] = useState<boolean>(false)
    
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
        console.log()
    }


    const fetchfollowing=()=>{
        // console.log('aaaaaaaaa')
        ProfileService.fetchfollowing(props.myid)
        .then(res=>{
            console.log('2 res is',res)
            setTmp(res)
        })
        
    }

    const checkfollowing=()=>{
        console.log('3 tmp is', tmp)
        if(tmp!=undefined)
        {
            let size = tmp.length
            if(size == 0)
            {
                setIsfollowing('ติดตาม')
            }
            for(let i=0; i<size; i++)
            {
                if(tmp[i].User_followingID == props.id)
                {
                    setIsfollowing('กำลังติดตาม')
                }
                else
                {
                    setIsfollowing('ติดตาม')
                }
            }
        }

    }
    const follow=()=>{
        console.log('1')
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
            .then(res=>{
                setVisible(true)
                let timer1 = setTimeout(() => setTmp2(!tmp2), 2 * 1000);
                let timer2 = setTimeout(() => setVisible(false), 2 * 1000);


            })
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
            .then(res=>{
                setVisible(true)
                let timer1 = setTimeout(() => setTmp2(!tmp2), 2 * 1000);
                let timer2 = setTimeout(() => setVisible(false), 2 * 1000);

            })
        }
    }
    useEffect(()=>{
        fetchuserprofile()
        fetchfollowing()
    },[])

    useEffect(()=>{
        fetchuserprofile()
        fetchfollowing()
    },[tmp2])

    useEffect(()=>{
        console.log(tmp?tmp:props.id)
        checkfollowing()
    },[tmp])
    return(
        <div className='above'>

            <div  className='propicPos'>
                <img src={propic} className='propic'/>
            </div>

            <div className='namePos'>
                <div className='nameuser'>{objuser?.User_prefix_name} {objuser?.User_name} &nbsp; {objuser?.User_surname}</div>
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
                <button className='editProfileButton' onClick={gotoEdit}>EDIT PROFILE</button>
                <img src = 'https://cdn.discordapp.com/attachments/912175328066142240/915093553565298748/Pencil.png' className='pencilPos'/>

            </div>
            }

            
            {!props.ismyid &&
            <div className='followProfileButtonPos'>
                <button className='followProfileButton' onClick={follow}>{isfollowing}</button>
                {
                visible && 
                <div> loading.. </div>
                }
                {/* {console.log(promiseInProgress)} */}

            </div>
            }

        </div>
    )
}

export default Above

