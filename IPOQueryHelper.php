<?php
$name = $_GET["name"];
$symbol =  strtoupper($_GET["symbol"]);
$startMonth = $_GET["startMonth"];
$endMonth = $_GET["endMonth"];
$market = $_GET["market"];

$con = mysql_connect('localhost', 'root', '19951231');
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }

mysql_select_db("happy_hive", $con);

if ($symbol == "" && $name != "")
{
    $sql="Select * from ipo_list where trim(replace(company_name,' ','')) like trim(replace('%$name%',' ',''))";
    $result = mysql_query($sql) or 0;
    if ($result == 0 || mysql_num_rows($result) < 1)
    {
        echo "error101"; //entered company name does not exist
        mysql_close($con);
        exit;
    }
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
        else
        {
            $sql="SELECT * FROM ipo_list where Symbol = '$symbol'";
        }
    }
}
elseif ($symbol == "" && $name == "")
{
    if ($startMonth == "" && $endMonth == "")
    {
        if ($market == "All")
        {
            $sql="SELECT * FROM ipo_list";
        }
        elseif ($market == "NASDAQ" || $market == "NYSE")
        {
            $sql="SELECT * FROM ipo_list where Market = '$market'";
        }
        else
        {
            $sql="SELECT * FROM ipo_list where trim(replace(Market,' ','')) like trim(replace('%$market%',' ',''))";
        }
    }
    else
    {
        if ($market == "All")
        {
            $sql="SELECT * FROM ipo_list where Date_Priced >= '$startMonth' and Date_Priced <= '$endMonth'";
        }
        elseif ($market == "NASDAQ" || $market == "NYSE")
        {
            $sql="SELECT * FROM ipo_list where Date_Priced >= '$startMonth' and Date_Priced <= '$endMonth' and Market = '$market'";
        }
        else
        {
            $sql="SELECT * FROM ipo_list where Date_Priced >= '$startMonth' and Date_Priced <= '$endMonth' and trim(replace(Market,' ','')) like trim(replace('%$market%',' ',''))";
        }
    }
}

$result = mysql_query($sql) or 0;
if ($result == 0 || mysql_num_rows($result) < 1)
{
    echo "<br><center stylr='width:100%'><b>No record matches the query conditions!</b></center>";
    mysql_close($con);
    exit;
}

while($row = mysql_fetch_array($result))
{
    $Pdate = substr($row['Date_Priced'],0,10);
    echo "<tr><td>" . $row['Company_Name'] . "</td><td>" . $row['Symbol']. "</td><td>" . $row['Market']. "</td><td>$" . $row['IPO_Price']. "</td><td>" . $row['Shares']. "</td><td>" . $row['Offer_Amount']. "</td><td>" . $Pdate . "</td></tr>";
}
mysql_close($con);

?>