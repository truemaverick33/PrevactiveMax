<?php
include 'backbone.php';
header('Access-Control-Allow-Origin : http://'.$_SERVER['HTTP_HOST'].':3000');
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$blockFor=$_POST['page'];
if($blockFor=="users"){
	$id=$_POST['id'];
	$res=$db->blockusers($id,$conn);
	echo $res;
}
else if($blockFor=="equipments"){
	$id=$_POST['id'];
	$res=$db->blockequipments($id,$conn);
	echo $res;
}
else if($blockFor=="inventory"){
	$id=$_POST['id'];
	$res=$db->blockinventory($id,$conn);
	echo $res;
}
else if($blockFor=="checklists"){
	$id=$_POST['id'];
	$res=$db->blockchecklists($id,$conn);
	echo $res;
}
else if($blockFor=="areas"){
	$id=$_POST['id'];
	$res=$db->blockareas($id,$conn);
	echo $res;
}
else if($blockFor=="departments"){
	$id=$_POST['id'];
	$res=$db->blockdeptartments($id,$conn);
	echo $res;
}
?>