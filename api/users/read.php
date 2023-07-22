<?php 
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   require_once '../../config/db.php';
   require_once '../../model/user.php';
   $db = new Db();
   $modelUser = new Users($db->connection());
   $read = $modelUser->read();
   $num = $read->rowCount();
   if($num > 0) {
      $users = [];
      $user['data'] =[];
      while($row = $read->fetch(PDO::FETCH_ASSOC)) {
         extract($row);
         $user_item = array(
            "id"=>$id,
            "username"=>$username,
            "password"=>$password,
            "phone"=>$phone,
            "email"=>$email,
         );
         array_push($user['data'],$user_item);
      }
      echo json_encode($user);  
   }
?>