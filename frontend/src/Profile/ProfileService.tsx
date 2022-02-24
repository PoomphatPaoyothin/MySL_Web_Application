import {url} from '../url'
import {StatInfo, wordInfo, userInfo} from './InterfaceProfile'


async function fetchCategoryStat(id:string|null): Promise<StatInfo[]>{
    const res = await fetch(`${url}/user/profile/catstat/${id}`);
    const obj = await res.json();
    return obj;
}
async function fetchWordCategory(): Promise<wordInfo[]|undefined>{
    const res = await fetch(`${url}/word/category`);
    const obj = await res.json();
    return obj;
}

async function fetchuserprofile(id:string|null): Promise<userInfo>{
    const res = await fetch(`${url}/user/profile/${id}`);
    const obj = await res.json();
    return obj;
}

async function fetchLessonStat(id:string|null): Promise<any[]>{
    const res = await fetch(`${url}/user/profile/lessonstat/${id}`);
    const obj = await res.json();
    return obj;
}
async function fetchfollower(id:string): Promise<any[]>{
    const res = await fetch(`${url}/user/userfollower/${id}`);
    const obj = await res.json();
    console.log('obj is',obj)
    return obj
}

async function fetchfollowing(id:string): Promise<any[]>{
    const res = await fetch(`${url}/user/userfollowing/${id}`);
    const obj = await res.json();
    return obj
}

async function patchPasword(obj:any, id:string): Promise<any|null> {
    const res = await fetch(`${url}/user/${id}/setting/password`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const patchPassword = await res.json();

    if(patchPassword !== undefined)
    {
        alert('รหัสผ่านเปลี่ยนเรียบร้อยแล้ว')
    }
    else{
        alert('ผิดพลาด')
    }
    window.location.reload();
}
async function PostOldPasword(obj:any, id:string): Promise<boolean> {
    const res = await fetch(`${url}/user/checkpassword/${id}`,{
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });
    const IsSame= await res.json();
    return IsSame
}

async function patchName(obj:any, id:string): Promise<any|null> {
    const res = await fetch(`${url}/user/${id}/setting/username`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const patchNameresult = await res.json();
    if(patchNameresult !== undefined)
    {
        alert('เปลี่ยนชื่อผู้ใช้เรียบร้อยแล้ว')
    }
    else{
        alert('ผิดพลาด')
    }
    window.location.reload();
}

async function Delete(id:string): Promise<boolean> {
    const res = await fetch(`${url}/user/${id}/setting/delete`,{
        method: 'PATCH',
        body: JSON.stringify(id),
    });

    const tmp = await res.json();
    if(tmp !== undefined)
    {
        return true
    }
    else{
        return false
    }
}

async function Postfollower(obj:any): Promise<boolean> {
    const res = await fetch(`${url}/user/createfollower`,{
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });
    const IsSame= await res.json();
    // console.log('post follower',IsSame)
    return IsSame
}

async function Postfollowing(obj:any): Promise<boolean> {
    const res = await fetch(`${url}/user/createfollowing`,{
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });
    const IsSame= await res.json();
    // console.log('following', IsSame)
    return IsSame
}

async function Postunfollower(obj:any): Promise<boolean> {
    const res = await fetch(`${url}/user/updateUnfollower`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });
    const IsSame= await res.json();
    return IsSame
}

async function Postunfollowing(obj:any): Promise<boolean> {
    const res = await fetch(`${url}/user/updateUnfollowing`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });
    const IsSame= await res.json();
    return IsSame
}
async function Patchfollowingamount(id:string): Promise<boolean> {
    const res = await fetch(`${url}/user/${id}/updatefollower`,{
        method: 'PATCH',
        body: JSON.stringify(id),
    });

    const tmp = await res.json();
    return tmp
}

async function Patchfolloweramount(id:string): Promise<boolean> {
    const res = await fetch(`${url}/user/${id}/updatefollowing`,{
        method: 'PATCH',
        body: JSON.stringify(id),
    });
    console.log('aaaaaaaaaaaaaaaaaaaaaa')
    const tmp = await res.json();
    return tmp
}

async function Patchunfollowingamount(id:string): Promise<boolean> {
    const res = await fetch(`${url}/user/${id}/updateUNfollower`,{
        method: 'PATCH',
        body: JSON.stringify(id),
    });
    console.log('aaaaaaaaaaaaaaaaaaaaaa')

    const tmp = await res.json();
    return tmp
}

async function Patchunfolloweramount(id:string): Promise<boolean> {
    const res = await fetch(`${url}/user/${id}/updateUNfollowing`,{
        method: 'PATCH',
        body: JSON.stringify(id),
    });

    const tmp = await res.json();

    return tmp
}

async function uploadpic(userid:string,obj:any): Promise<any> 
{
    console.log(obj)
    const res = await fetch(`http://localhost:8000/uploadpicture/${userid}`,{
        method: 'POST',
        body: obj
    });
    const tmp = await res.json();
    return tmp
}

async function patchpathpics(userid:string): Promise<any> 
{
    const res = await fetch(`${url}/user/updateuserimg/${userid}`,{
        method: 'PATCH',
        body: userid
    });
    const tmp = await res.json();
    return tmp
}
export default{
    fetchCategoryStat,
    fetchWordCategory,
    fetchuserprofile,
    fetchLessonStat,
    patchPasword,
    patchName,
    PostOldPasword,
    Delete,
    fetchfollower,
    fetchfollowing,
    Postfollower,
    Postfollowing,
    Patchfollowingamount,
    Patchfolloweramount,
    Postunfollower,
    Postunfollowing,
    Patchunfollowingamount,
    Patchunfolloweramount,
    uploadpic,
    patchpathpics,
}