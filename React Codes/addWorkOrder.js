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

var wom={
	woTitle:null,
	woDesc:null,
	woType:null,
	severity:null,
	deadline:null,
	reqUid:sessionStorage.getItem('userid'),
	deptId:null,
	areaId:null,
	eqpid:null,
	acc:sessionStorage.getItem('access')
}


function AddWorkOrder() {
	
	useEffect(()=>{
	  $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"depta"},success(data){
		var jsonData = JSON.parse(data);
		var table = "<option value=''>select</option>";
		for(let i=0;i<jsonData.length;i++){
			if(jsonData[i].status != 0){
		    table+="<option value='"+jsonData[i].deptId+"'>"+jsonData[i].deptName+"</option>";
			}
		} 
		document.getElementById("deptId").innerHTML = table;
	   if(sessionStorage.getItem('access')=="User"){
		   document.getElementById("woType").innerHTML = "<option>select</option><option>Reactive</option>";
	   }
	}});
	
	
  });
  
  
  const insertwom=()=>{
	  if(wom.woTitle==null || wom.woTitle==""){
		swal({title:"Task Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#woTitle').focus();
		});
	}
	else if(wom.woDesc==null || wom.woDesc==""){
        swal({title:"Please Provide an appropriate Description!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#woDesc').focus();
		});	
	}
	else if(wom.woType==null || wom.woType==""){
        swal({title:"Type Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#woType').focus();
		});	
	}
	else if(wom.reqUid==null || wom.reqUid==""){
        swal({title:"Please Select reqUid!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#reqUid').focus();
		});	
	}
	else if(wom.deptId==null || wom.deptId==""){
        swal({title:"Please Select deptId!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#deptId').focus();
		});	
	}
	else if(wom.areaId==null || wom.areaId==""){
        swal({title:"Please Select areaId!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#areaId').focus();
		});	
	}
	else if(wom.eqpid==null || wom.eqpid==""){
        swal({title:"Please Select eqpid!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#eqpid').focus();
		});	
	}
	else{
		$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=workordermaster",data:wom,success(data){
			if(data){
			swal({title:"Successful!",text:"New Work Order was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				if(sessionStorage.getItem('access')=="Master"){
				    window.location.href="/workorders";
				}
				else if(sessionStorage.getItem('access')=="Admin"){
					window.location.href="/admin/workorders";
				}
				else if(sessionStorage.getItem('access')=="Technician"){
					window.location.href="/Technician/workorders";
				}
				else if(sessionStorage.getItem('access')=="User"){
					window.location.href="/user/workorders";
				}
			});
			}
		}});
	}
  }
  
  const changeDept=(event)=>{
	   wom.deptId=event.target.value;
	   $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"areaByDept",deptid:event.target.value},success(data){
		//console.log(data);
		var jsonData = JSON.parse(data);
		var table = "<option value=''>select</option>";
		for(let i=0;i<jsonData.length;i++){
			if(jsonData[i].status != 0){
		    table+="<option value='"+jsonData[i].areaId+"'>"+jsonData[i].areaName+"</option>";
			}
		} 
		document.getElementById("areaId").disabled = false;
		document.getElementById("areaId").innerHTML = table;
		
	}});
  }
  const changeArea=(event)=>{
	  wom.areaId=event.target.value;
	  $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"equipByArea",areaid:event.target.value},success(data){
		//console.log(data);
		var jsonData = JSON.parse(data);
		var table = "<option value=''>select</option>";
		for(let i=0;i<jsonData.length;i++){
			if(jsonData[i].status != 0){
		    table+="<option value='"+jsonData[i].equipId+"'>"+jsonData[i].equipName+"</option>";
			}
		}
        document.getElementById("eqpid").disabled = false;		
		document.getElementById("eqpid").innerHTML = table;
		
	}});
  }
  return (
    <>
	<br/>
     <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Create New Work Order</h2>
			<hr/>
	  
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Task:</Col><Col md={6}><Form.Control placeholder="Task" type="text" id="woTitle" onChange={(event)=>{wom.woTitle=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Description:</Col><Col md={6}><Form.Control placeholder="Description" as="textarea" id="woDesc" onChange={(event)=>{wom.woDesc=event.target.value}} rows={3}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Type:</Col><Col md={6}>
			<Form.Select id="woType" onChange={(event)=>{wom.woType=event.target.value}}>
			<option>Select</option>
			<option>Reactive</option>
			<option>Preventive</option>
			</Form.Select>
			</Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Severity:</Col><Col md={6}>
			<Form.Select id="severity" onChange={(event)=>{wom.severity=event.target.value}}>
			<option>Select</option>
			<option>Low</option>
			<option>Medium</option>
			<option>High</option>
			<option>Emergency</option>
			</Form.Select>
			</Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Deadline:</Col><Col md={6}><Form.Control placeholder="Deadline" type="date" id="deadline" onChange={(event)=>{wom.deadline=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>User Id:</Col><Col md={6}><Form.Control placeholder="User Id" type="text" id="reqUid" value={sessionStorage.getItem('userid')} readOnly style={{height:'35px'}}/></Col>
			</Row>
			
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Department Id:</Col><Col md={6}>
			<Form.Select id="deptId" onChange={(event)=>{changeDept(event)}}>
			</Form.Select>
			</Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Area Id:</Col><Col md={6}>
			<Form.Select id="areaId" onChange={(event)=>{changeArea(event)}} disabled>
			<option>select</option>
			</Form.Select>
			</Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Equipment Id:</Col><Col md={6}>
			<Form.Select id="eqpid" onChange={(event)=>{wom.eqpid=event.target.value}} disabled>
			<option>select</option>
			</Form.Select>
			</Col>
			</Row> 
	  
	  <Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>insertwom()}>Create Work Order</Button>
	</Container>
	
	
    </>
  );
}

export default AddWorkOrder;