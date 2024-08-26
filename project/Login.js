import {useState,useEffect} from 'react';
import React from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function Login()
{

var [log,setLog] = useState("");
var [pwd,setPwd] = useState("");

useEffect(() => {
	 document.getElementById('err').style.visibility = "hidden";
	 if(localStorage.getItem('logstatus')=="true"){
		 window.location.href="http://localhost:3000/";
	 }
});

const handlePwd = (e) => {
    setPwd(e.target.value);
}
const handleLog = (e) => {
    setLog(e.target.value);
}
const handleSmbt = (e) => {
	if(log==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('login').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Email or Phone cannot be blank";
	}
	else if(pwd==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('pwd').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Password cannot be blank";
	}
	else{	
		console.log("login successful");
	}
}

return(
<>
<br/>
<br/>
<div align="center">
<Container style={{borderRadius:"25px",width:"25rem",background:"#FFF1DB",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<h1 align="center" style={{color:"#536493"}}>Login</h1>
<Alert variant="warning" id="err"></Alert>
<Form method="post">
<Form.Group>
<Form.Label style={{color:"#536493"}}>Email:</Form.Label>
<Form.Control type="email" name="login" id="login"></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label style={{color:"#536493"}}>Password:</Form.Label>
<Form.Control type="password" name="pwd" id="pwd"></Form.Control>
</Form.Group>
<br/>
<Button style={{backgroundColor:"#536493",borderColor:"#536493"}} type="submit">Login</Button>
</Form>
<br/>
</Container>
</div>
</>
);
}
export default Login;