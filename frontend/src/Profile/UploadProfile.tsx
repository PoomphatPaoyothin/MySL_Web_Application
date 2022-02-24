import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button, Form } from "react-bootstrap";
import ProfileService from "./ProfileService";

const UploadProfile = (props:any) => {
    const [image, setImage] = useState<any>()
    const [show, setShow] = useState<any>()
    const [profilepic, setProfilepic] = useState<any>()
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
          setStatusupload(true)
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
        console.log(`../profileforupload/${myid}`+'.jpg')
      }
    },[props.userid])


    
    return(
      <div className = 'uploadprofilecard'>
          <label className={'previewimage'}>
            <div className="img-wrap img-upload">
              {
                !status &&
                <img className='pictureprofile' src='https://cdn.discordapp.com/attachments/912175328066142240/946383747014615120/images.png'/>
              }
              {
                status && statusupload &&
                <img className='pictureprofile' src={require(`../profileforupload/${myid}.jpg`).default}/>
              }
              {
                status && !statusupload &&
                <img className='pictureprofile' src={show}/>
              }
              {console.log('ssssss', status)}
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