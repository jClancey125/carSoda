import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, BrowserRouter, Redirect}
    from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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

function App() {
  

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
    imageSize: 420,
  };

  return (
    
    
    <div className="App">
      
      <header className="App-header">
        

        
       

        

        
      



      <Router>
          
      <ButtonAppBar/>
     
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

  

  function ButtonAppBar() {
    const classes = useStyles();
    const [example, setExample] = useState("primary");
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/about`; 
    navigate(path);}
    
    


    return (
      <React.Fragment>
        <AppBar
          color={isCustomColor || isCustomHeight ? "primary" : example}
          className={`${isCustomColor && classes.customColor} ${
            isCustomHeight && classes.customHeight
          }`}
        >
          <router>
            <route>
          
          <Toolbar>
            
            <IconButton

              
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              

              <img style = {{width: 69, height: 69}} src={testUser.imageUrl}/>
            
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Uhh FrontEnd Test for Automation Thingy
            </Typography>
            <Link to="/sign-up">
            <IconButton color="inherit" onClick={() => setExample("primary")}>
              Home
              
            </IconButton>
            </Link>
            <Link to="/">
            <IconButton color="inherit" onClick={() => setExample("primary")}>
              Cisco
            </IconButton>
            </Link>
            <IconButton color="inherit" onClick= {routeChange}>
              
              Else
            </IconButton>
            <IconButton color="inherit" onClick={() => setExample("transparent")}>
              4
            </IconButton>
            <Link to="/blogs">
            <IconButton color="inherit" onClick={() => setExample("customColor")}>
              5
            </IconButton>
            </Link>
            <IconButton
              color="inherit"
              onClick={() => setExample("customHeight")}
            >
              6
            </IconButton>
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