<?php
class Database {
  function getConnection() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "contactos_db";
    $conn = null;
    
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname;", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e){
        die ("Connection failed: " . $e->getMessage());
       
    }
     return $conn;
  }
}