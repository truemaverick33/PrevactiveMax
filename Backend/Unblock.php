<?php
include 'backbone.php';
header('Access-Control-Allow-Origin : http://'.$_SERVER['HTTP_HOST'].':3000');
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$unblockFor=$_POST['page'];
if($unblockFor=="users"){
	$id=$_POST['id'];
	$res=$db->unblockusers($id,$conn);
	echo $res;
}
else if($unblockFor=="equipments"){
	$id=$_POST['id'];
	$res=$db->unblockequipments($id,$conn);
	echo $res;
}
else if($unblockFor=="inventory"){
	$id=$_POST['id'];
	$res=$db->unblockinventory($id,$conn);
	echo $res;
}
else if($unblockFor=="checklists"){
	$id=$_POST['id'];
	$res=$db->unblockchecklists($id,$conn);
	echo $res;
}
else if($unblockFor=="areas"){
	$id=$_POST['id'];
	$res=$db->unblockareas($id,$conn);
	echo $res;
}
else if($unblockFor=="departments"){
	$id=$_POST['id'];
	$res=$db->unblockdeptartments($id,$conn);
	echo $res;
}
?>