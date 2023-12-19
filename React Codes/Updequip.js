import React from 'react';
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import swal from 'sweetalert';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import connstr from './constr.js';

var qstring = window.location.search;
var params = new URLSearchParams(qstring);
var id = params.get('id');
var equipment = {
	id:id,
	name:null,
	desc:null,
	wstart:null,
	wend:null,
	wspan:null		
}
function Updequip(){
const [na,setNa] = useState(false);
 useEffect(()=>{
	$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"equipspec",eid:id},success(data){
		var jsonData = JSON.parse(data);
		equipment.name = jsonData[0].equipName;
		equipment.desc = jsonData[0].description;
		equipment.wstart = jsonData[0].warantyStart;
		equipment.wend = jsonData[0].warantyEnd;
		equipment.wspan = jsonData[0].warantySpan;
		$('#equipName').val(jsonData[0].equipName);
		$('#description').val(jsonData[0].description);
		$('#warantyStart').val(jsonData[0].warantyStart);
		$('#warantyEnd').val(jsonData[0].warantyEnd);
	}});
  });
 const updateequip=()=>{
	 if(equipment.name==null || equipment.name==""){
		swal({title:"Name Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#equipName').focus();
		});
	}
	else if(equipment.desc==null || equipment.desc==""){
        swal({title:"Please Provide an appropriate Description!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#description').focus();
		});	
	}
	
	else if(equipment.wstart==null || equipment.wstart==""){
        swal({title:"Please Select Waranty Start!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#warantyStart').focus();
		});	
	}
	else if((equipment.wspan==null || equipment.wspan=="") && (equipment.wend==null || equipment.wend=="")){
        swal({title:"Please Enter Either Waranty Span or Waranty End",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#warantySpan').focus();
		});	
	}
	else{
		if((equipment.wend!="" && equipment.wend!=null )&& (equipment.wspan==null||equipment.wspan=="")){
			var d1 = new Date(equipment.wstart);
			var d2 = new Date(equipment.wend);
			var diffMs = Math.abs(d2 - d1);
			var diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44);
			equipment.wspan = diffMonths;
			$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=equipment",data:equipment,success(data){
			if(data){
			    swal({title:"Successful!",text:"Equipment was Updated to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/equipments";
			});
			}
		  }});
		}
		else if((equipment.wspan!=null && equipment.wspan!="") && (equipment.wend=="" || equipment.wend==null )){
			var d1 = new Date(equipment.wstart);
			d1.setMonth(d1.getMonth() + parseInt(equipment.wspan));
			equipment.wend=d1.toISOString().slice(0,10);
			$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=equipment",data:equipment,success(data){
			if(data){
			    swal({title:"Successful!",text:"Equipment was Updated to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/equipments";
			});
			}
		  }});
		}
	}
 }
return(
<>
<Container style={{padding:'0',backgroundColor:'white',maxWidth:'40rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Update Equipment</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Equipment Name:</Col><Col md={6}><Form.Control placeholder="Enter New Equipment Name" type="text" id="equipName" onChange={(event)=>{equipment.name=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Equipment Description:</Col><Col md={6}><Form.Control placeholder="Enter Equipment description" as="textarea" rows={3} onChange={(event)=>{equipment.desc=event.target.value}} id="description"/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Waranty Start:</Col><Col md={3}><Form.Control type="date" onChange={(event)=>{equipment.wstart=event.target.value}} id="warantyStart"/></Col><Col md={3}><Form.Check type="switch" id="notassign" label="auto-calculate" value={na} onChange={()=>{setNa(!na)}} reverse/></Col>
			</Row>
			{na?<Row align='left' style={{padding:'10px'}}><Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Waranty Span:</Col><Col md={3}><Form.Control placeholder="Enter Span" type="number" onChange={(event)=>{equipment.wspan=event.target.value}}  id="warantySpan" style={{height:'35px'}}/></Col></Row>:<Row align="left" style={{padding:'10px'}}><Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Waranty End:</Col><Col md={3}><Form.Control type="date" onChange={(event)=>{equipment.wend=event.target.value}}  id="warantyEnd"/></Col></Row>}
			
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>updateequip()}>Update Equipment</Button>
</Container>
</>
);
}
export default Updequip;