<?php
include 'backbone.php';
header('Access-Control-Allow-Origin : http://'.$_SERVER['HTTP_HOST'].':3000');
$ufor = $_GET['ufor'];
if($ufor == "wdoc"){
$toDay = date("jnyHis");
$wardoc_loc = "";
try{
if(isset($_FILES['file1'])){
$file_name = $_FILES['file1']['name'];
$file_size = $_FILES['file1']['size'];
$file_tmp = $_FILES['file1']['tmp_name'];
$file_type = $_FILES['file1']['type'];
if(move_uploaded_file($file_tmp,"WarantyDocs/".$toDay.str_replace(' ', '',$file_name))){
$wardoc_loc = "WarantyDocs/".$toDay.str_replace(' ', '',$file_name);
$id = $_POST['equipid'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($wardoc_loc,$id);
$res=$db->updateWardoc($pars,$conn);
echo json_encode($res);
}
}
else{
	$f1=2;
}
}
catch(Exception $e){
	$f1 = 0;
}
}
else if($ufor == "edoc"){
$toDay = date("jnyHis");
$eqdoc_loc = "";
try{
if(isset($_FILES['file1'])){
$file_name = $_FILES['file1']['name'];
$file_size = $_FILES['file1']['size'];
$file_tmp = $_FILES['file1']['tmp_name'];
$file_type = $_FILES['file1']['type'];
if(move_uploaded_file($file_tmp,"EquipmentDocs/".$toDay.str_replace(' ', '',$file_name))){
$eqdoc_loc = "EquipmentDocs/".$toDay.str_replace(' ', '',$file_name);
$id = $_POST['equipid'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($eqdoc_loc,$id);
$res=$db->updateEqdoc($pars,$conn);
echo json_encode($res);
}
}
else{
	$f1=2;
}
}
catch(Exception $e){
	$f1 = 0;
}
}
else if($ufor=="unlink"){
$id = $_POST['eqpid'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$res=$db->unlinkCheck($id,$conn);
echo json_encode($res);
}
else if($ufor=="setStatus"){
$id = $_POST['woid'];
$st = $_POST['status'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$res=$db->setStatus($id,$st,$conn);
echo json_encode($res);
}
else if($ufor=="wotech"){
$id = $_POST['woid'];
$uid = $_POST['uid'];
$st = $_POST['status'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$res=$db->asgnTechnician($id,$uid,$st,$conn);
echo json_encode($res);
}
else if($ufor=="setComplete"){
$id = $_POST['woid'];
$st = $_POST['status'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$res=$db->setComplete($id,$st,$conn);
echo json_encode($res);
}
else if($ufor=="area"){
$id = $_POST['areaid'];
$areaname = $_POST['areaname'];
$dept = $_POST['dept'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($id,$areaname,$dept);
$res=$db->updatearea($pars,$conn);
echo json_encode($res);
}
else if($ufor=="dept"){
$id = $_POST['deptid'];
$dept = $_POST['deptname'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($id,$dept);
$res=$db->updatedept($pars,$conn);
echo json_encode($res);
}
else if($ufor=="inv"){
$id = $_POST['invid'];
$name = $_POST['invname'];	
$desc = $_POST['invdesc'];
$cost = $_POST['invcost'];
$qty = $_POST['stockqty'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($id,$name,$desc,$cost,$qty);
$res=$db->updateinv($pars,$conn);
echo $res;
}
else if($ufor=="user"){
$id = $_POST['userNo'];
$employeeName = $_POST['employeeName'];
$employeeId = $_POST['employeeId'];
$email = $_POST['email'];
$phoneNo = $_POST['phoneNo'];
$dept = $_POST['dept'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($id,$employeeName,$employeeId,$email,$phoneNo,$dept);
$res=$db->updateuser($pars,$conn);
echo $res;
}
else if($ufor=="equipment"){
$id=$_POST['id'];
$name=$_POST['name'];
$desc=$_POST['desc'];
$wstart=$_POST['wstart'];
$wspan=$_POST['wspan'];
$wend=$_POST['wend'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($id,$name,$desc,$wstart,$wspan,$wend);
$res=$db->updateeqp($pars,$conn);
echo $res;
}
else if($ufor=="resetpass"){
$id=$_POST['uid'];
$np=$_POST['password'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($id,$np);
$res=$db->resetpass($pars,$conn);
echo $res;
}
?>
