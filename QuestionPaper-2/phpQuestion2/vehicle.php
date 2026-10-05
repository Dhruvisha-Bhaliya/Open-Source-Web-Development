<!DOCTYPE html>
<html>
<head>
    <title>Vehicle Registration</title>
</head>
<body>
    <h2>Vehicle Registration</h2>
    <form method="POST">
        Vehicle Name:
        <input type="text" name="vehicleName" required>
        <br><br>

        Vehicle Type:
        <input type="text" name="vehicleType" required>
        <br><br>

        Price:
        <input type="number" name="price" required>
        <br><br>

        <input type="submit" name="submit" value="Save Vehicle">
    </form>

<?php

$url = "http://localhost:5000/api/vehicles";

// ================= INSERT =================

if (isset($_POST["submit"])) {
    $data = [
        "vehicleName" => $_POST["vehicleName"],
        "vehicleType" => $_POST["vehicleType"],
        "price" => $_POST["price"]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    echo "<h3>POST Response</h3>";
    echo $response;
}


// ================= DISPLAY =================

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$vehicles = json_decode($response, true);

echo "<h2>Vehicle Data</h2>";

echo "<table border='1'>";

echo "<tr>";
echo "<th>Vehicle Name</th>";
echo "<th>Vehicle Type</th>";
echo "<th>Price</th>";
echo "</tr>";

foreach ($vehicles as $vehicle) {

    echo "<tr>";
    echo "<td>" . $vehicle["vehicleName"] . "</td>";
    echo "<td>" . $vehicle["vehicleType"] . "</td>";
    echo "<td>" . $vehicle["price"] . "</td>";
    echo "</tr>";
}
echo "</table>";

?>
</body>
</html>