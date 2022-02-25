import "./Profile"
import React, { useEffect, useState } from "react";
import { userInfo } from "./InterfaceProfile";
import PopupConfirmDelete from "./PopupConfirmDelete";
import PopupConfirmName from "./PopupConfirmName";
import PopupConfirmPassword from "./PopupConfirmPassword";
import ProfileService from "./ProfileService";
import UploadProfile from "./UploadProfile";

const BoxEditProfile = (props:any) => {
    // console.log('reload')

    const [objprofile,setObjprofile] = useState<userInfo>()
    const [reload, setReload] = useState<boolean>(false)

    const [isNameEdit, setIsNameEdit] = useState<boolean>(false)
    const [isPassEdit, setIsPassEdit] = useState<boolean>(false)

    const myid = localStorage.getItem('id')

    const [isbuttonName, setIsbuttonName] = useState<boolean>(true)
    const [isbuttonPass, setIsbuttonPass] = useState<boolean>(true)


    const [prefix, setPrefix] = useState<string|undefined>(objprofile?.User_prefix_name)
    const [username, setUsername] = useState<string|undefined>(objprofile?.User_name)
    const [surname, setSurname] = useState<string|undefined>(objprofile?.User_surname)

    const [prefixo, setPrefixo] = useState<string|undefined>(objprofile?.User_prefix_name)
    const [usernameo, setUsernameo] = useState<string|undefined>(objprofile?.User_name)
    const [surnameo, setSurnameo] = useState<string|undefined>(objprofile?.User_surname) 

    const [oldpass, setOldpass] = useState<string>()
    const [newpass, setNewpass] = useState<string>()
    const [confirmNewpass, setComfirmNewpass] = useState<string>()

    const [visibilityDelete, setVisibilityDelete] = useState(false);
    const [visibilityNames,setVisibilityNames] = useState(false);
    const [visibilityPass,setVisibilityPass] = useState(false);

    const [prefixSelect, setPrefixSelect] = useState<string|undefined>(prefix)
    console.log('prefix is', prefix)
    console.log('prefixSelect) is', prefixSelect)

    const prefixSelectOption = [{name:'Mr.', value:'Mr.'}, {name:'Ms.', value:'Ms.'},{name:'Mrs.', value:'Mrs.'},{name:'None', value:''}]



    const fetchuserprofile=() =>{
        console.log(props.id)
        ProfileService.fetchuserprofile(props.id)
        .then(res => {
            setObjprofile(res)
        })
    }
////////////////////////////////////////////////////////////////////-> edit
    const NameEdit=() =>{
        setIsNameEdit(true)
        setIsPassEdit(false)

        setIsbuttonName(false)
        setIsbuttonPass(true)
    }
    const PassEdit=() =>{
        setIsNameEdit(false)
        setIsPassEdit(true)

        setIsbuttonName(true)
        setIsbuttonPass(false)
    }

    
////////////////////////////////////////////////////////////////////-> submit
    const submitName=() =>{
        if(prefixSelect == prefixo && username == usernameo && surname == surnameo){
            alert('คุณไม่ได้ทำการเปลี่ยนชื่อ')
        }
        else{
            setVisibilityNames(true)
            setIsNameEdit(false)
            setIsPassEdit(false)
    
            setIsbuttonName(true)
            setIsbuttonPass(true)
        }

    }




    const submitPass=async () =>{
        if(newpass == undefined || oldpass == undefined || confirmNewpass == undefined)
        {
            alert('กรุณากรอกให้ครบ')
        }
        else
        {
            const oldpassObj = {
                User_password:oldpass
            }
            let tmp = await ProfileService.PostOldPasword(oldpassObj, props.id)
            // console.log('oldpass is' , oldpassObj, tmp)
            if(tmp)
            {
                if(newpass == confirmNewpass){
                    if(newpass == oldpass)
                    {
                        alert('รหัสผ่านใหม่ตรงกับรหัสผ่านเก่า')
                    }
                    else{
                        setVisibilityPass(true)

                        setIsNameEdit(false)
                        setIsPassEdit(false)
                
                        setIsbuttonName(true)
                        setIsbuttonPass(true)
                    }
                }
                else
                {
                    alert('รหัสผ่านยืนยันไม่ตรงกัน')
                }

            }
            else{
                alert('รหัสผ่านเก่าไม่ถูกต้อง')
            }

        }

    }
    
////////////////////////////////////////////////////////////////////-> input Name


    const usernameInput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(e.target.value);
    }

    const surnameInput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setSurname(e.target.value);
    }

////////////////////////////////////////////////////////////////////->input Pass

    const oldpassInput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setOldpass(e.target.value);
    }

    const newpassInput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setNewpass(e.target.value);
    }

    const confirmNewpassInput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setComfirmNewpass(e.target.value);
    }

////////////////////////////////////////////////////////////////////->Cancel
    const cancel=() =>{
        setIsNameEdit(false)
        setIsPassEdit(false)

        setIsbuttonName(true)
        setIsbuttonPass(true)

        setOldpass('');
        setNewpass('');
        setComfirmNewpass('');
    }

    const Delete=()=>{
        setVisibilityDelete(!visibilityDelete)

    }

    const popupCloseHandlerDelete = () => {
        setVisibilityDelete(false);
      };
      
    const popupCloseHandlerName = () => {
        setVisibilityNames(false);
      };

    const popupCloseHandlerPass = () => {
        setVisibilityPass(false);
      };

    useEffect(()=>{
        fetchuserprofile()
    },[])

    useEffect(()=>{
        console.log(objprofile)
        setPrefix(objprofile?.User_prefix_name);
        setUsername(objprofile?.User_name);
        setSurname(objprofile?.User_surname);

        setPrefixo(objprofile?.User_prefix_name);
        setUsernameo(objprofile?.User_name);
        setSurnameo(objprofile?.User_surname);
        setPrefixSelect(objprofile?.User_prefix_name)
    },[objprofile])
 


  return(
      <div>
          <p className="editnametext">แก้ไขโปรไฟล์</p>
          <div className="uploadpos">
            <UploadProfile userid = {myid}/>
          </div>
          
          
        <div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        
        <div className="editboxtext">
            <div className="showname">
                {objprofile?.User_prefix_name}
                {objprofile?.User_name} &nbsp;
                {objprofile?.User_surname}
            </div>
            {
                isbuttonName && 
                <button onClick={NameEdit} className="button-editName">แก้ไข</button>
            }
            {isNameEdit && 
            
            <div>
                <br/>
                <div className="containeredit">
                    <div className="selectprefix1">
                        <form action="#">
                            <select 
                                onChange={((e)=> {setPrefixSelect(e.target.value)})}
                                value={prefixSelect} className="prefix1">
                                {prefixSelectOption.map(item=>(
                                    <option value={item.value}>{item.name}</option>
                                ))}
                                
                            </select>
                        </form>
                    </div>   
                    
                    
                    <input value={username} onChange={usernameInput} className="inputname1" placeholder="ชื่อจริง" required />
                    <input value={surname} onChange={surnameInput} className="inputsurname1" placeholder="นามสกุล" required />
                </div>
                
                
                <br />
                <button onClick={submitName} className="savechange-button"> บันทึกการเปลี่ยนแปลง</button>
                <button onClick={cancel} className="canclechange-button"> ยกเลิก </button>
            </div>
            }
            <PopupConfirmName        
            show={visibilityNames}
            onClose={popupCloseHandlerName}
            id={props.id}
            prefix = {prefixSelect}
            username = {username}
            surname = {surname}
            />
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        
            <div className="editpasstext">
                <div className="showname"></div>
                Password
                {
                    isbuttonPass && 
                    <button onClick={PassEdit} className="button-editName">แก้ไข</button>
                }
                {isPassEdit &&
                    <div>
                        <div className="containeredit1">
                            <input value={oldpass} onChange={oldpassInput} className="oldpassinput" placeholder="รหัสผ่านเก่า" type='password' required />
                            <input value={newpass} onChange={newpassInput} className="newpassinput" placeholder="รหัสผ่านใหม่" type='password' required />
                            <input value={confirmNewpass} onChange={confirmNewpassInput} className="confirmpassinput" placeholder="ยืนยันรหัสผ่านใหม่" type='password' required />
                            
                        </div>
                        <br/>
                        <button onClick={submitPass} className="savechange-button"> บันทึกการเปลี่ยนแปลง</button>
                        <button onClick={cancel} className="canclechange-button"> ยกเลิก </button>
                    </div>
                }
                <PopupConfirmPassword 
                show = {visibilityPass}
                onClose = {popupCloseHandlerPass}
                id = {props.id}
                oldpass = {oldpass}
                newpass = {newpass}
                confirmNewpass = {confirmNewpass}
                setOldpass = {setOldpass}
                setNewpass = {setNewpass}
                setComfirmNewpass = {setComfirmNewpass}
                />
            </div>
        

        <div>
            <button onClick={Delete} className="button-delete">ลบโปรไฟล์</button>
            <PopupConfirmDelete             
            show={visibilityDelete}
            onClose={popupCloseHandlerDelete}
            id={props.id}/>

        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* <div>
            <button onClick={Delete}>delete</button>
            <PopupConfirmDelete             
            show={visibilityDelete}
            onClose={popupCloseHandlerDelete}
            id={props.id}/>

        </div> */}


    </div>
    </div>

  )
}

export default BoxEditProfile;