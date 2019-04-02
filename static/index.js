const chart = new Chartist.Line('.ct-chart', {})

const lines = ["a", "b", "c"]

// Grab all the columns
const columnList = document.querySelector('.control-column ul');
const colorInputs = columnList.children

for (let i = 0, length = colorInputs.length; i < length; i += 1) {
    colorInputs[i].children[0].addEventListener('input', updateLines);
}

// Update the lists to be checked
columnList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
});

// Get the initial chart data
function getChartData(queryString = "?n=2004&n=2005&m=diet&m=gym") {
    axios
        .get("/time_series" + queryString)
        .then(res => {
            let timeSeries = res.data
            console.log(res.data)

            const seriesData = [];
            const series = ["diet", "gym", "finance"]
            for (let i = 0, length = series.length; i < length; i += 1) {
                const currSeries = series[i]

                // Check if the current series exist
                if (typeof res.data[currSeries] !== "undefined") {
                    const data = Object.values(res.data[currSeries])
                    seriesData.push(data)
                }
            }
            
            const chartData = {
                labels: Object.values(res.data.month).map(utc => {
                    const date = new Date(0);
                    date.setUTCMilliseconds(Number(utc))
                    return `${date.getFullYear()}-${date.getMonth()}`
                }),
                series: seriesData,
            }
            chart.update(chartData);
            
            updateLines(columnList.children);
        })
        .catch(err => console.error(err))
}

// Updating the chart data
function updateChart() {
    let queryString;
    const items = columnList.children

    // Get both input fields from the time frame section
    const timeFrames = document.querySelectorAll('.control-date > input')

    // Grab all time ranges
    for (let i = 0, length = timeFrames.length; i < length; i += 1) {
        time = timeFrames[i].value;

        // Start or add to the query string
        if (typeof queryString === "undefined") {
            queryString = "?n=" + time;
        } else {
            queryString += "&n=" + time;
        }
    }

    let currLine = 0;
    // Grab all the checked columns
    for (let i = 0, length = items.length; i < length; i += 1) {
        if (items[i].classList.contains('checked')) {
            queryString += "&m=" + items[i].innerText.toLowerCase();
        }
    }
    
    getChartData(queryString);
}

function updateLines(items) {
    let currLine = 0;
    // Grab all the checked columns
    for (let i = 0, length = items.length; i < length; i += 1) {
        // Only color the checked off lines
        if (items[i].classList.contains('checked')) {
            currentLine = document.querySelector('.ct-series-' + lines[currLine] + ' .ct-line');
            currentPoints = document.querySelectorAll('.ct-series-' + lines[currLine] + ' .ct-point');
            currentLine.style.cssText = "stroke: " + items[i].children[0].value + "!important;";

            for (let j = 0, length = currentPoints.length; j < length; j += 1) {
                currentPoints[j].style.cssText = "stroke: " + items[i].children[0].value + "!important;";
            }
            currLine += 1
        }
    }
}

getChartData();
