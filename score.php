<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

// ذخیره در دیتابیس (اینجا نمونه ساده با فایل)
file_put_contents("scores.json", json_encode($data));

echo json_encode(["status" => "success"]);
?>
