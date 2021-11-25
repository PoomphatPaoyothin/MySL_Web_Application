
async function fetchWordCategory(): Promise<any[]>{
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
    const res = await fetch('http://localhost:3000/word/category');
    const word = await res.json();
    console.log(word)
    return word;
}

export default{
    fetchWordCategory,
}