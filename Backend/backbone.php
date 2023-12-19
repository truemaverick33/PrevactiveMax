<?php
class Connector {
	public $conn = null; 
	public function connectToDb(){
		$host = "localhost";
		$user = "root";
		$pass = "";
		$db = "pms";
		try{
	       $conn = new PDO('mysql:host='.$host.';dbname='.$db, $user, $pass);
		   return $conn;
		}
		catch(PDOException $e){
			echo $e->getMessage();
			die();
		}
	}
}
class CRUD{
	function insertuser($parlist,$conn){
		$sql = "INSERT INTO usermaster(employeeName,employeeId,email,phoneNo,password,deptId,access) VALUES (?,?,?,?,?,?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1],$parlist[2],$parlist[3],$parlist[4],$parlist[5],$parlist[6]])){
			if($parlist[6]=="Technician"){
			  $new_userNo=$conn->lastInsertId();
			  $sqln = "INSERT INTO technicianmaster(uid,typeid) VALUES (?,?)";
		      $exen = $conn->prepare($sqln);
			  if($exen->execute([$new_userNo,$parlist[7]])){
				  return true;
			  }
			  else{
				  $error = $exen->errorInfo();
			      return($error[2]);
			  }
			}
			else{
				return true;
			}
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}catch(Exception $e){
			return $e;
		}
	}
	function selectusersa($conn){
		$sql = "SELECT u.userNo,u.employeeName,u.employeeId,u.email,u.phoneNo,u.access,u.status,d.deptName as dept from usermaster u left join deptmaster d on u.deptId = d.deptId where u.status=1 order by u.userNo ASC";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectusersb($conn){
		$sql = "SELECT u.userNo,u.employeeName,u.employeeId,u.email,u.phoneNo,u.access,u.status,d.deptName as dept from usermaster u left join deptmaster d on u.deptId = d.deptId where u.status=0 order by u.userNo ASC";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectuserspec($id,$conn){
		$sql = "SELECT u.userNo,u.employeeName,u.employeeId,u.email,u.phoneNo,u.access,u.status,d.deptName as dept,u.deptId,tm.type from usermaster u left join deptmaster d on u.deptId = d.deptId left join technicianmaster t on u.userNo = t.uid left join typemaster tm on t.typeid = tm.typeid where u.userNo=?";
		$exe=$conn->prepare($sql);
		$exe->execute([$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectdeptsa($conn){
		$sql = "SELECT * FROM deptmaster where status=1";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectdeptsb($conn){
		$sql = "SELECT * FROM deptmaster where status=0";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectdeptspec($id,$conn){
		$sql = "SELECT * FROM deptmaster where deptId=?";
		$exe=$conn->prepare($sql);
		$exe->execute([$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selecttechtypes($conn){
		$sql = "SELECT * FROM typemaster";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectareaa($conn){
		$sql = "SELECT a.areaId,a.areaName,d.deptName,a.status FROM areamaster a left join deptmaster d on a.deptId = d.deptId where a.status=1";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectareab($conn){
		$sql = "SELECT a.areaId,a.areaName,d.deptName,a.status FROM areamaster a left join deptmaster d on a.deptId = d.deptId where a.status=0";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectareaspec($id,$conn){
		$sql = "SELECT a.areaId,a.areaName,a.deptId,d.deptName,a.status FROM areamaster a left join deptmaster d on a.deptId = d.deptId where a.areaId=? and a.status=1";
		$exe=$conn->prepare($sql);
		$exe->execute([$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function insertarea($parlist,$conn){
		$sql = "INSERT INTO areamaster(areaName,deptId) VALUES (?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function login($parlist,$conn){
		$sql = "SELECT userNo,employeeName,access from usermaster where email = ? and password = ? and status=1";
		$exe=$conn->prepare($sql);
		$exe->execute([$parlist[0],$parlist[1]]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectequipa($conn){
		$sql = "SELECT e.equipId,e.equipName,e.description,a.areaName,e.warantyStart,e.warantyEnd,e.status from equipmentmaster e left join areamaster a on e.areaId = a.areaId where e.status=1";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectequipspec($id,$conn){
		$sql = "SELECT e.equipId,e.equipName,e.description,a.areaName,e.warantyStart,e.warantyEnd,e.status from equipmentmaster e left join areamaster a on e.areaId = a.areaId where e.equipId=? and e.status=1";
		$exe=$conn->prepare($sql);
		$exe->execute([$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectequipb($conn){
		$sql = "SELECT e.equipId,e.equipName,e.description,a.areaName,e.warantyStart,e.warantyEnd,e.status from equipmentmaster e left join areamaster a on e.areaId = a.areaId where e.status=0";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectinva($conn){
		$sql = "SELECT * FROM inventorymaster where stockQty>0";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectinvb($conn){
		$sql = "SELECT * FROM inventorymaster where stockQty<=0";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectinvspec($id,$conn){
		$sql = "SELECT * FROM inventorymaster where invId=?";
		$exe=$conn->prepare($sql);
		$exe->execute([$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectchecklista($conn){
		$sql = "SELECT * FROM checklistformatmaster where status=1";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectchecklistb($conn){
		$sql = "SELECT * FROM checklistformatmaster where status=0";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function insertinv($parlist,$conn){
		$sql = "INSERT INTO inventorymaster(invName,invDesc,invCost,stockQty) VALUES (?,?,?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1],$parlist[2],$parlist[3]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function insertdept($parlist,$conn){
		$sql = "INSERT INTO deptmaster(deptname) VALUES (?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function selectwom($conn){
		$sql = "SELECT w.woid,w.woTitle,w.woDesc,w.woType,w.severity,w.deadline,u.employeeName,d.deptName,a.areaName,e.equipName,ws.CurrStatus,wsm.stat FROM workordermaster w left join usermaster u on w.reqUid = u.userNo left join deptmaster d on w.deptId = d.deptId left join areamaster a on w.areaId = a.areaId left join equipmentmaster e on w.eqpId = e.equipId left join workorderstatus ws on ws.woId = w.woid inner join workstatusmaster wsm on ws.CurrStatus = wsm.stcode";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectWo4techs($id,$conn){
		$sql = "SELECT w.woid,w.woTitle,w.woDesc,w.woType,w.severity,w.deadline,u.employeeName,d.deptName,a.areaName,e.equipName,ws.CurrStatus,wsm.stat FROM workordermaster w left join usermaster u on w.reqUid = u.userNo left join deptmaster d on w.deptId = d.deptId left join areamaster a on w.areaId = a.areaId left join equipmentmaster e on w.eqpId = e.equipId left join workorderstatus ws on ws.woId = w.woid inner join workstatusmaster wsm on ws.CurrStatus = wsm.stcode where ws.techId=?";
		$exe=$conn->prepare($sql);
		$exe->execute([$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectWo4adm($uid,$conn){
		$sql = "SELECT wo.*,u.employeeName,e.equipName,ws.CurrStatus FROM workordermaster wo INNER JOIN usermaster u ON wo.reqUid = u.userNo INNER JOIN equipmentmaster e on wo.eqpid = e.equipId INNER JOIN workorderstatus ws on wo.woid = ws.woId WHERE u.deptId = (SELECT deptId FROM usermaster WHERE userNo = ?)";
		$exe=$conn->prepare($sql);
		$exe->execute([$uid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectWo4usr($uid,$conn){
		$sql = "SELECT wo.*,u.employeeName,e.equipName,ws.CurrStatus FROM workordermaster wo INNER JOIN usermaster u ON wo.reqUid = u.userNo INNER JOIN equipmentmaster e on wo.eqpid = e.equipId INNER JOIN workorderstatus ws on wo.woid = ws.woId WHERE wo.reqUid=?";
		$exe=$conn->prepare($sql);
		$exe->execute([$uid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectebya($areaid,$conn){
		$sql = "SELECT equipId,equipName from equipmentmaster where areaId = ? and status=1";
		$exe=$conn->prepare($sql);
		$exe->execute([$areaid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectabyd($deptid,$conn){
		$sql = "SELECT areaId,areaName from areamaster where deptId = ? and status=1";
		$exe=$conn->prepare($sql);
		$exe->execute([$deptid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function insertwom($parlist,$conn){
		$sql = "INSERT INTO workordermaster(woTitle,woDesc,woType,severity,deadline,reqUid,deptId,areaId,eqpid) VALUES (?,?,?,?,?,?,?,?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1],$parlist[2],$parlist[3],$parlist[4],$parlist[5],$parlist[6],$parlist[7],$parlist[8]])){
			  $new_woid=$conn->lastInsertId();
			  $sqln = "INSERT INTO workorderstatus(woId,CurrStatus) VALUES (?,?)";
		      $exen = $conn->prepare($sqln);
			  if($exen->execute([$new_woid,$parlist[9]])){
				  return true;
			  }
			  else{
				  $error = $exen->errorInfo();
			      return($error[2]);
			  }
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function selectpmschedulerec($conn){
		$sql = "SELECT p.pmsId, e.equipName, p.pmsdate FROM pmschedule p inner join equipmentmaster e on p.eqid = e.equipId";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function insertpms($parlist,$conn){
		$sql = "INSERT INTO pmschedule(eqid,pmsdate) VALUES (?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function insertequip($parlist,$conn){
		$sql = "INSERT INTO equipmentmaster(equipName,description,areaId,warantyStart,warantySpan,warantyEnd,warantyDoc,equipDoc) VALUES (?,?,?,?,?,?,?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1],$parlist[2],$parlist[3],$parlist[4],$parlist[5],$parlist[6],$parlist[7]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function selectequipDet($equipid,$conn){
		$sql = "SELECT e.equipId,e.equipName,e.description,a.areaName,e.warantyStart,e.warantyEnd,e.warantySpan,e.warantyDoc,e.equipDoc,e.status from equipmentmaster e left join areamaster a on e.areaId = a.areaId where e.equipId = ?";
		$exe=$conn->prepare($sql);
		$exe->execute([$equipid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectwodet($woid,$conn){
		$sql = "SELECT w.woid,w.woTitle,w.woDesc,w.woType,w.severity,w.deadline,u.employeeName,d.deptName,a.areaName,w.eqpid,e.equipName,ws.CurrStatus,wsm.stat FROM workordermaster w left join usermaster u on w.reqUid = u.userNo left join deptmaster d on w.deptId = d.deptId left join areamaster a on w.areaId = a.areaId left join equipmentmaster e on w.eqpId = e.equipId left join workorderstatus ws on ws.woId = w.woid inner join workstatusmaster wsm on ws.CurrStatus = wsm.stcode where w.woid=?";
		$exe=$conn->prepare($sql);
		$exe->execute([$woid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function updateWardoc($parlist,$conn){
		$sql = "update equipmentmaster set warantyDoc=? where equipId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function updateEqdoc($parlist,$conn){
		$sql = "update equipmentmaster set equipDoc=? where equipId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function insertcheck($parlist,$conn){
		$sql = "INSERT INTO checklistformatmaster(chName,chDoc) VALUES (?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function selectequipcheck($equipid,$conn){
		$sql = "SELECT c.chDoc from checkequipmapping cm inner join checklistformatmaster c on cm.chId = c.chId where cm.equipId=? and c.status=1";
		$exe=$conn->prepare($sql);
		$exe->execute([$equipid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectequipinv($equipid,$conn){
		$sql = "SELECT i.invName from inventorymaster i inner join inveqpmapping im on i.invId = im.invId where im.eqpId=?";
		$exe=$conn->prepare($sql);
		$exe->execute([$equipid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function insertchmap($parlist,$conn){
		$sql = "INSERT INTO checkequipmapping(chId,equipId) VALUES (?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function insertinvmap($parlist,$conn){
		$sql = "INSERT INTO inveqpmapping(invId,eqpId) VALUES (?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function selecttechs($conn){
		$sql = "SELECT t.uid,u.employeeName FROM technicianmaster t inner join usermaster u on t.uid=u.userNo where u.status=1";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function optimalwlc($type,$conn){
		$sql = "SELECT u.employeeName,COUNT(ws.woId) FROM technicianmaster t left join workorderstatus ws on t.uid=ws.techId inner join typemaster tm on t.typeid = tm.typeid inner join usermaster u on t.uid = u.userNo WHERE ws.CurrStatus NOT IN (7, 5, -1) AND tm.type = ? OR ws.techId IS NULL AND tm.type = ? GROUP BY ws.techId HAVING COUNT(ws.woId) < 5 OR COUNT(ws.woId) IS NULL ORDER BY COUNT(ws.woId) ASC";
		$exe=$conn->prepare($sql);
		$exe->execute([$type,$type]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function optimalwcmed($type,$conn){
		$sql = "SELECT u.employeeName,COUNT(ws.woId) FROM technicianmaster t left join workorderstatus ws on t.uid=ws.techId inner join typemaster tm on t.typeid = tm.typeid inner join usermaster u on t.uid = u.userNo WHERE ws.CurrStatus NOT IN (7, 5, -1) AND tm.type = ? OR ws.techId IS NULL AND tm.type = ? GROUP BY ws.techId HAVING COUNT(ws.woId) < 5 OR COUNT(ws.woId) IS NULL ORDER BY COUNT(ws.woId) DESC";
		$exe=$conn->prepare($sql);
		$exe->execute([$type,$type]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function optimalwchi($type,$conn){
		$sql = "SELECT u.employeeName, COUNT(ws.woId) FROM technicianmaster t LEFT JOIN workorderstatus ws ON t.uid = ws.techId INNER JOIN typemaster tm ON t.typeid = tm.typeid INNER JOIN usermaster u ON t.uid = u.userNo WHERE (ws.CurrStatus NOT IN (7, 5, -1) OR ws.CurrStatus IS NULL) AND tm.type = ? GROUP BY t.uid HAVING COUNT(ws.woId) < 5 OR COUNT(ws.woId) IS NULL ORDER BY ( SELECT MAX(CASE WHEN CurrStatus = 7 THEN cnt ELSE 0 END) FROM ( SELECT techId, COUNT(*) AS cnt FROM workorderstatus WHERE CurrStatus = 7 GROUP BY techId ) AS subquery WHERE subquery.techId = t.uid) DESC, COUNT(ws.woId) DESC";
		$exe=$conn->prepare($sql);
		$exe->execute([$type,$type]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function optimalemg($type,$conn){
		$sql = "SELECT u.employeeName, COUNT(ws.woId) AS cnt FROM technicianmaster t INNER JOIN workorderstatus ws ON t.uid = ws.techId INNER JOIN typemaster tm ON t.typeid = tm.typeid INNER JOIN usermaster u ON t.uid = u.userNo WHERE ws.CurrStatus = 7 AND tm.type = ? GROUP BY t.uid ORDER BY cnt DESC LIMIT 1";
		$exe=$conn->prepare($sql);
		$exe->execute([$type,$type]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function unlinkCheck($id,$conn){
		$sql = "delete from checkequipmapping where equipId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function setStatus($id,$st,$conn){
		$sql = "update workorderstatus set CurrStatus=? where woId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$st,$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function setComplete($id,$st,$conn){
		$sql = "update workorderstatus set completionDate=CURRENT_TIMESTAMP,CurrStatus=? where woId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$st,$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function asgnTechnician($id,$uid,$st,$conn){
		$sql = "update workorderstatus set techId=?,assignDate=CURRENT_TIMESTAMP,CurrStatus=? where woId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$uid,$st,$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function selectwqdet($woid,$conn){
		$sql = "SELECT * from workqoutationreqs where woId = ?";
		$exe=$conn->prepare($sql);
		$exe->execute([$woid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectwosdet($woid,$conn){
		$sql = "SELECT u.employeeName,ws.assignDate,ws.completionDate from workorderstatus ws inner join usermaster u on ws.techId = u.userNo where ws.woId = ?";
		$exe=$conn->prepare($sql);
		$exe->execute([$woid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectinvbye($woid,$conn){
		$sql = "SELECT i.invName,i.invId from inveqpmapping im inner join workordermaster w on im.eqpId = w.eqpid inner join inventorymaster i on im.invId = i.invId where w.woId = ?";
		$exe=$conn->prepare($sql);
		$exe->execute([$woid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selectinvlog($woid,$conn){
		$sql = "SELECT i.invName,i.invCost,il.qtyUsed from inventorylog il inner join inventorymaster i on il.invId = i.invId where il.woId = ?";
		$exe=$conn->prepare($sql);
		$exe->execute([$woid]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function insertwq($parlist,$conn){
		$sql = "INSERT INTO workqoutationreqs(wqTitle,wqDesc,analysisRepDoc,woId,estimatedCost) VALUES (?,?,?,?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1],$parlist[2],$parlist[3],$parlist[4]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function insertinvlog($parlist,$conn){
		$sql = "INSERT INTO inventorylog(invId,woId,qtyUsed) VALUES (?,?,?)";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[0],$parlist[1],$parlist[2]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function selecttechnicians($conn){
		$sql = "SELECT u.userNo,u.employeeName,u.employeeId,tm.type,u.status,d.deptName as dept from usermaster u left join deptmaster d on u.deptId = d.deptId left join technicianmaster t on t.uid = u.userNo inner join typemaster tm on t.typeid = tm.typeid  order by u.userNo ASC";
		$exe=$conn->prepare($sql);
		$exe->execute();
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function updatearea($parlist,$conn){
		$sql = "update areamaster set areaName=?,deptId=? where areaId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[1],$parlist[2],$parlist[0]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function updatedept($parlist,$conn){
		$sql = "update deptmaster set deptName=? where deptId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[1],$parlist[0]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function resetpass($parlist,$conn){
		$sql = "update usermaster set password=? where userNo=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[1],$parlist[0]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function updateinv($parlist,$conn){
		$sql = "update inventorymaster set invName=?,invDesc=?,invCost=?,stockQty=?  where invId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[1],$parlist[2],$parlist[3],$parlist[4],$parlist[0]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function updateuser($parlist,$conn){
		$sql = "update usermaster set employeeName=?,employeeId=?,email=?,phoneNo=?,deptId=?  where userNo=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[1],$parlist[2],$parlist[3],$parlist[4],$parlist[5],$parlist[0]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function updateeqp($parlist,$conn){
		$sql = "UPDATE equipmentmaster SET equipName=?,description=?,warantyStart=?,warantySpan=?,warantyEnd=? WHERE equipId=?";
		$exe=$conn->prepare($sql);
		try{
		if($exe->execute([$parlist[1],$parlist[2],$parlist[3],$parlist[4],$parlist[5],$parlist[0]])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
		}
		catch(Exception $e){
			return $e;
		}
	}
	function blockusers($id,$conn){
		$sql = "Update usermaster set status=0 where userNo=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function blockdeptartments($id,$conn){
		$sql = "Update deptmaster set status=0 where deptId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function blockareas($id,$conn){
		$sql = "Update areamaster set status=0 where areaId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function blockchecklists($id,$conn){
		$sql = "Update checklistformatmaster set status=0 where chId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function blockinventory($id,$conn){
		$sql = "Update inventorymaster set status=0 where invId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function blockequipments($id,$conn){
		$sql = "Update equipmentmaster set status=0 where equipId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function unblockusers($id,$conn){
		$sql = "Update usermaster set status=1 where userNo=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function unblockdeptartments($id,$conn){
		$sql = "Update deptmaster set status=1 where deptId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function unblockareas($id,$conn){
		$sql = "Update areamaster set status=1 where areaId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function unblockchecklists($id,$conn){
		$sql = "Update checklistformatmaster set status=1 where chId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function unblockinventory($id,$conn){
		$sql = "Update inventorymaster set status=1 where invId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function unblockequipments($id,$conn){
		$sql = "Update equipmentmaster set status=1 where equipId=?";
		$exe=$conn->prepare($sql);
		if($exe->execute([$id])){
			return true;
		}
		else{
			$error = $exe->errorInfo();
			return($error[2]);
		}
	}
	function selectuserstats($id,$conn){
		$sql = "SELECT
(SELECT COUNT(userNo) FROM usermaster WHERE deptId = (SELECT deptId from usermaster where userNo = ?)) as 'TotalEmp',
(SELECT COUNT(userNo) FROM usermaster WHERE deptId = (SELECT deptId from usermaster where userNo = ?) AND access='Technician') as 'TotalTech', 
(SELECT COUNT(e.equipId) FROM equipmentmaster e inner join areamaster a on e.areaId = a.areaId where a.deptId = (select deptId from usermaster where userNo = ?)) as 'TotalEquips',
(Select Count(woid) from workordermaster where deptId =(select deptId from usermaster where userNo = ?)) as 'TotalWo',
(Select Count(woid) from workordermaster where reqUid=?) as 'YTotalWo',
(Select Count(w.woid) from workordermaster w inner join workorderstatus ws on ws.woId = w.woid where ws.CurrStatus in(1,2,3,4,6,7) and w.reqUid=?) as 'TotalAWo',
(Select Count(w.woid) from workordermaster w inner join workorderstatus ws on ws.woId = w.woid where ws.CurrStatus in(-1,5) and w.reqUid=?) as 'TotalRWo',
(Select Count(w.woid) from workordermaster w inner join workorderstatus ws on ws.woId = w.woid where ws.CurrStatus = 7 and w.reqUid=?) as 'TotalCWo',
(Select Count(woid) from workordermaster where deptId =(select deptId from usermaster where userNo = ?) AND reqUid=? and severity='Emergency') as 'TotalEWo',
(Select Count(woid) from workordermaster) as 'TWo'";		
		$exe=$conn->prepare($sql);
		$exe->execute([$id,$id,$id,$id,$id,$id,$id,$id,$id,$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
	function selecttechstats($id,$conn){
		$sql = "SELECT
(Select Count(woid) from workordermaster) as 'TWo',
(Select Count(woid) from workordermaster where deptId =(select deptId from usermaster where userNo = ?)) as 'TotalWo',
(Select Count(w.woid) from workordermaster w inner join workorderstatus ws on ws.woId = w.woId where ws.techId=?) as 'YTotalWo',
(Select Count(w.woid) from workordermaster w inner join workorderstatus ws on ws.woId = w.woid where ws.CurrStatus in(2,3,4,6) and ws.techId=?) as 'TotalAWo',
(Select Count(w.woid) from workordermaster w inner join workorderstatus ws on ws.woId = w.woid where ws.CurrStatus = 7 and ws.techId=?) as 'TotalCWo',
(Select SUM(TIMESTAMPDIFF(HOUR, assignDate, CompletionDate)) AS 'Total Hours Worked' FROM workorderstatus where techId=?) as 'TotalWh'
";		
		$exe=$conn->prepare($sql);
		$exe->execute([$id,$id,$id,$id,$id]);
		foreach($exe as $row){
			$data[] = $row;
		}
		echo json_encode($data);
	}
}
?>