

let cities = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Montpellier",
    "Strasbourg",
    "Bordeaux",
    "Lille",
    "Rennes",
    "Reims",
    "Toulon",
    "Saint-Étienne",
    "Le Havre",
    "Grenoble",
    "Dijon",
    "Angers",
    "Villeurbanne",
    "Saint-Denis",
    "Nîmes",
    "Clermont-Ferrand",
    "Le Mans",
    "Aix-en-Provence",
    "Brest",
    "Tours",
    "Amiens",
    "Limoges",
    "Annecy",
    "Boulogne-Billancourt",
    "Perpignan",
    "Besançon",
    "Metz",
    "Orléans",
    "Saint-Denis",
    "Rouen",
    "Argenteuil",
    "Montreuil",
    "Mulhouse",
    "Caen",
    "Nancy",
    "Saint-Paul",
    "Roubaix",
    "Tourcoing",
    "Nanterre",
    "Vitry-sur-Seine",
    "Nouméa",
    "Créteil",
    "Avignon",
    "Poitiers",
    "Aubervilliers",
    "Dunkerque",
    "Aulnay-sous-Bois",
    "Colombes",
    "Asnières-sur-Seine",
    "Versailles",
    "Saint-Pierre",
    "Courbevoie",
    "Le Tampon",
    "Cherbourg-en-Cotentin",
    "Fort-de-France",
    "Rueil-Malmaison",
    "Béziers",
    "Champigny-sur-Marne",
    "Pau",
    "La Rochelle",
    "Saint-Maur-des-Fossés",
    "Cannes",
    "Calais",
    "Antibes",
    "Drancy",
    "Mamoudzou",
    "Ajaccio",
    "Mérignac",
    "Saint-Nazaire",
    "Colmar",
    "Issy-les-Moulineaux",
    "Noisy-le-Grand",
    "Évry-Courcouronnes",
    "Vénissieux",
    "Cergy",
    "Levallois-Perret",
    "Valence",
    "Bourges",
    "Pessac",
    "Cayenne",
    "Ivry-sur-Seine",
    "Quimper",
    "La Seyne-sur-Mer",
    "Antony",
    "Villeneuve-d'Ascq",
    "Clichy",
    "Troyes",
    "Montauban",
    "Neuilly-sur-Seine",
    "Pantin",
    "Niort",
    "Chambéry",
    "Sarcelles",
    "Le Blanc-Mesnil",
    "Lorient",
    "Saint-André",
    "Beauvais",
    "Maisons-Alfort",
    "Meaux",
    "Narbonne",
    "Chelles",
    "Hyères",
    "Villejuif",
    "Épinay-sur-Seine",
    "La Roche-sur-Yon",
    "Bobigny",
    "Cholet",
    "Bondy",
    "Saint-Quentin",
    "Fréjus",
    "Saint-Louis",
    "Vannes",
    "Les Abymes",
    "Clamart",
    "Sartrouville",
    "Fontenay-sous-Bois",
    "Cagnes-sur-Mer",
    "Bayonne",
    "Sevran",
    "Arles",
    "Corbeil-Essonnes",
    "Vaulx-en-Velin",
    "Saint-Ouen-sur-Seine",
    "Massy",
    "Vincennes",
    "Laval",
    "Albi",
    "Grasse",
    "Suresnes",
    "Montrouge",
    "Martigues",
    "Bastia",
    "Gennevilliers",
    "Aubagne",
    "Belfort",
    "Évreux",
    "Brive-la-Gaillarde",
    "Carcassonne",
    "Saint-Priest",
    "Saint-Malo",
    "Charleville-Mézières",
    "Saint-Herblain",
    "Choisy-le-Roi",
    "Rosny-sous-Bois",
    "Blois",
    "Meudon",
    "Saint-Laurent-du-Maroni",
    "Salon-de-Provence",
    "Livry-Gargan",
    "Puteaux",
    "Chalon-sur-Saône",
    "Saint-Germain-en-Laye",
    "Les Sables-d'Olonne",
    "Alfortville",
    "Châlons-en-Champagne",
    "Mantes-la-Jolie",
    "Noisy-le-Sec",
    "Saint-Brieuc",
    "La Courneuve",
    "Sète",
    "Châteauroux",
    "Istres",
    "Valenciennes",
    "Garges-lès-Gonesse",
    "Caluire-et-Cuire",
    "Talence",
    "Tarbes",
    "Rezé",
    "Bron",
    "Castres",
    "Angoulême",
    "Arras",
    "Le Cannet",
    "Bourg-en-Bresse",
    "Wattrelos",
    "Bagneux",
    "Alès",
    "Boulogne-sur-Mer",
    "Le Lamentin",
    "Gap",
    "Compiègne",
    "Thionville",
    "Melun",
    "Douai",
    "Gagny",
    "Anglet",
    "Montélimar",
    "Draguignan",
    "Colomiers",
    "Stains",
    "Marcq-en-Barœul",
    "Chartres",
    "Saint-Martin-d'Hères",
    "Poissy",
    "Joué-lès-Tours",
    "Pontault-Combault",
    "Saint-Joseph",
    "Villepinte",
    "Saint-Benoît",
    "Châtillon",
    "Franconville",
    "Échirolles",
    "Savigny-sur-Orge",
    "Villefranche-sur-Saône",
    "Annemasse",
    "Tremblay-en-France",
    "Sainte-Geneviève-des-Bois",
    "Dumbéa",
    "Creil",
    "Neuilly-sur-Marne",
    "Conflans-Sainte-Honorine",
    "Saint-Raphaël",
    "Palaiseau",
    "Bagnolet",
    "La Ciotat",
    "Villenave-d'Ornon",
    "Thonon-les-Bains",
    "Athis-Mons",
    "Saint-Chamond",
    "Montluçon",
    "Haguenau",
    "Auxerre",
    "Villeneuve-Saint-Georges",
    "Saint-Leu",
    "Châtenay-Malabry",
    "Meyzieu",
    "Saint-Martin",
    "Roanne",
    "Mâcon",
    "Le Perreux-sur-Marne",
    "Six-Fours-les-Plages",
    "Le Port",
    "Nevers",
    "Sainte-Marie",
    "Romans-sur-Isère",
    "Vitrolles",
    "Schiltigheim",
    "Agen",
    "Les Mureaux",
    "Matoury",
    "Nogent-sur-Marne",
    "Marignane",
    "La Possession",
    "Montigny-le-Bretonneux",
    "Cambrai",
    "Houilles",
    "Épinal",
    "Koungou",
    "Trappes",
    "Châtellerault",
    "Lens",
    "Saint-Médard-en-Jalles",
    "Vigneux-sur-Seine",
    "Pontoise",
    "L'Haÿ-les-Roses",
    "Le Chesnay-Rocquencourt",
    "Baie-Mahault",
    "Plaisir",
    "Cachan",
    "Pierrefitte-sur-Seine",
    "Malakoff",
    "Viry-Châtillon",
    "Dreux",
    "Goussainville",
    "Bezons",
    "Liévin",
    "Rillieux-la-Pape",
    "Chatou",
    "Menton",
    "Herblay-sur-Seine",
    "Périgueux",
    "Charenton-le-Pont",
    "Saint-Cloud",
    "Vandœuvre-lès-Nancy",
    "Villemomble",
    "Le Bignon-Mirabeau",
    "Cordes sur Ciel"
];

let start_phrase_beginning = [
    "Je suis de",
    "J'aimerais partir de",
    "Je souhaite partie de",
    "J'aimerais trouver un train en provenance de",
    "Je souhaite trouver un train en provenance de",
];

let dest_phrase_ending_v1 = [
    "et j'aimerais aller en direction de",
    "et je souhaite aller en direction de",
    "et j'aimerai me rendre à",
    "et je souhaite me rendre à",
    "et j'aimerai aller à",
    "et je souhaite aller à",
    "en direction de",
    "en destination de",
    "vers",
    "pour vister",
    "pour atterrir à",
    "pour voyager à",
    "pour découvrir",
    "pour me rendre",
    "pour aller à"
];

let dest_phrase_beginning = [
    "Je souhaite arriver à",
    "J'aimerais arriver à",
    "Je souhaite aller à",
    "J'aimerais aller à",
    "Je souhaite aller vers",
    "J'aimerais aller vers",
    "Je souhaite atterrir à",
    "J'aimerais atterrir à",
    "Je souhaite visiter",
    "J'aimerais visiter",
    "Je souhaite découvrir",
    "J'aimerais découvrir",
    "Je souhaite voyager à",
    "J'aimerais voyager à",
    "Je souhaite me rendre à",
    "J'aimerais me rendre à",
    "Je ne trouve pas de train en direction de"
];

let start_phrase_ending = [
    "en passant par",
    "en provenance de",
    "en partant de",
    "à partir de",
    "depuis"
];

let trap_phrase = [
    "Je paris que tu ne trouveras pas ou je veux aller,",
]

let two_choices = ["start_phrase_beginning", "dest_phrase_beginning"]

// Get random value from array
let random = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};

// Generate random phrase
let generate_random_phrase = () => {

    let start_city = random(cities);
    let dest_city = random(cities);

    // avoid miss match
    while (start_city == dest_city) dest_city = random(cities);

    if (two_choices.random == "start_phrase_beginning") {
        let beginning_phrase = random(start_phrase_beginning);
        let ending_phrase = random(start_phrase_beginning);

        // avoid miss match
        while (beginning_phrase == "Je suis de" && !ending_phrase.includes("et")) ending_phrase = random(start_phrase_beginning);

        return {
            phrase: `${beginning_phrase} ${start_city} ${ending_phrase} ${dest_city}`,
            start: start_city,
            destination: dest_city
        }
    }
    else {
        let beginning_phrase = random(dest_phrase_beginning);
        let ending_phrase = random(start_phrase_ending);

        return {
            phrase: `${beginning_phrase} ${dest_city} ${ending_phrase} ${start_city}`,
            start: start_city,
            destination: dest_city
        }
    }
}

let generateArray = (number) => {
    let phrases = [];
    for (let index = 0; index < number; index++) {
        phrases.push(generate_random_phrase())
    }

    return phrases;
};


var objectToCSVRow = function (dataObject) {
    var dataArray = new Array;
    for (var o in dataObject) {
        var innerValue = dataObject[o] === null ? '' : dataObject[o].toString();
        var result = innerValue.replace(/"/g, '""');
        result = '"' + result + '"';
        dataArray.push(result);
    }
    return dataArray.join(' ') + '\r\n';
}

let exportToCSV = function (arrayOfObjects) {

    if (!arrayOfObjects.length) {
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";

    // headers
    csvContent += objectToCSVRow(Object.keys(arrayOfObjects[0]));

    arrayOfObjects.forEach(function (item) {
        csvContent += objectToCSVRow(item);
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dataset.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        let phrases = generateArray(e.target[0].value);

        if (e.target[1].checked) exportToCSV(phrases);

        document.getElementById("phrases").innerHTML = "";
        phrases.forEach((phrase) => {
            let p = document.createElement("p");
            p.innerText = phrase.phrase;
            document.getElementById("phrases").appendChild(p);
        })
    })
});