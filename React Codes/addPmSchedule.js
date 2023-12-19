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


var pm={
	eqid:null,
	pmsdate:null
}

function AddPmsched(){
	
	useEffect(()=>{
	
	$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"equip"},success(data){
		console.log(data);
		var jsonData = JSON.parse(data);
		var table = "<option value=''>select</option>";
		for(let i=0;i<jsonData.length;i++){
			if(jsonData[i].status != 0){
		    table+="<option value='"+jsonData[i].equipId+"'>"+jsonData[i].equipName+"</option>";
			}
		} 
		document.getElementById("eqid").innerHTML = table;
		
	}});
	
  });
  
   const insertpms=()=>{
	  if(pm.eqid==null || pm.eqid==""){
		swal({title:"Equipment Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#eqid').focus();
		});
	}
	else if(pm.pmsdate==null || pm.pmsdate==""){
        swal({title:"Please Select A Date!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#pmsdate').focus();
		});	
	}
	else{
		$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=pmschedule",data:pm,success(data){
			if(data == 1){
			swal({title:"Successful!",text:"New PMSchedule was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/pmsched";
			});
			}
		}});
	}
  }
  
  return (
    <>
   <br/><br/>
	<Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
		<br/>
			<h2 align="center">PMSchedule</h2>
			<hr/>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Equipment:</Col><Col md={6}>
			<Form.Select id="eqid" onChange={(event)=>{pm.eqid=event.target.value}}>
			<option>Select Equipment</option>
			</Form.Select>
			</Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>PMS Date:</Col><Col md={6}><Form.Control placeholder="Enter Date" type="date" id="pmsdate" onChange={(event)=>{pm.pmsdate=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>insertpms()} >Add Schedule</Button>
	</Container>
    </>
  );
}
export default AddPmsched;