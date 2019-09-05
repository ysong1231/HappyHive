<?php
$name = $_GET["name"];
$symbol =  strtoupper($_GET["symbol"]);

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
    $sql="SELECT * FROM performance where symbol = '$symbol'";
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
    $sql="SELECT * FROM performance where symbol = '$symbol'";
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
            $sql="SELECT * FROM performance where symbol = '$symbol'";
        }
    }
}

$result = mysql_query($sql) or 0;

if ($result == 0 || mysql_num_rows($result) != 1)
{
    echo "error104"; //Unknown error
    mysql_close($con);
    exit;
}

$row = mysql_fetch_array($result);
echo $row['symbol'].",".$row['month_1st_return'].",".$row['month_2nd_return'].",".$row['month_3rd_return'].",".$row['ndx_month_1'].",".$row['gspc_month_1'].",".$row['ndx_month_2'].",".$row['gspc_month_2'].",".$row['ndx_month_3'].",".$row['gspc_month_3']."|";
$ep = $row['ExercisePrice'];
$ts = $row['TotalShareOutstandingbyDate'];
$d = $row['StockOptionPlanAssessedDate'];

//get first open price & open date
$sql="SELECT Date, `Open` FROM $symbol where `Open` != 'null'";
$result = mysql_query($sql) or 0;
$row = mysql_fetch_array($result);
$open = $row["Open"];
$fd = $row["Date"];

//get market & ipo date
$sql="SELECT Company_Name, Market FROM ipo_list where Symbol = '$symbol'";
$result = mysql_query($sql) or 0;
$row = mysql_fetch_array($result);
$name = $row["Company_Name"];
$market = $row["Market"];

if ($ep == ""){
    $islb = '-';
    $ep = '-';
}
elseif ($open > $ep){
    $islb = "Yes";
}
elseif ($open <= $ep){
    $islb = "No";
}

echo "<br><table class='table table-hover'>
        <thead>
            <tr class='bg-info text-white'>
                <th>Company Name</th>
                <th>Symbol</th>
                <th>Market</th> 
                <th>Opening Date</th>
                <th>Opening Price</th>
                <th>Exercise Price</th>
                <th>Is Low Ball</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>$name</td>
                <td>$symbol</td>
                <td>$market</td>
                <td>$fd</td>
                <td>$open</td>
                <td>$ep</td>
                <td>$islb</td>
            </tr>
        </tbody>
    </table>";
mysql_close($con);
?>