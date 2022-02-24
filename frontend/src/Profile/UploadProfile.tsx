import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button, Form } from "react-bootstrap";


const UploadProfile = (props:any) => {

  // state = {
  //   file: '',
  //   imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
  //   name:'',
  //   status:'',
  //   active: 'edit'
  // }
    const [image, setImage] = useState<any>()

    const photoUpload =(e:React.ChangeEvent<HTMLInputElement>) =>{
      e.preventDefault();
      const reader = new FileReader();
      if(e.target.files)
      {
        let file = e.target.files[0];
        setImage(file)
        console.log('file is', file)
      }
    }
    const upload=()=>{
      const data = new FormData();
      data.append('image', image, image.name)
      
    }
    
    // const handleSubmit=(e:React.ChangeEvent<HTMLInputElement>) =>{
    //   e.preventDefault();
    //   let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
    //   this.setState({
    //     active: activeP,
    //   })
    // }
    return(
      <div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control onChange={photoUpload} type="file" />
          <Button onClick={upload}>upload</Button>
        </Form.Group>
        {/* <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/> */}
      </div>
    )
}

export default UploadProfile;