<?php

$pdo = new PDO(
    "mysql:host=localhost;dbname=test;charset=utf8mb4",
    "root",
    "Dhruvi"
);

$pdo->exec("USE test");

echo "Database Connected";

?>