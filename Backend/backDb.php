<?php
header('Access-Control-Allow-Origin : http://'.$_SERVER['HTTP_HOST'].':3000');
$db = "pms";
$toDay = date('dmY');
exec("mysqldump --user='root' --password='' --host='localhost' $db > C://wamp/www/Backend/Backups/".$toDay."_DBbak.sql");
$data=array("es"=>"success","res"=>"Database Backedup SuccessFully");
echo json_encode($data);
?>