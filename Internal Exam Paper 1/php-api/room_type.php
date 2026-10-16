<?php

include "db.php";

if (isset($_POST['save'])) {

    $room_type = $_POST['room_type'];
    $description = $_POST['description'];

    $sql = "INSERT INTO room_types (room_type, description)
            VALUES ('$room_type', '$description')";

    $conn->query($sql);
}

$result = $conn->query("SELECT * FROM room_types");

?>

<!DOCTYPE html>
<html>

<head>
    <title>Room Type Master</title>
</head>

<body>

<h2>Room Type Master</h2>

<form method="POST">

    <label>Room Type:</label>
    <input type="text" name="room_type" required>

    <br><br>

    <label>Description:</label>
    <input type="text" name="description" required>

    <br><br>

    <button type="submit" name="save">
        Save
    </button>

</form>

<hr>

<h3>Room Types</h3>

<table border="1">

<tr>
    <th>ID</th>
    <th>Room Type</th>
    <th>Description</th>
</tr>

<?php while ($row = $result->fetch_assoc()) { ?>

<tr>

    <td>
        <?php echo $row['id']; ?>
    </td>

    <td>
        <?php echo $row['room_type']; ?>
    </td>

    <td>
        <?php echo $row['description']; ?>
    </td>

</tr>

<?php } ?>

</table>

</body>
</html>
