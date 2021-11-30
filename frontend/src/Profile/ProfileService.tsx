import {url} from '../url'
import {StatInfo, wordInfo, userInfo} from './InterfaceProfile'


async function fetchNameLesson(id:string|null): Promise<StatInfo[]>{
    const res = await fetch(`${url}/user/profile/catstat/${id}`);
    const obj = await res.json();
    return obj;
}
async function fetchWordCategory(): Promise<wordInfo[]>{
    const res = await fetch(`${url}/word/category`);
    const word = await res.json();
    return word;
}

async function fetchuserprofile(id:string|null): Promise<wordInfo>{
    const res = await fetch(`${url}/user/profile/${id}`);
    const word = await res.json();
    console.log("word is",word)
    return word;
}

export default{
    fetchNameLesson,
    fetchWordCategory,
    fetchuserprofile,
}