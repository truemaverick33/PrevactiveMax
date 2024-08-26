import {useState,useEffect} from 'react';
import React from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

function Register()
{

useEffect(() => {
	 document.getElementById('err').style.visibility = "hidden";
	 
});

return(
<>
<br/>
<Container align="center" style={{borderRadius:"25px",width:"35rem",background:"#FFF1DB",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<h1 align="center" style={{color:"#536493"}}>Register</h1>
<Alert variant="warning" id="err"></Alert>
<Form style={{width:"30rem",color:"#536493"}}>
<Form.Group>
<Form.Label>Full Name:</Form.Label>
<Form.Control type="text" name="name" id="name"></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Email:</Form.Label>
<Form.Control type="email" name="email" id="email"></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Phone:</Form.Label>
<Form.Control type="tel" name="phone" id="phone"></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Password:</Form.Label>
<Form.Control type="password" name="pwd" id="pwd"></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>City:</Form.Label>
<Form.Control type="text" name="city" id="city"></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>State</Form.Label>
<Form.Select name="state" id="state">
<option>--Select--</option>
<option>Andhra Pradesh</option>
<option>Arunachal Pradesh</option>
<option>Assam</option>
<option>Bihar</option>
<option>Chhattisgarh</option>
<option>Goa</option>
<option>Gujarat</option>
<option>Haryana</option>
<option>Himachal Pradesh</option>
<option>Jammu and Kashmir</option>
<option>Jharkhand</option>
<option>Karnataka</option>
<option>Kerala</option>
<option>Madhya Pradesh</option>
<option>Maharashtra</option>
<option>Manipur</option>
<option>Meghalaya</option>
<option>Mizoram</option>
<option>Mizoram</option>
<option>Odisha</option>
<option>Punjab</option>
<option>Rajasthan</option>
<option>Sikkim</option>
<option>Tamil Nadu</option>
<option>Telangana</option>
<option>Tripura</option>
<option>Uttar Pradesh</option>
<option>Uttarakhand</option>
<option>West Bengal</option>
</Form.Select>
</Form.Group>
<br/>
<Button style={{backgroundColor:"#D4BDAC",borderColor:"#D4BDAC"}} type="submit">Register</Button>&nbsp;&nbsp;
<Button style={{backgroundColor:"#536493",borderColor:"#536493"}} type="Reset">Reset</Button>
</Form>
<br/>
</Container>
<br/>
</>
);
}
export default Register;