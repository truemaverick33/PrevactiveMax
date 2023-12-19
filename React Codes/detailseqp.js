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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Accordion from 'react-bootstrap/Accordion';
import swal from 'sweetalert';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './treeview.css';
import connstr from './constr.js';

var qstring = window.location.search;
var params = new URLSearchParams(qstring);
var id = params.get('id');
function DetailsEqp(){
	const setPdf=(pdf)=>{
		document.getElementById('pdfviewer').src = pdf;
	}
	const uploadDoc=(id,pg)=>{
		window.location.href="/uploads/equipments?id="+id+"&doct="+pg;
	}
	const assignChecklist=()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=chmap",data:{chid:document.getElementById('asgncheck').value,eqpid:id},success(data){
			if(data){
			swal({title:"Successful!",text:"Checklist Linked successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.reload();
			});
			}
		}});
	}
	const unlinkChecklist=()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=unlink",data:{eqpid:id},success(data){
			//console.log(data);
			if(data){
			swal({title:"Successful!",text:"Checklist Linked successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.reload();
			});
			}
		}});
	}
	const assignInv=()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=invmap",data:{invid:document.getElementById('asginv').value,eqpid:id},success(data){
			if(data){
			swal({title:"Successful!",text:"Checklist Linked successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.reload();
			});
			}
		}});
	}
	useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"equipDet",equipid:id},success(data){
			var jsonData=JSON.parse(data);
			document.getElementById('name').innerHTML = jsonData[0].equipName;
			document.getElementById('desc').innerHTML = jsonData[0].description;
			document.getElementById('area').innerHTML = jsonData[0].areaName;
			document.getElementById('wst').innerHTML = jsonData[0].warantyStart;
			document.getElementById('we').innerHTML = jsonData[0].warantyEnd;
			document.getElementById('wsp').innerHTML = jsonData[0].warantySpan;
			if(jsonData[0].warantyDoc != ""){
			document.getElementById('pdfviewer').src = connstr+"/Backend/"+jsonData[0].warantyDoc;
			document.getElementById('wdoc').addEventListener('click',function(){setPdf(connstr+"/Backend/"+jsonData[0].warantyDoc)});
			}
			else{
				document.getElementById('wdoc').innerHTML = "<p><i class='bi bi-file-earmark-arrow-up' style='color:black;font-size:22px'></i> Upload Waranty Doc</p>";
				document.getElementById('wdoc').addEventListener('click',function(){uploadDoc(jsonData[0].equipId,"wdoc")});		
			}
			if(jsonData[0].equipDoc != "" ){
			document.getElementById('edoc').addEventListener('click',function(){setPdf(connstr+"/Backend/"+jsonData[0].equipDoc)});
			}
			else{
				document.getElementById('edoc').innerHTML = "<p><i class='bi bi-file-earmark-arrow-up' style='color:black;font-size:22px'></i> Upload Equipment Doc</p>";
				document.getElementById('edoc').addEventListener('click',function(){uploadDoc(jsonData[0].equipId,"edoc")});		
			}
		}});
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"equipcheck",equipid:id},success(data){
			try{
				var json = JSON.parse(data);
				document.getElementById("na").style.display = "none";
				document.getElementById("ac").style.display = "none";
				document.getElementById("checkdoc").style.display = "";
				document.getElementById("checkdocc").addEventListener('click',function(){setPdf(connstr+"/Backend/"+json[0].chDoc)});
				if(sessionStorage.getItem('access')=="Master" || sessionStorage.getItem('access')=="Admin"){
					document.getElementById("unlink").style.display = "";
				}
				else{
					document.getElementById("unlink").style.display = "none";
				}

			}
			catch(e){
				if(sessionStorage.getItem('access')=="Master" || sessionStorage.getItem('access')=="Admin"){
				$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"checklista"},success(data){
					var json = JSON.parse(data);
					var data ="<option value=''>select</option>";
					for(let i=0;i<json.length;i++){
						data+="<option value='"+json[i].chId+"'>"+json[i].chName+"</option>";
					}
					document.getElementById("asgncheck").innerHTML = data;
					document.getElementById("na").style.display = "none";
					document.getElementById("checkdoc").style.display = "none";
				}});
				}
				else{
					document.getElementById("ac").style.display = "none";
					document.getElementById("checkdoc").style.display = "none";

				}
			}
		}});
		if(sessionStorage.getItem('access')=="Master" || sessionStorage.getItem('access')=="Admin"){
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"inva"},success(data){
					var json = JSON.parse(data);
					var data ="<option value=''>select</option>";
					for(let i=0;i<json.length;i++){
						data+="<option value='"+json[i].invId+"'>"+json[i].invName+"</option>";
					}
					document.getElementById("asginv").innerHTML = data;
		}});
		}
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"equipinv",equipid:id},success(data){
					//console.log(data);
					var json = JSON.parse(data);
					var data =" [ ";
					for(let i=0;i<json.length;i++){
						data+=json[i].invName;
						if(i!=(json.length-1)){
							data+=", "
						}
					}
					data+=" ]"
					document.getElementById("reqinv").innerHTML = data;
		}});
	});
	return(
	<>
	<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
	<Row>
	<Col>
	<h4 className="display-6" align="center">Equipment</h4>
	<br/>
	<table style={{fontSize:"18px"}}>
	<tr><td style={{verticalAlign:"top"}}><b>Name:</b></td><td id="name"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Description:</b></td><td id="desc"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Area:</b></td><td id="area"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Waranty Start:</b></td><td id="wst"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Waranty End:</b></td><td id="we"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Waranty Span:</b></td><td id="wsp"></td></tr>
	</table>
	<br/>
	<table><tr><td>
	<Card style={{cursor:"pointer",verticalAlign:"center",maxWidth:"12rem",minHeight:"3rem",padding:"5px",fontSize:"14px"}} id="wdoc"><p align='center'><i className='bi bi-file-earmark-pdf' style={{color:"red",fontSize:"22px"}}></i> Waranty Document</p></Card></td><td>
	<Card style={{cursor:"pointer",verticalAlign:"center",maxWidth:"12rem",minHeight:"3rem",padding:"5px",fontSize:"14px"}} id="edoc"><p align='center'><i className='bi bi-file-earmark-pdf' style={{color:"red",fontSize:"22px"}}></i> Equipment Manual</p></Card></td>
	</tr>
	</table>
	<table id="ac">
	<tr><td>
	<Form.Select id="asgncheck">
	</Form.Select></td><td>
	<Button variant="dark" onClick={(event)=>assignChecklist()}><i className="bi bi-link"></i></Button></td></tr>
	</table>
	<p id="na">No Checklist Available</p>
	<table id="checkdoc"><tr><td>
	<Card style={{cursor:"pointer",verticalAlign:"center",maxWidth:"12rem",height:"3rem",padding:"5px",fontSize:"14px"}} id="checkdocc"><p align='center'><i className='bi bi-clipboard2-check' style={{color:"black",fontSize:"22px"}}></i> Checklist</p></Card></td><td>
	<Button variant="danger" style={{height:"45px"}} title="unlink checklist" id="unlink" onClick={(event)=>unlinkChecklist()}><i className="bi bi-x-lg"></i></Button></td></tr></table>
	<hr/>
	<table><tr><td><p>Required Inventory:</p></td><td>
	<p id="reqinv" style={{fontSize:"12px"}}></p></td></tr></table>
	{
		sessionStorage.getItem('access')=="Master"?(<><table id="ai">
			<tr><td>
			<Form.Select id="asginv">
			</Form.Select></td><td>
			<Button variant="dark" onClick={(event)=>assignInv()}><i className="bi bi-link"></i></Button></td></tr>
			</table></>):""
	}
	</Col>
	<Col md={6}>
	<iframe id="pdfviewer" style={{width:"100%",height:"600px"}} frameBorder="0"></iframe>
	</Col>
	</Row>
	</Container>
	<br/>
	</>
	);
}
export default DetailsEqp;