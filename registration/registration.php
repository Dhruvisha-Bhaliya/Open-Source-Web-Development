<?php
require_once('connection.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    try {        
        $sql = "INSERT INTO employee (eno, ename, edept, salary, birth_date, joining_date)
                VALUES (:eno, :ename, :edept, :salary, :birth_date, :joining_date)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':eno' => $_POST['eno'],
            ':ename' => $_POST['ename'],
            ':edept' => $_POST['edept'],
            ':salary' => $_POST['salary'],
            ':birth_date' => $_POST['birth_date'],
            ':joining_date' => $_POST['joining_date']
        ]);
        $message = "Employee inserted successfully!";
    } catch (PDOException $e) {
        $message = "Error: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Insert Employee</title>
</head>
<body>
    <h2>Employee Registration Form</h2>

    <?php if (!empty($message)): ?>
        <p style="color:green;"><?php echo htmlspecialchars($message); ?></p>
    <?php endif; ?>

    <form method="post" action="">
        <label>Employee No:</label>
        <input type="number" name="eno" required><br><br>

        <label>Name:</label>
        <input type="text" name="ename" required><br><br>

        <label>Department:</label>
        <input type="text" name="edept"><br><br>

        <label>Salary:</label>
        <input type="number" step="0.01" name="salary"><br><br>

        <label>Birth Date:</label>
        <input type="date" name="birth_date"><br><br>

        <label>Joining Date:</label>
        <input type="date" name="joining_date"><br><br>

        <input type="submit" value="Insert Employee">
    </form>
</body>
</html>
