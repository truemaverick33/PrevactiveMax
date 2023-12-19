import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState,useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import connstr from './constr.js';
import emailjs from 'emailjs-com';

var qstring = window.location.search;
var params = new URLSearchParams(qstring);
var id = params.get('id');
var usr={
	uid:id,
	password:null,
	cnfpassword:null
}
var templateParams = {
        to_email: null,
        otp: null,
};
function Repass(){
  emailjs.init('6oDPaUWY5vlZhY9Yv');
  useEffect(()=>{
	  document.getElementById('repass').style.display="";
	  document.getElementById('otps').style.display="none";
	  $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"userspec",uid:id},success(data){
		  var jsonData=JSON.parse(data);
		  templateParams.to_email = jsonData[0].email;
		  const rotp = Math.floor(100000 + Math.random() * 900000);
		  templateParams.otp = rotp;
	  }});
  });
  const verifyOTP=()=>{
	  if(usr.password==null || usr.password==""){
        swal({title:"new password cannot be empty!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#np').focus();
		});	
	}
	else if(usr.password!=usr.cnfpassword){
		swal({title:"password and confirm password do not match!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#cnp').focus();
		});
	}
	else if(usr.password.match(/[A-Za-z0-9._@]{7}[a-zA-Z0-9._@]*/)==null){
		swal({title:"Password must be atleast 7 characters long and contain valid characters!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#np').focus();
		});
	}
	else{
	document.getElementById('sotp').disabled = true;
	 emailjs.send('service_j4xqqag', 'template_uz7m34b', templateParams)
    .then(function(response) {
        swal({title:"Successful!",text:"OTP sent to email address",icon:"success",buttons:false,timer:1300}).then(()=>{
				document.getElementById('repass').style.display="none";
				document.getElementById('otps').style.display="";
			});
    }, function(error) {
        console.error('Error sending OTP email', error);
    });
	}
  }
  const ResetPass=()=>{
	if(templateParams.otp==document.getElementById('otp').value){
		$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=resetpass",data:usr,success(data){
			if(data){
			swal({title:"Successful!",text:"Password was reset successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/profile?id="+id;
			});
			}
		}});
	}
	else{
		swal({title:"Invalid OTP try again!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#otp').focus();
		});
	}
  }
  return (
    <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Reset Password</h2>
			<hr/>
			<div id="repass">
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>New Password:</Col><Col md={6}><Form.Control placeholder="Enter New Password" type="password" id="np" onChange={(event)=>{usr.password=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
            <br/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Confirm Password:</Col><Col md={6}><Form.Control placeholder="Confirm New Password" type="password" id="cnp" onChange={(event)=>{usr.cnfpassword=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			<br/>
			<Button variant="primary" id="sotp" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>verifyOTP()}>Send OTP</Button>
			</div>
			<div id="otps">
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>OTP:</Col><Col md={6}><Form.Control placeholder="Enter OTP" type="text" maxLength="6" id="otp" style={{height:'35px'}}/></Col>
			</Row>
			<br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>ResetPass()}>Reset Password</Button>
			</div>
	</Container>
  );
}

export default Repass;