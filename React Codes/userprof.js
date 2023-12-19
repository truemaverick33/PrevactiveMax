import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useState,useEffect} from 'react';
import $ from 'jquery';
import connstr from './constr.js';
import swal from 'sweetalert';


var qstring = window.location.search;
var params = new URLSearchParams(qstring);
var id = params.get('id');
function Userprofdisp() {
   useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"userspec",uid:id},success(data){
			var jsonData=JSON.parse(data);
			document.getElementById('Name').innerHTML = jsonData[0].employeeName;
			document.getElementById('Id').innerHTML = jsonData[0].employeeId;
			document.getElementById('Email').innerHTML = "<a href='mailto:"+jsonData[0].email+"'>"+jsonData[0].email+"</a>";
			document.getElementById('Phone').innerHTML = "<a href='tel:"+jsonData[0].phoneNo+"'>"+jsonData[0].phoneNo+"</a>";
			document.getElementById('Type').innerHTML = jsonData[0].access=="Technician"?jsonData[0].access+"("+jsonData[0].type+")":jsonData[0].access;
			document.getElementById('DeptName').innerHTML = jsonData[0].dept;
		}});
   });
  return ( 
    <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'30rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">User Profile</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={2}></Col><Col md={4} style={{verticalAlign:"sub"}}>Name:</Col><Col md={5} id='Name'><div></div></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={2}></Col><Col md={4} style={{verticalAlign:"sub"}}>Id:</Col><Col md={5} id='Id'></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={2}></Col><Col md={4} style={{verticalAlign:"sub"}}>Email:</Col><Col md={5} id='Email'></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={2}></Col><Col md={4} style={{verticalAlign:"sub"}}>Phone No:</Col><Col md={5} id='Phone'></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={2}></Col><Col md={4} style={{verticalAlign:"sub"}}>Type:</Col><Col md={5} id='Type'></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={2}></Col><Col md={4} style={{verticalAlign:"sub"}}>Department Name:</Col><Col md={5} id='DeptName'></Col>
			</Row>
			
			<Row align="center" style={{padding:'10px'}}>
		    <Col md={3}></Col>
			{id==sessionStorage.getItem('userid')?(<><Col md={3}><Button variant="light" onClick={(event)=>{window.location.href='/update/users?id='+id}}>Update Profile</Button></Col><Col md={3}><Button variant="light" onClick={(event)=>{window.location.href='/repass/users?id='+id}}>Reset Password</Button></Col></>):sessionStorage.getItem('access')=="Master"?<Col md={6}><Button variant="light" onClick={(event)=>{window.location.href='/update/users?id='+id}}>Update Profile</Button></Col>:sessionStorage.getItem('access')=="Admin"?<Col md={6}><Button variant="light" onClick={(event)=>{window.location.href='/update/users?id='+id}}>Update Profile</Button></Col>:""}
			<Col md={3}></Col>
			</Row>
			
	</Container>
  );
}

export default Userprofdisp;