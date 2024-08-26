import React from 'react';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Register from './Register.js'
import Login from './Login.js'

function BaseRoute()
{

useEffect(() => {
	if(localStorage.getItem("logstatus")==="true"){
		if(localStorage.getItem("role")==="mod"){
			document.getElementById('normal').style.display = "none";
			document.getElementById('mod').style.display = "";
		}
		else if(localStorage.getItem("role")==="normal"){
			document.getElementById('normal').style.display = "";
			document.getElementById('mod').style.display = "none"; 
		}
	  document.getElementById('anonym').style.display = "none";
	  document.getElementById('logged').style.display = "";	
	}
    else
	{
      document.getElementById('anonym').style.display = "";
	  document.getElementById('logged').style.display = "none";
	  document.getElementById('mod').style.display = "none";
	  document.getElementById('normal').style.display = "none";
	}	
	},[]);

const logout = () =>{
		localStorage.setItem("logstatus","false");
		console.log("Logged Out");
}



return(
<Router>
<Navbar style={{boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)', backgroundColor:"#EF5A6F",fontFamily:"'Garamond', serif"}} variant="dark" id="nb">
        <Container>
<Navbar.Brand href="home" style={{color:"#FFF1DB"}}><h1>TaleTogether</h1></Navbar.Brand>
          <Nav className="me-auto" id="normal">
            <Nav.Link href="home" >Home</Nav.Link>
            <Nav.Link href="alltend" >All Tenders</Nav.Link>
			<Nav.Link href="portfolio" id="mport" >My Portfolio</Nav.Link>
			<Nav.Link href="mytenders" id="mtends">My Tenders</Nav.Link>
          </Nav>
	<Nav className="me-auto" id="mod">
            <Nav.Link href="dashboard" >Dashboard</Nav.Link>
            <Nav.Link href="reports" >Reports</Nav.Link>
			<Nav.Link href="action">Action</Nav.Link>
			<Nav.Link href="dbs">Databases</Nav.Link>
          </Nav>

		  <Nav className="ms-auto" id="anonym">
		 {window.location.pathname == "/login"?<Nav.Link href="register" className="ms-auto" id="Reg">Register</Nav.Link>:<Nav.Link href="login" className="ms-auto" id="Log">Login</Nav.Link>}
		  </Nav>
		  <Nav className="ms-auto" id="logged">
		  <NavDropdown title="User">
		  <Nav.Link href="profile" id="Profile" style={{color:"black"}} >Profile</Nav.Link>
			  {localStorage.getItem('role')==""?<Nav.Link href="helpdesk" style={{color:"black"}}>Help Desk</Nav.Link>:""}
		  <hr/>
		  <Nav.Link href="home" id="Logout" onClick={logout} style={{color:"black"}}>Logout</Nav.Link>
		  </NavDropdown>
		  </Nav>
        </Container>
      </Navbar>	  
<Routes> 
<Route exact path="/login" element={<Login />} />
<Route path="/register" element={<Register />} /> 
</Routes>
</Router>
);
}

export default BaseRoute;