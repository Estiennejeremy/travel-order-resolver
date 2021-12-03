from fastapi import FastAPI, HTTPException
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
    try:
        if item.trajet != "":
            print("-----------------------------------------------------")
            print(item.trajet)
            
            print("-----------------------------------------------------")
            print("NLP PROCESSING...")
            analyseres = analyse(item.trajet)
            print(analyseres)
            
            print("-----------------------------------------------------")
            print("Find similar start station : " + find_similar_station(analyseres[0]))
            print("Find similar end station : " + find_similar_station(analyseres[1]))
            print(find_similar_station(analyseres[0]))
            print(find_similar_station(analyseres[1]))
            start = "Gare de " + find_similar_station(analyseres[0])
            end = "Gare de " + find_similar_station(analyseres[1])
        
            print("-----------------------------------------------------")
            print("Recomposition of station")
            print(start)
            print(end)
            print("-----------------------------------------------------")
            city = pathfinder(start, end)
            return {'result': city}
        else:
            raise HTTPException(status_code=204, detail="Item not found")    
    except:
        raise HTTPException(status_code=204, detail="Item not found")