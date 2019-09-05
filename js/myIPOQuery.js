var xmlHttp;

function GetXmlHttpObject()
{
    var xmlHttp=null;
    try
    {
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (e)
    {
        //Internet Explorer
        try
        {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function do_Query(name, symbol, startMonth, endMonth, market)
{
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return false;
    }
    var url = "IPOQueryHelper.php?" + "name=" + name + "&symbol=" + symbol + "&startMonth=" + startMonth + "&endMonth=" + endMonth + "&market=" + market;
    xmlHttp.onreadystatechange=showQueryResult; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function showQueryResult()
{
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        if (xmlHttp.responseText == "error101"){//entered company name does not exist
            alert("The company does not exist in the database! Pleas check again!");
            document.getElementById("companyName").focus();
            return false;
        }
        if (xmlHttp.responseText == "error102"){//wrong symbol
            alert("The symbol does not exist in the database! Pleas check again!");
            document.getElementById("companySymbol").focus();
            return false;
        }
        if (xmlHttp.responseText == "error103"){//name and symbol not match
            alert("The company name does not match the symbol in the database! Pleas check again!");
            document.getElementById("companySymbol").focus();
            return false;
        }
        var res = xmlHttp.responseText;
        document.getElementById("query_result").innerHTML = res;
        return true;
    } 
}

function checkForm()
{
    var companyName = document.getElementById("companyName").value;
    var companySymbol = document.getElementById("companySymbol").value;
    var startMonth = document.getElementById("startMonth").value;
    var endMonth = document.getElementById("endMonth").value;
    var market = document.getElementById("market").value;
    if (companyName != "" || companySymbol != "")
    {
        do_Query(companyName, companySymbol, startMonth, endMonth, market);
        return true;
    }
    else
    {
        if (startMonth == "" && endMonth == "")
        {
            do_Query(companyName, companySymbol, startMonth, endMonth, market);
            return true;
        }
        else
        {
            if (startMonth == ""){
                alert("Please enter start month!");
                document.getElementById("startMonth").focus();
                return false;
            }
            if (endMonth == ""){
                alert("Please enter end month!");
                document.getElementById("endMonth").focus();
                return false;
            }
            if (endMonth <= startMonth){
                alert("Start Month must prior to End Month!");
                document.getElementById("endMonth").focus();
                return false;
            }
            do_Query(companyName, companySymbol, startMonth, endMonth, market);
            return true;
        }
    }
}