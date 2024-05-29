import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import {RecaptchaVerifier, getAuth, signInWithPhoneNumber} from 'firebase/auth'
import app, { userRef } from '../Firbase/firebase';
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs'


const auth=getAuth(app);
const Signup = () => {

  const navigate = useNavigate();

  const[loding, setLoding]= useState(false);
  const[form ,setForm]= useState({
    name:"",
     mobile:"",
    password:""
  });

  const[otpSent, setOtpSent]= useState(false);
  const[otp, setOtp] = useState("");

  const generaterecaptch= ()=>{
    window.recaptchavarifier= new RecaptchaVerifier(auth,'recaptcha-container',{
      size:'invisible',
      callback:(response)=>{

      }
    });
  }
 const requestOtp=()=>{
  setLoding(true);
  generaterecaptch();
  let appVarifier= window.recaptchavarifier;
   signInWithPhoneNumber(auth,`+91${form.mobile}`,appVarifier)
  .then((confirmationResult) =>{
    window.confirmationResult = confirmationResult;

    swal({
      text:"OTP Sent",
      icon:"success",
      buttons:false,
      timer:3000
    });
    setOtpSent(true);
    setLoding(false);

  }).catch((error)=>{
      console.log(error);
  });
   
 }

 const varifyOtp= ()=>{
       try{
        setLoding(true);
        window.confirmationResult.confirm(otp).then((result)=>{
        userData();
    swal({
      text:"Successfully Registered",
      icon:"success",
      buttons:false,
      timer:3000
    });
    navigate('/login');
    setLoding(false);

  })
       } catch(error){
        console.log(error);
       }
 }

 const userData=async()=>{
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(form.password, salt);
  await addDoc(userRef,{
    name:form.name,
    password:hash,
    mobile:form.mobile
  });
 }
  

  return (
    <div className='w-full flex flex-col mt-8  items-center p-2'>
      <div className='text-2xl font-bold mt-2'>Sign up</div> 
    {otpSent? 

    <>
    <div class="p-2 w-1/3">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white">OTP</label>
            <input
             id="otp" 
             name="otp"
             value={otp}
             onChange={(e)=>setOtp(e.target.value)}
     
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500
              focus:bg-white focus:ring-2 focus:ring-indigo-200 
              text-base outline-none text-gray-700 py-1 px-3 leading-8 
              transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div class="p-2 w-full">
        <button
         onClick={varifyOtp}
          class="flex mx-auto text-white bg-green-800 border-0 py-2 px-8 focus:outline-none
          hover:bg-green-600 rounded text-lg">
           {loding ? <TailSpin height={20} color="white"/>:'Confirm OTP'}
         </button>
        </div>
    </>
    :


    
    <>
   
      <div class="p-2 w-1/3">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white">Name</label>
            <input
             type='text'
             id="name" 
             name="name"
             value={form.name}
             onChange={(e)=>setForm({...form, name:e.target.value })}
     
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500
              focus:bg-white focus:ring-2 focus:ring-indigo-200 
              text-base outline-none text-gray-700 py-1 px-3 leading-8 
              transition-colors duration-200 ease-in-out"/>
          </div>
        </div>


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
          onClick={requestOtp}
          class="flex mx-auto text-white bg-green-800 border-0 py-2 px-8 focus:outline-none
          hover:bg-green-600 rounded text-lg">
           {loding ? <TailSpin height={20} color="white"/>:'Request OTP'}
         </button>
        </div>
     </>
    }
      <div>
        <p>If you have an account ?<Link to={"/login"}> <span className='text-blue-600'>Login</span></Link></p>
      </div>
     
     <div id='recaptcha-container'></div>
 </div>
  )
}

export default Signup