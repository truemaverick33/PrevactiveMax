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
import swal from 'sweetalert';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './treeview.css';
import { Tree, TreeNode } from 'react-organizational-chart';
import hei from './Images/hierarchy-30.png';
import tbl from './Images/thumbnails-30.png';
import connstr from './constr.js';

var dataArray=[];
var fpointer = 0;
var timer;
var taps=0;
var lastTap=0;
const LabelCard = ({label}) =>{
 return(<Card style={{minheight:'5rem',width: '12rem',display: "inline-block" }}>
      <Card.Body style={{backgroundColor:label.color,padding:"0px",margin:"1px",borderRadius:"5px 5px 0px 0px",color:"white"}}>
		<Card.Title className="display-6" style={{height:'22px',fontSize:"12px",paddingTop:"10px"}}>
	    {label.type=="Equipment"?<i className="bi bi-tools"></i>:label.type=="Department"?<i className="bi bi-building-fill"></i>:<i className="bi bi-geo-alt-fill"></i>}
		{" "+label.type+" #"+label.id}
	</Card.Title>
		<hr/>
      </Card.Body>
	  <p style={{fontSize:"12px"}}>{label.name}</p>
    </Card>);
}
function BottomSide(){
const[st,setSt] = useState('x');
const[view,setView] = useState('hei');
const [vpw,setVpw] = useState($(window).width());
const [vph,setVph] = useState($(window).height());
	$(window).on('resize',function(){
          setVpw($(window).width());
          setVph($(window).height());
	});
useEffect(()=>{
	$.ajax({type:"POST",url:connstr+"/try/getData.php",success(data){
		try{
		var jsonData = JSON.parse(data);
		dataArray=[];
		var depts = "";
		var depta=[];
		var areaa=[];
		 for (let i = 0; i < jsonData.length; i++) {
			 if(depts.indexOf(jsonData[i].deptName)==-1){
			 depts += " "+jsonData[i].deptName;
			 dataArray.push({deptid:jsonData[i].deptId,deptname:jsonData[i].deptName,areas:[]});
			 }
		 }
		 //depts += "<li><details><summary>Add New</summary><ul></ul></details></li>"
		 //document.getElementById('treeview').innerHTML = depts;
		 for(let j=0; j < dataArray.length; j++){
		     var areas="";
			for (let i = 0; i < jsonData.length; i++) {
			 if(areas.indexOf(jsonData[i].areaName)==-1 && (jsonData[i].deptName.indexOf(dataArray[j].deptname) != -1)){
			 areas += " "+jsonData[i].areaName;
			 dataArray[j].areas.push({aid:jsonData[i].areaId,areaname:jsonData[i].areaName,equips:[]});
			 
			 }
		   }
		   //areas += "<li><details><summary>Add New Area</summary><ul></ul></details></li>"
		  //document.getElementById(depta[j]).innerHTML += areas;
		 }
		 
		for(let k=0; k < dataArray.length ; k++){
		 for(let j=0; j < dataArray[k].areas.length; j++){
		     var eqps="";
			for (let i = 0; i < jsonData.length; i++) {
			 if(eqps.indexOf(jsonData[i].equipName)==-1 && (jsonData[i].areaName.indexOf(dataArray[k].areas[j].areaname) != -1)){
			 eqps += " "+jsonData[i].equipName;
			 dataArray[k].areas[j].equips.push({eqpid:jsonData[i].equipId,eqpname:jsonData[i].equipName})
			 }
		   }
		  //document.getElementById(areaa[j]).innerHTML += eqps;
		 }
		}
		 
		setSt('y');
		}
		catch(e){
			console.log(e);
		}
	}});
	
},[st]);
const treeShow=(event)=>{
    var deps = document.getElementsByClassName("retracted")
	
	for(let i = 0; i<deps.length ; i++){
		if(deps[i].id!=event.target.value && event.target.value!="0"){
			deps[i].style.display="none";
		}
		else if(event.target.value == "0"){
			deps[i].style.display="";
		}
		else{
			deps[i].style.display="";
		}
	}
}
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
		document.getElementById('m'+id).innerHTML = "<a class='btn btn-dark btn-sm' style='display:inline-block;color:white' href='http://localhost:3000/update"+page+"?id="+id+"'><i class='bi bi-pencil-square'></i></a> <a class='btn btn-danger btn-sm' href='http://localhost:3000/delete"+page+"?id="+id+"' style='text-decoration:none;display:inline-block;color:white'><i class='bi bi-trash-fill'></i></a>";
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
const getdept=()=>{
	$.ajax({type:"POST",url:connstr+"/try/getData2.php",data:{datafor:"departments"},success(data){
		var jsonData = JSON.parse(data);
		var table = "<tr class='table-dark'><th>Deptid</th><th>Department Name</th></tr>";
		for(let i=0;i<jsonData.length;i++){
		    table+="<tr><td>"+jsonData[i].deptId+"</td><td class='dept' id='"+jsonData[i].deptId+"' style='cursor:grab'><div class='row'><div class='col-md-4'>"+jsonData[i].deptName+"</div><div class='col-md-8' align='right'><div class='card' align='center' id='m"+jsonData[i].deptId+"' style='display:none;width:5rem;padding:3px'></div></div></div></td></tr>";
		} 
		document.getElementById("tbles").innerHTML = table;
		document.getElementById("tbltitle").innerHTML = "Departments";
		var deps = document.getElementsByClassName('dept');
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mousedown",function(){
				showMenu(deps[x].id,"Department");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mouseup",function(){
				stoptimer(deps[x].id);
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchstart",function(){
				showMenu(deps[x].id,"Department");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchend",function(){
				stoptimer(deps[x].id);
			});
		}
	}});
}
const getarea=()=>{
	$.ajax({type:"POST",url:connstr+"/try/getData2.php",data:{datafor:"areas"},success(data){
		var jsonData = JSON.parse(data);
		var table = "<tr class='table-dark'><th>Area id</th><th>Area Name</th><th>Department</th></tr>";
		for(let i=0;i<jsonData.length;i++){
		    table+="<tr><td>"+jsonData[i].areaId+"</td><td class='areas' id='"+jsonData[i].areaId+"' style='cursor:grab'><div class='row'><div class='col-md-4'>"+jsonData[i].areaName+"</div><div class='col-md-8' align='right'><div class='card' align='center' id='m"+jsonData[i].areaId+"' style='display:none;width:5rem;padding:3px'></div></div></div></td><td>"+jsonData[i].dept+"</td></tr>";
		} 
		document.getElementById("tbles").innerHTML = table;
		document.getElementById("tbltitle").innerHTML = "Areas";
		var deps = document.getElementsByClassName('areas');
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mousedown",function(){
				showMenu(deps[x].id,"Area");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("mouseup",function(){
				stoptimer(deps[x].id);
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("touchstart",function(){
				showMenu(deps[x].id,"Area");
			});
		}
		for(let x=0; x<deps.length;x++){
			deps[x].addEventListener("Area",function(){
				stoptimer(deps[x].id);
			});
		}
	}});
}
var DAE = [getdept,getarea];
const toggleArrows=(event)=>{
	if(event.target.id=="r"){
	if(fpointer == (DAE.length - 1)){
		fpointer = 0;
	}
	else{
		fpointer = fpointer + 1;
	}
		DAE[fpointer]();
	}
	else if(event.target.id=="l")
	{
		if(fpointer == 0 ){
			fpointer = DAE.length - 1;	
		}
		else{
		fpointer = fpointer - 1;
		}
		DAE[fpointer]();
	}
}
return(<>
<Container align="right" style={{padding:'5px',backgroundColor:'white',maxWidth:'65rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<br/>
<OverlayTrigger trigger="click" placement="left" overlay={
<Popover>
<Popover.Body>
<Container style={{border:"1px solid #dddddd",borderRadius:"10px",verticalAlign:"bottom",padding:"15px"}}><Row><Col align="left"><h6 className="display-4" style={{paddingTop:"5px",fontSize:"16px"}}>Select Department:</h6></Col><Col align="left">
<Form.Select onChange={(event)=>treeShow(event)} id="s1">
<option value="0">select</option>
{   
	dataArray.map((dept) => (
	<option value={dept.deptid}>{dept.deptname}</option>
	))
	
}
<option value="0">All Departments</option>
</Form.Select></Col></Row><br/></Container>
</Popover.Body>
</Popover>
}>
<i style={{fontSize:"24px",marginRight:"5px"}} className="bi bi-three-dots-vertical"></i>
</OverlayTrigger><br/>
<br/>
<Container>
<Row>
<Col style={{overflowX:"scroll"}}>
{
 dataArray.map((dept) => (
<div id={dept.deptid} className="retracted">
  <Tree
    lineWidth={'4px'}
    lineColor={'#D6D6D6'}
    lineBorderRadius={'10px'}
	lineStyle={"solid"}
	nodePadding={"2px"}
    label={<LabelCard label={{name:dept.deptname,color:"#ff715a",type:"Department",id:dept.deptid}} />}
  >
    {dept.areas.map((ar) => (
       <TreeNode label={<LabelCard label={{name:ar.areaname,color:"#5a4fcf",type:"Area",id:ar.aid}} />}>
	   {ar.equips.map((eq) => (
        <TreeNode label={<LabelCard label={{name:eq.eqpname,color:"#242424",type:"Equipment",id:eq.eqpid}} />} />
    ))}
	   </TreeNode>
    ))}
  </Tree>
  <br/>
  </div>
))
}
</Col>
</Row>
</Container>
</Container>
 <br/>
</>);
}
export default BottomSide;