from array import array
from pprint import pprint
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
from nlp import analyse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json
from pathfinder import pathfinder
from stationparser import find_similar_station
from stationparser import find_stations_from_city

class Item(BaseModel):
    trajet: str



class Results(BaseModel):
    sentence: str
    result: list

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    'https://search.damned-i-am-lost.com'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
        trajet = [] 
        allCity = [] 
        finalPath = []
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
        
            for i in range(len(analyseres)): 
                allCity.append(find_stations_from_city(analyseres[i])) 
                print("Find similar start station : ", find_stations_from_city(analyseres[i]))
                if len(allCity) > 1: 
                    print("-------------------BETWEEN---------------------------")
                    print(allCity[i-1], allCity[i])
                    trajet.append(find_shortest_path_between_cities(allCity[i-1], allCity[i])["crossed_stations"]) 
                   
            
            for list in trajet:
                for t in list:
                    if( len(finalPath) < 1 or t != finalPath[len(finalPath)-1]):
                        finalPath.append(t)
            print("++++++++++++++++++++++++++++++++++++++++++++++++++++")
            print(finalPath)
            print("++++++++++++++++++++++++++++++++++++++++++++++++++++")

            return {'result': finalPath}
        else:
            raise HTTPException(status_code=204, detail="Item not found")    
    except:
        raise HTTPException(status_code=204, detail="Item not found")
    
    
def find_shortest_path_between_cities(start_cities, end_cities):
    results = []
    for start_city in start_cities:
        for end_city in end_cities:
            start = start_city
            end = end_city
            pathfinder_result = pathfinder(start, end)
            results.append(pathfinder_result)
    results.sort(key=lambda x: x["distance"])
    print("find_shortest_path_between_cities()")
    print(results)
    return results[0]

@app.post("/nlpMulti")
def multiNlp(items: list):
    results = []
    try:
        if(items!= []):
            for item in items:
                obj = Item(trajet = item)
                print(obj)
                test = return_trajet(obj)
                print('===================================================')
                print(test["result"])
                res = Results(sentence = item, result = test["result"])
                results.append(res)

            return {'result': results}
        else:
            raise HTTPException(status_code=204, detail="Item not found")    
    except:
        raise HTTPException(status_code=204, detail="Item not found")