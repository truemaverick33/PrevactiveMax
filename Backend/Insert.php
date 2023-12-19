<?php
include 'backbone.php';
header('Access-Control-Allow-Origin : http://'.$_SERVER['HTTP_HOST'].':3000');
$ifor = $_GET['ifor'];
if($ifor == "user"){ 
$id = $_POST['empid'];
$name = $_POST['empname'];
$eml = $_POST['email'];
$pwd = $_POST['pwd'];
$phn = $_POST['phone'];
$typ = $_POST['type'];
$dept = $_POST['dept'];
$techType = $_POST['techtype'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($name,$id,$eml,$phn,$pwd,$dept,$typ,$techType);
$res=$db->insertuser($pars,$conn);
echo $res;
}
else if($ifor == "area"){
$name = $_POST['areaname'];	
$dept = $_POST['dept'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($name,$dept);
$res=$db->insertarea($pars,$conn);
echo $res;
}
else if($ifor == "inv"){
$name = $_POST['invname'];	
$desc = $_POST['invdesc'];
$cost = $_POST['invcost'];
$qty = $_POST['stockqty'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($name,$desc,$cost,$qty);
$res=$db->insertinv($pars,$conn);
echo $res;
}
else if($ifor == "dept"){
$name = $_POST['deptName'];	
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($name);
$res=$db->insertdept($pars,$conn);
echo $res;
}
else if($ifor == "workordermaster"){
$woTitle = $_POST['woTitle'];	
$woDesc = $_POST['woDesc'];
$woType = $_POST['woType'];
$sev = $_POST['severity'];
$deadline = $_POST['deadline'];
$reqUid = $_POST['reqUid'];
$deptId = $_POST['deptId'];
$areaId = $_POST['areaId'];
$eqpid = $_POST['eqpid'];
$acc = $_POST['acc'];
$st = 0;
if($acc == "Admin"){
	$st = 1;
}
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($woTitle,$woDesc,$woType,$sev,$deadline,$reqUid,$deptId,$areaId,$eqpid,$st);
$res=$db->insertwom($pars,$conn);
echo $res;
}
else if($ifor == "pmschedule"){
$eqid = $_POST['eqid'];	
$pmsdate = $_POST['pmsdate'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($eqid,$pmsdate);
$res=$db->insertpms($pars,$conn);
echo $res;
}
else if($ifor == "equip"){
$toDay = date("jnyHis");
$wardoc_loc = "";
$eqpdoc_loc = "";
$f1=1;
$f2=1;
try{
if(isset($_FILES['file1'])){
$file_name = $_FILES['file1']['name'];
$file_size = $_FILES['file1']['size'];
$file_tmp = $_FILES['file1']['tmp_name'];
$file_type = $_FILES['file1']['type'];
if(move_uploaded_file($file_tmp,"WarantyDocs/".$toDay.str_replace(' ', '',$file_name))){
$wardoc_loc = "WarantyDocs/".$toDay.str_replace(' ', '',$file_name);
}
}
else{
	$f1=2;
}
}
catch(Exception $e){
	$f1 = 0;
}
try{
if(isset($_FILES['file2'])){
$file_name2 = $_FILES['file2']['name'];
$file_size2 = $_FILES['file2']['size'];
$file_tmp2 = $_FILES['file2']['tmp_name'];
$file_type2 = $_FILES['file2']['type'];
if(move_uploaded_file($file_tmp2,"EquipmentDocs/".$toDay.str_replace(' ', '',$file_name2))){
$eqpdoc_loc =  "EquipmentDocs/".$toDay.str_replace(' ', '',$file_name2);
}
}
else{
	$f2=2;
}
}
catch(Exception $e){
	echo $e;
}
$name=$_POST['name'];
$desc=$_POST['desc'];
$areaid=$_POST['areaid'];
$wstart=$_POST['wstart'];
$wspan=$_POST['wspan'];
$wend=$_POST['wend'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($name,$desc,$areaid,$wstart,$wspan,$wend,$wardoc_loc,$eqpdoc_loc);
$res=$db->insertequip($pars,$conn);
$response=array("file1"=>$f1,"file2"=>$f2,"database"=>$res);
echo json_encode($res);
}
else if($ifor == "checklist"){
$toDay = date("jnyHis");
$chdoc = "";
try{
if(isset($_FILES['file1'])){
$file_name = $_FILES['file1']['name'];
$file_size = $_FILES['file1']['size'];
$file_tmp = $_FILES['file1']['tmp_name'];
$file_type = $_FILES['file1']['type'];
if(move_uploaded_file($file_tmp,"Checklists/".$toDay.str_replace(' ', '',$file_name))){
$chdoc = "Checklists/".$toDay.str_replace(' ', '',$file_name);
$chname = $_POST['chname'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($chname,$chdoc);
$res=$db->insertcheck($pars,$conn);
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
else if($ifor == "chmap"){
$chid = $_POST['chid'];
$eqpid = $_POST['eqpid'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($chid,$eqpid);
$res=$db->insertchmap($pars,$conn);
echo json_encode($res);
}
else if($ifor == "invmap"){
$invid = $_POST['invid'];
$eqpid = $_POST['eqpid'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($invid,$eqpid);
$res=$db->insertinvmap($pars,$conn);
echo json_encode($res);
}
else if($ifor == "wqreq"){
$toDay = date("jnyHis");
$chdoc = "";
try{
if(isset($_FILES['file1'])){
$file_name = $_FILES['file1']['name'];
$file_size = $_FILES['file1']['size'];
$file_tmp = $_FILES['file1']['tmp_name'];
$file_type = $_FILES['file1']['type'];
if(move_uploaded_file($file_tmp,"AnalysisReports/".$toDay.str_replace(' ', '',$file_name))){
$chdoc = "AnalysisReports/".$toDay.str_replace(' ', '',$file_name);
$title = $_POST['title'];
$desc = $_POST['desc'];
$woid = $_POST['woid'];
$est = $_POST['est'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($title,$desc,$chdoc,$woid,$est);
$res=$db->insertwq($pars,$conn);
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
else if($ifor == "invlog"){
$invid = $_POST['invid'];
$woid = $_POST['woid'];
$qty = $_POST['qty'];
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$pars = array($invid,$woid,$qty);
$res=$db->insertinvlog($pars,$conn);
echo json_encode($res);
}
?>