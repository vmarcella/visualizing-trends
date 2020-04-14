"""
    Visualizing diets over the course of time
"""
from functools import reduce

import pandas as pd
from flask import Flask, render_template, request

app = Flask(__name__)

# Attach our dataframe to our app
app.loaded_csv = pd.read_csv("multiTimeline.csv", skiprows=1)
app.loaded_csv.columns = ["month", "diet", "gym", "finance"]


@app.route("/", methods=["GET"])
def get_root():
    """
    Root route that returns the index page
    """
    return render_template("index.html"), 200


@app.route("/time_series", methods=["GET"])
def get_time_series_data():
    """
    Return the necessary data to create a time series
    """
    # Grab the requested years and columns from the query arguments
    range_of_years = [int(year) for year in request.args.getlist("n")]
    trends = request.args.getlist("m")

    # Generate a list of all the months we need to get
    min_year = min(range_of_years)
    max_year = max(range_of_years)
    years_as_str = [str(year) for year in range(min_year, max_year + 1)]

    # Combine the wanted months together.
    wanted_months = reduce(
        lambda a, b: a | b,
        (app.loaded_csv["month"].str.contains(year) for year in years_as_str))

    # Create a new dataframe using the months that we've specified
    sliced_df = app.loaded_csv[wanted_months][["month"] + trends]

    # Convert all string dates into datetime objects and then sort them
    sliced_df["month"] = pd.to_datetime(sliced_df["month"])
    sliced_df = sliced_df.sort_values(by=["month"])

    # Return the dataframe as json
    return sliced_df.to_json(), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
