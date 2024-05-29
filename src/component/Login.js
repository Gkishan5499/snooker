import { getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { userRef } from '../Firbase/firebase';
import { Appstate } from '../App';
import bcrypt from 'bcryptjs';


const Login = () => {
 const useAppstate= useContext(Appstate);
 const navigate= useNavigate() ;
const[loding, setLoding]= useState(false);

  const[form ,setForm]= useState({
     mobile:"",
    password:""
  });

  const login=async()=>{
    setLoding(true);
    try{
     let quer= query(userRef, where('mobile','==',form.mobile));
     const snapshot= await getDocs(quer);
     snapshot.forEach((doc) => {
      const _doc= doc.data();
       const isUser= bcrypt.compareSync(form.password, _doc.password);

       if(isUser){
        useAppstate.setLogin(true);
        useAppstate.setUsername(_doc.name);
        swal({
          title:"Logged in",
          icon:'success',
          buttons:false,
          timer:3000
                
        });
        navigate('/');
       }
       else{
        swal({
          title:"Invalid Login",
          icon:'error',
          buttons:false,
          timer:3000
                
        });
       }
     });
    }catch(error){
      swal({
        title:error.message,
        icon:'error',
        buttons:false,
        timer:3000
              
      });
    }
    setLoding(false);

  }

  return (
    <div className='w-full flex flex-col mt-8  items-center p-2'>
     <div className='text-2xl mt-2'>Login</div> 


     <div class="p-2 w-1/3">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white">Mobile No.</label>
            <input
             type={'number'}
             id="mobile" 
             name="mobile"
             value={form.mobile}
             onChange={(e)=>setForm({...form, mobile:e.target.value })}
     
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500
              focus:bg-white focus:ring-2 focus:ring-indigo-200 
              text-base outline-none text-gray-700 py-1 px-3 leading-8 
              transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div class="p-2 w-1/3">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white">Password</label>
            <input
             type="password"
             id="name" 
             name="name"
             value={form.password}
             onChange={(e)=>setForm({...form, password:e.target.value })}
            
             class="w-full bg-gray-100  rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div class="p-2 w-full">
        <button
          onClick={login}
          class="flex mx-auto text-white bg-green-800 border-0 py-2 px-8 focus:outline-none
          hover:bg-green-600 rounded text-lg">
           {loding ? <TailSpin height={20} color="white"/>:'Login'}
         </button>
        </div>
      <div>
        <p>Do not have account ?<Link to={"/signup"}> <span className='text-blue-600'>Signup</span></Link></p>
      </div>

    </div>
  )
}

export default Login