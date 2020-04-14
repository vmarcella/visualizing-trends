FROM python:3.7.5-slim-buster
WORKDIR /code
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
RUN apt-get update \
    && apt-get install -y gcc python3-dev python-pandas
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["flask", "run"]
