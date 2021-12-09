import {url} from '../url'
import {wordInfo} from './InterfaceCategory'

async function fetchWordCategory(): Promise<wordInfo[]>{
    const res = await fetch(`${url}/word/category`);
    const word = await res.json();
    return word;
}

async function fetchword(idcat:string|null): Promise<any[]>{
    const res = await fetch(`${url}/word/wordcat/${idcat}`);
    const obj = await res.json();
    return obj;
}
export default{
    fetchWordCategory,
    fetchword,
}