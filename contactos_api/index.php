<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "config/database.php";
require_once "controllers/ContactosController.php";



$database = new Database();
$db = $database->getConnection();

$controller = new ContactosController($db);

$method = $_SERVER["REQUEST_METHOD"];

$request = $_SERVER["REQUEST_URI"];

$request = str_replace("/contactos_api", "", $request);

$segments = explode("/", trim($request, "/"));

if ($segments[0] === "contactos") {

    if ($method === "GET" && isset($segments[1])) {
        $controller->show($segments[1]);
    }

    elseif ($method === "GET") {
        $controller->index();
    }

    elseif ($method === "POST") {
        $controller->store();
    }

    elseif ($method === "DELETE" && isset($segments[1])) {
        $controller->destroy($segments[1]);
    }

    else {
        echo json_encode(["error" => "Endpoint no encontrado"]);
    }
}