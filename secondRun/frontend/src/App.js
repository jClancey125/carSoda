import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://137.184.194.3:5000/').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>DAHHHHHH</p>
        <div>{getMessage.status === 200 ? 
          <h3>{getMessage.data}</h3>
          :
          <h3>PLEASE WORK</h3>}</div>
      </header>
    </div>
  );
}
export default App;