<?php
$name = $_GET["name"];
$symbol =  strtoupper($_GET["symbol"]);
$startMonth = $_GET["startMonth"];
$endMonth = $_GET["endMonth"];

$con = mysql_connect('localhost', 'root', '19951231');
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_select_db("happy_hive", $con);

if ($symbol == "" && $name != "")
{
    $sql="Select symbol from ipo_list where trim(replace(company_name,' ','')) like trim(replace('%$name%',' ',''))";
    $result = mysql_query($sql) or 0;
    if ($result == 0 || mysql_num_rows($result) < 1)
    {
        echo "error101"; //entered company name does not exist
        mysql_close($con);
        exit;
    }
    $row = mysql_fetch_assoc($result);
    $symbol = $row['symbol'];
}
elseif ($symbol != "" && $name == "")
{
    $sql="SELECT * FROM ipo_list where Symbol = '$symbol'";
    $result = mysql_query($sql) or 0;
    if ($result == 0 || mysql_num_rows($result) < 1)
    {
        echo "error102"; //Wrong Symbol
        mysql_close($con);
        exit;
    }
}
elseif ($symbol != "" && $name != "")
{
    $sql="Select symbol from ipo_list where trim(replace(company_name,' ','')) like trim(replace('%$name%',' ',''))";
    $result = mysql_query($sql) or 0;
    if ($result == 0 || mysql_num_rows($result) < 1)
    {
        echo "error101"; //entered company name does not exist
        mysql_close($con);
        exit;
    }
    else
    {
        $row = mysql_fetch_assoc($result);
        if ($symbol != $row['symbol']){
            echo "error103"; //company name and symbol does not match
            mysql_close($con);
            exit;
        }
    }
}

$sql="SELECT * FROM $symbol where Date >= '$startMonth' and Date <= '$endMonth'";
$result = mysql_query($sql) or 0;

if ($result == 0 || mysql_num_rows($result) < 1)
{
    echo "error105"; //No data during this period.
    mysql_close($con);
    exit;
}

echo $symbol . "|";
while($row = mysql_fetch_array($result))
{
    echo $row['Date'] . "," . $row['Close'];
    echo ";";
}

mysql_close($con);
?>