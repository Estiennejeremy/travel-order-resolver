
# coding: utf-8

# In[37]:


import os

directory = "./discours/tous"

for filename in os.listdir(directory):
    if filename.endswith(".txt"):
        with open(os.path.join(directory, filename)) as f:
            lines = f.read()
            print(filename + ":" + lines[0:40] + "\n")
    else:
        continue

