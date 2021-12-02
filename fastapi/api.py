from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from nlp import analyse
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json

class Item(BaseModel):
    trajet: str

class ResJson(BaseModel):
    result: Optional[str]

app = FastAPI()

@app.get("/")
def home():
    return "COUCOU"

@app.post("/nlp")
def return_trajet(item: Item):
    print(analyse(item.trajet))
    print(type(analyse(item.trajet)))
    
    print(type(analyse(item.trajet)[0]))
    if item.trajet != "":
        analyseres = analyse(item.trajet)
        return {'result': analyseres}
    else: 
        return {'result': "null"}

    
