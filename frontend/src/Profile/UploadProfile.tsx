import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button, Form } from "react-bootstrap";
import ProfileService from "./ProfileService";
import LessonService from "../Lesson/LessonService";

const UploadProfile = (props:any) => {
    const [image, setImage] = useState<any>()
    const [show, setShow] = useState<any>()
    const [profilepic, setProfilepic] = useState<any>('propic')
    const [status, setStatus] = useState<boolean>(false)
    const [myid, setMyid] = useState<string>('')
    const [statusupload, setStatusupload] = useState<boolean>(false)
    const photoUpload =(e:React.ChangeEvent<HTMLInputElement>) =>{
      e.preventDefault();
      if(e.target.files)
      {
        let file = e.target.files[0];
        setShow(URL.createObjectURL(file))
        setImage(file)
        setStatus(true)
      }
    }
    const upload=()=>{

      if(image && myid!=''){
        const data = new FormData();
        data.append('file', image, image.name)
        ProfileService.uploadpic(myid, data)
        .then(res=>{
          ProfileService.patchpathpics(myid)
          .then(res=>{
            setStatus(false)
            alert('อัพเดทโปรไฟล์สำเร็จ')
          })          
        })
      }
    }

    useEffect(()=>{
      if(image){
        setStatus(true)
      }
    },[])
    useEffect(()=>{
      if(props.userid){
        setMyid(props.userid)
        ProfileService.fetchuserprofile(props.userid)
        .then(res=>{
          console.log('resssss ', res.imguser)
          setProfilepic(res.imguser)
        })

      }
    },[status])



    return(
      <div className = 'uploadprofilecard'>
          <label className={'previewimage'}>
            <div className="img-wrap img-upload">
              {
                !status &&
                <img className='pictureprofile' src={require(`../profileforupload/${profilepic}.jpg`).default}/>
              }

              {
                status &&
                <img className='pictureprofile' src={show}/>
              }
            </div>
            <input className="photo-upload"type="file" onChange={photoUpload}/> 
          </label>

          <div>
            <Button onClick={upload}>upload</Button>
          </div>
      </div>
    )
}

export default UploadProfile;