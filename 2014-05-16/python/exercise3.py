from larcc import *

### metodo merg_numb_elim che permette una molteplicità di parametri tramite ### 
### due cicli for itero su un vettore e sulle celle da rimuovere ###

def merg_numb_elim(diagrams,master,remove,merge) :
   for index in range(len(diagrams)) :
      V,CV = master
      length = len(CV)-1 
      master = diagram2cell(diagrams[index],master,merge[index])
      V,CV = master
      for j_index in range(len(remove[index])) :
         remove[index][j_index] = remove[index][j_index] + length 
      master = V,[cell for k,cell in enumerate(CV) if not (k in remove[index])]
   return master 