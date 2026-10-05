<?php

require "mycon.php";

$eno = $_GET['eno'];

$sql = "DELETE FROM employee WHERE eno='$eno'";

$pdo->exec($sql);

echo "Deleted";

?>