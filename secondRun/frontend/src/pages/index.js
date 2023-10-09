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
    ;

    function LoginForm(){
      const [user, setUser] = useState({
        user: 'Blon',
        host: '192.68.419.86',
        pass: 'uhhPassword'
  })

      function handleClick(){
        axios({
          method: "POST",
          url:"http://137.184.194.3:5000/",
          data:{
            userName : user.user,
            password : user.pass,
            host : user.host
          }
        })}
      
      function changeUser(e){
        setUser({
          ...user, user: e.target.value
        });
      }
      
      function changeHost(e){
        setUser({
          ...user, host: e.target.value
        });
      }
  
      function changePass(e){
        setUser({
          ...user, pass: e.target.value
        })
      }

      return(
        <>
        <label>
          Username:
        <input
          value={user.user}
          onChange={changeUser}
        />
        </label>
        <label>
          Password:
        <input
          value={user.pass}
          onChange={changePass}
        />
        </label>
        <label>
          Host:
        <input
          value={user.host}
          onChange={changeHost}
        />
        </label>
        <p>
        <button onClick = {handleClick}>
          Login
        </button>
        </p>
        
        </>
      )
    }
    


    
    

    

    return (
      <div>
        <Heading/>
        <GetButton message={getMessage.data} buttonMessage= {'show interface description'}/>
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






    function PostButton({buttonMessage}){
      function handleClick1(){
        axios({
          method: "POST",
          url:"http://137.184.194.3:5000/",
          data:{
            userName : LoginForm.user.user,
            password : LoginForm.user.pass,
            host : LoginForm.user.host
          }
        })
    }
    return (
      <div>
        <button onClick = {handleClick1}>
          {(buttonMessage)}
        </button>



      </div>




      )
  }
   




    function GetButton({message, buttonMessage}){
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
            {(buttonMessage)}
    
    
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