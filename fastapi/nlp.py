import os
import csv
import spacy
from enum import Enum
from spacy.symbols import PROPN, NOUN, CCONJ, ADP, VERB
import numpy as np

class Direct(Enum):
    NONE = 1
    START = 2
    DEST = 3

class Force(Enum):
    NONE = 1
    WEAK = 2
    STRONG = 3
    
class WordLinkSolo:
    def __init__(self, word: str, direct: Direct, force: Force):
        self.word = word
        self.direct = direct
        self.force = force

class wordLink:
    def __init__(self, word: str, fixedWord: str, direct: Direct, force: Force):
        self.word = word
        self.fixedWord = fixedWord
        self.direct = direct
        self.force = force



LINK_NOUN_STRONG = [
    WordLinkSolo("provenance",     Direct.START, Force.STRONG),
  
]
LINK_NOUN_WEAK = [
    WordLinkSolo("direction",      Direct.DEST,  Force.WEAK),
    WordLinkSolo("destination",    Direct.DEST,  Force.WEAK)
]

LINK_NOUN = LINK_NOUN_STRONG + LINK_NOUN_WEAK

LINK_ADP_FIXED_START = [
    wordLink("à","partir",       Direct.START, Force.STRONG),
    wordLink("en", "partant",    Direct.START, Force.STRONG),
    wordLink("en","passant",   Direct.START,  Force.WEAK),


]

LINK_ADP_FIXED_DEST = [
    wordLink("à","destination",  Direct.DEST,  Force.STRONG),
    wordLink("en","direction",   Direct.DEST,  Force.WEAK)
]

LINK_ADP_FIXED = LINK_ADP_FIXED_START + LINK_ADP_FIXED_DEST

LINK_ADP_START = [
    WordLinkSolo("de",     Direct.START, Force.STRONG),
    WordLinkSolo("du",     Direct.START, Force.STRONG),
    WordLinkSolo("des",    Direct.START, Force.STRONG),
    WordLinkSolo("depuis", Direct.START, Force.STRONG),


] 

LINK_ADP_DEST = [
    WordLinkSolo("à",      Direct.DEST,  Force.WEAK),
    WordLinkSolo("dans",   Direct.DEST,  Force.WEAK),
    WordLinkSolo("par",    Direct.DEST,  Force.WEAK) 
]

LINK_ADP = LINK_ADP_DEST + LINK_ADP_START

LINK_CCONJ_START = [
    WordLinkSolo("depuis",     Direct.START, Force.STRONG),
]

LINK_CCONJ_DEST = [
    WordLinkSolo("puis",       Direct.DEST,  Force.STRONG),
    WordLinkSolo("et",         Direct.DEST,  Force.STRONG),
    WordLinkSolo("enfin",      Direct.DEST,  Force.STRONG)
]

LINK_VERB_MARK_START = [
    WordLinkSolo("après",   Direct.START, Force.WEAK),
    WordLinkSolo("de",   Direct.START, Force.STRONG),
]

LINK_VERB_MARK_DEST = [
    WordLinkSolo("avant",   Direct.DEST, Force.STRONG),
]
LINK_VERB_MARK = LINK_VERB_MARK_DEST + LINK_VERB_MARK_START

LINK_VERB_START = [
    WordLinkSolo("passer",     Direct.START, Force.WEAK),
    WordLinkSolo("être",       Direct.START, Force.STRONG),
   
]

LINK_VERB_DEST = [
    WordLinkSolo("arriver",    Direct.DEST,  Force.STRONG),
    WordLinkSolo("aller",      Direct.DEST,  Force.STRONG),
    WordLinkSolo("visiter",    Direct.DEST,  Force.STRONG),
    WordLinkSolo("atterrir",   Direct.DEST,  Force.STRONG),
    WordLinkSolo("découvrir",  Direct.DEST,  Force.STRONG),
    WordLinkSolo("voyager",    Direct.DEST,  Force.STRONG),
    WordLinkSolo("rendre",     Direct.DEST,  Force.STRONG)
]

LINK_VERB = LINK_VERB_START + LINK_VERB_DEST

LINK_CCONJ = LINK_CCONJ_START + LINK_CCONJ_DEST


def test_phrase(i, doc, tokens, locs, tokenToped, advFor ):
    if tokenToped == False:
        for token in doc:
            if token is not None:
                if advFor:
                    if token.pos == advFor:
                        isUsable = True
                        for selectedTok in tokens:
                            if type(selectedTok) != int and selectedTok == token:
                                isUsable = False
                        if isUsable:
                            print(token)
                            if token.text in locs[i]:
                                tokens[i] = token
                                return True
                            
def test_phrases_default(doc, tokens, locs, i ):
     for token in doc:
        isUsable = True
        for tokenSelected in tokens:
            if type(tokenSelected) != int and tokenSelected == token:
                isUsable = False
        if isUsable:
            if token.text in locs[i]:
                tokens[i] = token
                return True

                    
                            
def finder(elem, adp, rela):
    if elem.pos == adp:
        for ref in rela:
            if ref.word == elem.lemma_:
                print(f"CCONJ: {ref.word}  type {ref.force.name} sens {ref.direct.name}")
                fw.append(ref)
                break

def LINK_ADP_FIXED_CHECK(tokens, i):
    for child in tokens[i].children:
        if child.pos == ADP:
            for subChild in child.children:
                if subChild.dep_ == 'fixed':
                    for ref in LINK_ADP_FIXED:
                        if ref.word == child.lemma_ and ref.fixedWord == subChild.lemma_:
                            print(f"ADP_FIXED: {ref.word} {ref.fixedWord} type {ref.force.name} sens {ref.direct.name}")
                            fw.append(ref)
                            break
def LINK_ADP_CHECK(tokens, i):
    for child in tokens[i].children:
        for ref in LINK_ADP:
            if ref.word == child.lemma_:
                print(f"ADP: {ref.word} type {ref.force.name} type {ref.direct.name}")
                fw.append(ref) 
                
def LINK_VERB_MARK_CHECK(parent):
     if parent.pos == VERB:
        for child in parent.children:
            if child.dep_ == 'mark' and child.pos == ADP:
                for ref in LINK_VERB_MARK:
                    if ref.word == child.lemma_:
                        print(f" VERB: {ref.word} type {ref.force.name} sens {ref.direct.name}")
                        fw.append(ref)
                        break
                        
def LINK_VERB_CHECK(parent):
    for ref in LINK_VERB:
        if ref.word == parent.lemma_:
            print(f"VERB: {ref.word} type {ref.force.name} sens {ref.direct.name}")
            fw.append(ref)
            break
            
def ORDER_START(wToks):
    sizeForce = 0
    for i in range(len(wToks)):
        token, weight = wToks[i]
        if weight.direct == Direct.START:
            if weight.force == Force.STRONG:
                OrderedCities.insert(sizeForce, token.text)
                sizeForce = sizeForce + 1
            else:
                OrderedCities.append(token.text)
    ORDER_DEST(wToks)

def ORDER_DEST(wToks):
    sizeForce = 0
    for i in range(len(wToks)):
        token, weight = wToks[i]
        if weight.direct == Direct.DEST:
            if weight.force == Force.STRONG:
                OrderedCities.append(token.text)
                sizeForce = sizeForce + 1
            else:
                if sizeForce == 0:
                    OrderedCities.append(token.text)
                else:
                    OrderedCities.insert(len(OrderedCities)-sizeForce, token.text)
    

def analyse(sentence):
    #print(f"Request: {sentence}")
    nlp = spacy.load("fr_core_news_sm")
    doc = nlp(sentence)
    #print("CouCou je suis ici")
    locs = []
    fullTrip = []
    for i in doc.ents:
        if i.label_ == 'LOC' or i.label_ == 'GPE': 
            locs.append(i.text)
    #print(f"locs found: {locs}")

    if len(locs) <= 1:
        print("Cannot parse request or invalid request.")
    else:
        global tokens
        tokens = np.zeros(len(locs), dtype=object)
        for i in range(len(locs)):
           
            tokenToped = False

            if test_phrase(i, doc, tokens, locs, tokenToped, PROPN):
                tokenToped = True

            if test_phrase(i, doc, tokens, locs, tokenToped, NOUN):
                tokenToped = True
                
            if tokenToped == False:
                if test_phrases_default(doc, tokens, locs, i):
                    tokenToped = True
            
            if tokenToped == False:
                #print(f"Localization {locs[i]} not found")
                tokens[i] = None

        tmpTokens = tokens
        tokens = [] 
        for token in tmpTokens: 
            if token != None : 
                tokens.append(token)


        wToks = np.zeros(len(tokens), dtype=object)
        for i in range(len(tokens)):
            #print(f"Token #{i+1} : {tokens[i].lemma_}")
            global fw
            fw = []
            parent = tokens[i].head

            for child in tokens[i].children:
                finder(child,CCONJ,LINK_CCONJ)

            if len(fw) <= 0: 
                finder(parent,NOUN,LINK_NOUN)


            if len(fw) <= 0: 
                LINK_ADP_FIXED_CHECK(tokens, i)

                
                    
            if len(fw) <= 0:
                LINK_ADP_CHECK(tokens, i)

            if len(fw) <= 1:
                LINK_VERB_MARK_CHECK(parent)
                
            if len(fw) <= 1:
                LINK_VERB_CHECK(parent)
                
            if len(fw) == 0: 
                #print(f"Using default weight")
                fw.append(WordLinkSolo("default", Direct.DEST,  Force.WEAK))

            
            selectedWeight = None
            for j in range(len(fw)):
                if fw[j].force == Force.STRONG:
                    selectedWeight = fw[j]
                    break
            if selectedWeight is None:
                selectedWeight = fw[0]

            #print(f"Using: {selectedWeight.word}")
            #print("---------------")
            wToks[i] = (tokens[i], selectedWeight)

        global OrderedCities
        OrderedCities = []
        ORDER_START(wToks)
        return OrderedCities







# print(analyse("Je souhaite prendre le train à Tarbes et avancer calmement jusqu'a Brest"))