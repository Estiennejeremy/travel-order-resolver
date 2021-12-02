from fastapi import FastAPI
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