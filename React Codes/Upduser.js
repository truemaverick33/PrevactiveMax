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

var qstring = window.location.search;
var params = new URLSearchParams(qstring);
var id = params.get('id');
var user={
	userNo:id,
	employeeId:null,
	employeeName:null,
	email:null,
	phoneNo:null,
	dept:null
}
function Upduser(){
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
$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"userspec",uid:id},success(data){
			var jsonData=JSON.parse(data);
			document.getElementById('employeeName').value = jsonData[0].employeeName;
			document.getElementById('employeeId').value = jsonData[0].employeeId;
			document.getElementById('email').value = jsonData[0].email;
			document.getElementById('phoneNo').value = jsonData[0].phoneNo;
			$('#deptsel').val(jsonData[0].deptId);
			user.employeeId=jsonData[0].employeeId;
			user.employeeName=jsonData[0].employeeName;
			user.email=jsonData[0].email;
			user.phoneNo=jsonData[0].phoneNo;
			user.dept=jsonData[0].deptId;
		}});
});
const updateuser=()=>{
	if(user.employeeId==null || user.employeeId==""){
		swal({title:"Employee Id Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#employeeId').focus();
		});
	}
	else if(user.employeeName==null || user.employeeName==""){
        swal({title:"Employee Name Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#employeeName').focus();
		});	
	}
	else if(user.email==null || user.email==""){
        swal({title:"Email Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#email').focus();
		});	
	}
	else if(user.email.match(/[A-Za-z0-9._ ]*@+[a-zA-Z]*\.+[a-zA-Z.]*/)==null){
        swal({title:"Invalid Email",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#email').focus();
		});	
	}
	else if(user.phoneNo==null || user.phoneNo==""){
        swal({title:"Phone Number Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#phoneNo').focus();
		});	
	}
	else if(user.phoneNo.match(/[6-9]+[0-9]{9}/)==null){
        swal({title:"Invalid Phone Number",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#phoneNo').focus();
		});	
	}
	else{
		console.log(user);
		$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=user",data:user,success(data){
			if(data == 1){
			swal({title:"Successful!",text:"User Details Updated to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/users";
			});
			}
		}});
	}
	}

	return(
	<>
    <Container style={{padding:'0',backgroundColor:'white',maxWidth:'40rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Update User</h2>
			<hr/>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Employee Id:</Col><Col md={6}><Form.Control placeholder="Enter Employee id" type="text" id="employeeId" style={{height:'35px'}} onChange={(event)=>{user.employeeId=event.target.value}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Employee Name:</Col><Col md={6}><Form.Control placeholder="Enter New username" type="text" id="employeeName" style={{height:'35px'}} onChange={(event)=>{user.employeeName=event.target.value}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Email:</Col><Col md={6}><Form.Control placeholder="Enter Email" type="text" id="email" style={{height:'35px'}} onChange={(event)=>{user.email=event.target.value}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Contact:</Col><Col md={6}><Form.Control placeholder="Enter Contact" type="text" id="phoneNo" style={{height:'35px'}} onChange={(event)=>{user.phoneNo=event.target.value}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Department:</Col><Col md={6}>
			<Form.Select id="deptsel" onChange={(event)=>{user.dept=event.target.value}}>
			</Form.Select>
			</Col>
			</Row>
			
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>updateuser()}>Update User</Button>
			</Container>
			</>
			);
}
export default Upduser;