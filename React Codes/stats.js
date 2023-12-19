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
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Plotly from 'plotly.js/dist/plotly-cartesian';

function Statistics(){
if(sessionStorage.getItem('access')=="User"){
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"userstats",uid:sessionStorage.getItem('userid')},success(data){
			var jsonData=JSON.parse(data);
			document.getElementById('noed').innerHTML = jsonData[0][0];
			document.getElementById('notd').innerHTML = jsonData[0][1];
			document.getElementById('noeqd').innerHTML = jsonData[0][2];
			document.getElementById('tow').innerHTML = jsonData[0][9];
			document.getElementById('towd').innerHTML = jsonData[0][3];
			document.getElementById('towy').innerHTML = jsonData[0][4];
			document.getElementById('toway').innerHTML = jsonData[0][5];
			document.getElementById('towry').innerHTML = jsonData[0][6];
			document.getElementById('towcy').innerHTML = jsonData[0][7];
			document.getElementById('towey').innerHTML = jsonData[0][8];
		var x = ["Approved","Rejected","Completed"];
	    var y = [jsonData[0][5],jsonData[0][6],jsonData[0][7]];
		var data = [{type: "pie",values:y ,labels: x,textinfo: "label+percent",textposition: "outside",automargin: true}];
		var layout = {title:"Your Work Orders"};
		var config = {responsive: true};
		Plotly.newPlot('custgraph1', data, layout, config);
		}});
	return(
	<>
	<Container style={{padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
    <h4 className="display-4" align="center">Statistics</h4>
    <br/>
	<Table bordered>
	<thead className="table-dark">
	<tr><th>Parameter</th><th>Value</th></tr>
	</thead>
	<tbody>
	<tr><td>No. of employees in your department</td><td id="noed"></td></tr>
	<tr><td>No. of technician in your department</td><td id="notd"></td></tr>
	<tr><td>No. of equipments in your department</td><td id="noeqd"></td></tr>
	<tr><td>Total work orders</td><td id="tow"></td></tr>
	<tr><td>Total No.of work orders in your department</td><td id="towd"></td></tr>
	<tr><td>Total No.of Your work orders</td><td id="towy"></td></tr>
	<tr><td>Total No.of Your Approved work orders</td><td id="toway"></td></tr>
	<tr><td>Total No.of Your Rejected work orders</td><td id="towry"></td></tr>
	<tr><td>Total No.of Your Completed work orders</td><td id="towcy"></td></tr>
	<tr><td>Total No.of Your Emergency work orders</td><td id="towey"></td></tr>
	</tbody>
	</Table>
	<Row><Col>
	<div id="custgraph1"></div></Col></Row>
	</Container>
	<br/>
	</>
	);
}
else if(sessionStorage.getItem('access')=="Technician"){
	$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"techstats",uid:sessionStorage.getItem('userid')},success(data){
			var jsonData=JSON.parse(data);
			document.getElementById('tow').innerHTML = jsonData[0][0];
			document.getElementById('towd').innerHTML = jsonData[0][1];
			document.getElementById('toway').innerHTML = jsonData[0][2];
			document.getElementById('towpy').innerHTML = jsonData[0][3];
			document.getElementById('towcy').innerHTML = jsonData[0][4];
			document.getElementById('thw').innerHTML = jsonData[0][5];
		var x = ["Pending","Completed"];
	    var y = [jsonData[0][3],jsonData[0][4]];
		var data = [{type: "pie",values:y ,labels: x,textinfo: "label+percent",textposition: "outside",automargin: true}];
		var layout = {title:"Your Work Orders"};
		var config = {responsive: true}
		Plotly.newPlot('custgraph1', data, layout, config);
		}});
	$.ajax({type:"POST",url:connstr+"/Backend/Executioner.php",data:{sql:"SELECT MONTHNAME(assignDate) AS 'Month',AVG(TIMESTAMPDIFF(HOUR, assignDate, CompletionDate)) AS 'Avg Work Hours' FROM workorderstatus WHERE techId = "+sessionStorage.getItem('userid')+" AND YEAR(assignDate) = YEAR(CURRENT_DATE()) GROUP BY MONTH(assignDate)",type:"sel"},success(data){
		var obj = JSON.parse(data);
		var x = [];
	    var y = [];
		var n = parseInt(obj[0]);
		for(let i=n+1;i<obj.length;i++){
				x.push(obj[i][0]);
				y.push(obj[i][1]);
		}
		var data = [{x:x,y:y,type:"scatter", marker: {color:"#FF6EC7"}}];
		var config = {responsive: true}
		var layout = {title:"Average Work Hours Per Month"};
		Plotly.newPlot('custgraph2', data, layout, config);
		}});
	return(
	<>
	<Container style={{padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
    <h4 className="display-4" align="center">Statistics</h4>
    <br/>
	<Table bordered>
	<thead className="table-dark">
	<tr><th>Parameter</th><th>Value</th></tr>
	</thead>
	<tbody>
	<tr><td>Total work orders</td><td id="tow"></td></tr>
	<tr><td>Total No.of work orders in your department</td><td id="towd"></td></tr>
	<tr><td>Total No.of work orders assigned to you</td><td id="toway"></td></tr>
	<tr><td>Total No.of Your Pending work orders</td><td id="towpy"></td></tr>
	<tr><td>Total No.of Your Completed work orders</td><td id="towcy"></td></tr>
	<tr><td>Total Hours Worked</td><td id="thw"></td></tr>
	</tbody>
	</Table>
	<Row><Col>
	<div id="custgraph1"></div></Col><Col>
	<div id="custgraph2"></div>
	</Col></Row>
	</Container>
	<br/>
	</>
	);
}
else{
	return(
	<>
	</>
	);
}
}
export default Statistics;