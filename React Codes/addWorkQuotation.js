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

var wqr={
	wqTitle:null,
	wqDesc:null,
	woId:null,
	estimatedCost:null,
	approval:null
}
var qstring = window.location.search;
var params = new URLSearchParams(qstring);
var id = params.get('id');
function Work_q_m() {
	useEffect(()=>{
	  wqr.woId = id;	
  });
  
  
  const insertwqr=()=>{
	  if(wqr.wqTitle==null || wqr.wqTitle==""){
		swal({title:"Title Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#wqTitle').focus();
		});
	}
	else if(wqr.wqDesc==null || wqr.wqDesc==""){
        swal({title:"Description Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#wqDesc').focus();
		});	
	}
	else if(wqr.woId==null || wqr.woId==""){
        swal({title:"Please select Work Order id !",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#woId').focus();
		});	
	}
	else if(wqr.estimatedCost==null || wqr.estimatedCost==""){
        swal({title:"Estimated Cost Can Not Empty!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#estimatedCost').focus();
		});	
	}
	else{
	var fData = new FormData();
	fData.append('file1', document.getElementById('analysisRepDoc').files[0]);
	fData.append('title', wqr.wqTitle);
	fData.append('desc', wqr.wqDesc);
	fData.append('woid', wqr.woId);
	fData.append('est', wqr.estimatedCost);
	$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=wqreq",data:fData,contentType:false,processData:false,success(data){
		console.log(data);
		if(data){
			    swal({title:"Successful!",text:"Document was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				//window.location.href="/details/workorders?id="+id;
			});
		}
	}});
	}
  }
  
  
  
	
  return (
    <>
	<br/>
   <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Work Quotation</h2>
			<hr/>
        
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Title:</Col><Col md={6}><Form.Control placeholder="Title" type="text" id="wqTitle" onChange={(event)=>{wqr.wqTitle=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Description:</Col><Col md={6}><Form.Control placeholder="Description" as="textarea" id="wqDesc" onChange={(event)=>{wqr.wqDesc=event.target.value}} rows={3}/></Col>
			</Row> 
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Analysis Report:</Col><Col md={6}><Form.Control type="file" id="analysisRepDoc" style={{height:'35px'}}/></Col>
			</Row>
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Work Order Id:</Col>
			<Col md={6}><Form.Control placeholder="Work Order Id" readOnly  value={id} type="text" id="woId" style={{height:'35px'}}/></Col>
			</Row> 
			
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Estimated Cost:</Col><Col md={6}><Form.Control placeholder="Estimated Cost" type="int" id="estimatedCost" onChange={(event)=>{wqr.estimatedCost=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
	  
	 <Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>insertwqr()} >Create Work Quotation</Button>
	</Container>
	
	
    </>
  );
}

export default Work_q_m;