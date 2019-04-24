# Visualizing with chartist

## Description
This project is dedicated towards demonstrating the use of plotting data dynamically with chartist.js.
All data is provided by a backend consisting of two routes:

1. Index route for fetching the index page
2. time series route for fetching the appropriate time series data

The backend is built and powered by flask & pandas. (python 3.7.3)

## Goals and Visions
1. To demonstrate using chartist.js for plotting data dynamically via a web application
2. Connect my data science, Frontend web, and Backend web skills together.

## How to Install/run
#### Manually
To get started, download this repository and install all the pip requirements utilizing:
```bash
pip install -r requirements.txt
```

```bash
python3 time_series_pandas_flask.py
```
to run the server which will allow you to access the application on port 5000 in debug mode
and port 3000 in production mode.

#### Via docker
Assuming you have the project cloned locally and are using this for local use...

Create a file called `sentry.env` and within it place (Use your own sentry secret key, and other variables):
```
# OPTIONAL: Include if you're using email
SENTRY_EMAIL_HOST=smtp

SENTRY_POSTGRES_HOST=sentry-postgres
SENTRY_DB_USER=sentry
SENTRY_DB_PASSWORD=sentry
SENTRY_REDIS_HOST=sentry-redis

SENTRY_SECRET_KEY=
```

and if you ARE using email, create an env file with:
```
GMAIL_USERNAME=
GMAIL_PASSWORD=
```

then you can run:
```bash
sh sentry-setup.sh
```

and then when you're done or would like to run it again:
```bash
docker-compose up
```

## Resources
[Chartist.js](https://gionkunz.github.io/chartist-js/)

[Pandas](https://pandas.pydata.org/)

[Flask](http://flask.pocoo.org/) 

