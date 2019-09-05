<?php
$index = $_GET["index"];
$startMonth = $_GET["startMonth"];
$endMonth = $_GET["endMonth"];

$con = mysql_connect('localhost', 'root', '19951231');
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_select_db("happy_hive", $con);

$sql="SELECT * FROM ndx where Date >= '$startMonth' and Date <= '$endMonth'";

$result = mysql_query($sql) or 0;
while($row = mysql_fetch_array($result))
{
    echo $row['Date'] . "," . $row['Close'];
    echo ";";
}
echo "|";

$sql="SELECT * FROM gspc where Date >= '$startMonth' and Date <= '$endMonth'";

$result = mysql_query($sql) or 0;
while($row = mysql_fetch_array($result))
{
    echo $row['Date'] . "," . $row['Close'];
    echo ";";
}

mysql_close($con);
?>