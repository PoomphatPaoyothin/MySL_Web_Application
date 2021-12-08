import { profile } from "console";
import React, { useEffect, useState } from "react";
import { userInfo } from "./InterfaceProfile";
import PopupConfirmDelete from "./PopupConfirmDelete";
import PopupConfirmName from "./PopupConfirmName";
import PopupConfirmPassword from "./PopupConfirmPassword";
import ProfileService from "./ProfileService";


const BoxEditProfile = (props:any) => {
    // console.log('reload')

    const [objprofile,setObjprofile] = useState<userInfo>()
    const [reload, setReload] = useState<boolean>(false)

    const [isNameEdit, setIsNameEdit] = useState<boolean>(false)
    const [isPassEdit, setIsPassEdit] = useState<boolean>(false)



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
        if(prefix == prefixo && username == usernameo && surname == surnameo){
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

    const prefixInput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setPrefix(e.target.value);
    }

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
    },[objprofile])



  return(
    <div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div>
            {objprofile?.User_prefix_name}
            {objprofile?.User_name}
            {objprofile?.User_surname} 
            {
                isbuttonName && 
                <button onClick={NameEdit}>แก้ไข</button>
            }
            {isNameEdit && 
            <div>
                <input value={prefix} onChange={prefixInput} placeholder="คำนำหน้าชื่อ" required />
                <input value={username} onChange={usernameInput} placeholder="ชื่อจริง" required />
                <input value={surname} onChange={surnameInput} placeholder="นามสกุล" required />

                <button onClick={submitName}> บันทึกการเปลี่ยนแปลง</button>
                <button onClick={cancel}> ยกเลิก </button>
            </div>
            }
            <PopupConfirmName        
            show={visibilityNames}
            onClose={popupCloseHandlerName}
            id={props.id}
            prefix = {prefix}
            username = {username}
            surname = {surname}
            />
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div>
            Password
            {
                isbuttonPass && 
                <button onClick={PassEdit}>แก้ไข</button>
            }
            {isPassEdit &&
            <div>
                <input value={oldpass} onChange={oldpassInput} placeholder="รหัสผ่านเก่า" type='password' required />
                <input value={newpass} onChange={newpassInput} placeholder="รหัสผ่านใหม่" type='password' required />
                <input value={confirmNewpass} onChange={confirmNewpassInput} placeholder="ยืนยันรหัสผ่านใหม่" type='password' required />

                <button onClick={submitPass}> บันทึกการเปลี่ยนแปลง</button>
                <button onClick={cancel}> ยกเลิก </button>
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
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div>
            <button onClick={Delete}>delete</button>
            <PopupConfirmDelete             
            show={visibilityDelete}
            onClose={popupCloseHandlerDelete}
            id={props.id}/>

        </div>


        <form action="#">
            <label >Language</label>
            <select name="languages" id="lang">
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                <option value="ไม่ระบุ">ไม่ระบุ</option>
            </select>
            <input type="submit" value="Submit" />
        </form>
    </div>

  )
}

export default BoxEditProfile;