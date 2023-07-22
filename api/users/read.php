<?php 
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   require_once '../../config/db.php';
   require_once '../../model/user.php';
   $db = new Db();
   $modelUser = new Users($db->connection());
   $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
   $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
   $modelUser->page = $page;
   $modelUser->limit = $limit;
   $read = $modelUser->read();
   $num = $read->rowCount();
   $totalRecord = $modelUser->totalRecords();
   if($num > 0) {
      $user = [
         'totalRecords' => $totalRecord,
         'limit'=>$modelUser->limit,
      ];
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