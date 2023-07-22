<?php 
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   require_once '../../config/db.php';
   require_once '../../model/user.php';
   $db = new Db();
   $modelUser = new Users($db->connection());
   if(!isset($_GET['id'])) {
      die();
   }
   $user = $modelUser->show($_GET['id']);
   if(!$user) return die();
   extract($user);
   $user_item = array(
      "username"=>$username,
      "password"=>$password,
      "phone"=>$phone,
      "email"=>$email,
   );
   echo json_encode($user_item); 
?>