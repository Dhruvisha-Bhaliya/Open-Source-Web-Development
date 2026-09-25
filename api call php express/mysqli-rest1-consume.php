<?php
//calling api from php backend
//GET ALL

//$url = 'http://localhost/user_module/mysqli-rest1.php';
$url="http://localhost:8000/books";
// $data=file_get_contents($url);
// $arr=json_decode($data,true); //json,associative
// print_r($arr);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPGET, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response_json = curl_exec($ch);
curl_close($ch);
$response=json_decode($response_json, true);
print_r($response);

// GET one
// $url = 'http://localhost/user_module/mysqli-rest1.php?id=1';
// $ch = curl_init($url);
// curl_setopt($ch, CURLOPT_HTTPGET, true);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// $response_json = curl_exec($ch);
// curl_close($ch);
// $response=json_decode($response_json, true);
// print_r($response);

//----- POST INSERT
// $data=array(
//     'name' =>'Television',
//     'price' => 1000,
//     'quantity' => 10,
//     'seller' =>'XYZ Traders'
// );
// $url = 'http://localhost/user_module/mysqli-rest1.php';
// $ch = curl_init($url);
// curl_setopt($ch, CURLOPT_POST, true);
// curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// $response_json = curl_exec($ch);
// curl_close($ch);
// $response=json_decode($response_json, true);
// print_r($response);

//-----------PUT for UPDATE
// $data=array(
//     'name' =>'Laptop',
//     'price' => 1200,
//     'quantity' => 15,
//     'seller' =>'ABC Trading Inc.'
// );
// $url = 'http://localhost/user_module/mysqli-rest1.php?id=3';
// $ch = curl_init($url);
// curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
// curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
// //Generates a URL-encoded query string from the associative (or indexed) array provided.
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// $response_json = curl_exec($ch);
// curl_close($ch);
// $response=json_decode($response_json, true);
// print_r($response);

//DELETE one
// $url = 'http://localhost/user_module/mysqli-rest1.php?id=3';
// $ch = curl_init($url);
// curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// $response_json = curl_exec($ch);
// curl_close($ch);
// $response=json_decode($response_json, true);
// print_r($response);

?>