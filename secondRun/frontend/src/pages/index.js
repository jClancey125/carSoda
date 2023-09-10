import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

 
const Home = () => {
    const [getMessage, setGetMessage] = useState({})
    const [getOldMessage, setOldGMessage] = useState({})
    const [isShow, setIsShow] = useState(false)
    var newTest 
    const [getInt, setInt] = useState({})

    function LoginForm(){
      const [User, setUser] = useState({
        user: 'Blon',
        host: '192.68.419.86',
        pass: 'uhhPassword'
  });
      
      function changeUser(e){
        setUser({
          ...User, user: e.target.value
        });
      }
      
      function changeHost(e){
        setUser({
          ...User, host: e.target.value
        });
      }
  
      function changePass(e){
        setUser({
          ...User, pass: e.target.value
        })
      }

      return(
        <>
        <label>
          Username:
        <input
          value={User.user}
          onChange={changeUser}
        />
        </label>
        <label>
          Password:
        <input
          value={User.pass}
          onChange={changePass}
        />
        </label>
        <label>
          Host:
        <input
          value={User.host}
          onChange={changeHost}
        />
        </label>
        <p>
          test Below:
          {User.user}
          {User.pass}
          {User.host}
        </p>
        
        
        </>
      )
    }
    


    
    

    

    return (
      <div>
        <Heading/>
        <TestButton message={getMessage.data} buttonMessage= {'show ARP'}/>
        <LoginForm/>
        </div>
        
    );


    function Heading() {
        
          return ( <h1>
              Cisco IOS integration PoC 
          </h1>
          );
    }

    

    function testJson(){

      const newTests = getMessage.data
      newTest = newTests


    }





   




    function TestButton({message, buttonMessage}){
        const [count, setCount] = useState(0);
        //testJson()
        function handleClick(){
            axios.get('http://137.184.194.3:5000/').then(response => {
    
              if(response.status === 200){
                console.log("SUCCESS", response)
                setGetMessage(response)
                setOldGMessage(response)
              }
              else{
                if(setOldGMessage){
                  setGetMessage(setOldGMessage)
                }            
              }         
            }).catch(error => {
              console.log(error)                          
            })   
          setIsShow(true)
          //setCount(count +1);
        }
        if (message === undefined || message === null)
        {
          message = ("please wait bruh")
        }
  
        return (
          //<button>I'm just a button in a human world</button>
          <div><button onClick = {handleClick}>
            {(buttonMessage)} is {String(isShow)}
    
    
          </button>

          {isShow ? 
        (
          
          <p>{message}</p>
        )
      : (
        <p>uhh i don't think its working</p>
      )
      }

          </div>
        );
    }
};
 
export default Home;