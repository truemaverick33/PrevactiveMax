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


function Backup(){
const [timediff,setTimeDiff]=useState(0);
useEffect(()=>{
var lastback = new Date(localStorage.getItem("lastback"));
var today = new Date();	
var diff = today.getTime() - lastback.getTime();
setTimeDiff(Math.floor(diff/(1000*60*60*24)));
});
const createbackup=()=>{
	$.ajax({type:"POST",url:"http://localhost/Backend/backDb.php",success(data){
		var obj = JSON.parse(data);
		if(obj.es == "success"){
			swal({title:"Successful!",text:"Database Backedup successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				 var currentDate = new Date();
				 localStorage.setItem("lastback",currentDate);
				 window.location.reload();
			});			 
			}
			else{
			}
	}});
}
return(
<>
<Container align="center" style={{borderRadius:"25px",backgroundColor:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",maxWidth:"30rem"}}>
	  <h4 className="display-6">Database BackUp</h4>
	  <br/>
	  <div>
	  <h1 style={{fontSize:"64px"}}>{ timediff>0?<i className="bi bi-database-fill-down"></i>:<i className="bi bi-database-fill-check"></i>}</h1>
	  <br/>
	  { timediff>0?<Button variant="success" onClick={createbackup}>Backup Database</Button>:<Button variant="success" disabled>Backedup Already</Button>}
	  </div>
	  <br/>
	  <h6>Last Backup : {localStorage.getItem("lastback")}</h6>
	  <br/>
</Container>
</>
)
}
export default Backup;