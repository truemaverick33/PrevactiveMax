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

var equipment = {
	eqpname:null,
	eqpdesc:null,
	eqparea:null,
	warstart:null,
	warend:null,
	warspan:null		
}
function AddEquip(){
const [na,setNa] = useState(false);
 useEffect(()=>{
	  $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"areaa"},success(data){
		var jsonData = JSON.parse(data);
		var table = "<option value=''>select</option>";
		for(let i=0;i<jsonData.length;i++){
		    table+="<option value='"+jsonData[i].areaId+"'>"+jsonData[i].areaName+"</option>";
		} 
		document.getElementById("areasel").innerHTML = table;
		try{
		var qstring = window.location.search;
        var params = new URLSearchParams(qstring);
        var id = params.get('aid');
		}
		catch(e){
			id = '';
		}
		$('#areasel').val(id);
	}});
  });
 const insertEqp=()=>{
	 if(equipment.eqpname==null || equipment.eqpname==""){
		swal({title:"Task Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#woTitle').focus();
		});
	}
	else if(equipment.eqpdesc==null || equipment.eqpdesc==""){
        swal({title:"Please Provide an appropriate Description!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#woDesc').focus();
		});	
	}
	else if(equipment.eqparea==null || equipment.eqparea==""){
        swal({title:"Type Can Not Be Blank!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#woType').focus();
		});	
	}
	else if(equipment.warstart==null || equipment.warstart==""){
        swal({title:"Please Select reqUid!",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#reqUid').focus();
		});	
	}
	else if((equipment.warspan==null || equipment.warspan=="") && (equipment.warend==null || equipment.warend=="")){
        swal({title:"Please Enter Either Waranty Span or Waranty End",icon:"error",buttons:false,timer:1300}).then(()=>{
			$('#deptId').focus();
		});	
	}
	else{
        var fData = new FormData();
		fData.append('file1', document.getElementById('wardoc').files[0]);
		fData.append('file2', document.getElementById('eqpdoc').files[0]);
		fData.append('name', equipment.eqpname);
		fData.append('desc', equipment.eqpdesc);
		fData.append('areaid', equipment.eqparea);
		fData.append('wstart', equipment.warstart);
		if((equipment.warend!="" && equipment.warend!=null )&& (equipment.warspan==null||equipment.warspan=="")){
			var d1 = new Date(equipment.warstart);
			var d2 = new Date(equipment.warend);
			var diffMs = Math.abs(d2 - d1);
			var diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44);
			fData.append('wspan',Math.floor(diffMonths));
			fData.append('wend',equipment.warend);
			$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=equip",data:fData,contentType:false,processData:false,success(data){
				if(data){
			    swal({title:"Successful!",text:"New Equipment was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/equipments";
			});
			}
		  }});
		}
		else if((equipment.warspan!=null && equipment.warspan!="") && (equipment.warend=="" || equipment.warend==null )){
			var d1 = new Date(equipment.warstart);
			d1.setMonth(d1.getMonth() + parseInt(equipment.warspan));
			fData.append('wspan',equipment.warspan);
			fData.append('wend',d1.toISOString().slice(0,10));
			$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=equip",data:fData,contentType:false,processData:false,success(data){
			if(data){
			    swal({title:"Successful!",text:"New Equipment was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
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
			<h2 align="center">Add New Equipment</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Equipment Name:</Col><Col md={6}><Form.Control placeholder="Enter New Equipment Name" type="text" id="eqpname" onChange={(event)=>{equipment.eqpname=event.target.value}} style={{height:'35px'}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Equipment Description:</Col><Col md={6}><Form.Control placeholder="Enter Equipment description" as="textarea" rows={3} onChange={(event)=>{equipment.eqpdesc=event.target.value}} id="eqpdesc"/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Area:</Col><Col md={6}>
			<Form.Select id="areasel" onChange={(event)=>{equipment.eqparea=event.target.value}}>
			</Form.Select>
			</Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Waranty Start:</Col><Col md={3}><Form.Control type="date" onChange={(event)=>{equipment.warstart=event.target.value}} id="neweqpname"/></Col><Col md={3}><Form.Check type="switch" id="notassign" label="auto-calculate" value={na} onChange={()=>{setNa(!na)}} reverse/></Col>
			</Row>
			{na?<Row align='left' style={{padding:'10px'}}><Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Waranty Span:</Col><Col md={3}><Form.Control placeholder="Enter Span" type="number" onChange={(event)=>{equipment.warspan=event.target.value}}  id="warspan" style={{height:'35px'}}/></Col></Row>:<Row align="left" style={{padding:'10px'}}><Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Waranty End:</Col><Col md={3}><Form.Control type="date" onChange={(event)=>{equipment.warend=event.target.value}}  id="warend"/></Col></Row>}
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Waranty Document:</Col><Col md={6}><Form.Control placeholder="Upload Document" type="file" id="wardoc" accept="application/pdf" style={{height:'35px'}}/></Col>
			</Row>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Equipment Manual:</Col><Col md={6}><Form.Control placeholder="Upload Document" type="file" id="eqpdoc" accept="application/pdf" style={{height:'35px'}}/></Col>
			</Row>
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>insertEqp()}>Add Equipment</Button>
</Container>
</>
);
}
export default AddEquip;