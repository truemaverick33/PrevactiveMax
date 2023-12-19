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
function Pmschedule(){
useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"pmschedule"},success(data){
			var jsonData=JSON.parse(data);
			var act ="";
			var blc ="";
			for(let i=0; i<jsonData.length ; i++)
				{
					var pmsd = new Date(jsonData[i].pmsdate);
					var today = new Date();
					if(pmsd > today){
				      act+="<tr class='dept' id='"+jsonData[i].pmsId+"'><td>"+jsonData[i].pmsId+"</td><td>"+jsonData[i].equipName+"</td><td>"+jsonData[i].pmsdate+"</td><td border='0'><div class='card' align='center' id='m"+jsonData[i].pmsId+"' style='display:none;width:3rem;padding:3px'></div></div></div></td></tr>";
					}
					else{
					  blc+="<tr class='dept' id='"+jsonData[i].pmsId+"'><td>"+jsonData[i].pmsId+"</td><td>"+jsonData[i].equipName+"</td><td>"+jsonData[i].pmsdate+"</td><td border='0'><div class='card' align='center' id='m"+jsonData[i].pmsId+"' style='display:none;width:3rem;padding:3px'></div></div></div></td></tr>";
					}
				}			
			document.getElementById('atc').innerHTML=act;
			document.getElementById('blc').innerHTML=blc;
		}});
});
return(
<>
<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<div style={{position: 'absolute',top: 15,right: 10,display: 'block'}}><Button variant="light" onClick={()=>{window.location.href="/add/pmsched"}}><i style={{fontSize:"24px"}} className="bi bi-calendar-plus"></i></Button></div>
<h4 className="display-4" align="center">Preventive Maintenance Schedules</h4>
<Accordion defaultActiveKey="0">
<Accordion.Item eventKey="0">
<Accordion.Header>Active Schedules</Accordion.Header>
<Accordion.Body>
<Table responsive>
<thead className="table-dark"><tr><th>pmsid</th><th>eqid</th><th>pmsdate</th><th></th></tr></thead>
<tbody id="atc"></tbody>
</Table>
</Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="1">
<Accordion.Header>Past Schedules</Accordion.Header>
<Accordion.Body>
<Table  responsive>
<thead className="table-dark"><tr><th>pmsid</th><th>eqid</th><th>pmsdate</th><th></th></tr></thead>
<tbody id="blc"></tbody>
</Table>
</Accordion.Body>
</Accordion.Item>
</Accordion>
</Container>
</>	
);
}
export default Pmschedule;