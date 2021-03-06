import "./Profile"
import React, { useEffect, useState } from "react";
import { userInfo } from "./InterfaceProfile";
import PopupConfirmDelete from "./PopupConfirmDelete";
import PopupConfirmName from "./PopupConfirmName";
import PopupConfirmPassword from "./PopupConfirmPassword";
import ProfileService from "./ProfileService";
import UploadProfile from "./UploadProfile";
import { Alert, Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import Alertshow from "./Alertshow";

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
    const [alertshow, setAlertshow] = React.useState(false);
    const prefixSelectOption = [{name:'Mr.', value:'Mr.'}, {name:'Ms.', value:'Ms.'},{name:'Mrs.', value:'Mrs.'},{name:'None', value:''}]

    const [text, setText] = useState<string>('')

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
            setAlertshow(true)
            setText('???????????????????????????????????????????????????????????????????????????')
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
            setAlertshow(true)
            setText('?????????????????????????????????????????????')
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
                        setAlertshow(true)
                        setText('??????????????????????????????????????????????????????????????????????????????????????????')
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
                    setAlertshow(true)
                    setText('?????????????????????????????????????????????????????????????????????')
                }

            }
            else{
                setAlertshow(true)
                setText('??????????????????????????????????????????????????????????????????')
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
          <p className="editnametext">????????????????????????????????????</p>

          <div className="uploadpos1">
            <UploadProfile userid = {myid}/>
          </div>
          
          
        <div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        
        <div className="editboxtext">
            <div className="namecenter">
                <div className="showname">
                    ????????????:{' '}
                    {objprofile?.User_prefix_name}
                    {objprofile?.User_name} &nbsp;
                    {objprofile?.User_surname}
                </div>
                {
                    isbuttonName && 
                    <Button onClick={NameEdit} className="button-editName">???????????????</Button>
                }
            </div>
            
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
                    
                    
                    <input value={username} onChange={usernameInput} className="inputname1" placeholder="????????????????????????" required /> <br/>
                    <input value={surname} onChange={surnameInput} className="inputsurname1" placeholder="?????????????????????" required />
                    <br />
                    <Button onClick={submitName} className="savechange-button"> ????????????????????????????????????????????????????????????</Button>
                    <Button onClick={cancel} className="canclechange-button"> ?????????????????? </Button>
                </div>
                
                

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
                <div className="showname2">
                    ????????????????????????
                    
                
                    {
                    isbuttonPass && 
                    <Button onClick={PassEdit} className="button-editName2">???????????????</Button>
                    }
                </div>

                {isPassEdit &&
                    <div>
                            <div className="centerpass">
                                <input value={oldpass} onChange={oldpassInput} className="oldpassinput" placeholder="????????????????????????????????????" type='password' required /><br/>
                                <input value={newpass} onChange={newpassInput} className="newpassinput" placeholder="????????????????????????????????????" type='password' required /><br/>
                                <input value={confirmNewpass} onChange={confirmNewpassInput} className="confirmpassinput" placeholder="??????????????????????????????????????????????????????" type='password' required />
                            </div>
                            
                            <br/>
                            <Button onClick={submitPass} className="savechange-button2"> ????????????????????????????????????????????????????????????</Button>
                            <Button onClick={cancel} className="canclechange-button2"> ?????????????????? </Button>
                        
                        <br/>
                        {/* <Button onClick={submitPass} className="savechange-button2"> ????????????????????????????????????????????????????????????</Button>
                        <Button onClick={cancel} className="canclechange-button2"> ?????????????????? </Button> */}
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
            </div><br/>
        

        <div>
            <Button onClick={Delete}variant='danger' className="button-delete">???????????????????????????</Button>
            <PopupConfirmDelete             
            show={visibilityDelete}
            onClose={popupCloseHandlerDelete}
            id={props.id}/>

        </div>

        <Alertshow txt={text} show={alertshow} onHide={() => setAlertshow(false)} />
        

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