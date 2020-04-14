const chart = new Chartist.Line(".ct-chart", {});

const lines = ["a", "b", "c"];

// Grab all the columns
const trendList = document.querySelector(".control-column ul");
const trends = trendList.children;

for (let i = 0, length = trends.length; i < length; i += 1) {
  trends[i].children[0].addEventListener("input", function() {
    updateLines(trends);
  });
}

// Add an event listener to all selectable trends.
trendList.addEventListener("click", event => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
  }
});

// Get the initial chart data
function getChartData(queryString = "?years=2004&years=2005&trends=diet&trends=gym") {
  axios
    .get("/time_series" + queryString)
    .then(res => {
      let timeSeries = res.data;

      const series = ["diet", "gym", "finance"];
      const seriesData = [];

      for (let i = 0, length = series.length; i < length; i += 1) {
        const currentSeries = series[i];

        // Ensure that the current series is within the time series.
        if (typeof timeSeries[currentSeries] !== "undefined") {
          const data = Object.values(timeSeries[currentSeries]);
          seriesData.push(data);
        }
      }

      const chartData = {
        labels: Object.values(timeSeries.month).map(datetime => {
          const date = new Date(datetime);
          return `${date.getFullYear()}-${date.getMonth()}`;
        }),
        series: seriesData
      };

      // Update the chart and line colors.
      chart.update(chartData);
      updateLines(trendList.children);
    })
    .catch(err => console.error(err));
}

// Updating the chart data
function updateChart() {
  let queryString;

  // Get both input fields from the time frame section
  const timeFrames = document.querySelectorAll(".control-date > input");

  // Grab all time ranges
  for (let i = 0, length = timeFrames.length; i < length; i += 1) {
    time = timeFrames[i].value;

    // Start or add to the query string
    if (typeof queryString === "undefined") {
      queryString = "?years=" + time;
    } else {
      queryString += "&years=" + time;
    }
  }

  // Grab all the checked columns
  for (let i = 0, length = trends.length; i < length; i += 1) {
    if (trends[i].classList.contains("checked")) {
      queryString += "&trends=" + trends[i].innerText.toLowerCase();
    }
  }

  getChartData(queryString);
}

// Update the lines drawn with the correct colors
function updateLines(items) {
  let lineNumber = 0;
  // Grab all the checked columns
  for (let i = 0, length = items.length; i < length; i += 1) {
    // Only color the checked off lines
    if (items[i].classList.contains("checked")) {
      currentLine = 
          document.querySelector(`.ct-series-${lines[lineNumber]} .ct-line`);
      currentPoints = 
          document.querySelectorAll(`.ct-series-${lines[lineNumber]} .ct-point`);
      currentLine.style.cssText = 
          `stroke: ${items[i].children[0].value} !important;`;

      // Color every point
      for (let j = 0, length = currentPoints.length; j < length; j += 1) {
        currentPoints[j].style.cssText = 
            `stroke: ${items[i].children[0].value} !important;`;
      }
      lineNumber += 1;
    }
  }
}

getChartData();
