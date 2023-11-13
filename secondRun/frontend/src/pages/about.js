import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import {Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import Box from '@mui/material/Box';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
    


const About = () => {

    function Heading() {
        
        return ( <div><h1>
            This is a Cisco Automation project
        </h1>
        <p>
            It uses a React.js front end with a 
            Python flask backend. It uses JWT authenication to authenicate API calls to backend.
            Also uses mongoDB database to maintain data.</p>
            <p>
            Database has not been fully implemented, when user requests token it either gives new token to existing users 
            or adds user to database, then gives token if exisiting database object has not been found
        </p>

        <p>Plans to further implement different Cisco commands such as sho arp, mac address table and such to automatically interface
          with API calls on the tools page. 
        </p>
        </div>
        );
  }

    function GetButton({message, buttonMessage}){
        const [getMessage, setGetMessage] = useState({})
        const [getOldMessage, setOldGMessage] = useState({})
        const [isShow, setIsShow] = useState(false)
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
          message = ("Processing Request")
        }
  
        return (
          <div>
            <Box component="span" sx={{ p: 2}}>
            <Button variant="outlined" onClick = {handleClick}>
            {(buttonMessage)}
          </Button>
          </Box>

          {isShow ? 
        (
          
          <p>{message}</p>
        )
      : (
        <p><Box component="span" sx={{ p: 2, border: '1px black' }}>Pending Command to be Sent</Box></p>
      )
      }

          </div>
        );
    
};
    return (
        <div>
            <Heading/>
        

        </div>
    );
};
 
export default About;