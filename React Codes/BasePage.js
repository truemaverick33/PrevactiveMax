import React from 'react';
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import swal from 'sweetalert';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import notif from './Images/notif-30.png';
import logo from './Images/flash-64.png';
import dm from './Images/dm-32.png';
import pf from './Images/profile-25.png';
import Bs from './BottomSide.js';
import User from './users.js';
import Au from './AddUser.js';
import Dept from './dept.js';
import Ad from './addDept.js';
import Area from './areas.js';
import Aa from './addArea.js';
import Equip from './equipments.js';
import Ae from './addEquip.js';
import Inv from './inventory.js';
import Ai from './addInv.js';
import WorkOrder from './workorders.js';
import Aw from './addWorkOrder.js';
import Backup from './backup.js';
import PMsched from './pmschedule.js';
import Aps from './addPmSchedule.js';
import DetailsEqp from './detailseqp.js';
import UpDoc from './uploadDoc.js';
import Ac from './addChecklist.js';
import Checklists from './checklist.js';
import DetailsWo from './detailswo.js';
import TechWo from './technicianwo.js';
import AdminWo from './adminworkorder.js';
import Awq from './addWorkQuotation.js';
import InvUsed from './invused.js';
import Techs from './technicians.js';
import UsrWo from './userwos.js';
import Ua from './Updarea.js';
import Ud from './Upddept.js';
import Ui from './updinv.js';
import Uu from './Upduser.js';
import Ue from './Updequip.js';
import UsrPrf from './userprof.js';
import Delpg from './Delpage.js';
import CustomReports from './CustomReports.js';
import Reports from './Reports.js';
import Repass from './resetpass.js';
import Stats from './stats.js';
import UnDel from './UnDel.js';
import Executor from './CustomQuery.js';
import Home from './Homepage.js';
import './treeview.css';
import connstr from './constr.js';

function BasePage(){
	const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
	const [vpw,setVpw] = useState($(window).width());
	const [vph,setVph] = useState($(window).height());
	const [noti,setNoti] = useState("");
	$(window).on('resize',function(){
          setVpw($(window).width());
          setVph($(window).height());
	});
	useEffect(()=>{
		var y;
		if(window.location.href.indexOf('?')==-1){
		 y=window.location.href.slice(window.location.href.lastIndexOf('/')+1)
		}
		else{
		 y=window.location.href.slice(window.location.href.lastIndexOf('/')+1,window.location.href.indexOf('?'))
		}
		if(document.getElementById(y) && document.getElementById(y).classList.contains('inActive')){
		document.getElementById(y).classList.remove('inActive');
		document.getElementById(y).classList.add('currentActive');
		}
	},[]);
	/*
	const interval = setInterval(() => {
     $.ajax({type:"POST",url:"http://localhost/Backend/Select.php",data:{datafor:'notifs',nfor:sessionStorage.getItem('userid')},success(data2){
		  try{
		  var obj2 = JSON.parse(data2);
		  var x = 0;
		  for(let i=0;i<obj2.length;i++){
		  var ndate = new Date(obj2[i]['tstamp']);
		  var ldate = new Date(localStorage.getItem("lastcheck"));
		  if(ndate>ldate)
		  {
			  x++;
		  }
		  }
		    localStorage.setItem("notifs",x);}
		  catch{
			localStorage.setItem("notifs",0); 
		  }
	   }});
	      setNoti(localStorage.getItem("notifs"));
      }, 2000);*/
	const authenticate=(event)=>{
		var eml = $('#eml').val();
		var psw = $('#pword').val();
		try{
		$.ajax({type:"POST",url:connstr+"/Backend/Select.php",data:{datafor:"login",eml:eml,psw:psw},success(data){
		try{
		var jsonLogin = JSON.parse(data);
		if(jsonLogin.length!=0){
			swal({title:"Login Successful",text:"Welcome "+jsonLogin[0].employeeName,icon:"success",buttons:false,timer:1500}).then(()=>{
				sessionStorage.setItem("logstatus","true");
				sessionStorage.setItem("userid",jsonLogin[0].userNo);
				sessionStorage.setItem("access",jsonLogin[0].access);
				window.location.reload();
			});
		}
		}
		catch(e){
			console.log(e)
			swal({title:"Login Failed!",text:"There was an error while login",icon:"error",buttons:false,timer:1300});
		}
	}});
	}
	catch(e){
		alert(e);
	}
	}
	const logout=()=>{
		sessionStorage.removeItem("logstatus");
		window.location.reload();
	}
  if(sessionStorage.getItem("logstatus")=="true"){
	if(vpw < 500){
		return(
		<Router>
		<Navbar bg="light" style={{boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} variant="light">
        <Container>
          <Navbar.Brand onClick={handleShow}>Prevactive<img src={logo} height="25px" width="25px" style={{transform:"skew(-30deg)"}}/>Max</Navbar.Brand>
          <Nav className="ms-auto">
           <NavDropdown bg="dark" title={<img src={pf} height="30px" width="30px"/>} align="end">
		   <NavDropdown.Item href={"/profile?id="+sessionStorage.getItem('userid')}>Profile</NavDropdown.Item>
		   <NavDropdown.Item href="/" onClick={(event)=>logout()}>Logout</NavDropdown.Item>
		   </NavDropdown>
          </Nav>
        </Container>
        </Navbar>
		<Container style={{paddingTop:vph/30,marginBottom:"150px",minHeight:vph,border:"4px solid #ff715a",borderTopWidth:"0px",borderBottomWidth:"0px"}}>
		<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/home" element={<Home />}></Route>
				<Route path="/areas" element={<Area />}></Route>
				<Route path="/departments" element={<Dept />}></Route>
				<Route path="/add/areas" element={<Aa />}></Route>
				<Route path="/update/areas" element={<Ua />}></Route>
				<Route path="/delete/areas" element={<Delpg />}></Route>
				<Route path="/update/areas" element={<Ua />}></Route>
				<Route path="/add/departments" element={<Ad />}></Route>
				<Route path="/update/departments" element={<Ud />}></Route>
				<Route path="/delete/departments" element={<Delpg />}></Route>
				<Route path="/add/equipments" element={<Ae />}></Route>
				<Route path="/update/equipments" element={<Ue />}></Route>
				<Route path="/delete/equipments" element={<Delpg />}></Route>
				<Route path="/details/users" element={<UsrPrf />}></Route>
				<Route path="/repass/users" element={<Repass />}></Route>
				<Route path="/add/users" element={<Au />}></Route>
				<Route path="/users" element={<User />}></Route>
				<Route path="/update/users" element={<Uu />}></Route>
				<Route path="/delete/users" element={<Delpg/>}></Route>
				<Route path="/profile" element={<UsrPrf />}></Route>
				<Route path="/inventory" element={<Inv />}></Route>
				<Route path="/add/inventory" element={<Ai />}></Route>
				<Route path="/update/inventory" element={<Ui />}></Route>
				<Route path="/delete/inventory" element={<Delpg />}></Route>
				<Route path="/equipments" element={<Equip />}></Route>
				<Route path="/workorders" element={<WorkOrder />}></Route>
				<Route path="/add/workorders" element={<Aw/>}></Route>
				<Route path="/add/workquotations" element={<Awq/>}></Route>
				<Route path="/backup" element={<Backup/>}></Route>
				<Route path="/pmsched" element={<PMsched/>}></Route>
				<Route path="/add/pmsched" element={<Aps/>}></Route>
				<Route path="/details/equipments" element={<DetailsEqp />}></Route>
				<Route path="/uploads/equipments" element={<UpDoc />}></Route>
				<Route path="/add/checklists" element={<Ac />}></Route>
				<Route path="/delete/checklists" element={<Delpg />}></Route>
				<Route path="/checklists" element={<Checklists />}></Route>
				<Route path="/details/workorders" element={<DetailsWo />}></Route>
				<Route path="/technician/workorders" element={<TechWo />}></Route>
				<Route path="/technicians" element={<Techs />}></Route>
				<Route path="/admin/workorders" element={<AdminWo />}></Route>
				<Route path="/user/workorders" element={<UsrWo />}></Route>
				<Route path="/invused" element={<InvUsed />}></Route>
				<Route path="/custom/reports" element={<CustomReports />}></Route>
				<Route path="/static/reports" element={<Reports />}></Route>
				<Route path="/user/statistics" element={<Stats />}></Route>
				<Route path="/technician/statistics" element={<Stats />}></Route>
				<Route path="/unblock/users" element={<UnDel />}></Route>
				<Route path="/unblock/areas" element={<UnDel />}></Route>
				<Route path="/unblock/departments" element={<UnDel />}></Route>
				<Route path="/unblock/equipments" element={<UnDel />}></Route>
				<Route path="/unblock/checklists" element={<UnDel />}></Route>
				<Route path="/unblock/inventory" element={<UnDel />}></Route>
				<Route path="/executor" element={<Executor />}></Route>
		</Routes>
		</Container>
		<Offcanvas style={{width:"60%"}} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
			
			sessionStorage.getItem("access")=="Master"?(
			<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
            <div id="departments" className="inActive"><a href="/departments">Departments</a></div><br/>
            <div id="areas" className="inActive"><a href="/areas">Areas</a></div><br/>
            <div id="equipments" className="inActive"><a href="/equipments">Equipments</a></div><br/>
            <div id="workorders" className="inActive"><a href="/workorders">Work Orders</a></div><br/>
            <div id="users" className="inActive"><a href="/users">Users</a></div><br/>
            <div id="inventory" className="inActive"><a href="/inventory">Inventory</a></div><br/>
            <div id="checklists" className="inActive"><a href="/checklists">Checklist</a></div><br/>
			<div id="pmsched" className="inActive"><a href="/pmsched">PM Schedules</a></div><br/>
			<div id="executor" className="inActive"><a href="/executor">Executor</a></div><br/>
			<div id="Backup" className="inActive"><a href="/Backup">Backup</a></div><br/>
			</div>
			):sessionStorage.getItem("access")=="Admin"?(<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
            <div id="equipments" className="inActive"><a href="/equipments">Equipments</a></div><br/>
            <div id="workorders" className="inActive"><a href="/admin/workorders">Work Orders</a></div><br/>
            <div id="users" className="inActive"><a href="/users">Users</a></div><br/>
            <div id="technicians" className="inActive"><a href="/technicians">Technicians</a></div><br/>
            <div id="pmsched" className="inActive"><a href="/pmsched">PM Schedule</a></div><br/>
            <div id="inventory" className="inActive"><a href="/inventory">Inventory</a></div><br/>
			<div id="reports" className="inActive"><a href="/reports">Reports</a></div><br/>
			</div>
			):sessionStorage.getItem("access")=="User"?(<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
			<div id="/user/workorders" className="inActive"><a href="/user/workorders">My Work Orders</a></div><br/>
            <div id="statistics" className="inActive"><a href="/user/statistics">Statistics</a></div><br/></div>
			):(<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
			<div id="equipments" className="inActive"><a href="/equipments">Equipments</a></div><br/>
            <div id="workorders" className="inActive"><a href="/technician/workorders">My Work Orders</a></div><br/>
            <div id="statistics" className="inActive"><a href="/technician/statistics">Statistics</a></div><br/>
			</div>
			)
		}
        </Offcanvas.Body>
        </Offcanvas>
		</Router>
		);
	}
	else{
		return(
		<Router>
		<Navbar bg="light" style={{boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} variant="light">
        <Container>
          <Navbar.Brand href="#home">Prevactive<img src={logo} height="25px" width="25px" style={{transform:"skew(-30deg)"}}/>Max</Navbar.Brand>
          <Nav className="ms-auto">
		   <NavDropdown bg="dark" title={<img src={pf} height="30px" width="30px"/>} align="end">
			<NavDropdown.Item href={"/profile?id="+sessionStorage.getItem('userid')}>Profile</NavDropdown.Item>
		   <NavDropdown.Item href="/" onClick={(event)=>logout()}>Logout</NavDropdown.Item>
		   </NavDropdown>
          </Nav>
        </Container>
        </Navbar>
		<Container fluid style={{backgroundColor:"#ffeae5",marginLeft:"0px",marginRight:"0px"}}>
		<Row>
		<Col md={2} style={{padding:"0px"}}>
		<Container fluid style={{backgroundColor:'white',minHeight:vph,paddingTop:"10px"}}>
		{
			
			sessionStorage.getItem("access")=="Master"?(
			<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
            <div id="departments" className="inActive"><a href="/departments">Departments</a></div><br/>
            <div id="areas" className="inActive"><a href="/areas">Areas</a></div><br/>
            <div id="equipments" className="inActive"><a href="/equipments">Equipments</a></div><br/>
            <div id="workorders" className="inActive"><a href="/workorders">Work Orders</a></div><br/>
            <div id="users" className="inActive"><a href="/users">Users</a></div><br/>
            <div id="inventory" className="inActive"><a href="/inventory">Inventory</a></div><br/>
            <div id="checklists" className="inActive"><a href="/checklists">Checklist</a></div><br/>
			<div id="pmsched" className="inActive"><a href="/pmsched">PM Schedules</a></div><br/>
			<div id="executor" className="inActive"><a href="/executor">Executor</a></div><br/>
			<div id="Backup" className="inActive"><a href="/Backup">Backup</a></div><br/>
			</div>
			):sessionStorage.getItem("access")=="Admin"?(<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
            <div id="equipments" className="inActive"><a href="/equipments">Equipments</a></div><br/>
            <div id="workorders" className="inActive"><a href="/admin/workorders">Work Orders</a></div><br/>
            <div id="users" className="inActive"><a href="/users">Users</a></div><br/>
            <div id="technicians" className="inActive"><a href="/technicians">Technicians</a></div><br/>
            <div id="pmsched" className="inActive"><a href="/pmsched">PM Schedule</a></div><br/>
            <div id="inventory" className="inActive"><a href="/inventory">Inventory</a></div><br/>
			<div id="reports" className="inActive"><a href="/static/reports">Reports</a></div><br/>
			</div>
			):sessionStorage.getItem("access")=="User"?(<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
			<div id="workorders" className="inActive"><a href="/user/workorders">My Work Orders</a></div><br/>
            <div id="statistics" className="inActive"><a href="/user/statistics">Statistics</a></div><br/></div>
			):(<div>
			<div id="home" className="inActive"><a href="/home">Home</a></div><br/>
			<div id="equipments" className="inActive"><a href="/equipments">Equipments</a></div><br/>
            <div id="workorders" className="inActive"><a href="/technician/workorders">My Work Orders</a></div><br/>
            <div id="statistics" className="inActive"><a href="/technician/statistics">Statistics</a></div><br/>
			</div>
			)
		}
		</Container>
		</Col>
		<Col md={10} style={{height:vph,border:"8px solid #ff715a",borderTopWidth:"0px",borderBottomWidth:"0px",overflowY:"scroll"}}>
		   <Container fluid style={{paddingTop:vph/20}}>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/home" element={<Home />}></Route>
				<Route path="/areas" element={<Area />}></Route>
				<Route path="/departments" element={<Dept />}></Route>
				<Route path="/add/areas" element={<Aa />}></Route>
				<Route path="/update/areas" element={<Ua />}></Route>
				<Route path="/delete/areas" element={<Delpg />}></Route>
				<Route path="/update/areas" element={<Ua />}></Route>
				<Route path="/add/departments" element={<Ad />}></Route>
				<Route path="/update/departments" element={<Ud />}></Route>
				<Route path="/delete/departments" element={<Delpg />}></Route>
				<Route path="/add/equipments" element={<Ae />}></Route>
				<Route path="/update/equipments" element={<Ue />}></Route>
				<Route path="/delete/equipments" element={<Delpg />}></Route>
				<Route path="/details/users" element={<UsrPrf />}></Route>
				<Route path="/repass/users" element={<Repass />}></Route>
				<Route path="/add/users" element={<Au />}></Route>
				<Route path="/users" element={<User />}></Route>
				<Route path="/update/users" element={<Uu />}></Route>
				<Route path="/delete/users" element={<Delpg/>}></Route>
				<Route path="/profile" element={<UsrPrf />}></Route>
				<Route path="/inventory" element={<Inv />}></Route>
				<Route path="/add/inventory" element={<Ai />}></Route>
				<Route path="/update/inventory" element={<Ui />}></Route>
				<Route path="/delete/inventory" element={<Delpg />}></Route>
				<Route path="/equipments" element={<Equip />}></Route>
				<Route path="/workorders" element={<WorkOrder />}></Route>
				<Route path="/add/workorders" element={<Aw/>}></Route>
				<Route path="/add/workquotations" element={<Awq/>}></Route>
				<Route path="/backup" element={<Backup/>}></Route>
				<Route path="/pmsched" element={<PMsched/>}></Route>
				<Route path="/add/pmsched" element={<Aps/>}></Route>
				<Route path="/details/equipments" element={<DetailsEqp />}></Route>
				<Route path="/uploads/equipments" element={<UpDoc />}></Route>
				<Route path="/add/checklists" element={<Ac />}></Route>
				<Route path="/delete/checklists" element={<Delpg />}></Route>
				<Route path="/checklists" element={<Checklists />}></Route>
				<Route path="/details/workorders" element={<DetailsWo />}></Route>
				<Route path="/technician/workorders" element={<TechWo />}></Route>
				<Route path="/technicians" element={<Techs />}></Route>
				<Route path="/admin/workorders" element={<AdminWo />}></Route>
				<Route path="/user/workorders" element={<UsrWo />}></Route>
				<Route path="/invused" element={<InvUsed />}></Route>
				<Route path="/custom/reports" element={<CustomReports />}></Route>
				<Route path="/static/reports" element={<Reports />}></Route>
				<Route path="/user/statistics" element={<Stats />}></Route>
				<Route path="/technician/statistics" element={<Stats />}></Route>
				<Route path="/unblock/users" element={<UnDel />}></Route>
				<Route path="/unblock/areas" element={<UnDel />}></Route>
				<Route path="/unblock/departments" element={<UnDel />}></Route>
				<Route path="/unblock/equipments" element={<UnDel />}></Route>
				<Route path="/unblock/checklists" element={<UnDel />}></Route>
				<Route path="/unblock/inventory" element={<UnDel />}></Route>
				<Route path="/executor" element={<Executor />}></Route>
			</Routes>
		   </Container>
		</Col>
		</Row>
		</Container>
		</Router>
		);
	}
}
else{
	return(
	<>
	<Container className="cnt" fluid>
	<Container style={{marginTop:vph/5,backgroundColor:'white',maxWidth:'30rem',borderRadius:'25px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
		<br/>
		<h1 className="display-6" align="center">Prevactive<img src={logo} className="logo" style={{transform:"skew(-30deg)"}}/>Max</h1>
		<br/>
		<Row>
		<Col md={2}></Col>
		<Col md={2}>Email:</Col><Col md={6} align="left"><Form.Control name="username" type="text" id="eml"/></Col>
		</Row><br/>
		<Row>
		<Col md={2}></Col>
		<Col md={2}>Password:</Col><Col md={6} align="left"><Form.Control name="password" type="password" id="pword"/></Col>
		<br/><br/><br/>
        <Button style={{backgroundColor:'#ff715a',height:"50px",borderRadius:"0px 0px 25px 25px",border:'1.5px solid white'}} onClick={(event)=>authenticate(event)}>Login</Button>
		</Row>
	</Container>
	</Container>
	</>
	);
}
}
export default BasePage;