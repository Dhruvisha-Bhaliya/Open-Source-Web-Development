<?php

$url = "http://localhost:7000/";

$data = array(
    "name"=> "Python Programming",
    "price" => 550,
    "quantity" => 20
);

$ch = curl_init($url);

curl_setopt(
    $ch,
    CURLOPT_POST,
    true
);

curl_setopt(
    $ch,
    CURLOPT_POSTFIELDS,
    http_build_query($data)
);

curl_setopt(
    $ch,
    CURLOPT_RETURNTRANSFER,
    true
);

$response_json = curl_exec($ch);

if($response_json === false){
    die(
        "cURL Error: " .
        curl_error($ch)
    );
}

curl_close($ch);

$response = json_decode(
    $response_json,
    true
);

echo "<pre>";
print_r($response);
echo "</pre>";

?>