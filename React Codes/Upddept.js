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
var dpt={
	deptid:id,
	deptname:null
}
function Upddept() {
   useEffect(()=>{
   $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"deptspec",did:id},success(data){
	   var jsonData = JSON.parse(data);
	   $('#newDept').val(jsonData[0].deptName);
	   dpt.deptname=jsonData[0].deptName
   }});
   });
  const UpdateDept=()=>{
	if(dpt.deptname==null || dpt.deptname==""){
        swal({title:"Please Enter A Department!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#newDept').focus();
		});	
	}
	else{
		$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=dept",data:dpt,success(data){
			if(data){
			swal({title:"Successful!",text:"Department was Updated to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/departments";
			});
			}
		}});
	}
  }
  return (
    <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Update Department</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Department Name:</Col><Col md={6}><Form.Control placeholder="Enter New Department Name" type="text" id="newDept" onChange={(event)=>{dpt.deptName=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>UpdateDept()}>Update Department</Button>
	</Container>
  );
}

export default Upddept;