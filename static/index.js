const chart = new Chartist.Line('.ct-chart', {})

// Grab all the columns
const columnList = document.querySelector('.control-column > ul');

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
            chart.update(chartData)
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

    // Grab all the checked columns
    for (let i = 0, length = items.length; i < length; i += 1) {
        if (items[i].classList.contains('checked')) {
            console.log(items[i].textContent)
            queryString += "&m=" + items[i].textContent.toLowerCase()
        }
    }
    
    getChartData(queryString);
}

getChartData();
