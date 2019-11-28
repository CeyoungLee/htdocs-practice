<?php
  $conn = mysqli_connect("localhost","root","aa1234"); //접속된 정보를 변수에 담기
  mysqli_select_db($conn, 'opentutorials'); //접속정보변수를 전달, db이름
  $result =mysqli_query ($conn,'SELECT * FROM topic');
   ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="http://localhost/css/main.css">
    <title></title>
  </head>
  <body id='target'>
    <header>
      <h1>
        <a href="http://localhost/index.php">JavaScript</a>
        <img src="https://media.glassdoor.com/sqll/1129143/dgf-squarelogo-1455280913850.png" alt="">
      </h1>
    </header>
    <nav>
      <ol>
      <?php
        while($row = mysqli_fetch_assoc($result)){
          echo '<li><a href="http://localhost/index.php?id='.$row['id'].'">'.$row['title'].'</a></li>'."\n";
          echo "<br />";
        }
       ?>
      </ol>
    </nav>
    <div id="control">
      <input type="button" value="white" onclick="document.getElementById('target').className='white'">
      <input type="button" value="black" onclick="document.getElementById('target').className='black'">
      <a href="http://localhost/write.php">쓰기</a>
    </div>
    <article>
      <?php
      if(!empty($_GET['id'])){
          $sql = 'SELECT * FROM topic WHERE id='.$_GET['id'];
          $result = mysqli_query($conn,$sql);
          $row = mysqli_fetch_assoc($result);
          echo '<h2>'.$row['title'].'</h2>';
          echo $row['description'];
        }
      ?>
    </article>
  </body>
</html>
