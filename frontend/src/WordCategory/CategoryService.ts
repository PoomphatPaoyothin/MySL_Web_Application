import {url} from '../url'
import {wordInfo} from './InterfaceCategory'

async function fetchWordCategory(): Promise<wordInfo[]>{
    const res = await fetch(`${url}/word/category`);
    const word = await res.json();
    return word;
}

export default{
    fetchWordCategory,
}