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
import connstr from './constr.js';

function CustomQuery(){
	const exeQuery=(qry,typ)=>{
	$.ajax({type:"POST",url:connstr+"/Backend/Executioner.php",data:{sql:qry,type:typ},success(data){
		if(typ=="upd"||typ=="del" ||typ=="ins"){
			var obj = JSON.parse(data);
			if(obj.es == "success"){
				document.getElementById("op").innerHTML=obj.res;
			}
			else{
				 document.getElementById("op").innerHTML=obj.res;
			}
		}
		else{
			try{
			var obj = JSON.parse(data);
			if(obj.es=="failed")
			{
				document.getElementById("op").innerHTML="Error: "+obj.res;
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
			document.getElementById("op").innerHTML=table;}
			}
			catch{
			 document.getElementById("op").innerHTML="No Results Found. Check Your SQL Query Or Try Some Other Value";
			}
		}
	}});
}
const SelC=()=>{
	var sql = document.getElementById('sbuild').value;
	const regex = /^\s*DELETE\s+FROM\s+\w+\s+WHERE\s+\w+\s*([=]|LIKE)\s*(?:(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*')|\w+)\s*$/i;
	if(sql.indexOf(';')!=-1){
	sql=sql.slice(0,sql.indexOf(';'));
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else if(sql.toLowerCase().indexOf("update") != -1){
		exeQuery(sql,"upd");
	}
	else if(sql.toLowerCase().indexOf("delete") != -1 && regex.test(sql) && sql.toLowerCase().indexOf("1=1") == -1){
	   exeQuery(sql,"del");
	 }
	 else if(sql.toLowerCase().indexOf("insert") != -1){
	   exeQuery(sql,"ins");
	}
	else{
		document.getElementById("op").innerHTML="Invalid Query";
	}
	}
	else if(sql.toLowerCase().indexOf('union')!=-1){
		sql=sql.slice(0,sql.toLowerCase.indexOf('union'));
	if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else if(sql.toLowerCase().indexOf("update") != -1){
		exeQuery(sql,"upd");
	}
	else if(sql.toLowerCase().indexOf("delete") != -1 && regex.test(sql) && sql.toLowerCase().indexOf("1=1") == -1){
	   exeQuery(sql,"del");
	 }
	 else if(sql.toLowerCase().indexOf("insert") != -1){
	   exeQuery(sql,"ins");
	}
	else{
		document.getElementById("op").innerHTML="Invalid Query";
	}
	}
	else{
		if(sql.toLowerCase().indexOf("select") != -1){
	exeQuery(sql,"sel");
	}
	else if(sql.toLowerCase().indexOf("update") != -1){
		exeQuery(sql,"upd");
	}
	else if(sql.toLowerCase().indexOf("delete") != -1 && regex.test(sql) && sql.toLowerCase().indexOf("1=1") == -1){
	   alert("executing:"+sql)
	   exeQuery(sql,"del");
	 }
	 else if(sql.toLowerCase().indexOf("insert") != -1){
	   exeQuery(sql,"ins");
	}
    else{
		document.getElementById("op").innerHTML="Invalid Query";
	}	
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
<Container style={{position:'relative',padding:'5px',backgroundColor:'white',maxWidth:'105rem',borderRadius:'15px',color:'black',boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}} fluid>
<h4 className="display-4" align="center">Executor</h4>
<Form.Control as="textarea" id="sbuild" placeholder="Write Your Query Here..." rows={5}/>
<br/>
<Button variant="dark" onClick={SelC}> Execute </Button>
<br/>
<br/>
<Container align="center">
<div style={{position: 'absolute',top: 15,right: 10,display: 'block'}}><Button variant="light" onClick={()=>printdata()}><i style={{fontSize:"24px"}} className="bi bi-printer-fill"></i></Button></div>
<Table responsive bordered striped id="op" style={{width:"30rem"}}></Table>
</Container>
</Container>
</>
);
}
export default CustomQuery;