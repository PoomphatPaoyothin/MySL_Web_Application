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


export default{
    fetchCategoryStat,
    fetchWordCategory,
    fetchuserprofile,
    fetchLessonStat,
}