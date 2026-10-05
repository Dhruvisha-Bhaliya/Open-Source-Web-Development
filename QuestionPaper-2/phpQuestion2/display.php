<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Registration</title>
</head>
<body>
    <h2>Employee Registration</h2>
    <form method="POST">
       Name:
       <input type="text" name="name" required>
       <br><br>

       Email:
       <input type="email" name="email" required>
       <br><br>

       password:
       <input type="password" name="password" required>
       <br><br>

       Department:
       <input type="department" name="department" required>
       <br><br>

       <input type="submit" name="submit" value="Register">

    </form>
<?php

$url = "http://localhost:5000/api/employees";

    if(isset($_POST["submit"])){

$data = [
    "name"=>$_POST["name"],
    "email"=>$_POST["email"],
    "password"=>$_POST["password"],
    "department"=>$_POST["department"]
];

$ch = curl_init($url);

curl_setopt($ch,CURLOPT_POST,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($data));

curl_setopt($ch,CURLOPT_HTTPHEADER,[
    "Content-Type:application/json"
]);

curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

$response = curl_exec($ch);
curl_close($ch);

echo "<h2>POST Response</h2>";
echo $response;

    }


if(isset($_GET["delete"])){
    $id = $_GET["delete"];
    $ch = curl_init($url."/".$id);

    curl_setopt($ch,CURLOPT_CUSTOMREQUEST,"DELETE");
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

    $response = curl_exec($ch);
    curl_close($ch);
    echo "<h3>$response</h3>";
}

$ch = curl_init($url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
$response = curl_exec($ch);
curl_close($ch);
$employees = json_decode($response,true);

echo "<h2>Employee Data</h2>";

foreach($employees as $employee){
    echo "Name:".$employee["name"]."<br>";
    echo "Email:".$employee["email"]."<br>";
    echo "Department:".$employee["department"]."<br>";
    echo "<a href='?delete=".$employee["_id"]."'>Delete</a>";
    echo "|";
    echo "<hr>";

}
    ?>
</body>
</html>
