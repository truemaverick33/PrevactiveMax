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
import hei from './Images/hierarchy-30.png';
import tbl from './Images/thumbnails-30.png';
import connstr from './constr.js';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

var obj;
var n;
function CustomReports(){
const exeQuery=(qry,typ)=>{
	
	$.ajax({type:"POST",url:connstr+"/Backend/Executioner.php",data:{sql:qry,type:typ},success(data){
			try{
			obj = JSON.parse(data);
			if(obj.es=="failed")
			{
				document.getElementById("op").innerHTML="Error: "+obj.res;
			}
			else{
			var table="<tr class='table-dark'>";
             n = parseInt(obj[0]);
			for(let i=1;i<=n;i++){
				table+="<th class='draggables' id='"+i+"' draggable='true'>"+obj[i]+"</th>";
			}
			table +="</tr>";
			for(let a=n+1;a<obj.length;a++){
				table+="<tr>";
			  for(let j=0;j<obj[a].length;j++){
				table+="<td>"+obj[a][j]+"</td>";
			  }
			  table+="</tr>";
			}
			document.getElementById("op").innerHTML=table;
			var drags = document.getElementsByClassName('draggables');
			for(let w=0;w<drags.length;w++){
				drags[w].addEventListener('dragstart',(event)=>{
					event.dataTransfer.setData('text/plain', event.target.id);
			});
			}
			}
			}
			catch(e){
			 document.getElementById("op").innerHTML="No Results Found. Check Your SQL Query Or Try Some Other Value";
			 console.log(e)
			}
		
	}});
}
const plot=()=>{
	var grft = document.getElementById('gtype').value;
	var lbl = parseInt(document.getElementById('lbl').value);
	var vals =  parseInt(document.getElementById('vals').value);
	var custgraph = document.getElementById('custgraph');
	var clr = document.getElementById('clr').value;
	var x = [];
	var y = [];
	try{
		document.getElementById("error").style.display = "none";
		for(let i=n+1;i<obj.length;i++){
				x.push(obj[i][lbl]);
				y.push(obj[i][vals]);
		}
		if(grft=="bar" || grft=="scatter"){
		var data = [{x:x,y:y,type:grft, marker: {color: clr}}];
		var layout = {height: 400,width: 500};
		Plotly.newPlot(custgraph, data, layout);
		}
		else if(grft=="pie"){
		var data = [{type: "pie",values:y ,labels: x,textinfo: "label+percent",textposition: "outside",automargin: true}];
		var layout = {height: 400,width: 500};
		Plotly.newPlot(custgraph, data, layout);
		}
		else if(grft==""||grft=="Select an Graph"){
			document.getElementById("error").innerHTML="Graph Type is Not Selected";
			document.getElementById('custgraph').innerHTML="";
			
		}
	}
	catch(e){
		console.log(e);
		document.getElementById("error").style.display = "";
		document.getElementById("error").innerHTML="inappropriate data to make a graph";
	}
	
}
const SelC=()=>{
	var sql = document.getElementById('sbuild').value;
	if(sql.indexOf(';')!=-1){
	sql=sql.slice(0,sql.indexOf(';'));
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else{
		document.getElementById("op").innerHTML="Not a Select Query";
		document.getElementById('sbuild').focus();
	}
	}
	else{
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else{
		document.getElementById("op").innerHTML="Not a Select Query";
		document.getElementById('sbuild').focus();
	}
	}
}
const clsAlt8=()=>{
	document.getElementById('fail').style.display="none";
}
const cgt=()=>{
	var gt = document.getElementById('gtype').value;
	if(gt=="pie"){
	 document.getElementById('clr').disabled= true;
	}
	else{
	 document.getElementById('clr').disabled= false;
	}
}
const printdata=()=>{
	const table = document.getElementById('op');
	const doc = new jsPDF('landscape');
	const currentDate = new Date();
	const name = currentDate.toISOString().replace(/[^\w\s]/gi, '');
    doc.autoTable({ html: table ,options: { landscape: true }});
	doc.save('report'+name+'.pdf');
}
const DropHandler=(event)=>{
	event.preventDefault();
	event.target.value = event.dataTransfer.getData('text/plain') - 1;
}
return(
<>
<Container align="right"><Button title='Custom Reports' variant="light" onClick={(event)=>{window.location.href='/custom/reports'}}><i className="bi bi-gear-wide-connected"></i></Button> <Button variant="light" title='Static Reports' id="tbl" onClick={(event)=>{window.location.href='/static/reports'}}><i className="bi bi-lightning-fill"></i></Button></Container>
<br/>
<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'105rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<h4 className="display-4" align="center">CustomReports</h4>
<Row><Col>
<Form.Control as="textarea" id="sbuild" placeholder="Write Your Select Query Here..." rows={5}/>
<br/>
<Button variant="dark" onClick={SelC}> Execute </Button>
</Col><Col>
<Form.Select id="gtype" style={{width:"18rem"}} onFocus={clsAlt8} onChange={cgt}>
		<option>Select an Graph</option>
		<option>bar</option>
		<option>scatter</option>
		<option>pie</option>
</Form.Select> 
<br/>
<Row>
<Col>
Index of Labels field :<Form.Control type="number" min="0" max="15" id="lbl" style={{width:"5rem"}} onDrop={DropHandler} />
</Col><Col>
Index of Values field :<Form.Control type="number" id="vals" min="0" max="15" style={{width:"5rem"}} onDrop={DropHandler} />
</Col><Col>
Color of Graph:<Form.Control type="color" id="clr" defaultValue="#FF0000" title="Choose your color" onFocus={clsAlt8} />
</Col></Row>
<br/>
<Button variant="dark" onClick={plot}> Plot</Button>
</Col></Row>
<h1 className="display-4" align="center">OutPut</h1>
<Row>
<Col md={6}>
<Container style={{position:'relative',resize:"none",overflowY:"scroll",maxHeight:"40rem",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<div style={{position: 'absolute',top: 15,right: 10,display: 'block'}}><Button variant="light" onClick={()=>printdata()}><i style={{fontSize:"24px"}} className="bi bi-printer-fill"></i></Button></div>
<h1  className="display-4" align="center">Table</h1>
<br/>
<Table responsive bordered striped id="op" style={{width:"30rem"}}></Table>
<br/>
</Container>
<br/>
</Col>
<Col md={6}>
<Container style={{position:"relative",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",marginLeft:"0px",paddingLeft:"0px",overflowX:"scroll"}}>
<h1 className="display-4" align="center">Graph</h1>
<div id='error'></div>
<Container id="custgraph" fluid></Container>
<br/>
</Container>
</Col>
</Row>
</Container>
</>	
);
}
export default CustomReports;