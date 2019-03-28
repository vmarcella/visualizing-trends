'''
    Visualizing diets over the course of time
'''
from functools import reduce
from flask import Flask, request, jsonify, render_template
import matplotlib.pyplot as plt
import pandas as pd


# curl curl "http://0.0.0.0:3000/?n=2004&n=2005&m=diet&m=gym"
# https://www.datacamp.com/community/tutorials/time-series-analysis-tutorial

app = Flask(__name__)

# Attach our dataframe to our app
app.df = pd.read_csv('multiTimeline.csv', skiprows=1)
app.df.columns = ['month', 'diet', 'gym', 'finance']
print(app.df)

# df_new = df[(df['month'].str.contains('2005'))][['month', 'diet']]

# df_new = df[(reduce(lambda a, b: a | b, (df['month'].str.contains(s) for s in ['2004', '2005'])))][['month', 'diet']]
#
# print(df_new)
#
# df_new['month'] = pd.to_datetime(df_new['month'])
# df_new = df_new.sort_values(by=['month'])
# print(df_new)
# plt.plot(df_new['month'], df_new['diet'])
# plt.show()
# print(df_new.to_json())
# print(df_new.to_html())


@app.route('/', methods=['GET'])
def get_root():
    '''
        Root route that returns the index page
    '''
    return render_template('index.html'), 200

@app.route('/data', methods=['GET'])
def get_data():
    '''
        Grab data specified via query parameters to fill out our chart data
    '''
    ls_year = request.args.getlist('n')
    ls_col = request.args.getlist('m')

    df_new = app.df[(reduce(lambda a, b: a | b, (app.df['month'].str.contains(s) for s in ls_year)))][['month'] + ls_col]

    df_new['month'] = pd.to_datetime(df_new['month'])
    df_new = df_new.sort_values(by=['month'])

    return jsonify(df_new.to_json()), 200



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
