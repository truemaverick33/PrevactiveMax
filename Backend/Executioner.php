<?php
header('Access-Control-Allow-Origin : http://'.$_SERVER['HTTP_HOST'].':3000');
$conn=@mysql_connect('localhost','root','');
mysql_select_db('pms',$conn);
$sql = $_POST['sql'];
$type = $_POST['type'];
if($type == "sel"){
$res = mysql_query($sql,$conn);
if($res){
while($row = mysql_fetch_row($res))
{
	$data[]=$row;
}
$datafields[]=mysql_num_fields($res);
for($i=0;$i<mysql_num_fields($res);$i++){
$datafields[] = mysql_field_name($res,$i);
}
echo json_encode(array_merge($datafields,$data));
}
else{
	$data=array("es"=>"failed","res"=>mysql_error($conn));
	echo json_encode($data);
}
}
else if($type == "upd"){
if(mysql_query($sql,$conn))
{
	$data=array("es"=>"success","res"=>"Update Query Executed SuccessFully");
	echo json_encode($data);
}
else
{
	$data=array("es"=>"failed","res"=>mysql_error($conn));
	echo json_encode($data);
}
}
else if($type == "del"){
if(mysql_query($sql,$conn))
{
	$data=array("es"=>"success","res"=>"Delete Query Executed SuccessFully");
	echo json_encode($data);
}
else
{
	$data=array("es"=>"failed","res"=>mysql_error($conn));
	echo json_encode($data);
}
}
else if($type == "ins"){
if(mysql_query($sql,$conn))
{
	$data=array("es"=>"success","res"=>"Insert Query Executed SuccessFully");
	echo json_encode($data);
}
else
{
	$data=array("es"=>"failed","res"=>mysql_error($conn));
	echo json_encode($data);
}
}
else if($type == "ser"){
$res = mysql_query($sql,$conn);
if($res){
while($row = mysql_fetch_row($res))
{
	$data[]=$row;
}
echo json_encode($data);
}
else{
	$data=array("es"=>"failed","res"=>mysql_error($conn));
	echo json_encode($data);
}
}
?>