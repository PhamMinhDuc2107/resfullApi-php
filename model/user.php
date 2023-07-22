<?php 
   class Users {
      protected $conn;
      public $username;
      public $password;
      public $phone;
      public $email;
      public $id;
      public $page;
      public $limit;
      function __construct($db) {
         $this->conn = $db;
      }
      public function read() {
         $startFrom = ($this->page - 1) * $this->limit;
         $query = "SELECT * FROM users ORDER BY id ASC LIMIT :i, :b";
         $stmt = $this->conn->prepare($query);
         $stmt->bindParam(":i", $startFrom, PDO::PARAM_INT);
         $stmt->bindParam(":b", $this->limit, PDO::PARAM_INT);
         $stmt->execute();
         return $stmt;
      }
      public function totalRecords() {
         $query = "SELECT COUNT(*) FROM users";
         $stmt = $this->conn->prepare($query);
         $stmt->execute();
         $result = $stmt->fetch(PDO::FETCH_ASSOC);
         return $result;
      }
      public function show($id) {
         $query = "SELECT * FROM users WHERE id=:id";
         $stmt = $this->conn->prepare($query);
         $stmt->bindParam(":id", $id);
         $stmt->execute();
         $row = $stmt->fetch(PDO::FETCH_ASSOC);
         return $row;
      }
      public function create() {
         $query = "INSERT INTO users SET username = :username, password = :password, phone=:phone,email=:email ";
         $stmt = $this->conn->prepare($query);
         $this->username = htmlspecialchars(strip_tags($this->username));
         $this->password = htmlspecialchars(strip_tags($this->password));
         $this->email = htmlspecialchars(strip_tags($this->email));
         $this->phone = htmlspecialchars(strip_tags($this->phone));
         $stmt->bindParam(':username', $this->username);
         $stmt->bindParam(':password', $this->password);
         $stmt->bindParam(':phone', $this->phone);
         $stmt->bindParam(':email', $this->email);
         if($stmt->execute()) {
            return true;
         }
         printf("Errors $stmt->error");
         return false;
      }
      public function update() {
         $query = "UPDATE users SET username = :username, password = :password, phone=:phone,email=:email WHERE id=:id";
         $stmt = $this->conn->prepare($query);
         $this->username = htmlspecialchars(strip_tags($this->username));
         $this->password = htmlspecialchars(strip_tags($this->password));
         $this->email = htmlspecialchars(strip_tags($this->email));
         $this->phone = htmlspecialchars(strip_tags($this->phone));
         $stmt->bindParam(':username', $this->username);
         $stmt->bindParam(':password', $this->password);
         $stmt->bindParam(':phone', $this->phone);
         $stmt->bindParam(':email', $this->email);
         $stmt->bindParam(':id', $this->id);
         if($stmt->execute()) {
            return true;
         }
         printf("Errors $stmt->error");
         return false;
      }
      public function delete() {
         $query = "DELETE FROM users WHERE id=:id";
         $stmt = $this->conn->prepare($query);
         $stmt->bindParam(":id", $this->id);
         if($stmt->execute()) {
            return true;
         }
         return false;
      }
   }

?>