
import {Route , Routes} from 'react-router-dom';
import './App.css';
import Cards from './component/Cards';
import Header from './component/Header';
import Addmovie from './component/Addmovie';
import Detail from './component/Detail';
import { createContext, useState } from 'react';
import Login from './component/Login';
import Signup from './component/Signup';


const Appstate= createContext();


function App() {
  
  const[login, setLogin]= useState();
  const[username, setUsername]= useState();

  return (
     <Appstate.Provider value={{login, username, setLogin, setUsername}}>
    <div className="App relative">
      <Header/>
        <Routes>
          <Route path='/' element={<Cards/>}/>
          <Route path='/addmovie' element={<Addmovie/>} />
          <Route path='/detail/:id' element={<Detail/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />



        </Routes>
      
  
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
