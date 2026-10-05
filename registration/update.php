<?php

require "mycon.php";

$eno = $_GET['eno'];

if (isset($_POST['update'])) {

    $ename = $_POST['ename'];
    $edept = $_POST['edept'];
    $salary = $_POST['salary'];
    $birth_date = $_POST['birth_date'];
    $joining_date = $_POST['joining_date'];

    $sql = "UPDATE employee SET
            ename='$ename',
            edept='$edept',
            salary='$salary',
            birth_date='$birth_date',
            joining_date='$joining_date'
            WHERE eno='$eno'";

    $pdo->exec($sql);

    echo "Updated Successfully";
    header("Location:insert.php");
}

$result = $pdo->query("SELECT * FROM employee WHERE eno='$eno'");

$data = $result->fetch();

?>

<!DOCTYPE html>
<html>

<head>
    <title>Update Employee</title>
</head>

<body>

    <h2>Update Employee</h2>

    <form method="POST">

        Name:
        <input type="text" name="ename" value="<?php echo $data[1]; ?>">
        <br><br>

        Department:
        <input type="text" name="edept" value="<?php echo $data[2]; ?>">
        <br><br>

        Salary:
        <input type="number" name="salary" value="<?php echo $data[3]; ?>">
        <br><br>

        Birth Date:
        <input type="date" name="birth_date" value="<?php echo $data[4]; ?>">
        <br><br>

        Joining Date:
        <input type="date" name="joining_date" value="<?php echo $data[5]; ?>">
        <br><br>

        <input type="submit" name="update" value="Update Employee">

    </form>

</body>

</html>