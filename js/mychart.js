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

//Chart1 related
function sendRequestChart1(index, startMonth, endMonth)
{
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return false;
    }
    var url="chart1Helper.php";
    url=url+"?index="+index+"&startMonth="+startMonth+"&endMonth="+endMonth;
    xmlHttp.onreadystatechange=Chart1onReady; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function Chart1onReady() 
{ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        var res = xmlHttp.responseText;
        drawChart1(res);
    } 
}

function drawChart1(x){
    document.getElementById("chart1_container").innerHTML = "<canvas class='ct-chart' id='myChart1' height='250'></canvas>";
    var index = document.getElementById("chooseIndexChart1").value;
    var ndx = x.split("|")[0];
    var gspc = x.split("|")[1];
    if (index == "NDX"){
        var days = [];
        var data = [];
        var ndx_data = ndx.split(";");
        for (var i=0; i<ndx_data.length; i++){
            days.push(ndx_data[i].split(',')[0]);
            data.push(ndx_data[i].split(',')[1]);
        }
        new Chart(document.getElementById("myChart1"), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: "NDX",
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: data,
                    fill: false
                }]
            },
            options: {
                legend: { display: true},
                title: {
                    display: true,
                    text: 'Market Fluctuations of NDX'
                }
            }
        });
    }
    if (index == "GSPC"){
        var days = [];
        var data = [];
        var gspc_data = gspc.split(";");
        for (var i=0; i<gspc_data.length; i++){
            days.push(gspc_data[i].split(',')[0]);
            data.push(gspc_data[i].split(',')[1]);
        }
        new Chart(document.getElementById("myChart1"), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: "GSPC",
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: data,
                    fill: false
                }]
            },
            options: {
                legend: { display: true},
                title: {
                    display: true,
                    text: 'Market Fluctuations of GSPC'
                }
            }
        });
    }
    if (index == "Both"){
        var days = [];
        var data_ndx = [];
        var data_gspc = [];
        
        var ndx_data = ndx.split(";");
        for (var i=0; i<ndx_data.length; i++){
            days.push(ndx_data[i].split(',')[0]);
            data_ndx.push(ndx_data[i].split(',')[1]);
        }
        
        var gspc_data = gspc.split(";");
        for (var i=0; i<gspc_data.length; i++){
            data_gspc.push(gspc_data[i].split(',')[1]);
        }
        new Chart(document.getElementById("myChart1"), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: "NDX",
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: data_ndx,
                    fill: false
                },{
                    label: "GSPC",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: data_gspc,
                    fill: false
                }]
            },
            options: {
                legend: { display: true},
                title: {
                    display: true,
                    text: 'Market Fluctuations of NDX & GSPC'
                }
            }
        });
    }
}

function checkDateChart1(){
    var startMonth = document.getElementById("startMonthChart1").value;
    var endMonth = document.getElementById("endMonthChart1").value;
    if (startMonth == '' && endMonth == ''){
        return true;
    }
    if (startMonth >= endMonth){
        alert("The Start Month must prior to the End Month!");
        document.getElementById("startMonthChart1").focus();
        return false;
    }
    return true;
}

function checkFormChart1(){
    if (checkDateChart1()){
        var index = document.getElementById("chooseIndexChart1").value;
        var startMonth = document.getElementById("startMonthChart1").value;
        var endMonth = document.getElementById("endMonthChart1").value;
        if (startMonth == '' && endMonth == ''){
            alert("Using the default month from 2018-01 to 2018-03!");
            startMonth = "2018-01";
            endMonth = "2018-03";
        }
        sendRequestChart1(index, startMonth, endMonth);
        return true;
    }
}


//Chart2 related
function sendRequestChart2(name, symbol)
{
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return false;
    }
    var url="chart2Helper.php";
    url=url+"?name="+name+"&symbol="+symbol;
    xmlHttp.onreadystatechange=Chart2onReady; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function Chart2onReady() 
{ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        if (xmlHttp.responseText == "error101"){//entered company name does not exist
            alert("The company does not exist in the database! Pleas check again!");
            document.getElementById("companyNameChart2").focus();
            return false;
        }
        if (xmlHttp.responseText == "error102"){//wrong symbol
            alert("The symbol does not exist in the database! Pleas check again!");
            document.getElementById("companySymbolChart2").focus();
            return false;
        }
        if (xmlHttp.responseText == "error103"){//name and symbol not match
            alert("The company name does not match the symbol in the database! Pleas check again!");
            document.getElementById("companySymbolChart2").focus();
            return false;
        }
        if (xmlHttp.responseText == "error104"){//Unknown error
            alert("Something went wrong! Please contact the admin!");
            return false;
        }
        var res = xmlHttp.responseText.split("|");
        drawChart2(res[0].split(","));
        addtable2(res[1]);
    } 
}

function drawChart2(x){
    document.getElementById("chart2_container").innerHTML = "<canvas class='ct-chart' id='myChart2' height='250'></canvas>";
    var s = x[0];
    var m1 = x[1];
    var m2 = x[2];
    var m3 = x[3];
    var ndx1 = x[4];
    var sp1 = x[5];
    var ndx2 = x[6];
    var sp2 = x[7];
    var ndx3 = x[8];
    var sp3 = x[9];
    
    var index = document.getElementById("chooseIndexChart2").value;
    if (index == "NDX")
    {
        new Chart(document.getElementById("myChart2"), {
            type: 'bar',
            data: {
                labels: ["1st Month", "2nd Month", "3rd Month"],
                datasets: [{
                    label: s,
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: [m1, m2, m3],
                    fill: false
                }, {
                    label: "NDX",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: [ndx1, ndx2, ndx3],
                    fill: false
                }, {
                    label: s,
                    type: "bar",
                    backgroundColor: "#FF99FF",
                    data: [m1, m2, m3],
                }, {
                    label: "NDX",
                    type: "bar",
                    backgroundColor: "#00CCFF",
                    data: [ndx1, ndx2, ndx3],
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Short Term Performance for '+s
                },
                legend: { display: true }
            }
        });
    }
    if (index == "GSPC")
    {
        new Chart(document.getElementById("myChart2"), {
            type: 'bar',
            data: {
                labels: ["1st Month", "2nd Month", "3rd Month"],
                datasets: [{
                    label: s,
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: [m1, m2, m3],
                    fill: false
                }, {
                    label: "GSPC",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: [sp1, sp2, sp3],
                    fill: false
                }, {
                    label: s,
                    type: "bar",
                    backgroundColor: "#FF99FF",
                    data: [m1, m2, m3],
                }, {
                    label: "GSPC",
                    type: "bar",
                    backgroundColor: "#00CCFF",
                    data: [sp1, sp2, sp3],
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Short Term Performance for '+s
                },
                legend: { display: true }
            }
        });
    }
    if (index == "Both")
    {
        new Chart(document.getElementById("myChart2"), {
            type: 'bar',
            data: {
                labels: ["1st Month", "2nd Month", "3rd Month"],
                datasets: [{
                    label: s,
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: [m1, m2, m3],
                    fill: false
                },{
                    label: "NDX",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: [ndx1, ndx2, ndx3],
                    fill: false
                },{
                    label: "GSPC",
                    type: "line",
                    borderColor: "#e74c3c",
                    data: [sp1, sp2, sp3],
                    fill: false
                },{
                    label: s,
                    type: "bar",
                    backgroundColor: "#FF99FF",
                    data: [m1, m2, m3],
                },{
                    label: "NDX",
                    type: "bar",
                    backgroundColor: "#00CCFF",
                    data: [ndx1, ndx2, ndx3],
                },{
                    label: "GSPC",
                    type: "bar",
                    backgroundColor: "#FFCC66",
                    data: [sp1, sp2, sp3],
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Short Term Performance for '+s
                },
                legend: { display: true }
            }
        });
    }
}

function addtable2(v){
    document.getElementById("resultTable_container").innerHTML = v;
}

function checkName_SymbolChart2(){
    var companyName = document.getElementById("companyNameChart2").value;
    var companySymbol = document.getElementById("companySymbolChart2").value;
    if (companyName == '' && companySymbol == ''){
        alert("Please enter company name or symbol!");
        document.getElementById("companyNameChart2").value="";
        document.getElementById("companyNameChart2").focus();
        return false;
    }
    return true;
}

function checkFormChart2(){
    if (checkName_SymbolChart2()){
        var companyName = document.getElementById("companyNameChart2").value;
        var companySymbol = document.getElementById("companySymbolChart2").value;
        sendRequestChart2(companyName, companySymbol);
        return true;
    }
}

//Chart3 related
function sendRequestChart3(name, symbol, startMonth, endMonth)
{
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return false;
    }
    var url="chart3Helper.php";
    url=url+"?name="+name+"&symbol="+symbol+"&startMonth="+startMonth+"&endMonth="+endMonth;
    xmlHttp.onreadystatechange=Chart3onReady; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function Chart3onReady() 
{ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    { 
        if (xmlHttp.responseText == "error101"){//entered company name does not exist
            alert("The company does not exist in the database! Pleas check again!");
            document.getElementById("companyNameChart3").focus();
            return false;
        }
        if (xmlHttp.responseText == "error102"){//wrong symbol
            alert("The symbol does not exist in the database! Pleas check again!");
            document.getElementById("companySymbolChart3").focus();
            return false;
        }
        if (xmlHttp.responseText == "error103"){//name and symbol not match
            alert("The company name does not match the symbol in the database! Pleas check again!");
            document.getElementById("companySymbolChart3").focus();
            return false;
        }
        if (xmlHttp.responseText == "error104"){//Unknown error
            alert("Something went wrong! Please contact the admin!");
            return false;
        }
        if (xmlHttp.responseText == "error105"){//No data during this period
            alert("There is no data during entered time period!");
            return false;
        }
        var res = xmlHttp.responseText;
        drawChart3(res);
    } 
}

function drawChart3(x){
    document.getElementById("chart3_container").innerHTML = "<canvas class='ct-chart' id='myChart3' height='250'></canvas>";
    var s = x.split("|")[0];
    var d = x.split("|")[1].split(";");
    var days = [];
    var data = [];
    for (var i=0; i<d.length; i++){
        days.push(d[i].split(',')[0]);
        data.push(d[i].split(',')[1]);
    }
    new Chart(document.getElementById("myChart3"), {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: s,
                type: "line",
                borderColor: "#8e5ea2",
                data: data,
                fill: false
            }]
        },
        options: {
            legend: { display: true},
            title: {
                display: true,
                text: 'Market Fluctuations of NDX'
            }
        }
    });
}

function checkDateChart3(){
    var startMonth = document.getElementById("startMonthChart3").value;
    var endMonth = document.getElementById("endMonthChart3").value;
    if (startMonth == '' && endMonth == ''){
        return true;
    }
    if (startMonth >= endMonth){
        alert("The Start Month must prior to the End Month!");
        document.getElementById("startMonthChart3").focus();
        return false;
    }
    return true;
}

function checkNameChart3(){
    var companyName = document.getElementById("companyNameChart3").value;
    var companySymbol = document.getElementById("companySymbolChart3").value;
    if (companyName == '' && companySymbol == ''){
        alert("Please enter company name or symbol!");
        document.getElementById("companyNameChart3").value="";
        document.getElementById("companyNameChart3").focus();
        return false;
    }
    return true;
}

function checkFormChart3(){
    if (checkDateChart3() && checkNameChart3()){
        var companyName = document.getElementById("companyNameChart3").value;
        var companySymbol = document.getElementById("companySymbolChart3").value;
        var startMonth = document.getElementById("startMonthChart3").value;
        var endMonth = document.getElementById("endMonthChart3").value;
        if (startMonth == '' && endMonth == ''){
            alert("Using the default month from 2018-01 to 2018-03!");
            startMonth = "2018-01";
            endMonth = "2018-03";
        }
        sendRequestChart3(companyName, companySymbol, startMonth, endMonth);
        return true;
    }
}