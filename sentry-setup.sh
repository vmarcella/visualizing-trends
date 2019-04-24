#!/bin/bash

# Generate a random secret key and put it into the environment variable file
sed -i "$ s/$/$(docker-compose run --rm sentry-base sentry config generate-secret-key)/" sentry.env

# Run database migrations (build the database)
docker-compose run --rm sentry-base sentry upgrade --noinput

# Startup the whole service
docker-compose up -d
