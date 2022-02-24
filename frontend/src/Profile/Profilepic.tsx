import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button, Form } from "react-bootstrap";
import ProfileService from "./ProfileService";
import LessonService from "../Lesson/LessonService";
import './Profile.css'

const Profilepic = (props:any) => {
    const [profilepic, setProfilepic] = useState<any>('propic')

    useEffect(()=>{
      if(props.userid){
        ProfileService.fetchuserprofile(props.userid)
        .then(res=>{
          console.log('resssss ', res.imguser)
          setProfilepic(res.imguser)
        })
      }
    },[props.userid])



    return(
      <div className = 'uploadprofilecard2'>
          <label className={'previewimage2'}>
            <div className="img-wrap2 img-upload2">
                <img className='pictureprofile2' src={require(`../profileforupload/${profilepic}.jpg`).default}/>
            </div>
          </label>

      </div>
    )
}

export default Profilepic;