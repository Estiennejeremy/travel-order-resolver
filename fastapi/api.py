from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def home():
    return {"data":"Test"}

@app.post("/nlp")
def return_trajet(trajet: str):
    print(trajet)
    if trajet != "":
        return nlp(trajet)
    else: return {"null"}


def nlp(trajet):
    trip = []
    return trajet
