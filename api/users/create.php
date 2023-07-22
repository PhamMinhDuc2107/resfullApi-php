<?php 
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: POST');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
   require_once '../../config/db.php';
   require_once '../../model/user.php';
   $db = new Db();
   $modelUser = new Users($db->connection());
   $data = json_decode(file_get_contents('php://input'));
   $modelUser->username = $data->username;   
   $modelUser->password = password_hash($data->password,PASSWORD_DEFAULT);   
   $modelUser->email = $data->email;   
   $modelUser->phone = $data->phone;  
   if($modelUser->create()) {
      echo json_encode(array("message"=>"User Created"));
   } else {
      echo json_encode(array("message"=>"User No Created"));
   }
?>