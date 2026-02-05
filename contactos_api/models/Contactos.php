<?php
class Contactos {
    private $conn; 

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll(){

    $sql = "SELECT * FROM contactos";

    $stmt = $this->conn->prepare($sql);

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($nombre, $email, $telefono){
    
    $sql = "INSERT INTO contactos (nombre, email, telefono)
            VALUES (:nombre, :email, :telefono)";

    $stmt = $this->conn->prepare($sql);

    $stmt->execute([
        ":nombre" => $nombre,
        ":email" => $email,
        ":telefono" => $telefono
    ]);

    return $this->conn->lastInsertId();
    }

    public function delete($id){
    
    $sql = "DELETE FROM contactos WHERE id = :id";

    $stmt = $this->conn->prepare($sql);

    $stmt->rowCount();

    $stmt->execute([
        ":id" =>$id
    ]);

    if ($stmt->rowCount() > 0) {
        return true;
       } else {
            return false;
        }
    }

    public function getById($id){
    
    $sql = "SELECT * FROM contactos WHERE id = :id";

    $stmt = $this->conn->prepare($sql);

    $stmt->execute([":id" => $id]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}