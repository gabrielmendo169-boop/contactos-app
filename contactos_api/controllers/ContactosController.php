<?php
require_once __DIR__ .  "/../models/Contactos.php";

class ContactosController {
    
    private $contacto;

    public function __construct($db){
        $this->contacto = new Contactos($db);
    }


    public function index(){
        $data = $this->contacto->getAll();
        echo json_encode($data);
    }

    public function store(){
        $data = json_decode(file_get_contents("php://input"), true);

       if (
            empty($data["nombre"]) ||
            empty($data["email"]) ||
            empty($data["telefono"])
       ) {
        http_response_code(400);
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        return;
       }

       if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" =>"El email ingresado no es válido"]);
        return;
       }

       if (!preg_match("/^[0-9]{10,}$/", $data["telefono"])) {
        http_response_code(400);
        echo json_encode(["error" => "El número de teléfono no es válido"]);
        return;
       }

        $nombre = $data["nombre"];
        $email = $data["email"];
        $telefono = $data["telefono"];

        $this->contacto->create($nombre, $email, $telefono);
        http_response_code(201);
        echo json_encode(["message" =>"Contacto creado correctamente!"]);
    }

    public function destroy($id){
        $result = $this->contacto->delete($id);

        if ($result) {
            http_response_code(200);
            echo json_encode([
                "message" => "Contacto eliminado correctamente",
                "deleted" => true
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "error" => "Contacto no encontrado"
            ]);
        }
    }

    
    public function show($id){
        $contacto = $this->contacto->getById($id);

        if (!$contacto){
            http_response_code(404);
            echo json_encode(["error" => "Contacto no creado"]);
            return;
        }

        echo json_encode($contacto);
    }

   
}