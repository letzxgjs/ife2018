<?php

// $mobile = $_POST["mobile"];
// $pwd = $_POST["pwd"];
$mobile = $_GET["mobile"];
$pwd = $_GET["pwd"];

$mobileErr = "";
$pwdErr = "";

$response = '{"status":"1", "info":"","data":{"user_id":"1", "token": "285c595717332b49cfb72d1d48a5a962","nick_name": "zxg","avatar": "","mobile":"","sex":""}}';

if($mobile == "13333333333" && $pwd == "123456"){
	echo $response;
}elseif ($mobile == "13333333333" && $pwd != "123456") {
	echo 2;
}
 else {
	echo 3;
}


?>