from csvparser import timetables
import difflib
import re

# FIND UNIQUE CITIES
uniquecities = []
for row in timetables:
    if row[0] not in uniquecities:
        uniquecities.append(row[0].replace("Gare de ", ""))
    if row[1] not in uniquecities:
        uniquecities.append(row[1].replace("Gare de ", ""))
uniquecities = set(uniquecities)
        
# find most similar word in array
def find_similar_station(city):
    for uniquecity in uniquecities:
        if uniquecity.find(city) != -1:
            my_regex = r"^" + re.escape(city) + r"\b"
            if re.search(my_regex, uniquecity, re.IGNORECASE):
                print(uniquecity)
                return uniquecity        
    #return difflib.get_close_matches(city, uniquecities)


def find_stations_from_city(city):
    my_regex = r"^" + re.escape(city) + r"\b"
    stations_from_city = []
    for uniquecity in uniquecities:
        if uniquecity.find(city) != -1:
            if re.search(my_regex, uniquecity, re.IGNORECASE):
                stations_from_city.append(uniquecity)
    return stations_from_city

#print(find_stations_from_city("Paris"))