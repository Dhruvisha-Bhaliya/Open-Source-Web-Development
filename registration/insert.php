<?php

require "mycon.php";

if (isset($_POST['submit'])) {
    $eno = $_POST['eno'];
    $ename = $_POST['ename'];
    $edept = $_POST['edept'];
    $salary = $_POST['salary'];
    $birth_date = $_POST['birth_date'];
    $joining_date = $_POST['joining_date'];

    $sql = "INSERT INTO employee (eno,ename,edept,salary,birth_date,joining_date) VALUES
    ('$eno','$ename','$edept','$salary','$birth_date','$joining_date')";

    $pdo->exec($sql);

    echo "Inserted Success";
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
</head>

<body>
    <h2>Employee form</h2>

    <form method="POST">

        Employee No:
        <input type="number" name="eno"><br><br>

        Name:
        <input type="text" name="ename"><br><br>

        Department:
        <input type="text" name="edept"><br><br>

        Salary:
        <input type="number" name="salary"><br><br>

        Birth Date:
        <input type="date" name="birth_date"><br><br>

        Joining Date:
        <input type="date" name="joining_date"><br><br>

        <input type="submit" name="submit" value="Insert Employee">

    </form>
</body>

</html>

<?php

$result = $pdo->query("SELECT * FROM employee");
$data = $result->fetchAll();

?>

<table border="1">
    <tr>
        <th>No</th>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Birth Date</th>
        <th>Joining Date</th>
        <th>Action</th>
    </tr>

    <?php for ($i = 0; $i < count($data); $i++) { ?>
        <tr>
            <td><?php echo $data[$i][0]; ?></td>
            <td><?php echo $data[$i][1]; ?></td>
            <td><?php echo $data[$i][2]; ?></td>
            <td><?php echo $data[$i][3]; ?></td>
            <td><?php echo $data[$i][4]; ?></td>
            <td><?php echo $data[$i][5]; ?></td>
            <td>
                <a href="update.php?eno=<?php echo $data[$i][0]; ?>">Update</a>
                <a href="delete.php?eno=<?php echo $data[$i][0]; ?>">Delete</a>
            </td>
        </tr>
    <?php } ?>
</table>