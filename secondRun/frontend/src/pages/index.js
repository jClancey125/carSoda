//import * as React from 'react';
//import './Index.css';
import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import {Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
    

 
const Home = () => {
    const [getMessage, setGetMessage] = useState({})
    const [getOldMessage, setOldGMessage] = useState({})
    const [isShow, setIsShow] = useState(false)
    var newTest 
    const [getInt, setInt] = useState({})
    ;


    const theme = createTheme({
      palette: {
        primary: {
          main: '##b5b5b5', // your primary color
        },
        secondary: {
          main: '#00ff00', // your secondary color
        },
      },
    });

    function LoginForm(){
      const [user, setUser] = useState({
        user: 'Blon',
        host: '192.68.419.86',
        pass: 'Bust'
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
        <TextField
        sx={{  color: 'red'  }}
          id="outlined-basic" label = "Username" variant="filled" color="secondary" 
          value={user.user}
          onChange={changeUser}
        />
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
        <Button variant="outlined" onClick = {handleClick}>
          Login
        </Button>
        
        </p>
        
        </>
      )
    }
    


    
    

    

    return (
      
      <div>
        <ThemeProvider theme={theme}>
        <Heading/>
        <GetButton message={getMessage.data} buttonMessage= {'show interface description'}/>
        <LoginForm/>
        </ThemeProvider>
      </div>
        
    );


    function Heading() {
        
          return ( <h1>
              Cisco IOS integration PoC 
          </h1>
          );
    }

    






// Not implemented nor working
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