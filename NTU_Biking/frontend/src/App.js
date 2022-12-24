import logo from './logo.svg';
import './App.css';
import LogIn from "./containers/LogIn";
import Homepage from './containers/Homepage';
import { useState } from 'react';

function App() {
  const [login, setLogin] = useState(false)
  return (
    login ?
    <Homepage /> :
    <LogIn onLogin={ () => setLogin(true) }/>
  );
}

export default App;
