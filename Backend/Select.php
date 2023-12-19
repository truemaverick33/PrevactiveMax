<?php
include 'backbone.php';
header('Access-Control-Allow-Origin : http://'.$_SERVER['HTTP_HOST'].':3000');
$con = new Connector();
$conn = $con->connectToDb();
$db= new CRUD();
$datafor = $_POST['datafor'];
if($datafor == "usersa"){
$db->selectusersa($conn);
}
else if($datafor == "usersb"){
$db->selectusersb($conn);
}
else if($datafor == "depta"){
$db->selectdeptsa($conn);
}
else if($datafor == "deptb"){
$db->selectdeptsb($conn);
}
else if($datafor == "technicians"){
$db->selecttechnicians($conn);
}
else if($datafor == "tectypes"){
$db->selecttechtypes($conn);
}
else if($datafor == "areaa"){
$db->selectareaa($conn);
}
else if($datafor == "areab"){
$db->selectareab($conn);
}
else if($datafor == "equipa"){
$db->selectequipa($conn);
}
else if($datafor == "equipb"){
$db->selectequipb($conn);
}
else if($datafor == "inva"){
$db->selectinva($conn);
}
else if($datafor == "invb"){
$db->selectinvb($conn);
}
else if($datafor == "wom"){
$db->selectwom($conn);
}
else if($datafor == "areaByDept"){
$deptid = $_POST['deptid'];
$db->selectabyd($deptid,$conn);
}
else if($datafor == "equipByArea"){
$areaid = $_POST['areaid'];
$db->selectebya($areaid,$conn);
}
else if($datafor == "pmschedule"){
$db->selectpmschedulerec($conn);
}
else if($datafor == "checklista"){
$db->selectchecklista($conn);
}
else if($datafor == "checklistb"){
$db->selectchecklistb($conn);
}
else if($datafor == "equipDet"){
$equipid = $_POST['equipid'];
$db->selectequipDet($equipid,$conn);
}
else if($datafor == "equipcheck"){
$equipid = $_POST['equipid'];
$db->selectequipcheck($equipid,$conn);
}
else if($datafor == "equipinv"){
$equipid = $_POST['equipid'];
$db->selectequipinv($equipid,$conn);
}
else if($datafor == "woDet"){
$woid = $_POST['woid'];
$db->selectwodet($woid,$conn);
}
else if($datafor == "wqDet"){
$woid = $_POST['woid'];
$db->selectwqdet($woid,$conn);
}
else if($datafor == "wosDet"){
$woid = $_POST['woid'];
$db->selectwosdet($woid,$conn);
}
else if($datafor == "invbye"){
$woid = $_POST['woid'];
$db->selectinvbye($woid,$conn);
}
else if($datafor == "invlog"){
$woid = $_POST['woid'];
$db->selectinvlog($woid,$conn);
}
else if($datafor == "techs"){
$db->selecttechs($conn);
}
else if($datafor == "wom4tech"){
$techid = $_POST['techid'];
$db->selectWo4techs($techid,$conn);
}
else if($datafor == "wom4adm"){
$uid = $_POST['uid'];
$db->selectWo4adm($uid,$conn);
}
else if($datafor == "wom4usr"){
$uid = $_POST['uid'];
$db->selectWo4usr($uid,$conn);
}
else if($datafor == "optimalwlc"){
$type = $_POST['type'];
$db->optimalwlc($type,$conn);
}
else if($datafor == "optimalwcmed"){
$type = $_POST['type'];
$db->optimalwcmed($type,$conn);
}
else if($datafor == "optimalwchi"){
$type = $_POST['type'];
$db->optimalwchi($type,$conn);
}
else if($datafor == "optimalemg"){
$type = $_POST['type'];
$db->optimalemg($type,$conn);
}
else if($datafor == "areaspec"){
$aid = $_POST['aid'];
$db->selectareaspec($aid,$conn);
}
else if($datafor == "deptspec"){
$did = $_POST['did'];
$db->selectdeptspec($did,$conn);
}
else if($datafor == "invspec"){
$invid = $_POST['invid'];
$db->selectinvspec($invid,$conn);
}
else if($datafor == "userspec"){
$uid = $_POST['uid'];
$db->selectuserspec($uid,$conn);
}
else if($datafor == "equipspec"){
$eid = $_POST['eid'];
$db->selectequipspec($eid,$conn);
}
else if($datafor == "userstats"){
$uid = $_POST['uid'];
$db->selectuserstats($uid,$conn);
}
else if($datafor == "techstats"){
$uid = $_POST['uid'];
$db->selecttechstats($uid,$conn);
}
else if($datafor == "usrsearch"){
$src = $_POST['src'];
$db->selectusrsearch($src,$conn);
}
else if($datafor == "login"){
$eml = $_POST['eml'];
$psw = $_POST['psw'];
$pars = array($eml,$psw);
$db->login($pars,$conn);	
}
?>