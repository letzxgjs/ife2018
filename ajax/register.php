<?php 

$mobile = $_POST['mobile'];
$pwd = $_POST['pwd'];
$code = $_POST['code'];


$response = '{
       "status":"1",
       "info":"",
       "data":{
        	"user_id": "1",
        	"token": "285c595717332b49cfb72d1d48a5a962",
        	"nick_name": "",
        	"avatar": "",
        	"mobile":"",
        	"sex":""
       }
    }';
if ($mobile == "13333333333" && $pwd == "123456" && $code == "123456") {
// if ($mobile == "13333333333" && $code == "123456") {

	echo $response;
}else {

};


 ?>