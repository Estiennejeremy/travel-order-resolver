# ITOR

herbergement : https://api.damned-i-am-lost.com/ et https://search.damned-i-am-lost.com/

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

## Project structure

```
├── dataset                         # Test files
├── fastapi                         # API of the project
│   ├── api.py                      # Entry point of the api
│   ├── csvparser.py                # Parse the timetables dataset
│   ├── dataset.csv                 # Test phrases dataset
│   ├── Dockerfile                  # fastapi dockerfile (optional!)
│   ├── nlp.ipynb                   # Notebook from the nlp
│   ├── nlp.py                      # NLP computation
│   ├── pathfinder.py               # Implementation of the Dijkstra algorithm on pathfinder
│   ├── requirements.txt            # Python packages
│   ├── stationparser.py            # Methods to determine stations from cities
│   └── timetables.csv              # Stations distances dataset for the pathfinder
└── travel-order-resolver-front
    ├── package.json                # Node modules dependencies
    ├── public                      # Static files served by the react app
    ├── README.md                   
    ├── src                         # React app source files
    │   ├── App.tsx                 # Entrypoint of the data processed by the nlp
    │   ├── components              # Components of the user interface
    │   ├── Hooks                   # Voice processing methods
    ├── tsconfig.json               # Typescript compiler options
├── README.md
├── requirements.txt                # Python packages
