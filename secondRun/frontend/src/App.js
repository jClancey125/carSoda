import './App.css';
import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, BrowserRouter, Redirect}
    from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import logo from './Images/Logo2_8.png'


function App() {
  
  const {token, removeToken, setToken} = useToken();
  const [getMessage, setGetMessage] = useState({})
  const [isShow, setIsShow] = useState(false)
  const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    customColor: {
      // or hex code, this is normal CSS background-color
      backgroundColor: green[500]
    },
    customHeight: {
      minHeight: 200
    },
    offset: theme.mixins.toolbar
  }));
  
  
  
  const testUser = {
    name: 'Jean Paul',
    imageUrl: 'https://img.broadtime.com/418456136300:500.webp',
    imageSize: 400,
  };

  return (
    
    
    <div className="App">
      
      <header className="App-header">
      <h1> </h1>
      <Router>
      <ButtonAppBar/>
     
     <Routes>
         <Route exact path='/'  />
         <Route path='/about' element={<About />} />
         <Route path='/contact' element={<Contact />} />
         <Route path='/blogs' element={<Blogs />} />
         <Route path='/sign-up' element={<SignUp />} />
     </Routes>
        {!token && token!=="" &&token!== undefined?  
        <SignUp setToken={setToken} />
        :(
          <>
            <Routes>
              <Route exact path="/" element={<Home token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
        )}
        <Header token={removeToken}/>

      
          
      
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
        Click for ARP test  {String(isShow)}


      </button>
    );
  }

  

  function ButtonAppBar() {
    const classes = useStyles();
    const [example, setExample] = useState("primary");
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";
    let navigate = useNavigate();

    const routeChange = () =>{ 
    let path = `/blogs`; 
    navigate(path);}
    
    


    return (
      <React.Fragment>
        <AppBar>
          <router>
            <route>          
          <Toolbar>           
            <IconButton              
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >            
              <img src={logo} alt= "cornerLogo" />
            
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            <Link to="/about">
            <IconButton size ='small' color="inherit" onClick={() => setExample("primary")} sx={{ p: 2 }}>
              Home             
            </IconButton>
            </Link>
            <Link to="/">
            <IconButton size ='small' color="#default" onClick={() => setExample("primary")} sx={{ p: 2 }}>
              Cisco             
            </IconButton>
            </Link>
            <Link to="/blogs">
            <IconButton size ='small' color="inherit" onClick={() => setExample("primary")} sx={{ p: 2 }}>
              Tools
            </IconButton>
            </Link>   
          </Toolbar>
          </route>
          </router> 
            
        </AppBar>
        <Toolbar />    
      </React.Fragment>
    );
  }
  


  





}
export default App;