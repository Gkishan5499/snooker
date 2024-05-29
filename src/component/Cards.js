import React, {useEffect, useState} from 'react';
import ReactStars from 'react-stars';
import { ThreeCircles} from 'react-loader-spinner';
import  {getDocs } from 'firebase/firestore';
import { movieRef } from '../Firbase/firebase';
import { Link } from 'react-router-dom';


const Cards = () => {

    const[data,setData] = useState([]);
    const[loding , setLoding]=useState(false);
    
    useEffect(()=>{
      async function getData(){
         setLoding(true);
         const _data= await getDocs(movieRef);

         _data.forEach((doc) => {
            setData((prv)=>[...prv,{...(doc.data()),id:doc.id}])
         });
       setLoding(false);
      }
      getData();
    },[])
    

  return (
    <div className='flex flex-wrap justify-between p-3 mt-2'>
    {loding? <div className='flex w-full justify-center items-center h-96'><ThreeCircles height={40} color='white'/></div>:
      
    
     

        data.map((e,i)=>{
            return(
             <Link to={`/detail/${e.id}`}><div key={i} className='card shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-5 transition-all duration-500'>
                 <img className='h-55 md:h-72' src={e.image} alt="" />
                  <h1><span className='text-gray-500'>Name:</span>{e.title}</h1>
                  <h1 className='flex items-center'><span className='text-gray-500 mr-2'>Rating: </span>
                  <ReactStars className='mr-1'
                    size={20}
                    half={true}
                    value={e.rating/e.rated}
                    edit={false}
                />({e.rated})</h1>
                <h1><span className='text-gray-500'>Year:</span>{e.year}</h1>
             </div>
             </Link>
            )
       
        })
     }
    

      
    
    </div>
  )
}

export default Cards