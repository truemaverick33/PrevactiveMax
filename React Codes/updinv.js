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
var inv={
	invid:id,
	invname:null,
	invdesc:null,
	invcost:null,
	stockqty:null,
}
function Updinv() {
	useEffect(()=>{
	$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"invspec",invid:id},success(data){
		var jsonData = JSON.parse(data);
		inv.invname=jsonData[0].invName;
		$('#newInventory').val(jsonData[0].invName);
		inv.invdesc=jsonData[0].invDesc;
		$('#invDesc').val(jsonData[0].invDesc);
		inv.invcost=jsonData[0].invCost;
		$('#invc').val(jsonData[0].invCost);
		inv.stockqty=jsonData[0].stockQty;
		$('#invq').val(jsonData[0].stockQty);
		}});
	});
  const updateinv=()=>{
	  if(inv.invname==null || inv.invname==""){
		swal({title:"Item Name Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#newInventory').focus();
		});
	}
	else if(inv.invdesc==null || inv.invdesc==""){
        swal({title:"Please enter a valid description",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#invDesc').focus();
		});	
	}
	else if(inv.stockqty==null || inv.stockqty==""){
        swal({title:"Please enter stock qunatity",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#invq').focus();
		});	
	}
	else if(inv.invcost==null || inv.invcost==""){
        swal({title:"Please Enter Cost",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#invc').focus();
		});	
	}
	else{
		$.ajax({type:"POST",url:connstr+"/Backend/update.php?ufor=inv",data:inv,success(data){
			if(data){
			swal({title:"Successful!",text:"Update to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/inventory";
			});
			}
		}});
	}
  }
  return (
    <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Update Inventory</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Item Name:</Col><Col md={6}><Form.Control placeholder="Enter Item Name" type="text" id="newInventory" onChange={(event)=>{inv.invname=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Description:</Col><Col md={6}><Form.Control placeholder="Enter Equipment description" as="textarea" rows={3}  id="invDesc" onChange={(event)=>{inv.invdesc=event.target.value}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Cost:</Col><Col md={6}><Form.Control placeholder="Enter Cost per Pcs" type="number" id="invc" onChange={(event)=>{inv.invcost=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Quantity in-Stock:</Col><Col md={6}><Form.Control placeholder="Enter stock quantity" type="number" id="invq" onChange={(event)=>{inv.stockqty=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>updateinv()}>Update Inventory</Button>
	</Container>
  );
}

export default Updinv;