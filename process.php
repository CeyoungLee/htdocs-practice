<?php
$conn = mysqli_connect("localhost","root","aa1234"); //접속된 정보를 변수에 담기
mysqli_select_db($conn, 'opentutorials'); //접속정보변수를 전달, db이름 지정
$sql = "INSERT INTO topic (title,description,author,created) VALUES('".$_POST['title']."', '".$_POST['description']."', '".$_POST['author']."', now())";
$result = mysqli_query($conn, $sql);
header('Location: http://localhost/index.php');
?>
