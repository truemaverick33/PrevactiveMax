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


function Reports(){
var obj;
var n;
const exeQuery=(qry,typ,grft,lbl,vals,clr,custgraph,title,tp)=>{
	
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
				table+="<th>"+obj[i]+"</th>";
			}
			table +="</tr>";
			for(let a=n+1;a<obj.length;a++){
				table+="<tr>";
			  for(let j=0;j<obj[a].length;j++){
				table+="<td>"+obj[a][j]+"</td>";
			  }
			  table+="</tr>";
			}
			if(tp == "table" || tp == "both"){
			document.getElementById("op").innerHTML=table;
			}
			if(tp == "plot" || tp == "both"){
			plot(grft,lbl,vals,clr,custgraph,title);
			}
			}
			}
			catch(e){
			 document.getElementById("op").innerHTML="No Results Found. Check Your SQL Query Or Try Some Other Value";
			 console.log(e)
			}
	}});
	return 1;
}

const plot=(grft,lbl,vals,clr,custgraph,title)=>{
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
		var layout = {title:title};
		var config = {responsive: true}
		Plotly.newPlot(custgraph, data, layout, config);
		}
		else if(grft=="dblbar"){
		var x1=[];
		var y1=[];
		var y2=[];
		for(let i=n+1;i<obj.length;i++){
				x1.push(obj[i][lbl]);
				y1.push(obj[i][vals]);
				y2.push(obj[i][vals+1]);
		}
		var trace1 = {
		x: x1,
		y: y1,
		name: 'Estimated Cost',
		type: 'bar',
		marker:{color:'#FF6EC7'}
		};
		var trace2 = {
		x: x1,
		y: y2,
		name: 'Actual Cost',
		type: 'bar',
		marker:{color:'#662ff2'}
		};
		var data = [trace1, trace2];
		var layout = {barmode: 'group',xaxis: {title:"Work Order Ids",
		titlefont: {
				size: 16,
				color: 'rgb(107, 107, 107)'
				}
		,tickfont: {
			size: 14,
			color: 'rgb(107, 107, 107)'
			}},
		yaxis: {
			title: 'Price In Rupees',
			titlefont: {
				size: 16,
				color: 'rgb(107, 107, 107)'
				},
			tickfont: {
				size: 14,
				color: 'rgb(107, 107, 107)'
			}
		}};
		var config = {responsive: true}
		Plotly.newPlot(custgraph, data, layout, config);
		}
		else if(grft=="pie"){
		var data = [{type: "pie",values:y ,labels: x,textinfo: "label+percent",textposition: "outside",automargin: true}];
		var layout = {title:title};
		var config = {responsive: true}
		Plotly.newPlot(custgraph, data, layout, config);
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
const SelC=(event)=>{
	if(event.target.value == "1"){
		document.getElementById('graphs').innerHTML="<div id='custgraph1'></div><br/><div id='custgraph2'></div>";
		var sql = "SELECT u.employeeName as Technician, SUM(CASE WHEN ws.CurrStatus = 7 THEN 1 ELSE 0 END) AS 'Completed Work Orders',SUM(CASE WHEN ws.CurrStatus NOT IN (5, -1, 7) THEN 1 ELSE 0 END) AS 'On Hand Work Orders', COUNT(ws.wsId) AS 'Total Work Orders',SUM(TIMESTAMPDIFF(HOUR, ws.assignDate, ws.CompletionDate)) AS 'Total Hours Worked' FROM workorderstatus ws INNER JOIN usermaster u ON ws.techId = u.userNo GROUP BY 1"
		exeQuery(sql,"sel","bar",0,4,"#FF2222",'custgraph1',"Total Working Hours of each Technician","both");
		exeQuery(sql,"sel","pie",0,3,"#FF2222",'custgraph2',"Total Work Order Distribution among Technicians","plot");
	}
	else if(event.target.value == "2"){
	swal({
	 title: "Select Min Date:",
       content: {
       element: "input",
       attributes: {
         placeholder: "",
         type: "date",
       },
     },
	}).then((value1)=>{
	swal({
	   title: "Select Max Date:",
       content: {
       element: "input",
       attributes: {
         placeholder: "",
         type: "date",
       },
     },
	}).then((value2)=>{
		document.getElementById('graphs').innerHTML="<div id='custgraph1'></div><br/><div id='custgraph2'></div><div id='custgraph3'></div><div id='custgraph4'></div>";
		var sql = "SELECT ws.woId AS 'Work Order Id', w.woTitle AS 'Work Order', ur.employeeName AS 'Requested By', u.employeeName AS 'Assigned Technician', d.deptName AS 'Department', a.areaName AS 'Area', e.equipName AS 'Equipment', w.reqDate AS 'Request Date', sm.stat as Status FROM workorderstatus ws INNER JOIN workordermaster w ON ws.woId = w.woid LEFT JOIN usermaster u ON ws.techId = u.userNo INNER JOIN usermaster ur ON w.reqUid = ur.userNo INNER JOIN areamaster a ON w.areaId = a.areaId INNER JOIN deptmaster d ON w.deptId = d.deptId INNER JOIN workstatusmaster sm ON ws.CurrStatus = sm.stcode INNER JOIN equipmentmaster e ON w.eqpid = e.equipId WHERE w.reqDate >= '"+value1+"' AND w.reqDate <= '"+value2+"' group by 3,4,5,6,7"
	    exeQuery(sql,"sel","",0,0,"",'',"","table");
		var sql2="SELECT d.deptName AS 'Department', count(ws.woId) AS 'No.of Work Orders' FROM workorderstatus ws INNER JOIN workordermaster w on ws.woId = w.woid INNER JOIN deptmaster d ON w.deptId = d.deptId WHERE w.reqDate >= '"+value1+"' AND w.reqDate <= '"+value2+"' GROUP BY 1";
	    exeQuery(sql2,"sel","pie",0,1,"#FF2222",'custgraph1',"Department Wise Work Orders Split","plot");
		var sql3="SELECT a.areaName AS 'Area', count(ws.woId) AS 'No.of Work Orders' FROM workorderstatus ws INNER JOIN workordermaster w on ws.woId = w.woid INNER JOIN areamaster a ON w.areaId = a.areaId WHERE w.reqDate >= '"+value1+"' AND w.reqDate <= '"+value2+"' GROUP BY 1";
	    exeQuery(sql3,"sel","pie",0,1,"#FF2222",'custgraph2',"Area Wise Work Orders Split","plot");
		var sql4="SELECT DATE_FORMAT(w.reqDate, '%Y-%m') AS 'Month', COUNT(ws.woId) AS 'Work Orders' FROM workorderstatus ws INNER JOIN workordermaster w ON ws.woId = w.woid WHERE w.reqDate >= '"+value1+"' AND w.reqDate <= '"+value2+"' GROUP BY DATE_FORMAT(w.reqDate, '%Y-%m')";
	    exeQuery(sql4,"sel","scatter",0,1,"#f44336",'custgraph3',"No. of Work Orders per month","plot");
		var sql5="SELECT wq.woId, wq.estimatedCost, SUM(im.invCost * il.qtyUsed) AS actualCost FROM workqoutationreqs wq INNER JOIN workordermaster wom ON wq.woId = wom.woid LEFT JOIN inventorylog il ON wq.woId = il.woId LEFT JOIN inventorymaster im ON il.invId = im.invId GROUP BY wq.woId";
	    exeQuery(sql5,"sel","dblbar",0,1,"#6b3ce2",'custgraph4',"No. of Work Orders per month","plot");
	})
	})
	
	}
	else if(event.target.value == "3"){
		swal({
	 title: "Select Min Date:",
       content: {
       element: "input",
       attributes: {
         placeholder: "",
         type: "date",
       },
     },
	}).then((value1)=>{
	swal({
	   title: "Select Max Date:",
       content: {
       element: "input",
       attributes: {
         placeholder: "",
         type: "date",
       },
     },
	}).then((value2)=>{
        document.getElementById('graphs').innerHTML="<div id='custgraph1'></div><br/><div id='custgraph2'></div><div id='custgraph3'></div>";
		var sql = "select il.entNo As 'Ent. No',i.invId as 'Inv. Id',i.invName as 'Inventory Item',il.woId as 'Work Order Id' ,w.woTitle as 'Work Order',il.qtyUsed as 'Qty Used',il.qtyUsed * i.invCost as 'Total Cost',il.dateofuse as 'Date Of Use' from inventorylog il inner join inventorymaster i on il.invId = i.invId inner join workordermaster w on il.woId = w.woid where il.dateofuse >= '"+value1+"' and il.dateofuse <= '"+value2+"'"
		exeQuery(sql,"sel","",0,0,"",'',"","table");
        var sql2 = "SELECT MONTHNAME(il.dateofuse) AS 'Month', SUM(il.qtyUsed * i.invCost) AS 'Total Cost Per Month' FROM inventorylog il INNER JOIN inventorymaster i ON il.invId = i.invId INNER JOIN workordermaster w ON il.woId = w.woid WHERE il.dateofuse >= '2023-03-01' AND il.dateofuse <= '2023-05-01' GROUP BY DATE_FORMAT(il.dateofuse, '%Y-%m')";
		exeQuery(sql2,"sel","scatter",0,1,"#ffd34f",'custgraph1',"Monthly Inventory Cost","plot");
		var sql3 = "SELECT e.equipName, SUM(il.qtyUsed * i.invCost) AS 'Total Cost Per Month' FROM inventorylog il INNER JOIN inventorymaster i ON il.invId = i.invId INNER JOIN workordermaster w ON il.woId = w.woid INNER JOIN equipmentmaster e ON w.eqpid = e.equipId WHERE il.dateofuse >= '"+value1+"' AND il.dateofuse <= '"+value2+"' GROUP BY e.equipName";
	    exeQuery(sql3,"sel","pie",0,1,"#FF2222",'custgraph2',"Inventory Cost Split By Equipments","plot");
	})
	})
		
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

return(
<>
<Container align="right"><Button title='Custom Reports' variant="light" onClick={(event)=>{window.location.href='/custom/reports'}}><i className="bi bi-gear-wide-connected"></i></Button> <Button variant="light" title='Static Reports' id="tbl" onClick={(event)=>{window.location.href='/static/reports'}}><i className="bi bi-lightning-fill"></i></Button></Container>
<br/>
<Container style={{padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<h4 className="display-4" align="center">Reports</h4>
<br/>
<Form.Select onChange={(event)=>SelC(event)}>
<option value="0">Select</option>
<option value="1">All Technicians Report</option>
<option value="2">Work Order Report</option>
<option value="3">Inventory Reports</option>
</Form.Select>
<br/>
<Container style={{position:'relative',resize:"none",overflowY:"scroll",maxHeight:"40rem",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<div style={{position: 'absolute',top: 15,right: 10,display: 'block'}}><Button variant="light" onClick={()=>printdata()}><i style={{fontSize:"24px"}} className="bi bi-printer-fill"></i></Button></div>
<br/>
<br/>
<Table responsive bordered striped id="op"></Table>
<br/>
</Container>
<br/>
<Container style={{position:"relative",borderRadius:"25px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",marginLeft:"0px",paddingLeft:"0px",overflowX:"scroll"}}>
<h1 className="display-4" align="center">Graph</h1>
<div id='error'></div>
<div id="graphs" align="center"></div>

<br/>
</Container>
</Container>
</>	
);
}
export default Reports;