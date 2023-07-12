import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [isShow, setIsShow] = useState(false)
  
  function displayARP()
  {
    if(isShow === true)
    {
      
    }
    return (
      <div>
        <h3>{getMessage.data}
        
        PLEASE WORK</h3></div>
    )
  }
  
  
  const testUser = {
    name: 'Jean Paul',
    imageUrl: 'https://img.broadtime.com/418456136300:500.webp',
    imageSize: 420,
  };

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
        <img
          className = "testPic"
          src = {testUser.imageUrl}
          style={{
            width: testUser.imageSize,
            height: testUser.imageSize
          }}
        />

        <TestButton />
        <p>{displayARP}</p>
        {displayARP}
        
        {isShow ?
        (
          <h1>uhh is this working? {getMessage.data}</h1>
        )
      : (
        <h1>uhh i don't think its working</h1>
      )
      }

        <p>DAHHHHHH </p>

        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/sign-up' element={<SignUp />} />
            </Routes>
        </Router>
                
            
      
      </header>
      
    </div>
    
  );
  

  function TestButton(){
    const [count, setCount] = useState(0);
    
    function handleClick(){
      setIsShow(true)
      //setCount(count +1);
    }

    return (
      //<button>I'm just a button in a human world</button>
      <button onClick = {handleClick}>
        Click for ARP test ass {String(isShow)}


      </button>
    );
  }

  





}
export default App;