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
function InvUsed() {
  useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"invbye",woid:id},success(data){
					var json = JSON.parse(data);
					var data ="";
					for(let i=0;i<json.length;i++){
						data+="<tr align='center'><td><input type='checkbox' name='checks' value='"+json[i].invId+"' id='"+i+"'/></td><td>"+json[i].invId+"</td><td>"+json[i].invName+"</td><td><input type='number' id='qty"+i+"' min=0 style='width:100px' class='form-control'/></td></tr>";
					}
					document.getElementById("inv").innerHTML = data;
		}});
  });
  const insertInvLog=()=>{
	const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
	const values = [];
		checkboxes.forEach((checkbox) => {
        if(document.getElementById("qty"+checkbox.id).value!=""){
			$.ajax({type:"POST",url:connstr+"/Backend/Insert.php?ifor=invlog",data:{woid:id,invid:checkbox.value,qty:document.getElementById("qty"+checkbox.id).value},success(data){
		}});
		}
		swal({title:"Successful!",text:"New Area was added to database successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/details/workorders?id="+id;
			});
	});
  }
  return (
    <Container style={{color: "#565656",padding:'0',backgroundColor:'white',maxWidth:'38rem',borderRadius:'15px',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
			<br/>
			<h2 align="center">Inventory Used For Work Order</h2>
			<hr/>
			<Table id="inv">
			</Table>
            <br/>
			<Button variant="primary" style={{backgroundColor:'#ff715a',width:'100%',height:"50px",borderRadius:"0px 0px 15px 15px",border:'1.5px solid white'}} onClick={(event)=>insertInvLog()}>Confirm</Button>
	</Container>
  );
}

export default InvUsed;