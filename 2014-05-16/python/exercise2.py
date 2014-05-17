from larcc import *

### funzione modificate per la numerazione ###

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

### curve ###

piastrella = CUBOID([1,1,0.1])
controlpoints = [[0,0],[1,0],[1,1],[0,1],[0,0]]

points = [[0,.6],[.1,.3],[.4,.2],[.5,0]]
dom = larDomain([32])
mapping = larBezierCurve(points)
obj = larMap(mapping)(dom)
part1 = (STRUCT(MKPOLS(obj)+[POLYLINE(controlpoints)]))

points = [[.1,1],[.3,.6],[.7,.4],[.9,0]]
dom = larDomain([32])
mapping = larBezierCurve(points)
obj = larMap(mapping)(dom)
part2 = (STRUCT(MKPOLS(obj)))

points = [[.6,1],[.6,.6],[.8,.4],[1,0]]
dom = larDomain([32])
mapping = larBezierCurve(points)
obj = larMap(mapping)(dom)
part3 = (STRUCT(MKPOLS(obj)))

points = [[.5,1],[.5,.5],[0,.5]]
dom = larDomain([32])
mapping = larBezierCurve(points)
obj = larMap(mapping)(dom)
part4 = (STRUCT(MKPOLS(obj)))

decoration = STRUCT([part1,part2,part3,part4])

piastrella_decorata = STRUCT([piastrella,T(3)(0.1)((COLOR([0.5,0.5,0.5])(decoration)))])

VIEW(piastrella_decorata)

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

floor = STRUCT(NN(14)([STRUCT(NN(13)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
biagio3DPP = STRUCT([biagio3DP,T([1,2,3])([1,1,.1])(floor)])

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

floor = STRUCT(NN(24)([STRUCT(NN(6)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
bagno_luigi3DPP = STRUCT([bagno_luigi3DP,T([1,2,3])([15,1,.1])(floor)])

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

floor = STRUCT(NN(25)([STRUCT(NN(11)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
salotto_cucina3DPP = STRUCT([salotto_cucina3DP,T([1,2,3])([15,7,.1])(floor)])

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

floor = STRUCT(NN(9)([STRUCT(NN(7)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
ingresso3DPP = STRUCT([ingresso3DP,T([1,2,3])([19,18,.1])(floor)])

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

floor = STRUCT(NN(18)([STRUCT(NN(11)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
ruggero3DPP = STRUCT([ruggero3DP,T([1,2,3])([28,18,.1])(floor)])

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

floor = STRUCT(NN(6)([STRUCT(NN(16)([COLOR([0.52,.3,.2])(piastrella), T(2)(1)])), T(1)(1)]))
balcone3DPP = STRUCT([balcone3D,T([1,2,3])([40,1,.1])(floor)])

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
appartamento3DPP = STRUCT([biagio3DPP,bagno_luigi3DPP,salotto_cucina3DPP, ingresso3DPP, ruggero3DPP, balcone3DPP, wall3D])  

#VIEW(appartamento)
#VIEW(appartamento3D)
#VIEW(appartamento3DP)
VIEW(appartamento3DPP)

### serie di appartamenti ###

### condominio ###

pianerottolo = CUBOID([47,30,0.1])
bucoscale = CUBOID([10,20,0.1])
pianerottolo = DIFFERENCE([pianerottolo,T(2)(20)(bucoscale)])
appartamento3DP = STRUCT([COLOR([.5,.5,.5])(pianerottolo),T(3)(0.1)(appartamento3DP)])

scalaA = STRUCT([appartamento3DP,T(3)(10.2)(appartamento3DP),T(3)(20.4)(appartamento3DP),
   T(3)(30.6)(appartamento3DP),T(3)(40.8)(appartamento3DP),T(3)(51)(appartamento3DP),T(3)(61.2)(appartamento3DP),
   T(3)(71.4)(appartamento3DP)])

scalaB = S(1)(-1)(scalaA)
scalaC = T(2)(60)(S(2)(-1)(scalaA))
scalaD = S(1)(-1)(scalaC)

parziale = STRUCT([scalaA,scalaB])
scale = STRUCT([scalaA,scalaB,scalaC,scalaD])
entrata = T(1)(-47)(CUBOID([94,60,10.2]))
entratabuco = CUBOID([57,20,10.2])
entrata = DIFFERENCE([entrata,T([1,2])([-47,20])(entratabuco)]) 
roof = T([1,3])([-47,91.8])(CUBOID([94,60,5]))
roof0 = T([1,2,3])([-46,1,92.8])(CUBOID([92,58,4]))
roof = DIFFERENCE([roof,roof0])
palazzo_parziale = STRUCT([COLOR([.5,.5,.5])(entrata),T(3)(10.2)(parziale)])
palazzo = STRUCT([COLOR([.5,.5,.5])(entrata),T(3)(10.2)(scale),COLOR([.5,.5,.5])(roof)])

#VIEW(palazzo)

### scalini ###

ladder1 = CUBOID([5,5,0.425])
ladder2 = T([1,3])([2,0.425])(CUBOID([5,5,0.425]))
ladder3 = T([1,3])([4,0.85])(CUBOID([5,5,0.425]))
ladder4 = T([1,3])([6,1.275])(CUBOID([5,5,0.425]))
ladder5 = T([1,3])([8,1.7])(CUBOID([5,5,0.425]))
ladder6 = T([1,3])([10,2.125])(CUBOID([5,5,0.425]))

ladder = STRUCT([ladder1,ladder2,ladder3,ladder4,ladder5,ladder6])

piano_di_scale = STRUCT([ladder,T([1,2,3])([15,5,2.55])(R([1,2])(PI/2)(ladder)),
   T([1,2,3])([10,20,5.1])(R([1,2])(PI)(ladder)),
   T([1,2,3])([-5,15,7.65])(R([1,2])(3*PI/2)(ladder))])

scale = STRUCT([piano_di_scale,T(3)(10.2)(piano_di_scale),
   T(3)(20.4)(piano_di_scale),T(3)(30.6)(piano_di_scale),
   T(3)(40.8)(piano_di_scale),T(3)(51)(piano_di_scale),
   T(3)(61.2)(piano_di_scale),T(3)(71.4)(piano_di_scale)])

### scalini 2 ###

ladder1 = CUBOID([7,10,1.02])
ladder2 = T([1,3])([6,1.02])(CUBOID([5,10,1.02]))
ladder3 = T([1,3])([8,2.04])(CUBOID([5,10,1.02]))
ladder4 = T([1,3])([10,3.06])(CUBOID([5,10,1.02]))
ladder5 = T([1,3])([12,4.08])(CUBOID([8,10,1.02]))

better_ladder = STRUCT([ladder1,ladder2,ladder3,ladder4,ladder5])

better_piano_di_scale = STRUCT([better_ladder,T([1,3])([20,5.1])(R([1,2])(PI)(better_ladder))])

better_scale = STRUCT([better_piano_di_scale,T(3)(10.2)(better_piano_di_scale),
   T(3)(20.4)(better_piano_di_scale),T(3)(30.6)(better_piano_di_scale),
   T(3)(40.8)(better_piano_di_scale),T(3)(51)(better_piano_di_scale),
   T(3)(61.2)(better_piano_di_scale),T(3)(71.4)(better_piano_di_scale)])

### alltogether ###

better_palazzo_parziale = STRUCT([T([1,2,3])([-10,30,0.1])(better_scale),palazzo_parziale])

VIEW(better_palazzo_parziale)
T([1,3])([-47,91.6])(CUBOID([94,60,5]))
palazzo_parziale = STRUCT([T([1,2,3])([-5,20,0.1])(scale),palazzo_parziale])

VIEW(palazzo_parziale)

palazzo = STRUCT([T([1,2,3])([-10,30,0.1])(better_scale),palazzo])

VIEW(palazzo)










