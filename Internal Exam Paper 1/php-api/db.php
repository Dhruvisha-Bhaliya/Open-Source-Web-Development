<?php

$conn = new mysqli(
    "localhost",
    "root",
    "Dhruvi",
    "hotel_db"
);

if ($conn->connect_error) {
    die("Database connection failed");
}

?>
