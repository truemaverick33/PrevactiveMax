import React from 'react';
import {useRef,useState,useEffect} from 'react';
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
var curstat=0;

function DetailsWo(){
	const [optech,setOptech] = useState('Computing...');
	const setCompletion=(val)=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=setComplete",data:{status:val,woid:id},success(data){
			if(data){
			swal({title:"Successful!",text:"Work Order Status Successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/invused?id="+id;
			});
			}
		}});
	}
	const setStatus=(val)=>{
	$.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=setStatus",data:{status:val,woid:id},success(data){
			if(data){
			swal({title:"Successful!",text:"Work Order Status Successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.reload();
			});
			}
		}});
   }
   const AssignTech=(val)=>{
	  $.ajax({type:"POST",url:connstr+"/Backend/Update.php?ufor=wotech",data:{status:val,uid:document.getElementById('asgtec').value,woid:id},success(data){
			console.log(data);
			if(data){
			swal({title:"Successful!",text:"Technician Assigned Successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.reload();
			});
			}
		}});
   }
	const getProgress=(currentStat)=>{
	if(currentStat==0){
		return "<div class='progress' title='Requested'><div class='progress-bar bg-secondary progress-bar-striped' style='width:100%;font-size:10px;'>Requested</div></div>"
	}
	else if(currentStat==1){
		return "<div class='progress' title='Approved'><div class='progress-bar bg-info progress-bar-striped' style='width:10%'>Approved</div></div>"
	}
	else if(currentStat==-1){
		return "<div class='progress' title='Rejected'><div class='progress-bar bg-danger progress-bar-striped' style='width:100%'>Rejected</div></div>"
	}
	else if(currentStat==2){
		return "<div class='progress' title='Assigned'><div class='progress-bar progress-bar-striped' style='width:20%'>Assigned</div></div>"
	}
	else if(currentStat==3){
		return "<div class='progress' title='Inspecting'><div class='progress-bar bg-secondary progress-bar-striped' style='width:30%'>Inspecting</div></div>"
	}
	else if(currentStat==4){
		return "<div class='progress' title='Started'><div class='progress-bar progress-bar-striped' style='width:40%'>Started</div></div>"
	}
	else if(currentStat==5){
		return "<div class='progress' title='Aborted'><div class='progress-bar bg-danger progress-bar-striped' style='width:100%'>Aborted</div></div>"
	}
	else if(currentStat==6){
		return "<div class='progress' title='Suspended'><div class='progress-bar bg-warning progress-bar-striped' style='width:100%'>suspended</div></div>"
	}
	else if(currentStat==7){
		return "<div class='progress' title='Completed'><div class='progress-bar bg-success progress-bar-striped' style='width:100%'>Completed</div></div>"
	}

}
const getStatusBtns=(currentStat,type)=>{
	if(currentStat==0 && type=="Admin"){
		document.getElementById('stBtn').innerHTML = "<button title='approve' id='approve' class='btn btn-success'><i class='bi bi-check-lg'></i></button> <button title='reject' id='reject' class='btn btn-danger'><i class='bi bi-x-lg'></i></button>";
		document.getElementById('approve').addEventListener('click',function(){
			setStatus(1);
		});
		document.getElementById('reject').addEventListener('click',function(){
			setStatus(-1);
		});
	}
	else if(currentStat==1 && type=="Admin"){
		document.getElementById('stBtn').innerHTML ="<table id='ai'><tr><td><select id='asgtec' class='form-select'></select></td><td><button id='assign' title='assign' class='btn btn-dark'><i class='bi bi-link'></i></button></td></tr></table>";
		document.getElementById('assign').addEventListener('click',function(){
			AssignTech(2);
		});
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"techs"},success(data){
					var json = JSON.parse(data);
					var data ="<option value=''>select</option>";
					for(let i=0;i<json.length;i++){
						data+="<option value='"+json[i].uid+"'>"+json[i].employeeName+"</option>";
					}
					document.getElementById("asgtec").innerHTML = data;
		}});
	}
	else if(currentStat == 2 && type=="Technician"){
		document.getElementById('stBtn').innerHTML = "<button title='inspect' id='inspect' class='btn btn-dark'><i class='bi bi-search'></i></button> <button title='reject' id='reject' class='btn btn-danger'><i class='bi bi-x-lg'></i></button>";
		document.getElementById('inspect').addEventListener('click',function(){
			setStatus(3);
		});
		document.getElementById('reject').addEventListener('click',function(){
			setStatus(1);
		});
	}
	else if(currentStat == 2 && type=="Admin"){
				document.getElementById('stBtn').innerHTML = "<button title='reassign' id='reassign' class='btn btn-primary'><i class='bi bi-arrow-repeat'></i></button> <button title='abort' id='abort' class='btn btn-danger'><i class='bi bi-x-lg'></i></button>";
	    document.getElementById('reassign').addEventListener('click',function(){
			setStatus(1);
		});
		document.getElementById('abort').addEventListener('click',function(){
			setStatus(5);
		});
	}
	else if(currentStat == 3 && type=="Technician"){
		document.getElementById('stBtn').innerHTML = "<a title='Add Work Quotation' href='/add/workquotations?id="+id+"' id='awoc' class='btn btn-dark'><i style='color:white' class='bi bi-file-earmark-plus-fill'></i></a> <button title='reject' id='reject' class='btn btn-danger'><i class='bi bi-x-lg'></i></button>";
		document.getElementById('reject').addEventListener('click',function(){
			setStatus(1);
		});
	}
	else if(currentStat == 3 && type=="Admin"){
		document.getElementById('stBtn').innerHTML = "<button title='start' id='start' class='btn btn-success'><i class='bi bi-check-lg'></i></button> <button title='reject' id='reject' class='btn btn-danger'><i class='bi bi-x-lg'></i></button>";
		document.getElementById('start').addEventListener('click',function(){
			setStatus(4);
		});
		document.getElementById('reject').addEventListener('click',function(){
			setStatus(5);
		});
	}
	else if(currentStat == 4 && type=="Admin"){
				document.getElementById('stBtn').innerHTML = "<button title='complete' id='complete' class='btn btn-success'><i class='bi bi-check-lg'></i></button> <button title='suspend' id='suspend' class='btn btn-warning'><i class='bi bi-arrow-repeat'></i></button> <button title='abort' id='abort' class='btn btn-danger'><i class='bi bi-x-lg'></i></button>";
	    document.getElementById('complete').addEventListener('click',function(){
			setCompletion(7);
		});
		document.getElementById('suspend').addEventListener('click',function(){
			setStatus(6);
		});
		document.getElementById('abort').addEventListener('click',function(){
			setStatus(5);
		});
	}
	
}
	useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"woDet",woid:id},success(data){
			var jsonData=JSON.parse(data);
			document.getElementById('title').innerHTML = jsonData[0].woTitle;
			document.getElementById('desc').innerHTML = jsonData[0].woDesc;
			document.getElementById('type').innerHTML = jsonData[0].woType;
			document.getElementById('deadline').innerHTML = jsonData[0].deadline;
			document.getElementById('reqby').innerHTML = jsonData[0].employeeName;
			document.getElementById('location').innerHTML = "@ Area: "+ jsonData[0].areaName +",  In Dept: "+jsonData[0].deptName;
			document.getElementById('eqp').innerHTML = jsonData[0].equipName + " <a href='/details/equipments?id="+jsonData[0].eqpid+"'><i class='bi bi-box-arrow-up-right' style='font-size:14px'></i></a>";
			document.getElementById('progress').innerHTML = getProgress(jsonData[0].CurrStatus);
			if(sessionStorage.getItem("access") == "Admin" || sessionStorage.getItem("access") == "Technician"){
			  getStatusBtns(jsonData[0].CurrStatus,sessionStorage.getItem("access"));
			}
            if(jsonData[0].CurrStatus==1){			
			$.ajax({
				url: 'http://localhost:5000/predict',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
				description: jsonData[0].woTitle
				}),
					success: function(response) {
						console.log(response.technician);
						if(jsonData[0].severity=="Low"){
						$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"optimalwlc",type:response.technician},success(data){
						var jsonData=JSON.parse(data);
						setOptech("Optimum Technician: "+jsonData[0].employeeName);
						}});
						}
						else if(jsonData[0].severity=="Medium"){
						$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"optimalwcmed",type:response.technician},success(data){
						var jsonData=JSON.parse(data);
						setOptech("Optimum Technician: "+jsonData[0].employeeName);
						}});
						}
						else if(jsonData[0].severity=="High"){
						$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"optimalwchi",type:response.technician},success(data){
						var jsonData=JSON.parse(data);
						setOptech("Optimum Technician: "+jsonData[0].employeeName);
						}});
						}
						else if(jsonData[0].severity=="Emergency"){
						$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"optimalemg",type:response.technician},success(data){
						var jsonData=JSON.parse(data);
						setOptech("Optimum Technician: "+jsonData[0].employeeName);
						}});
						document.getElementById('AItech').style.display="";
						}
					},
					error: function(error) {
					console.log(error);
					}
				});
			}
			else{
				document.getElementById('AItech').style.display="none";
			}
			}});
			$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"wqDet",woid:id},success(data){
			try{
			var jsonData=JSON.parse(data);
			document.getElementById('wqt').innerHTML = jsonData[0].wqTitle;
			document.getElementById('wqd').innerHTML = jsonData[0].wqDesc;
			document.getElementById('wqec').innerHTML = "&#8377;"+jsonData[0].estimatedCost;
			if(jsonData[0].analysisRepDoc!=""){
			document.getElementById('pdfviewer').src = connstr+"/Backend/"+jsonData[0].analysisRepDoc;
			}
			else{
				document.getElementById('pdfviewer').style.display = "none";
			}
			}
			catch(e){
				document.getElementById('wq').innerHTML = "Not Uploaded Yet!";
				document.getElementById('pdfviewer').style.display = "none";
			}
			}});
			$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"wosDet",woid:id},success(data){
					try{
					var json = JSON.parse(data);
					document.getElementById('astec').innerHTML = json[0].employeeName;
					document.getElementById('asd').innerHTML = json[0].assignDate;
					document.getElementById('comp').innerHTML = json[0].completionDate;
					}
					catch(e){
                    document.getElementById('astec').innerHTML = "";
					document.getElementById('asd').innerHTML = "";
					document.getElementById('comp').innerHTML = "";
					}
					

					
		}});
	  $.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"invlog",woid:id},success(data){
					try{
					var json = JSON.parse(data);
					var tc = 0;
					var data ="<tr class='table-dark'><th>sr.</th><th>Item</th><th>Qty</th><th>Cost</th></tr>"
					for(let i=0;i<json.length;i++){
						data+="<tr><td>"+(i+1)+"</td><td>"+json[i].invName+"</td><td>"+json[i].qtyUsed+"</td><td>"+(parseInt(json[i].qtyUsed)*parseInt(json[i].invCost))+"</td></tr>";
						tc+=(parseInt(json[i].qtyUsed)*parseInt(json[i].invCost));
					}
					data+="<tr><td></td><td><b>Gross Total:</b></td><td>"+tc+"</td><td></td>";
					document.getElementById("invused").innerHTML = data;
					}
					catch(e){
						
					}
					
		}});
	});
	
	return(
	<>
	<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'55rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
	<h4 className="display-6" align="center">Work Order{"#"+id}</h4>
	<br/>
	<Card>
	<Card.Title style={{backgroundColor:"black",color:"white",marginBottom:"0px",paddingBottom:"0px"}}><h6 className="display-6" style={{fontSize:"24px",paddingTop:"10px"}} align="center">Details</h6></Card.Title>
	<Card.Body>
	<table style={{fontSize:"18px"}} align="center">
	<tr><td style={{verticalAlign:"top"}}><b>Task:</b></td><td id="title"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Description:</b></td><td id="desc"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Type:</b></td><td id="type"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Deadline:</b></td><td id="deadline"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Requested By:</b></td><td id="reqby"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Location:</b></td><td id="location"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Equipment:</b></td><td id="eqp"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Progress:</b></td><td id="progress"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Assigned Technician:</b></td><td id="astec"></td>
	</tr>
	<tr><td style={{verticalAlign:"top"}}><b>Date of Assigning:</b></td><td id="asd">TBA</td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Completion Date:</b></td><td id="comp">TBA</td></tr>
	</table>
	<br/>
	<Accordion defaultActiveKey="0">
	<Accordion.Item eventKey="0">
	<Accordion.Header>Work Order Quotation</Accordion.Header>
	<Accordion.Body>
	<Row>
	<Col>
	<h6>Details:</h6>
	<table id="wq">
	<tr><td style={{verticalAlign:"top"}}><b>Title:</b></td><td id="wqt"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Description:</b></td><td id="wqd"></td></tr>
	<tr><td style={{verticalAlign:"top"}}><b>Estimated Cost:</b></td><td id="wqec"></td></tr>
	</table>
	<br/>
	<h6>Inventory Used:</h6>
	<Table id='invused'>
	</Table>
	</Col>
	<Col md={6}>
	<iframe id="pdfviewer" style={{width:"100%",height:"600px"}} frameBorder="0"></iframe>
	</Col>
	</Row>
	</Accordion.Body>
	</Accordion.Item>
	</Accordion>
	<hr/>
	<Row align="center"><Col>
	<div id="stBtn" align="center">
	</div></Col><Col id="AItech">
	<OverlayTrigger trigger="click" placement="left" overlay={<Popover><Popover.Header as="h3">AI Suggestion</Popover.Header><Popover.Body id='optech'>{optech}</Popover.Body></Popover>}>
    <Button variant="secondary" style={{borderRadius:"50%"}}><i className="bi bi-robot"></i></Button>
    </OverlayTrigger></Col></Row>
	</Card.Body>
	</Card>
	<br/>
	</Container>
	<br/>
	</>
	);
}
export default DetailsWo;