<?php

$apiUrl = "http://localhost:3000/api/products";


// POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = [
        "name" => $_POST['name'],
        "price" => $_POST['price'],
        "quantity" => $_POST['quantity']
    ];

    $ch = curl_init($apiUrl);

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    echo json_decode($response, true)['message'];

    curl_close($ch);
}


// GET
$ch = curl_init($apiUrl);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

$data = json_decode($response, true);

$products = $data['data'];

curl_close($ch);


// Calculate total
$total = 0;

foreach ($products as $product) {
    $total += $product['price'] * $product['quantity'];
}

?>

<!DOCTYPE html>
<html>

<head>
    <title>Product Client</title>
</head>

<body>

<h2>Add Product</h2>

<form method="POST">

    <input type="text" name="name" placeholder="Product Name" required>

    <input type="number" name="price" placeholder="Price" required>

    <input type="number" name="quantity" placeholder="Quantity" required>

    <button type="submit">Add</button>

</form>


<h2>Products</h2>

<table border="1">

<tr>
    <th>Name</th>
    <th>Price</th>
    <th>Quantity</th>
</tr>

<?php foreach ($products as $product): ?>

<tr>

    <td><?php echo $product['name']; ?></td>

    <td><?php echo $product['price']; ?></td>

    <td><?php echo $product['quantity']; ?></td>

</tr>

<?php endforeach; ?>

</table>


<h3>Total Stock Value: <?php echo $total; ?></h3>

</body>

</html>