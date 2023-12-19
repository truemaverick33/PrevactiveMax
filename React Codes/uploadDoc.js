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

function UploadDoc(){
const uploadFile=()=>{
	var qstring = window.location.search;
    var params = new URLSearchParams(qstring);
    var id = params.get('id');
	var pg = params.get('doct');
	var fData = new FormData();
	fData.append('file1', document.getElementById('wardoc').files[0]);
	fData.append('equipid', id);
	//console.log(fData.equipid);
	$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor="+pg,data:fData,contentType:false,processData:false,success(data){
		if(data){
			//console.log(data);
			    swal({title:"Successful!",text:"Document was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/details/equipments?id="+id;
			});
		}
	}});
}
return (
    <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Upload Document</h2>
			<hr/>
			<Row align="left" style={{padding:'10px'}}>
		    <Col md={1}></Col><Col md={3} style={{verticalAlign:"sub"}}>Select File:</Col><Col md={6}><Form.Control type="file" id="wardoc" style={{height:'35px'}}/></Col>
			</Row>
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>uploadFile()}>Upload</Button>
	</Container>
);
}
export default UploadDoc;