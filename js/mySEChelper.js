function submitQuery() 
{
  	if (checkName()){
        xmlHttp=GetXmlHttpObject();
        if (xmlHttp==null)
        {
            alert ("Browser does not support HTTP Request");
            return false;
        }
        var url="SEChelper.php";
        url=url+formPostdata()
        xmlHttp.onreadystatechange=showResults; 
        xmlHttp.open("GET",url,true);
        xmlHttp.send(null);
        
    } else {
        return false;
    }
}

function formPostdata(){
    var name = document.queryInfo.cname.value;
    //var name = document.getElementById("cname").value
    name = name.replace(/\ /g, "_" );
    var kw = document.queryInfo.kw.value;
    if (kw == ""){
        kw = "options,exercise_price,$";
    }
    else{
        kw = kw.replace(/\ /g, "_" );
    }
    var startDate = document.queryInfo.startdate.value;
    if (startDate == ""){
        startDate = "None";
    }
    var endDate = document.queryInfo.enddate.value;
    if (endDate == ""){
        endDate = "None";
    }
    return "?cname="+name+"&kw="+kw+"&startdate="+startDate+"&enddate="+endDate;
} 

function checkName()
{
    var name = document.queryInfo.cname.value;
	if (name=="") {
		alert ("Please type in company name.");
		document.queryInfo.cname.focus();
		return false;
	} 
	return true;
}

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

function showResults(){
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        
        var res = xmlHttp.responseText;
        document.getElementById("QresultContainer").innerHTML = res;
    } 
}