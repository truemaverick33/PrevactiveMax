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
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import connstr from './constr.js';

var users = [];
var timer;
const hideMenu=(id)=>{
	document.getElementById('m'+id).style.display="none";
}
const showMenu=(id,page)=>{
	if(document.getElementById('m'+id).style.display=="none"){
	   $('#'+id).addClass('shakeable');
	}
	document.getElementById(id).style.cursor="grabbing";
	timer = window.setTimeout(function() {
		document.getElementById('m'+id).innerHTML = "<a class='btn btn-dark btn-sm' title='edit' style='display:inline-block;color:white' href='http://localhost:3000/update"+page+"?id="+id+"'><i class='bi bi-pencil-square'></i></a> <a class='btn btn-danger btn-sm' title='delete' href='http://localhost:3000/delete"+page+"?id="+id+"' style='text-decoration:none;display:inline-block;color:white'><i class='bi bi-trash-fill'></i></a>";
		document.getElementById('m'+id).style.display="inline-block";
		  $('#'+id).removeClass('shakeable');
		window.addEventListener('dblclick',function(){
			hideMenu(id);
		})
	},1000);
}
const stoptimer=(id)=>{
    clearTimeout(timer);
	 $('#'+id).removeClass('shakeable');
	 document.getElementById(id).style.cursor="grab";
}
const UserCard=({usr})=>{
 return(
	<Card className="user" onTouchStart={(event)=>{showMenu(usr.uno,"user")}} onTouchEnd={(event)=>{stoptimer(usr.uno)}} onMouseDown={(event)=>{showMenu(usr.uno,"user")}} onMouseUp={(event)=>{stoptimer(usr.uno)}} id={usr.uno} style={{ cursor:"grab",width: '18rem',background:usr.access=="Master"?"rgba(0, 0, 0, 0.3)":usr.access=="Admin"?"rgba(228, 158, 150, 0.3)":usr.type=="Technician"?"rgba(128, 128, 250, 0.3)":"rgba(228, 228, 150, 0.3)" }}>
      <Card.Body>
        <Card.Title align="center"><Row><Col>{usr.access=="User"?usr.type:usr.access}</Col><Col id={"m"+usr.uno} style={{display:"none"}}></Col></Row></Card.Title>
		<hr/>
        <Card.Text>
		{"EmpId: #"+usr.empId}
		<br/>
		{"Name: "+usr.uname}
        </Card.Text>
        <a style={{textDecoration:"underline"}} href={"/userdetails?uid="+usr.uno}>view details</a>
      </Card.Body>
    </Card>
	);
}
function ViewUsers(){
	var ui = 0;
	const [st,setSt] = useState('x');
	const [vpw,setVpw] = useState($(window).width());
	const [vph,setVph] = useState($(window).height());
	$(window).on('resize',function(){
          setVpw($(window).width());
          setVph($(window).height());
	});
	useEffect(()=>{
		$.ajax({type:"POST",url:connstr+"/try/getData2.php",data:{datafor:"users"},success(data){
			var jdata=JSON.parse(data);
			users=[];
			if(vpw<500){
				users=jdata.map((component, index) => (
						<tr align="center"><td key={index} style={{padding:"4px"}}>
							<UserCard usr={{uname:component.employeeName,empId:component.employeeId,access:component.access,type:component.userType,uno:component.userNo}}/>
						</td></tr>
					));
				setSt('y');
                				
			}
			else{
			for (let i = 0; i < jdata.length; i += 3) {
				const row = jdata.slice(i, i + 3).map((component, index) => (
						<td key={index} style={{padding:"4px"}}>
							<UserCard usr={{uname:component.employeeName,empId:component.employeeId,access:component.access,type:component.userType,uno:component.userNo}}/>
						</td>
					));
				users.push(
					<tr align="center" key={i}>
					{row}
					</tr>
				  );
			}
			setSt('y');	
			}
		
		}});
		
	},[st]);

   return(
      <>
	  <Container style={{padding:'0',backgroundColor:'white',maxWidth:'60rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
	  <Row>
	  <Col xs={7}>
	  <h4 className="display-6" align="right">Users</h4>
	  </Col>
	  <Col xs={5} align="right">
	  <Button variant="light" onClick={()=>{window.location.href="http://localhost:3000/adduser"}}>&#10010; New User</Button>
	  </Col>
	  </Row>
	  <hr/>
	  <Row>
	  <Col align="center">
	  <table className="table table-responsive">
	  { 
	    users
	  }
	  </table>
	  </Col>
	  </Row>
	  </Container>
	   <br/>
	  </>
   );
}
export default ViewUsers;