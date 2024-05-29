import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { db } from '../Firbase/firebase';
import { ThreeCircles } from 'react-loader-spinner';
import Review from './Review';

const Detail = () => {
 
    const{id}= useParams();

    const[data, setData]=useState({
        title:"",
        image:"",
        year:"",
        description:"",
        rating:0,
        rated:0
    })

    const[loding, setLoding]=useState(false);


    useEffect(()=>{
        setLoding(true);
       async function getData(){
        const _doc= doc(db,"movies",id)
        const _data= await getDoc(_doc);

        setData(_data.data());
        setLoding(false)
       }
       getData();
    },[])
    

  return (
    <div className=" p-4 flex w-full justify-center mt-5 flex-col md:flex-row items-center md:items-start">
    { loding? <ThreeCircles height={35} />:

   
    <>
      <img className='h-96 md:sticky top-20 ' src={data.image} alt="" />


        <div className='ml-0 md:ml-4 w-full md:w-1/2 '>
        <h1 className='text-gray-300 font-bold text-2xl md:text-3xl'>{data.title}<span className='text-xl'>({data.year})</span></h1>
        <ReactStars 
        size={20} 
        half={true} 
        value={data.rating/data.rated}/>
        <p className='mt-3'>{data.description}</p>

        <Review id={id} prevRating={data.rating}  userRated={data.rated}/>
 
        </div>
    
    </>
   }

    </div>
  )
}

export default Detail