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

var qstring = window.location.search;
var params = new URLSearchParams(qstring);
var id = params.get('id');
function DelPage(){
const [page,setPage]=useState('');
useEffect(()=>{
	var y;
		if(window.location.href.indexOf('?')==-1){
		 y=window.location.href.slice(window.location.href.lastIndexOf('/')+1)
		 setPage(y);
		}
		else{
		 y=window.location.href.slice(window.location.href.lastIndexOf('/')+1,window.location.href.indexOf('?'))
		 setPage(y);
		}
},[page]);
const block=()=>{
	$.ajax({type:"POST",url:connstr+"/Backend/Delete.php",data:{page:page,id:id},success(data){
		console.log(data);
			if(data){
			swal({title:"Successful!",text:"Blocked successfully",icon:"success",buttons:false,timer:1300}).then(()=>{
				window.location.href="/"+page;
			});
			}
		}});
}
return(
<>
<Container align="center" style={{borderRadius:"15px",backgroundColor:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",maxWidth:"35rem"}}>
<h4 className="display-6">{page=="inventory"?"Empty ":"Block "} {page}</h4>
<hr/>
<h6 className="display-6" style={{fontSize:"20px",fontWeight:"bold"}}>Are You Sure You Want To {page=="inventory"?"Empty ":"Block "} {page} id: {id} ?</h6>
<br/>
<p>Note: Master users can always {page=="inventory"?"Refill ":"Block "} it later</p>
<hr/>
<Button variant="light">Cancel</Button> <Button variant="danger" onClick={(event)=>block()}>Confirm</Button>
<br/>
<br/>
</Container>
</>
);
}
export default DelPage;