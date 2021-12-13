import React, { useEffect, useState } from "react";
import './WordCategory.css';
import image from '../Picture/WordCategory/ExportWordCategory';
import WordIcon from './WordIcon';
import CategoryService from "./CategoryService";
import { wordInfo } from "./InterfaceCategory";
// Animal,
// Appliances,
// Body,
// Clothes,
// Country,
// Dialy,
// Family,
// Food,
// Fruits,
// Occupation,
// Sport,
// Subject,

const WordCategory = () =>{
    const [wordcategory,setWordcategory] = useState<wordInfo[]>()

    const fetchWordCategory=()=>{
        return(
            CategoryService.fetchWordCategory()
            .then(res=>{
                setWordcategory(res);
            })
        )
    }


    useEffect(()=>{
        fetchWordCategory()
    },[])


    return(
        <div className='container'>
            <p className='choosechapter'>
                อยากเรียนบทไหน เลือกเลย
            </p>
            <div className='background'>
                <div className='multimiddle'>
                    {console.log('wordcate is',wordcategory)}
                    {wordcategory?.map((obj)=> ( 
                        <WordIcon name= {obj.Category_name} image = {obj.Word_picture} catid={obj.ID} firstword={obj.First_word}/>
                    ))} 
                </div>
            </div>
        </div>
    )
}

export default WordCategory