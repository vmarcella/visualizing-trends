let timeSeries;

function getChartData() {
    axios
        .get('/time_series?n=2004&n=2005&m=diet&m=gym')
        .then(res => {
            timeSeries = res.data
            console.log(res.data)
            const chartData = {
                labels: Object.values(res.data.month).map(utc => {
                    const date = new Date(0);
                    date.setUTCMilliseconds(Number(utc))
                    return `${date.getFullYear()}-${date.getMonth()}`
                }),
                series:[
                    Object.values(res.data.diet),
                    Object.values(res.data.gym),
                ]
            }
            new Chartist.Line('.ct-chart', chartData);
        })
        .catch(err => console.error(err))
}

getChartData();
