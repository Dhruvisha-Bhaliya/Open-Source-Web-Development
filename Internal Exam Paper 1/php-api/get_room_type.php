<?php

include "db.php";

$result = $conn->query("SELECT id, room_type, description FROM room_types");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);