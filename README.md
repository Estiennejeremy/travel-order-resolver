# ITOR

## Manual install

### Backend :

    $ cd fastapi

Install dependencies :

    $ pip3 install fastapi
    $ pip3 install uvicorn
    $ pip3 numpy
    $ pip3 spacy
    $ pip3 pydantic

Launch fastapi :

    $ python3 -m uvicorn api:app --reload

Backend ip adress : 127.0.0.1:8000 or localhost:8000

### Frontend

    $ cd travel-order-resolver-front

Install dependencies :

    $ yarn
    or
    $ npm install

Lauch frontend :

    $ yarn start

Frontend ip adress : 127.0.0.1:3000 or localhost:3000
