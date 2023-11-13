import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import App from "../App.js"
import {Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Routes, Route, useNavigate }
    from 'react-router-dom';
 
const SignUp = (props) => {
    const navigate = useNavigate();
    const [getMessage, setGetMessage] = useState({}) 
    function LoginForm(){
      
        const [user, setUser] = useState({
          user: 'Elon',
          host: '73.60.76.61',
          pass: 'Must',
          command: 'test'
    })
  
        function handleClick(){
          axios({
            method: "POST",
            url:"http://137.184.194.3:5000/",
            data:{
              userName : user.user,
              password : user.pass,
              host : user.host,
            }
          })
          navigate("/", {state: user})
        
        }

        function handleClickLogin(){
          axios({
            method: "POST",
            url:"http://137.184.194.3:5000/token",
            data:{
              userName : user.user,
              password : user.pass,
            }
          })
          .then((response) => {
            props.setToken(response.data.access_token)
            setGetMessage(response)
          }).catch((error) => {
            if (error.response) {

              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
          })
          navigate("/", {state: user})
        
        }
        
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
          <div>
          <>
          <h1>Please enter login credentials </h1>     
          <TextField
            sx={{ p: 2 }}
            id="userName" label = "Username" variant="filled" color="secondary" 
            value={user.user}
            onChange={changeUser}
          />
          <TextField
            sx={{ p: 2 }}
            id="passWord" label = "Password" variant="filled" color="secondary" 
            value={user.pass}
            onChange={changePass}
          />
          
          <p>
          <Button variant="outlined" onClick = {handleClickLogin}>
            Login
          </Button> 
          {getMessage.data}
          </p>        
          </>
          </div>
        )
      }

      return(
        <div>
            <LoginForm/>

        </div>
      )
};
 
export default SignUp;