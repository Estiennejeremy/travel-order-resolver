# -*- coding: utf-8 -*-
"""Bootstrap IA.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1d1f7FkMFp53fYfeskB7oXD4jhaGbr9eg

# Getting the data sets
"""

from os import listdir
from os.path import isfile, join


mypath = "/content/drive/MyDrive/Colab Notebooks/discours/"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

# Read one file
filename = '/content/drive/MyDrive/Colab Notebooks/discours/Alain_Madelin_702.txt'
file = open(filename, 'r')
data = file.read()
# separate each words
spliteddata = data.split()


# creation of discoursarray
discoursarray = []
for i in range(len(onlyfiles)):
  dicts = {}
  name = onlyfiles[i]
  thedata = open(mypath + name, 'r').read()

  object = {"filenames": name, "data": thedata}

  discoursarray.append(object)



#print(dics)
for i in range(len(discoursarray)):
  print(discoursarray[i]["filenames"]+": "+ discoursarray[i]["data"][:40])

"""# From raw text to vector - tf-idf"""

from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import Pipeline
import numpy as np
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

# Stop words french list
french_stopwords_list = set(stopwords.words('french'))
print(french_stopwords_list)

# Corpus (only text)
corpus = []
for discours in discoursarray :
  corpus.append(discours["data"])

# Cleaning vocabulary - https://pythonexamples.org/python-find-unique-words-in-text-file/
vocabulary = []
for text in corpus:
  text = text.lower()
  words = text.split()
  words = [word.strip('.,!;()[]:?*-"') for word in words]
  vocabulary.append(words)

# Get unique vocabulary
unique = []
for word in words:
    if word not in unique:
        unique.append(word)
#sort
unique.sort()

#print
print(unique)


vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)
#vocabulary = vectorizer.get_feature_names()
#print(vectorizer.get_feature_names())
#print(X.toarray())

pipe = Pipeline([('count', CountVectorizer(vocabulary=unique, stop_words=french_stopwords_list)),('tfid', TfidfTransformer())]).fit(corpus)
pipe['count'].transform(corpus).toarray()
pipe['tfid'].idf_
pipe.transform(corpus).shape

"""# Unsupervised learning"""

from sklearn.cluster import KMeans


kmeans = KMeans(n_clusters=5).fit(pipe.transform(corpus))

"""# Test prédiction"""

# https://medium.com/@MSalnikov/text-clustering-with-k-means-and-tf-idf-f099bcf95183

classement = kmeans.predict(pipe.transform(corpus))

print(classement)
finalclassement = []
for i in range(len(discoursarray)):
  # With k=2
  #bord = "Vieux" if classement[i] == 0 else "Récent"

  # With k=5
  bord = classement[i]
  result = {discoursarray[i]["filenames"] + " : " + str(bord)}
  finalclassement.append(result)

print(finalclassement)

"""# Supervised learning"""

# https://medium.com/@eiki1212/natural-language-processing-naive-bayes-classification-in-python-e934365cf40c

# Create model(naive bayes) and training. 
from sklearn.naive_bayes import MultinomialNB
clf = MultinomialNB().fit(pipe.transform(corpus), news_groups_train.target)