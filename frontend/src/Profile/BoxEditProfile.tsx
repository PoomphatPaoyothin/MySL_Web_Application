import { profile } from "console";
import React, { useEffect, useState } from "react";
import { userInfo } from "./InterfaceProfile";
import PopupConfirm from "./PopupConfirm";
import ProfileService from "./ProfileService";


const BoxEditProfile = (props:any) => {
    const [objprofile,setObjprofile] = useState<userInfo>()
    const [newfetch, setNewfetch] = useState<boolean>(false)

    const [isNameEdit, setIsNameEdit] = useState<boolean>(false)
    const [isPassEdit, setIsPassEdit] = useState<boolean>(false)



    const [isbuttonName, setIsbuttonName] = useState<boolean>(true)
    const [isbuttonPass, setIsbuttonPass] = useState<boolean>(true)


    const [prefix, setPrefix] = useState<string|undefined>(objprofile?.User_prefix_name)
    const [username, setUsername] = useState<string|undefined>(objprofile?.User_name)
    const [surname, setSurname] = useState<string|undefined>(objprofile?.User_surname)

    const [oldpass, setOldpass] = useState<string>()
    const [newpass, setNewpass] = useState<string>()
    const [confirmNewpass, setComfirmNewpass] = useState<string>()

    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = () => {
        setVisibility(false);
      };


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
        setIsNameEdit(false)
        setIsPassEdit(false)

        setIsbuttonName(true)
        setIsbuttonPass(true)

        const changeNameObj = {
            User_prefix_name: prefix,
            User_name:username,
            User_surname:surname
        }
        ProfileService.patchName(changeNameObj, props.id)

    }


    const submitPass=async () =>{
        setIsNameEdit(false)
        setIsPassEdit(false)

        setIsbuttonName(true)
        setIsbuttonPass(true)
        console.log(newpass, oldpass)
        if(newpass == confirmNewpass)
        {
            const oldpassObj = {
                User_password:oldpass
            }
            let tmp = await ProfileService.PostOldPasword(oldpassObj, props.id)
            console.log('tmp is ',tmp)
            if(tmp)
            {
                const changepassObj = {
                    password:newpass
                }
                ProfileService.patchPasword(changepassObj,props.id)

            }
            else{
                alert('รหัสผ่านเก่าไม่ถูกต้อง')
            }
            setOldpass('');
            setNewpass('');
            setComfirmNewpass('');

        }
        else
        {
            alert('รหัสผ่าน กับ การยืนยันรหัสผ่านไม่ตรงกัน')
            setOldpass('');
            setNewpass('');
            setComfirmNewpass('');
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
        setVisibility(true)
    }

    const popupCloseHandlers=() => {
        setVisibility(false);
    };

    useEffect(()=>{
        fetchuserprofile()
    },[])

    useEffect(()=>{
        console.log(objprofile)
        setPrefix(objprofile?.User_prefix_name);
        setUsername(objprofile?.User_name);
        setSurname(objprofile?.User_surname);
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
                <input value={oldpass} onChange={oldpassInput} placeholder="รหัสผ่านเก่า" required />
                <input value={newpass} onChange={newpassInput} placeholder="รหัสผ่านใหม่" required />
                <input value={confirmNewpass} onChange={confirmNewpassInput} placeholder="ยืนยันรหัสผ่านใหม่" required />

                <button onClick={submitPass}> บันทึกการเปลี่ยนแปลง</button>
                <button onClick={cancel}> ยกเลิก </button>
            </div>
            }
        </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div>
            <button onClick={Delete}>delete</button>
            <PopupConfirm             
            onClose={popupCloseHandlers}
            show={visibility}
            id={props.id}/>

        </div>

    </div>

  )
}

export default BoxEditProfile;