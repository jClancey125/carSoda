import React, { useEffect, useState, Component } from 'react';
import {Button, TextField } from '@mui/material';
import axios from "axios";

const Blogs = () => {
    
    return (
        <div>
        <TestIP/>
        <TestMAC/>
        </div>
    );

    function TestMAC(){
        const [getMAC, setMAC] = useState('')
        const [getMessage, setGetMessage] = useState({})
        const [getOldMessage, setOldGMessage] = useState({})
        function handleMACClick(){
            
            axios({
                
                method: "POST",
                url: "http://137.184.194.3:5000/sendMAC",
                data: {
                    mac : getMAC
                }
                
                 
              }).then(response => {
    
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
        }
        function changeMAC(e){
            setMAC(e.target.value)
          }
          
          
    return(
        <div>
        <TextField
        id="MAC" label = "MAC to Test" variant="filled" color="secondary" 
        value={getMAC}
        onChange={changeMAC}
        />
        <Button variant= "outlined" onClick = {handleMACClick}>
            Check MAC


        </Button>
        <pre>{JSON.stringify(getMessage.data, null, 2)}</pre>
        
            

        
        </div>
    )
}

    


    function TestIP(){           
        const [getIP, setIP] = useState('')
        const [getMessage, setGetMessage] = useState({})
        const [getOldMessage, setOldGMessage] = useState({})
        function handleIPClick(){
            axios({
                method: "GET",
                url: "http://ip-api.com/json/"+getIP,
              }).then(response => {
    
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

        } 
        
        function changeIP(e){
            setIP(e.target.value)
          }
          
          
    return(
        <div>
        <TextField
        id="IP" label = "IP to Test" variant="filled" color="secondary" 
        value={getIP}
        onChange={changeIP}
        />
        <Button variant= "outlined" onClick = {handleIPClick}>
            Check IP


        </Button>
        <pre>{JSON.stringify(getMessage.data, null, 2)}</pre>
        
            

        
        </div>
    )
}
};


 
export default Blogs;