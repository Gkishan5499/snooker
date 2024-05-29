import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewRef } from '../Firbase/firebase';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Firbase/firebase';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Review = ({id,prevRating, userRated}) => {
    const useAppstate= useContext(Appstate);
    const navigate= useNavigate();
    const[rating, setRating]=useState();
    const[loding, setLoding]= useState(false);
    const[reviewlod, setReviewlod]=useState(false);
    const[form, setForm]= useState("");
    const[data,setData]= useState([]);

    const sentReview=async()=>{
        setLoding(true);
        try{
            if(useAppstate.login){  
            await addDoc(reviewRef,{
                movieId:id,
                name: useAppstate.username,
                thought:form,
                rating:rating,
                timestamp:new Date().getTime()

            })
            const ref= doc(db,"movies",id);
            await updateDoc(ref, {
                rating:prevRating+rating,
                rated:userRated+1

            })
            setRating(0);
            setForm("");
            swal({
                title:"Review added",
                icon:'success',
                buttons:false,
                timer:3000
              
               });
        }else{
         navigate('/login')
        }
    }
        catch(error){
            swal({
                title:error.message,
                icon:'error',
                buttons:false,
                timer:3000
              
               });
           
        }
        setLoding(false);

    }

    useEffect(()=>{
     async function getData(){
      setReviewlod(true);
      let que= query(reviewRef, where('movieId','==',id));
      const querySnapshot= await getDocs(que);

      querySnapshot.forEach((doc)=>{
        setData((prev)=>[...prev,doc.data()]);
      })
      setReviewlod(false);
     }
     getData();

    },[])


  return (
    <div className='mt-4  w-full border-t-2 border-gray-600'>

        <ReactStars
            size={30}
            half={true}
            value={rating}
            onChange={(rate)=>setRating(rate)}
   
        /> 

        <input 
        value={form}
        onChange={(e)=>setForm(e.target.value)}
         type="text"
         placeholder='Share your views'
         className='p-3 w-full header outline-none'
         />

         <button
         onClick={sentReview}
          className='p-2 w-full flex justify-center bg-red-600'>
          {loding?<TailSpin height={20} color='white'/>:"Share" }</button>

          {reviewlod? <div className='mt-6 flex justify-center'><ThreeDots height={15} color='white'/></div>:
          
          <div className='mt-3'>
           
           {
            data.map((e,i)=>{
                return(
                    <div className='p-2 mt-2 border-b border-gray-600'>
                   <div className='flex ' key={i}>
                    <p className='text-gray-400'>{e.name}</p>
                    <p className='ml-3 text-sm'>({new Date(e.timestamp).toLocaleString()})</p>
    
                    </div>
                    <ReactStars
                     size={15}
                     half={true}
                     value={e.rating}
                     edit={false}
                     /> 

                     <p>{e.thought}</p>
                    
                    </div>
                )
            })
           }
          </div>

          }
    </div>
  )
}

export default Review