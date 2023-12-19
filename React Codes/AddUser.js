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

var user={
	empid:null,
	empname:null,
	pwd:null,
	email:null,
	phone:null,
	type:null,
	dept:null,
	techtype:null,
}
var templateParams = {
        to_email: null,
        psd:null
};
function AddUser(){
	const [isMaster,setIsMaster] = useState(false);
	const mstrset=()=>{
	setIsMaster(!isMaster);
	if(isMaster){
	document.getElementById('r1').style.display="";
	user.type=null;
	}
	else{
	document.getElementById('r1').style.display="none";
	user.type="Master";
	}
}
const showTWH=(event)=>{
	user.type=event.target.value;
	if(event.target.value=="Technician"){
		document.getElementById('r2').style.display="";
	}
	else{
		document.getElementById('r2').style.display="none";
	}

}
const insertRec=()=>{
	if(user.empid==null || user.empid==""){
		swal({title:"Employee Id Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#nti').focus();
		});
	}
	else if(user.empname==null || user.empname==""){
        swal({title:"Employee Name Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#ntn').focus();
		});	
	}
	else if(user.email==null || user.email==""){
        swal({title:"Email Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#nte').focus();
		});	
	}
	else if(user.email.match(/[A-Za-z0-9._ ]*@+[a-zA-Z]*\.+[a-zA-Z.]*/)==null){
        swal({title:"Invalid Email",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#nte').focus();
		});	
	}
	else if(user.pwd==null || user.pwd==""){
        swal({title:"Password Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#pswd').focus();
		});	
	}
	else if(user.pwd.match(/[A-Za-z0-9._@]{7}[a-zA-Z0-9._@]*/)==null){
        swal({title:"Invalid Password",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#pswd').focus();
		});	
	}
	else if(user.phone==null || user.phone==""){
        swal({title:"Phone Number Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#ntc').focus();
		});	
	}
	else if(user.phone.match(/[6-9]+[0-9]{9}/)==null){
        swal({title:"Invalid Phone Number",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#ntc').focus();
		});	
	}
	else if(user.type==null){
        swal({title:"User Type Can Not Be Blank!",text:'Please Switch On Master Or Select Appropriate Type',icon:"error",buttons:false,timer:1500});	
	}
	else{
		//console.log(user);
		$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=user",data:user,success(data){
			if(data){
			swal({title:"Successful!",text:"New user was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{				
				templateParams.to_email = user.email;
				templateParams.psd = user.pwd;
				emailjs.init('6oDPaUWY5vlZhY9Yv');
				emailjs.send('service_j4xqqag', 'template_a2yi60n', templateParams)
				.then(function(response) {
			     window.location.href="/users";
			   }, function(error) {
                 console.error('Error sending OTP email', error);
               });
			});
			}
		}});
	}
	}
useEffect(()=>{
	  $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"depta"},success(data){
		var jsonData = JSON.parse(data);
		var table = "<option value=''>select</option>";
		for(let i=0;i<jsonData.length;i++){
			if(jsonData[i].status != 0){
		    table+="<option value='"+jsonData[i].deptId+"'>"+jsonData[i].deptName+"</option>";
			}
		} 
	    document.getElementById("deptsel").innerHTML = table; 
}}); 
$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"tectypes"},success(data){
		var jsonData = JSON.parse(data);
		var table = "<option value=''>select</option>";
		for(let i=0;i<jsonData.length;i++){
		    table+="<option value='"+jsonData[i].typeid+"'>"+jsonData[i].type+"</option>";
		} 
	    document.getElementById("typesel").innerHTML = table; 
}}); 
});
	return(
	<>
    <Container style={{padding:'0',backgroundColor:'white',maxWidth:'40rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Add New User</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Employee Id:</Col><Col md={6}><Form.Control placeholder="Enter Employee id" type="text" id="nti" style={{height:'35px'}} onChange={(event)=>{user.empid=event.target.value}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Employee Name:</Col><Col md={6}><Form.Control placeholder="Enter New username" type="text" id="ntn" style={{height:'35px'}} onChange={(event)=>{user.empname=event.target.value}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Password:</Col><Col md={6}><Form.Control placeholder="Enter password" type="password" id="pswd" style={{height:'35px'}} onChange={(event)=>{user.pwd=event.target.value}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Email:</Col><Col md={6}><Form.Control placeholder="Enter Email" type="text" id="nte" style={{height:'35px'}} onChange={(event)=>{user.email=event.target.value}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Contact:</Col><Col md={6}><Form.Control placeholder="Enter Contact" type="text" id="ntc" style={{height:'35px'}} onChange={(event)=>{user.phone=event.target.value}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Master:</Col><Col md={3}>
			<Form.Check type="switch" id="isadm" value={isMaster} onChange={mstrset}/>
			</Col>
			</Row>
			<div id="r1">
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Department:</Col><Col md={6}>
			<Form.Select id="deptsel" onChange={(event)=>{user.dept=event.target.value}}>
			</Form.Select>
			</Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Type:</Col><Col md={6}><Form.Check type="radio" name="utype" id="utype" label="Admin" value="Admin" onChange={(event)=>showTWH(event)} inline/><Form.Check type="radio" name="utype" id="utype" label="User" value="User" onChange={(event)=>showTWH(event)} inline/><Form.Check type="radio" name="utype" id="utype" label="Technician" value="Technician" onChange={(event)=>showTWH(event)} inline/></Col>
			</Row>
			<div id="r2" style={{padding:'10px',display:"none"}}>
			<Row align="left">
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Technician Type:</Col><Col md={6}>
			<Form.Select id="typesel" onChange={(event)=>{user.techtype=event.target.value}}>
			</Form.Select>
			</Col>
			</Row>
			</div>
			</div>
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>insertRec()}>Add User</Button>
			</Container>
			</>
			);
}
export default AddUser;