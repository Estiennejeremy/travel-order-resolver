from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from nlp import analyse

app = FastAPI()

@app.get("/")
def home():
    return "COUCOU"

@app.post("/nlp")
def return_trajet(trajet: str):
    print(trajet)
    if trajet != "":
        return nlp(trajet)
    else: return {"null"}


def nlp(trajet):
    return analyse(trajet)
    