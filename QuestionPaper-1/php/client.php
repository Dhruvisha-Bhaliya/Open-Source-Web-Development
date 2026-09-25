<?php

$url = "http://localhost:3000/api/students";

$data = [
    "name"=>"Rahul",
    "email"=>"rahul@gmail.com",
    "password"=>"1234"
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

$ch = curl_init($url);

curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

$response = curl_exec($ch);

curl_close($ch);

$students = json_decode($response,true);

echo "<h2>Student Data</h2>";

foreach ($students as $student){
    echo "Name: " . $student["name"] . "<br>";
    echo "Email: " . $student["email"] . "<br><br>";
}

?>