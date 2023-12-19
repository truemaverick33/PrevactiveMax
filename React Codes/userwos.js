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



var timer;
function MyWorkOrders(){
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
useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"wom4usr",uid:sessionStorage.getItem('userid')},success(data){
			var jsonData=JSON.parse(data);
			var req =""
			var acc ="";
			var rej ="";
			for(let i=0; i<jsonData.length ; i++)
				{
			   	if(jsonData[i].CurrStatus==0){
				req+="<tr class='dept' id='"+jsonData[i].woid+"' style='cursor:grab'><td>"+jsonData[i].woid+"</td><td>"+jsonData[i].woTitle+"</td><td>"+jsonData[i].woType+"</td><td>"+jsonData[i].severity+"</td><td>"+jsonData[i].employeeName+"</td><td>"+jsonData[i].equipName+"</td><td>"+getProgress(jsonData[i].CurrStatus)+"</td><td border='0'><div class='card' align='center' id='m"+jsonData[i].woid+"' style='display:none;width:3rem;padding:3px'></div></div></div></td></tr>";
				}
				else if(jsonData[i].CurrStatus== -1){
				rej+="<tr class='dept' id='"+jsonData[i].woid+"' style='cursor:grab'><td>"+jsonData[i].woid+"</td><td>"+jsonData[i].woTitle+"</td><td>"+jsonData[i].woType+"</td><td>"+jsonData[i].severity+"</td><td>"+jsonData[i].employeeName+"</td><td>"+jsonData[i].equipName+"</td><td>"+getProgress(jsonData[i].CurrStatus)+"</td><td border='0'><div class='card' align='center' id='m"+jsonData[i].woid+"' style='display:none;width:3rem;padding:3px'></div></div></div></td></tr>";
				}
				else{
				acc+="<tr class='dept' id='"+jsonData[i].woid+"' style='cursor:grab'><td>"+jsonData[i].woid+"</td><td>"+jsonData[i].woTitle+"</td><td>"+jsonData[i].woType+"</td><td>"+jsonData[i].severity+"</td><td>"+jsonData[i].employeeName+"</td><td>"+jsonData[i].equipName+"</td><td>"+getProgress(jsonData[i].CurrStatus)+"</td><td border='0'><div class='card' align='center' id='m"+jsonData[i].woid+"' style='display:none;width:3rem;padding:3px'></div></div></div></td></tr>";
				}
				}		
			document.getElementById('acc').innerHTML=acc;
			document.getElementById('req').innerHTML=req;
			document.getElementById('rej').innerHTML=rej;
		var deps = document.getElementsByClassName('dept');
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mousedown",function(){
				showMenu(deps[x].id,"workorders");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mouseup",function(){
				stoptimer(deps[x].id);
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchstart",function(){
				showMenu(deps[x].id,"workorders");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchend",function(){
				stoptimer(deps[x].id);
			});
		}
		}});
});
const hideMenu=(id)=>{
	document.getElementById('m'+id).style.display="none";
}
const showMenu=(id,page)=>{
	if(document.getElementById('m'+id).style.display=="none"){
	   $('#'+id).addClass('shakeable');
	}
	document.getElementById(id).style.cursor="grabbing";
	timer = window.setTimeout(function() {
        $('#'+id).removeClass('shakeable');
		document.getElementById('m'+id).innerHTML = "<a class='btn btn-info btn-sm' style='display:inline-block;color:white' href='"+connstr+":3000/details/"+page+"?id="+id+"'><i class='bi bi-eye-fill'></i></a>";
		document.getElementById('m'+id).style.display="inline-block";
		  window.addEventListener('dblclick',function(){
			hideMenu(id);
		});
	},1000);
}
const stoptimer=(id)=>{
    clearTimeout(timer);
	 $('#'+id).removeClass('shakeable');
	 document.getElementById(id).style.cursor="grab";
}
return(
<>
<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<div style={{position: 'absolute',top: 15,right: 10,display: 'block'}}><Button variant="light" onClick={()=>{window.location.href="/add/workorders"}}><i style={{fontSize:"24px"}} className="bi bi-file-earmark-plus-fill"></i></Button></div>
<h4 className="display-4" align="center">Work Orders</h4>
<Accordion defaultActiveKey="0">
<Accordion.Item eventKey="0">
<Accordion.Header>Work Order Requests</Accordion.Header>
<Accordion.Body>
<Table responsive>
<thead className="table-dark"><tr><th>Work Id</th><th>Task</th><th>Type</th><th>Severity</th><th>Made By</th><th>For Equipment</th><th style={{width:"150px"}}>Status</th><th></th></tr></thead>
<tbody id="req"></tbody>
</Table>
</Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="1">
<Accordion.Header>Approved Work Orders</Accordion.Header>
<Accordion.Body>
<Table responsive>
<thead className="table-dark"><tr><th>Work Id</th><th>Task</th><th>Type</th><th>Severity</th><th>Made By</th><th>For Equipment</th><th style={{width:"150px"}}>Status</th><th></th></tr></thead>
<tbody id="acc"></tbody>
</Table>
</Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="2">
<Accordion.Header>Rejected Work Orders</Accordion.Header>
<Accordion.Body>
<Table responsive>
<thead className="table-dark"><tr><th>Work Id</th><th>Task</th><th>Type</th><th>Severity</th><th>Made By</th><th>For Equipment</th><th style={{width:"150px"}}>Status</th><th></th></tr></thead>
<tbody id="rej"></tbody>
</Table>
</Accordion.Body>
</Accordion.Item>
</Accordion>
</Container>
</>	
);
}
export default MyWorkOrders;