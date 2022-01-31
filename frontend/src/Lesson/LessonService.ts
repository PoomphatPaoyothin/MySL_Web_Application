import {url} from '../url'


async function fetchlesson(idcat:string|null): Promise<any>{
    const res = await fetch(`${url}/word/lesson/${idcat}`);
    const obj = await res.json();
    return obj;
}

async function fetchword(idcat:string|null): Promise<any>{
    const res = await fetch(`${url}/word/wordcat/${idcat}`);
    const obj = await res.json();
    // console.log(obj)
    return obj;
}

async function fetchwordCat(): Promise<any>{
    const res = await fetch(`${url}/word/category`);
    const word = await res.json();
    return word;
}

async function fetchflask(): Promise<any>{
    const res = await fetch('http://localhost:5000/');
    const obj = await res.json();
    return obj;
}


async function sendfile(obj:any): Promise<any> {
    for (var pair of obj.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const res = await fetch(`http://localhost:5000/`,{
        method: 'POST',
        body: obj,
    });
    const result= await res.json();
    console.log('result is', result)
    return result
}

async function sendans(obj:any): Promise<any> {
    for (var pair of obj.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const res = await fetch(`http://localhost:5000/`,{
        method: 'POST',
        body: obj,
    });
    const result= await res.json();
    console.log('result is', result)
    return result
}

export default{
    fetchlesson,
    fetchword,
    fetchwordCat,
    fetchflask,
    sendfile,
    sendans,
}