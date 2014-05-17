from larcc import *

### funzione modificate per la numerazione e draw ###

DRAW = COMP([VIEW,STRUCT,MKPOLS])

def cellNumberingMod (larModel,hpcModel):
   V,CV = larModel
   def cellNumbering0 (cellSubset,color=WHITE,scalingFactor=1,start=0):
      text = TEXTWITHATTRIBUTES (TEXTALIGNMENT='centre', TEXTANGLE=0, 
                     TEXTWIDTH=0.1*scalingFactor, 
                     TEXTHEIGHT=0.2*scalingFactor, 
                     TEXTSPACING=0.025*scalingFactor)
      hpcList = [hpcModel]
      for cell in cellSubset:
         point = CCOMB([V[v] for v in CV[cell]])
         hpcList.append(T([1,2,3])(point)(COLOR(color)(text(str(cell+start)))))
      return STRUCT(hpcList)
   return cellNumbering0

start = 0;

### prima stanza ###

master = assemblyDiagramInit([2,3,2])([[1,14],[1,13,1],[.1,10]])
V,CV = master
length = len(CV)
hpc = SKEL_1(STRUCT(MKPOLS(master)))
biagio = cellNumberingMod (master,hpc)(range(length),CYAN,4)

toRemove = [9] 
walls = V,[cell for k,cell in enumerate(CV) if not (k in toRemove)] 
biagio3D = STRUCT(MKPOLS(walls))

### finestra ###

toMerge = 7
diagram = assemblyDiagramInit([3,1,3])([[4,4,6],[1],[3,4,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [14]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

biagio3DP = STRUCT(MKPOLS(walls))

start = start + length

### stanza 2 e 3 ###

master = assemblyDiagramInit([5,3,2])([[1,6,1,17,1],[1,6,1],[.1,10]])
V,CV = master
length= len(CV) 
hpc = SKEL_1(STRUCT(MKPOLS(master)))
bagno_luigi = T(1)(14)(cellNumberingMod (master,hpc)(range(length),CYAN,4,start))

toRemove = [9,21] 
walls = V,[cell for k,cell in enumerate(CV) if not (k in toRemove)] 
bagno_luigi3D = T(1)(14)(STRUCT(MKPOLS(walls)))

### porta stanza 2 ###

toMerge = 10
diagram = assemblyDiagramInit([3,1,2])([[1,4,1],[1],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [29]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

### porta stanza 3 ###

toMerge = 20
diagram = assemblyDiagramInit([3,1,2])([[1,4,12],[1],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [33]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

### finestra  stanza 2###

toMerge = 7
diagram = assemblyDiagramInit([3,1,3])([[2,3,1],[1],[3,4,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [39]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

### finestra stanza 3 ###

toMerge = 16
diagram = assemblyDiagramInit([3,1,3])([[2,5,10],[1],[3,4,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [46]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

bagno_luigi3DP = T(1)(14)(STRUCT(MKPOLS(walls)))

start = start + length

### stanza 4 e 5 ###

master = assemblyDiagramInit([5,2,2])([[1,13,1,10,1],[9,1],[.1,10]])
V,CV = master
length= len(CV) 
hpc = SKEL_1(STRUCT(MKPOLS(master)))
salotto_cucina = T([1,2])([14,8])(cellNumberingMod (master,hpc)(range(length),CYAN,4,start))

toRemove = [5,13] 
walls = V,[cell for k,cell in enumerate(CV) if not (k in toRemove)] 
salotto_cucina3D = T([1,2])([14,8])(STRUCT(MKPOLS(walls)))

### porta stanza 4 ###

toMerge = 1
diagram = assemblyDiagramInit([1,3,2])([[1],[1,4,4],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [19]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

### porta stanza 4 bis ###

toMerge = 5
diagram = assemblyDiagramInit([3,1,2])([[8,4,1],[1],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [23]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

### porta stanza 5 ###

toMerge = 6
diagram = assemblyDiagramInit([1,3,2])([[1],[2,4,3],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [27]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

### porta stanza 5 bis ###

toMerge = 12
diagram = assemblyDiagramInit([1,3,2])([[1],[3,4,2],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [31]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

salotto_cucina3DP = T([1,2])([14,8])(STRUCT(MKPOLS(walls)))

start = start + length

### stanza 6 ###

master = assemblyDiagramInit([2,2,2])([[1,9],[6,1],[.1,10]])
V,CV = master
length = len(CV) 
hpc = SKEL_1(STRUCT(MKPOLS(master)))
ingresso = T([1,2])([18,18])(cellNumberingMod (master,hpc)(range(length),CYAN,4,start))

toRemove = [5] 
walls = V,[cell for k,cell in enumerate(CV) if not (k in toRemove)] 
ingresso3D = T([1,2])([18,18])(STRUCT(MKPOLS(walls)))

### porta stanza 6 ###

toMerge = 6
diagram = assemblyDiagramInit([3,1,2])([[1,4,4],[1],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [8]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

ingresso3DP = T([1,2])([18,18])(STRUCT(MKPOLS(walls)))

start = start + length

### stanza 7 ###

master = assemblyDiagramInit([3,2,2])([[1,17,1],[11,1],[.1,10]])
V,CV = master
length= len(CV) 
hpc = SKEL_1(STRUCT(MKPOLS(master)))
ruggero = T([1,2])([28,18])(cellNumberingMod (master,hpc)(range(length),CYAN,4,start))

toRemove = [5] 
walls = V,[cell for k,cell in enumerate(CV) if not (k in toRemove)] 
ruggero3D = T([1,2])([28,18])(STRUCT(MKPOLS(walls)))

### porta stanza 7 ###

toMerge = 1
diagram = assemblyDiagramInit([1,3,2])([[1],[1,4,6],[7,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [12]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

### finsestra ###

toMerge = 7
diagram = assemblyDiagramInit([1,3,3])([[1],[2,5,4],[3,4,3]])
walls = diagram2cell(diagram, walls, toMerge)
hpc = SKEL_1(STRUCT(MKPOLS(walls)))
hpc = cellNumbering (walls,hpc)(range(len(walls[1])),CYAN,2)

toRemove = [18]
walls = walls[0], [cell for k,cell in enumerate(walls[1]) if not (k in toRemove)]

ruggero3DP = T([1,2])([28,18])(STRUCT(MKPOLS(walls)))

start = start + length

### balcone ###

master = assemblyDiagramInit([2,2,2])([[6,1],[1,16],[.1,5]])
V,CV = master
length= len(CV) 
hpc = SKEL_1(STRUCT(MKPOLS(master)))
balcone = T(1)(40)(cellNumberingMod (master,hpc)(range(length),CYAN,4,start))

toRemove = [3] 
walls = V,[cell for k,cell in enumerate(CV) if not (k in toRemove)] 
balcone3D = T(1)(40)(STRUCT(MKPOLS(walls)))

start = start + length

### muro a buffo ###

master = assemblyDiagramInit([1,1,2])([[7],[1],[.1,10]])
V,CV = master
length = len(CV) 
hpc = SKEL_1(STRUCT(MKPOLS(master)))
wall = T([1,2])([40,17])(cellNumberingMod (master,hpc)(range(length),CYAN,4,start))

wall3D = T([1,2])([40,17])(STRUCT(MKPOLS(master)))

start = start + length

### all together ###

appartamento = STRUCT([biagio,bagno_luigi,salotto_cucina, ingresso, ruggero, balcone, wall]) 
appartamento3D = STRUCT([biagio3D,bagno_luigi3D,salotto_cucina3D, ingresso3D, ruggero3D, balcone3D, wall3D]) 
appartamento3DP = STRUCT([biagio3DP,bagno_luigi3DP,salotto_cucina3DP, ingresso3DP, ruggero3DP, balcone3D, wall3D]) 

VIEW(appartamento)
VIEW(appartamento3D)
VIEW(appartamento3DP)



