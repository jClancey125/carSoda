import axios from "axios";
import {Button, TextField } from '@mui/material';

function Header(props) {

  function logMeOut() {
    axios({
      method: "POST",
      url:"http://137.184.194.3:5000/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
            <Button variant="outlined" onClick={logMeOut}> 
                Logout
            </Button>
        </header>
    )
}

export default Header;
