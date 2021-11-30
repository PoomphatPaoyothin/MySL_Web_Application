import {url} from '../url'
import {StatInfo} from './InterfaceProfile'


async function fetchNameLesson(id:string|null): Promise<StatInfo[]>{
    const res = await fetch(`${url}/user/profile/catstat/${id}`);
    const obj = await res.json();
    return obj;
}

export default{
    fetchNameLesson,
}