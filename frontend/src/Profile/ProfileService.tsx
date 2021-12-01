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

async function patchPasword(obj:any, id:string): Promise<any|null> {
    const res = await fetch(`${url}/user/${id}/setting/password`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const patchPassword = await res.json();
    console.log(patchPassword)
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
    console.log(patchNameresult)

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
    console.log('delete = ',tmp)
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
}