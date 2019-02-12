<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
$hostname="91.216.107.161";
$username="bello597007"; //write your username
$password="ZdyA4GTV"; //write your password
$db_name="bello597007_22mnjr"; //write your db name
$conn = mysqli_connect($hostname,$username,$password, $db_name);
mysqli_set_charset($conn, "utf8");
$id = $_GET['idcarte'];
$codebase = "SELECT * FROM tellmymenu_carte WHERE code_carte =$id";
$res_codebase = $conn->query($codebase);
while ($nb = mysqli_fetch_object($res_codebase)) {
  $carte = $nb->donnees_carte;
}
//echo json_encode($carte);
echo $carte;
?>
