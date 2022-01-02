FROM python:3.8-slim-buster

RUN pip3 install pipenv


WORKDIR /opt/frontend

COPY Pipfile .
COPY Pipfile.lock .
COPY . .

RUN pipenv install --deploy --ignore-pipfile

EXPOSE 5001

CMD ["pipenv", "run", "python", "app.py"]
