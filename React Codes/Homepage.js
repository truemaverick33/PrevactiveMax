import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import ai from './Images/ai.png';
import aib from './Images/aiBot.png';
import './treeview.css';
import Bs from './BottomSide.js';
import connstr from './constr.js';


function Home(){
const searchSugg=(event)=>{
	   document.getElementById('searchres').style.display="";
	   document.getElementById('searchres').innerHTML="";
		$.ajax({type:"POST",url:connstr+"/Backend/Executioner.php",data:{sql:"SELECT userNo,employeeName FROM usermaster where employeeName like '%"+document.getElementById('ser').value+"%' and status=1",type:"ser"},success(data){ 
			var searchSuggs = "";
			try{
			var obj = JSON.parse(data);
			searchSuggs += "<b>Users:</b><br/>";
			for(var i=0;i<obj.length;i++){
			searchSuggs += "<a href='/details/users?id="+obj[i][0]+"'>"+obj[i][1]+"</a><br/>";
			}
			}
			catch{
				searchSuggs +="";
			}
			document.getElementById('searchres').innerHTML+=searchSuggs;
		}});
		$.ajax({type:"POST",url:connstr+"/Backend/Executioner.php",data:{sql:"SELECT equipId,equipName FROM equipmentmaster where equipName like '%"+document.getElementById('ser').value+"%' and status=1",type:"ser"},success(data){ 
		    var searchSuggs = "";
			try{
			var obj = JSON.parse(data);
			searchSuggs += "<b>Equipments:</b><br/>";
			for(var i=0;i<obj.length;i++){
			searchSuggs += "<a href='/details/equipments?id="+obj[i][0]+"'>"+obj[i][1]+"</a><br/>";
			}
			}
			catch{
				searchSuggs +="";
			}
			document.getElementById('searchres').innerHTML+=searchSuggs;
		}});
		$.ajax({type:"POST",url:connstr+"/Backend/Executioner.php",data:{sql:"select woid,woTitle from workordermaster where woTitle like '%"+document.getElementById('ser').value+"%' or woDesc like '%"+document.getElementById('ser').value+"%'",type:"ser"},success(data){ 
            var searchSuggs = "";
			try{
			var obj = JSON.parse(data);
			searchSuggs += "<b>Work Orders:</b><br/>";
			for(var i=0;i<obj.length;i++){
			searchSuggs += "<a href='/details/workorders?id="+obj[i][0]+"'>"+obj[i][1]+"</a><br/>";
			}
			}
			catch{
				searchSuggs +="";
			}
			document.getElementById('searchres').innerHTML+=searchSuggs;
		}});
		
}
		

	const exeQuery=(qry,typ,tbl)=>{
	$.ajax({type:"POST",url:connstr+"/Backend/Executioner.php",data:{sql:qry,type:typ},success(data){
			try{
			var obj = JSON.parse(data);
			if(obj.es=="failed")
			{
				document.getElementById(tbl).innerHTML="Error: "+obj.res;
			}
			else{
			var table="<tr>";
			var x = parseInt(obj[0]);
			for(let i=1;i<=x;i++){
				table+="<th>"+obj[i]+"</th>";
			}
			table +="</tr>";
			for(let a=x+1;a<obj.length;a++){
				table+="<tr>";
			  for(let j=0;j<obj[a].length;j++){
				table+="<td>"+obj[a][j]+"</td>";
			  }
			  table+="</tr>";
			}
			document.getElementById(tbl).innerHTML=table;}
			}
			catch{
			 document.getElementById(tbl).innerHTML="No Results Found.";
			}
	}});
}
const search=()=>{
	document.getElementById('srs').style.display="";
	exeQuery("SELECT u.userNo as 'UserNo.' ,u.employeeName as 'Employee',u.employeeId as 'Employee Id',u.email as 'Email',u.phoneNo as 'Phone',u.access as 'Type',d.deptName as 'Department' from usermaster u left join deptmaster d on u.deptId = d.deptId where employeeName like '%"+document.getElementById('ser').value+"%' and u.status=1 order by u.userNo ASC","sel","usr")
    exeQuery("SELECT e.equipId as 'EqpId',e.equipName as 'Equipment',e.description as 'Description',a.areaName as 'Area',e.warantyStart as 'Waranty Start',e.warantyEnd as 'Waranty End' from equipmentmaster e left join areamaster a on e.areaId = a.areaId where e.equipName like '%"+document.getElementById('ser').value+"%' and e.status=1 order by e.equipId ASC","sel","eqp")
    exeQuery("SELECT w.woid,w.woTitle,w.woDesc,w.woType,w.severity,w.deadline,u.employeeName,d.deptName,a.areaName,e.equipName,ws.CurrStatus,wsm.stat FROM workordermaster w left join usermaster u on w.reqUid = u.userNo left join deptmaster d on w.deptId = d.deptId left join areamaster a on w.areaId = a.areaId left join equipmentmaster e on w.eqpId = e.equipId left join workorderstatus ws on ws.woId = w.woid inner join workstatusmaster wsm on ws.CurrStatus = wsm.stcode where w.woTitle like '%"+document.getElementById('ser').value+"%' or w.woDesc like '%"+document.getElementById('ser').value+"%' order by w.woid ASC","sel","wo")
	exeQuery("SELECT * FROM inventorymaster where invName like '%"+document.getElementById('ser').value+"%' order by invId ASC","sel","inv")
	exeQuery("SELECT * FROM areamaster where areaName like '%"+document.getElementById('ser').value+"%' order by areaId ASC","sel","ars")
	exeQuery("SELECT * FROM deptmaster where deptName like '%"+document.getElementById('ser').value+"%' order by deptId ASC","sel","dpt")
  
}
const showSearch=()=>{
	document.getElementById('searchres').style.display="";
}
const hideSearch=()=>{
	document.getElementById('searchres').style.display="none";

}
const printdata=()=>{
	const table = document.getElementById('op');
	const doc = new jsPDF('landscape');
	const currentDate = new Date();
	const name = currentDate.toISOString().replace(/[^\w\s]/gi, '');
    doc.autoTable({ html: table ,options: { landscape: true }});
	doc.save('report'+name+'.pdf');
}
const AIsug=()=>{
	$.ajax({
				url: connstr+':5000/predict',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
				description: document.getElementById('sbuild').value
				}),success: function(response) {
					document.getElementById('resp').style.display="";
					document.getElementById('resp').innerHTML="";
					const lines = "The required type of technician for the given task is: " + response.technician;
					const delay = 27;
					let index = 0;
					let showCursor = true;
					const intervalId = setInterval(() => {
						const elem = document.getElementById("resp");
					if(showCursor){
						elem.innerHTML += "&#10074;";
						showCursor = false;
						}
					else{
						elem.innerHTML = elem.innerHTML.slice(0, -1);
						elem.innerHTML += lines[index];
						index++;
						showCursor = true;
					if (index === lines.length) {
						clearInterval(intervalId);
					}
				}
				}, delay);

	}});
}
return(
<>
<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'105rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<h4 className="display-4" align="center">Home</h4>
<br/>
<div align="center">
<InputGroup className="mb-3" style={{maxWidth:"52rem"}}>
<Form.Control type="text" id="ser" placeholder="Search" onChange={searchSugg}/>
<Button variant="dark" style={{borderRadius:"0px 10px 10px 0px"}} onClick={search}><i className="bi bi-search"></i></Button>
<br/>
<div id="searchres" align="left" style={{position:"absolute",top:"45px",width:"inherit",height:"200px",background:"white",borderRadius:"0px 0px 10px 10px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:"999",display:"none",overflowX:"hidden",overflowY:"auto",paddingLeft:"10px"}} onMouseEnter={showSearch} onMouseLeave={hideSearch}>
</div>
</InputGroup>
</div>
<br/>
<br/>
<div id="srs" style={{display:"none"}}>
<h6>Search Results:</h6>
<Tabs
      defaultActiveKey="users"
      id="uncontrolled-tab-example"
      className="mb-3"
>
   <Tab eventKey="users" title="Users">
   <Container align="center">
  <Table responsive bordered striped id="usr"></Table>
   </Container>
   </Tab>
   <Tab eventKey="equipments" title="Equipments">
   <Container align="center">
   <Table responsive bordered striped id="eqp"></Table>
   </Container>
   </Tab>
   <Tab eventKey="workorders" title="Work Orders">
   <Container align="center">
   <Table responsive bordered striped id="wo"></Table>
   </Container>
   </Tab>
   <Tab eventKey="area" title="Areas">
   <Container align="center">
   <Table responsive bordered striped id="ars"></Table>
   </Container>
   </Tab>
   <Tab eventKey="dept" title="Departments">
   <Container align="center">
   <Table responsive bordered striped id="dpt"></Table>
   </Container>
   </Tab>
   <Tab eventKey="inv" title="inventory">
   <Container align="center">
   <Table responsive bordered striped id="inv"></Table>
   </Container>
   </Tab>
</Tabs>
</div>
<br/>
<br/>
<hr/>
<Bs/>
<br/>
<br/>
<hr/>{
$(window).width()>=500?(
<div style={{position:"relative"}}>
  <img src={ai} style={{position:"relative",zIndex:"1", maxHeight:"700px", width:"100%"}} />
  <Form.Control as="textarea" id="sbuild" placeholder="Write Your Work Order Task here..." style={{position:"absolute",left:"50px",top:"250px",zIndex:"2",maxWidth:"350px"}} rows={5}/> 
  <Button variant="light" style={{position:"absolute",left:"50px",top:"400px",zIndex:"2",maxWidth:"350px"}} onClick={AIsug}>Find Technician Type</Button>
  <h3 id="resp" style={{border:"1px solid black",position:"absolute",left:"470px",top:"520px",zIndex:"2",fontFamily:"Monospace",color:"red",display:"none"}}></h3>
</div>):(
<div align="center">
  <h1 style={{backgroundColor:"black",fontFamily:"Arial",color:"white"}}>Meet Our A.I Max</h1>
  <img src={aib} style={{zIndex:"1", maxHeight:"700px", width:"50%"}} />
  <br/>
  <br/>
   <h3 id="resp" style={{backgroundColor:"white",border:"1px solid black",fontFamily:"Monospace",color:"red",display:"none"}}></h3>
   <br/>
  <InputGroup className="mb-3" style={{maxWidth:"52rem"}}>
  <Form.Control type="text" id="sbuild" placeholder="Write Your Work Order Task here..." style={{maxWidth:"350px",height:"40px"}}/>
  <Button variant="dark" style={{maxWidth:"350px"}} xs={2} onClick={AIsug}><i className="bi bi-send-fill"></i></Button></InputGroup>
</div>)
}
<br/>
<br/>
</Container>
<br/>
</>
);
}
export default Home;