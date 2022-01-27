// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
// import LessonService from "./LessonService";


// const Test=()=>{
//     const [data, setData] = useState()
//     const [nums, setNums] = useState<number>(0)


//     const start=()=>{
//         const tmp = {
//             num: nums
//         }
//         LessonService.plusint(tmp)
//         .then(res=>{
//             const tmp2 = parseInt(res);
//             setNums(tmp2)
//         })
//     }



//     const [selectedFile, setSelectedFile] = useState();
// 	const [isFilePicked, setIsFilePicked] = useState(false);
//     const [isSelected, setIsSelected] = useState(false)

// 	const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
// 		setSelectedFile(e.target.files[0]);
// 		setIsSelected(true);
// 	};

// 	const handleSubmission = () => {
// 	};

//     return(
//         // <div>
//         //     <button onClick={start}> CLick</button>
//         //     {nums}
//         // </div>
//         <div>
//             <input type="file" name="file" onChange={changeHandler} />

// 			{isSelected ? (
// 				<div>
// 					<p>Filename: {selectedFile.name}</p>
// 					<p>Filetype: {selectedFile.type}</p>
// 					<p>Size in bytes: {selectedFile.size}</p>
// 					<p>
// 						lastModifiedDate:{' '}
// 						{selectedFile.lastModifiedDate.toLocaleDateString()}
// 					</p>
// 				</div>
// 			) : (
// 				<p>Select a file to show details</p>
// 			)}
// 			<div>
// 				<button onClick={handleSubmission}>Submit</button>
// 			</div>
//         </div>
//     )
// }


// export default Test

import * as React from "react";
import { useState } from "react";
import LessonService from "./LessonService";


export default function App() {

//   const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const files = (e.target as HTMLInputElement).files;

//     if(files != undefined){
//         const formData = new FormData();
//         formData.append("text", files, files.name);
//     }

//     console.log(files)
//   };
  const [files, setFiles] = React.useState<File>()

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (fileList)
    {
        setFiles(fileList[0]);
    }
  };

  const uploadFile = function (ev:any) {
    ev.preventDefault();
    if (files) {
        const formData = new FormData();
        formData.append('file', files);
        formData.append('filename', files.name)
        
        // LessonService.sendfile(formData)
    }
};


  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <hr />

      <input
      type="file"
      accept=".pdf,.doc,.docx,.txt"
      onChange={handleOnChange}
      multiple
    />
    
      <button onClick={uploadFile}>
      uploadFile
      </button>

    </div>
  );
}
