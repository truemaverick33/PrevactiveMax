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
import { Tree, TreeNode } from 'react-organizational-chart';
import hei from './Images/hierarchy-30.png';
import tbl from './Images/thumbnails-30.png';
import connstr from './constr.js';

var timer;
function Users(){
useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"usersa"},success(data){
			var jsonData=JSON.parse(data);
			var act ="";
			for(let i=0; i<jsonData.length ; i++){
				act+="<tr class='depta' id='"+jsonData[i].userNo+"' style='cursor:grab'><td>"+jsonData[i].userNo+"</td><td>"+jsonData[i].employeeName+"</td><td>"+jsonData[i].employeeId+"</td><td>"+jsonData[i].dept+"</td><td>"+jsonData[i].access+"</td><td border='0'><div class='card' align='center' id='m"+jsonData[i].userNo+"' style='display:none;width:7rem;padding:3px'></div></div></div></td></tr>";
			}
			document.getElementById('atc').innerHTML=act;
		var deps = document.getElementsByClassName('depta');
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mousedown",function(){
				showMenu(deps[x].id,"users");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mouseup",function(){
				stoptimer(deps[x].id);
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchstart",function(){
				showMenu(deps[x].id,"users");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchend",function(){
				stoptimer(deps[x].id);
			});
		}
		}});
		if(sessionStorage.getItem('access') == "Master"){
		document.getElementById('blocked').style.display = "";
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"usersb"},success(data){
			var jsonData=JSON.parse(data);
			var blc ="";
			for(let i=0; i<jsonData.length ; i++){
				blc+="<tr class='deptb' id='"+jsonData[i].userNo+"' style='cursor:grab'><td>"+jsonData[i].userNo+"</td><td>"+jsonData[i].employeeName+"</td><td>"+jsonData[i].employeeId+"</td><td>"+jsonData[i].dept+"</td><td>"+jsonData[i].access+"</td><td border='0'><div class='card' align='center' id='m"+jsonData[i].userNo+"' style='display:none;width:3rem;padding:3px'></div></div></div></td></tr>";
			}
			document.getElementById('blc').innerHTML=blc;
		var deps = document.getElementsByClassName('deptb');
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mousedown",function(){
				showMenu2(deps[x].id,"users");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mouseup",function(){
				stoptimer2(deps[x].id);
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchstart",function(){
				showMenu2(deps[x].id,"users");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchend",function(){
				stoptimer2(deps[x].id);
			});
		}
		}});
		}
		else{
			document.getElementById('blocked').style.display = "none";
		}
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
		document.getElementById('m'+id).innerHTML = "<a class='btn btn-info btn-sm' style='display:inline-block;color:white' href='"+connstr+":3000/details/"+page+"?id="+id+"'><i class='bi bi-eye-fill'></i></a> <a class='btn btn-dark btn-sm' style='display:inline-block;color:white' href='"+connstr+":3000/update/"+page+"?id="+id+"'><i class='bi bi-pencil-square'></i></a> <a class='btn btn-danger btn-sm' href='"+connstr+":3000/delete/"+page+"?id="+id+"' style='text-decoration:none;display:inline-block;color:white'><i class='bi bi-trash-fill'></i></a>";
		document.getElementById('m'+id).style.display="inline-block";
		  window.addEventListener('dblclick',function(){
			hideMenu(id);
		});
	},1000);
}
const showMenu2=(id,page)=>{
	if(document.getElementById('m'+id).style.display=="none"){
	   $('#'+id).addClass('shakeable');
	}
	document.getElementById(id).style.cursor="grabbing";
	timer = window.setTimeout(function() {
        $('#'+id).removeClass('shakeable');
		document.getElementById('m'+id).innerHTML = "<a class='btn btn-primary btn-sm' href='"+connstr+":3000/unblock/"+page+"?id="+id+"' style='text-decoration:none;display:inline-block;color:white'><i class='bi bi-unlock-fill'></i></a>";
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
const stoptimer2=(id)=>{
    clearTimeout(timer);
	 $('#'+id).removeClass('shakeable');
	 document.getElementById(id).style.cursor="grab";
}
return(
<>
<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<div style={{position: 'absolute',top: 15,right: 10,display: 'block'}}><Button variant="light" onClick={()=>{window.location.href="/add/users"}}><i style={{fontSize:"24px"}} className="bi bi-person-plus-fill"></i></Button></div>
<h4 className="display-4" align="center">Users</h4>
<Accordion defaultActiveKey="0">
<Accordion.Item eventKey="0">
<Accordion.Header>Active Users</Accordion.Header>
<Accordion.Body>
<Table responsive>
<thead className="table-dark"><tr><th>UserNo.</th><th>Employee Name</th><th>EmployeeId</th><th>Department</th><th>Type</th><th></th></tr></thead>
<tbody id="atc"></tbody>
</Table>
</Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="1" id="blocked">
<Accordion.Header>Blocked Users</Accordion.Header>
<Accordion.Body>
<Table responsive>
<thead className="table-dark"><tr><th>UserNo.</th><th>Employee Name</th><th>EmployeeId</th><th>Department</th><th>Type</th><th></th></tr></thead>
<tbody id="blc"></tbody>
</Table>
</Accordion.Body>
</Accordion.Item>
</Accordion>
</Container>
</>	
);
}
export default Users;