//Grouped bar Chart
function drawGroupedBarChart(){
    document.getElementById("staticChart_container").innerHTML = "<canvas class='ct-chart' id='staticChart' height='250'></canvas>";
    new Chart(document.getElementById("staticChart"), {
        type: 'bar',
        data: {
            labels: ["~ -40%", "-40% ~ -30%", "-30% ~ -20%", "-20% ~ -10%", "-10% ~ 0%",
                    "0% ~ 10%", "10% ~ 20%", "20% ~ 30%", "30% ~ 40%", "40% ~"],
            datasets: [
                {
                    label: "1st month",
                    backgroundColor: "#3e95cd",
                    data: [8, 12, 24, 38, 58, 56, 16, 12, 9, 20]
                }, {
                    label: "2nd month",
                    backgroundColor: "#8e5ea2",
                    data: [26,11, 27, 36, 30, 59, 15, 15, 10, 24]
                }, {
                    label: "3rd month",
                    backgroundColor: "#3cba9f",
                    data: [31, 16, 17, 22, 44, 49, 10, 9, 9, 29]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Distribution of Total Return for First Three Month'
            }
        }
    });
}

//Pie chart1
function drawPieChart(){
    document.getElementById("staticChart_container").innerHTML = "<canvas class='ct-chart' id='staticChart' height='250'></canvas>";
    new Chart(document.getElementById("staticChart"), {
        type: 'pie',
        data: {
            labels: ["With Stock Option Plan", "Without Stock Option Plan"],
            datasets: [{
                //label: "Proportion of Offering Stock Option Plan",
                backgroundColor: ["#3e95cd", "#8e5ea2"],
                data: [99, 158]
            }]
        },
        options: {
            title: {
                display: true,
                text: "Proportion of Offering Stock Option Plan"
            }
        }
    });
}

//drawGroupedBarChart();
//drawPieChart();