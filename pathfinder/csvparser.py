import csv

timetables = []

with open('timetables.csv', newline='') as f:
    reader = csv.reader(f, delimiter='	', quotechar='|')
    for row in reader:
        cities = row[1].split(' - ')
        time = row[2]
        cities.append(time)
        timetables.append(cities)

print(timetables)