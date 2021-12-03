from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
from nlp import analyse
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json
from pathfinder import pathfinder
from stationparser import find_similar_station

class Item(BaseModel):
    trajet: str

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return "COUCOU"

@app.post("/nlp")
def return_trajet(item: Item):
    if item.trajet != "":
        analyseres = analyse(item.trajet)
        print(analyseres)
        #city = pathfinder(analyseres[0], analyseres[1])
        start = "Gare de " + find_similar_station(analyseres[0])
        print(find_similar_station(analyseres[0]))
        end = "Gare de " + find_similar_station(analyseres[1])
        print(start)
        print(end)
        city = pathfinder(start, end)
        return {'result': city}
    else:
        return {'result': "null"}
    
@app.get("/test")
def test():
    print("LA FERME")
    return {'result': "OSKOUR"}