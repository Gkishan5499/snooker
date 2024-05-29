import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';



const Header = () => {

  const useAppstate= useContext(Appstate);
  return (

    <div className='sticky header top-0 z-10  text-3xl flex justify-between text-red-600 font-bold p-3 border-b-2 border-gray-500'>
     <Link to={'/'}><span>Snooker <span className='text-white'>World</span></span></Link> 
     {useAppstate.login?

     <Link to={"/addmovie"}><h1 className='text-lg cursor-pointer'><Button><AddIcon className='mr-2 ' color='secondary'/> 
     <span className='text-white'>Add New</span></Button></h1>
     </Link>
     :
     <Link to={"/login"}><h1 className='text-lg cursor-pointer bg-green-400 p-0'><Button>
     <span className='text-white uppercase'>Login</span></Button></h1>
     </Link>
     }
    </div>
  )

  
}

export default Header