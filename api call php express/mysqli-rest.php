<?php
header("content-type: application/json");
$req_method=$_SERVER["REQUEST_METHOD"];

$mysqli = new mysqli("localhost", "root", "", "student_db");

switch($req_method)
{
    case "GET":
        if(isset($_GET["id"]))
        {
            $query="SELECT * FROM people WHERE id=".$_GET["id"];
            $row=mysqli_query($mysqli,$query);
            $obj = mysqli_fetch_array($row);
            echo json_encode($obj);
            exit();    
        }
        else
        {
            $query="SELECT * FROM people";
            $rows=mysqli_query($mysqli,$query);
            while($obj = mysqli_fetch_array($rows)) {
                $objs[] = $obj;
                }
            echo json_encode($objs);
            exit();    
        }
        break;
    case "POST":
        $query = "INSERT INTO people (name,address,phone) VALUES 
        ('".$_POST['name']."','".$_POST["address"]."',".$_POST["phone"] .")";
        $row=mysqli_query($mysqli,$query);
        echo json_encode($row);
        exit();
        break;
    case "PUT":
        $query="UPDATE people SET ".
		" name='". $_POST['name'] ."', ".
		" address='". $_POST['address'] ."', ".
		" phone=". $_POST['phone'] .
        " WHERE id=".$_GET["id"];
        $row=mysqli_query($mysqli,$query);
        echo json_encode($row);
        exit();
        break;
    case "DELETE":
        $query="DELETE from people WHERE id=".$_GET["id"];
        $row=mysqli_query($mysqli,$query);
        echo json_encode($row);
        exit();
        break;
}


?>