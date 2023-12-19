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

var ar={
	areaname:null,
	dept:null,
}
function AddArea() {
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
		try{
		var qstring = window.location.search;
        var params = new URLSearchParams(qstring);
        var id = params.get('did');
		}
		catch(e){
			id = '';
		}
		$('#deptsel').val(id);
	}});
  });
  const insertArea=()=>{
	  if(ar.areaname==null || ar.areaname==""){
		swal({title:"Area Name Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#newArea').focus();
		});
	}
	else if(ar.dept==null || ar.dept==""){
        swal({title:"Please Select A Department!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#depsel').focus();
		});	
	}
	else{
		$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=area",data:ar,success(data){
			if(data == 1){
			swal({title:"Successful!",text:"New Area was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/areas";
			});
			}
		}});
	}
  }
  return (
    <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Add New Area</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Department:</Col><Col md={6}>
			<Form.Select id="deptsel" onChange={(event)=>{ar.dept=event.target.value}}>
			</Form.Select>
			</Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Area Name:</Col><Col md={6}><Form.Control placeholder="Enter New Area Name" type="text" id="newArea" onChange={(event)=>{ar.areaname=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>insertArea()}>Add Area</Button>
	</Container>
  );
}

export default AddArea;