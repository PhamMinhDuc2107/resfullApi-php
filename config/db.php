<?php 
class Db 
{
   protected $servername = 'localhost';
   protected $dbname = "restfullApi-php";
   protected $username = "root";
   protected $password = "";
   function Connection() {
      try{
         $conn = new PDO("mysql:host =$this->servername;dbname=$this->dbname",$this->username, $this->password);
         $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
         return $conn;
      } catch(Exception $error) {
         echo "Kết nối thất bại". $error->getMessage();
      }
   }
} 
?>