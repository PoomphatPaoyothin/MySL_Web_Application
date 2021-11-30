import React from "react";
import './Profile.css';
import propic from '../Picture/profile/Profile.png'

const Above=(props:any|null)=>{
    return(
        <div className='above'>

            <div  className='propicPos'>
                <img src={propic} className='propic'/>
            </div>

            <div>
                <img src={'https://cdn.discordapp.com/attachments/912175328066142240/915088056124584086/nameProfile.png'} className='nameProfile'/>
            </div>

            <div className='followingAbovePos'>
                <div>
                    Following
                </div>
                <div className='nOfollowingAbove'>
                    20
                </div>
            </div>

            <div className='followerAbovePos'>
                <div>
                    Follower
                </div>
                <div className='nOfollowerAbove'>
                    20
                </div>
            </div>

            {props.ismyid &&
            <div className='editProfileButtonPos'>
                <img src = 'https://cdn.discordapp.com/attachments/912175328066142240/915093553565298748/Pencil.png' className='pencilPos'/>
                <button className='editProfileButton'>EDIT PROFILE</button>
            </div>
            }

        </div>
    )
}

export default Above