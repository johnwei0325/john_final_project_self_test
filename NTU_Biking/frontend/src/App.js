import logo from './logo.svg';
import './App.css';
import LogIn from "./containers/LogIn";
import Homepage from './containers/Homepage';
import { useState, useEffect } from 'react';
import ParkInModal from './containers/ParkInModal';

const LOCALSTORAGE_KEY = "save_me";
const loginBefore = localStorage.getItem(LOCALSTORAGE_KEY);
function App() {
  
  const [login, setLogin] = useState(loginBefore||false)
  useEffect(()=>{
    localStorage.setItem(LOCALSTORAGE_KEY, login);
  },[login])
  return (
    login ?
    <Homepage /> :
    <LogIn onLogin={ () => setLogin(true) }/>
    // <ParkInModal></ParkInModal>
  );
}

export default App;


