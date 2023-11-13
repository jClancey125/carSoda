//import * as React from 'react';
//import './Index.css';
import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import {Button, TextField, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation }
    from 'react-router-dom';


    

 
const Home = (props) => {
    const [getMessage, setGetMessage] = useState({})
    const [getOldMessage, setOldGMessage] = useState({})
    const [getSingleMessage, setSingleGMessage] = useState({})
    const [isShow, setIsShow] = useState(false)
    const history = useNavigate();
    const [getInt, setInt] = useState({})
    const location = useLocation();
    const mainUser = location.state; 
    
    


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
        host: '73.60.76.61',
        pass: 'Bust',
        command: 'test'
  })

      /*function handleClickTest(){
        axios({
          method: "GET",
          url:"http://137.184.194.3:5000/profile",
          headers: {
            Authorization: 'Bearer ' + props.token
          }
        })
        .then((response) => {
          const res =response.data
          res.access_token && props.setToken(res.access_token)
          setProfileData(({
            profile_name: res.name,
            about_me: res.about}))
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}*/
  
      function handleClick(){
        axios({
          method: "POST",
          url:"http://137.184.194.3:5000/singleCommand",
          headers: {
            Authorization: 'Bearer ' + props.token 
          },
          data: {
            command : user.command
          }
        }).then(response => {

          if(response.status === 200){
            console.log("SUCCESS", response)
            setSingleGMessage(response)
          }
          else{
            if(setOldGMessage){
              setGetMessage(setOldGMessage)
            }            
          }         
        }).catch(error => {
          console.log(error)                          
        })}
      


      function changeCommand(e){
        setUser({
          ...user, command: e.target.value
        })
      }

      return(
        <div>
        <>     
        <TextField
          sx={{ p: 2 }}
          id="command" label = "Desired Command" variant="filled" color="secondary" 
          value={user.command}
          onChange={changeCommand}
        />
        <p>
        
       
        </p>        
        </>
        </div>
      )
    }
    


    
    

    

    return (
      
      <div>
        <ThemeProvider theme={theme}>
        
        <Heading/>
    
        <GetButtonOld message={getSingleMessage.data} buttonMessage= {'Send Command'}/>
        <GetButton 
            buttonMessages={'ShowARP'} buttonLabel={"Show ARP"}
            sx={{ p: 2 }}
            />
        <Box
        sx={{
          width: 100,
          height: 450,
          borderRadius: 1,
          
        }}
        
      />

        
        
            
            

            To be implemented below:


            

            <PostButton 
            buttonLabel={'Show specific interface'} buttonMessages={'ShowInt'}
            sx={{ p: 2 }}
            />

            <GetButton 
            message={'to be implemented'} buttonMessage={'Show Interfaces'}
            sx={{ p: 2 }}
            />
            

            <GetButton 
            message={'to be implemented'} buttonMessage={'Show Interface IP Brief'}
            sx={{ p: 2 }}
            />

        
        </ThemeProvider>
      </div>
        
    );


    function Heading() {
        if(mainUser === undefined || mainUser === null)
        {
          return ( <h1>
            Single command to IOS device {LoginForm.user}
        </h1>
        );
          
        }
        else
        {
          return ( <h1>
            Single command to IOS device {mainUser.user}
        </h1>
        );

        }
        
    }

    







/* Need to figure out logic to use same button on different API calls don't know if issue with appending buttonMessage varible
to end of API call*/


function GetButton({buttonLabel,buttonMessages}){
    const [getMessages, setGetMessages] = useState({})
    const [getOldMessage, setOldGMessage] = useState({})
    const [isShow, setIsShow] = useState(false)
    const [count, setCount] = useState(0);
    function handleClick(){
      axios({
        method: "GET",
        url:"http://137.184.194.3:5000/"+buttonMessages,
        headers: {
          Authorization: 'Bearer ' + props.token 
        },
        
      }).then(response => {

          if(response.status === 200){
            console.log("SUCCESS", response)
            setGetMessages(response.data)
            setIsShow(true)
          }
        }).catch(error => {
          console.log(error)                          
        })   
      
      //setCount(count +1);
    }
    /*
    if (getMessages === undefined || getMessages === null)
    {
      setGetMessages = ("Processing Request")
    }*/

    return (
      <div>
        <Box component="span" sx={{ p: 2}}>
        <Button variant="outlined" onClick = {handleClick}>
        {(buttonLabel)}
      </Button>
      </Box>

      {isShow ? 
    (
      
      <p>{JSON.stringify(getMessages)}</p>
    )
  : (
    <p><Box component="span" sx={{ p: 2, border: '1px black' }}>Pending Command to be Sent</Box></p>
  )
  }

      </div>
    );

};






function PostButton({buttonLabel,buttonMessages}){
  const [getMessages, setGetMessages] = useState({})
  const [getOldMessage, setOldGMessage] = useState({})
  const [isShow, setIsShow] = useState(false)
  const [getInt, setInt] = useState({ })
  const [count, setCount] = useState(0);
  function changeCommand(e){
    setInt(e)
  }
  function handleClick(){
    axios({
      method: "POST",
      url:"http://137.184.194.3:5000/"+buttonMessages,
      headers: {
        Authorization: 'Bearer ' + props.token 
      },
      data: {
        interface : getInt
      }
      
    }).then(response => {

        if(response.status === 200){
          console.log("SUCCESS", response)
          setGetMessages(response.data)
          setIsShow(true)
        }
      }).catch(error => {
        console.log(error)                          
      })   
    
    //setCount(count +1);
  }
  /*
  if (getMessages === undefined || getMessages === null)
  {
    setGetMessages = ("Processing Request")
  }*/

  return (
    <div>
      <TextField
          sx={{ p: 2 }}
          helperText="Example: fa0/1 or gi1/0/1"
          id="specificInt" label = "Interface" variant="filled" color="secondary" 
          value={getInt}
          onChange={changeCommand}
        />
      <Box component="span" sx={{ p: 2}}>
      <Button variant="outlined" onClick = {handleClick}>
      {(buttonLabel)}
    </Button>
    </Box>

    {isShow ? 
  (
    
    <p>{JSON.stringify(getMessages)}</p>
  )
: (
  <p><Box component="span" sx={{ p: 2, border: '1px black' }}>Pending Command to be Sent</Box></p>
)
}

    </div>
  );

};









    function GetButtonOld({message, buttonMessage}){
        const [count, setCount] = useState(0);
        const [user, setUser] = useState({
          user: 'JT',
          host: '73.60.76.61',
          pass: 'Lab123',
          command: 'sh int desc'
    })
        
        function changeCommand(e){
          setUser({
            ...user, command: e.target.value
          })
        }
        function handleClick(){
          axios({
            method: "POST",
            url:"http://137.184.194.3:5000/singlecommand",
            headers: {
              Authorization: 'Bearer ' + props.token 
            },
            data: {
              command : user.command
            }
          }).then(response => {
  
            if(response.status === 200){
              console.log("SUCCESS", response)
              setSingleGMessage(response)
              message = getSingleMessage
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
          <TextField
          sx={{ p: 2 }}
          id="command" label = "Desired Command" variant="filled" color="secondary" 
          value={user.command}
          onChange={changeCommand}
        />
          <Button variant="outlined" onClick = {handleClick}>
            {(buttonMessage)}

          </Button>

          {isShow ? 
        (
          
          <p>{message}</p>
        )
      : (
        <p>Pending Command to be Sent</p>
      )
      }

          </div>
        );
    }

    
};
 
export default Home;