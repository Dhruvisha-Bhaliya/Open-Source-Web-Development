<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee Management</title>
</head>
<body>

<?php
$url = "http://localhost:5000/api/employees";

// 1. SAVE DATA (INSERT OR UPDATE)
if (isset($_POST["save"])) {
    $data = [
        "name"       => $_POST["name"],
        "email"      => $_POST["email"],
        "department" => $_POST["department"]
    ];

    if (!empty($_POST["edit_id"])) {
        // UPDATE (PUT)
        $ch = curl_init($url . "/" . $_POST["edit_id"]);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    } else {
        // INSERT (POST)
        $data["password"] = $_POST["password"];
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
    }

    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);

    header("Location: display.php");
    exit();
}

// 2. DELETE EMPLOYEE
if (isset($_GET["delete"])) {
    $ch = curl_init($url . "/" . $_GET["delete"]);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);

    header("Location: display.php");
    exit();
}

// 3. FETCH ALL EMPLOYEES
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$employees = json_decode($response, true);

// 4. FIND SELECTED EMPLOYEE FOR EDITING
$edit_employee = null;
$is_editing = isset($_GET["edit"]);

if ($is_editing && !empty($employees)) {
    foreach ($employees as $emp) {
        if ($emp["_id"] == $_GET["edit"]) {
            $edit_employee = $emp;
            break;
        }
    }
}
?>

<!-- FORM SECTION AT TOP -->
<h2><?php echo $is_editing ? "Update Employee" : "Register Employee"; ?></h2>

<form method="POST" action="display.php">
    <input type="hidden" name="edit_id" value="<?php echo $_GET["edit"] ?? ''; ?>">

    Name: 
    <input type="text" name="name" value="<?php echo $edit_employee["name"] ?? ''; ?>" required>
    <br><br>

    Email: 
    <input type="email" name="email" value="<?php echo $edit_employee["email"] ?? ''; ?>" required>
    <br><br>

    <?php if (!$is_editing): ?>
        Password: 
        <input type="password" name="password" required>
        <br><br>
    <?php endif; ?>

    Department: 
    <input type="text" name="department" value="<?php echo $edit_employee["department"] ?? ''; ?>" required>
    <br><br>

    <input type="submit" name="save" value="<?php echo $is_editing ? "Update" : "Register"; ?>">
    
    <?php if ($is_editing): ?>
        <a href="display.php">Cancel</a>
    <?php endif; ?>
</form>

<hr>

<!-- DISPLAY LIST BELOW -->
<h2>Employee List</h2>
<?php
if (!empty($employees) && is_array($employees)) {
    foreach ($employees as $emp) {
        echo "Name: " . $emp["name"] . "<br>";
        echo "Email: " . $emp["email"] . "<br>";
        echo "Department: " . $emp["department"] . "<br>";
        echo "<a href='?delete=" . $emp["_id"] . "'>Delete</a> | ";
        echo "<a href='?edit=" . $emp["_id"] . "'>Update</a>";
        echo "<hr>";
    }
}
?>

</body>
</html>