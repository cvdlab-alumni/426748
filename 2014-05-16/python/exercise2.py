from larcc import *

### funzioni supporto ###

DRAW = COMP([VIEW,STRUCT,MKPOLS])

def generateEnumeratedSkeleton(values):
   x,y,z = values
   master = assemblyDiagramInit([len(x),len(y),len(z)])([x,y,z])
   V,CV = master
   skel = cellNumbering(master,SKEL_1(STRUCT(MKPOLS(master))))(range(len(CV)),CYAN,4)
   return master, skel

def removeCells(master, cells):
   V,CV = master
   master = V,[cell for k,cell in enumerate(CV) if not (k in cells)]
   V,CV = master
   skel = cellNumbering(master,SKEL_1(STRUCT(MKPOLS(master))))(range(len(CV)),CYAN,2)
   return master, skel

def cellPartitioning(cell,values,master):
   x,y,z = values
   diagram = assemblyDiagramInit([len(x),len(y),len(z)])([x,y,z])
   master = diagram2cell(diagram, master, cell)
   return master

def multiCellPartitioning(cells,diagrams,master):
   for i in range(len(cells)):
      master = cellPartitioning(cells[i],diagrams[i],master)
   skel = cellNumbering (master,SKEL_1(STRUCT(MKPOLS(master))))(range(len(master[1])),CYAN,2)
   return master, skel

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

#### struttura ####

values =[[1,14,1,3,1,2,1,6,1,10,1,6,1],[1,6,1,6,1,2,1,6,1,4,1],[.1,10]]

extra = range(10,22)+range(32,44)+range(58,66)+range(80,88)+range(102,110)+range(124,132)+ range(150,154)+range(172,176)
inside = [25,27,29,69,91,113,73,75,77,95,97,99,117,119,121,139,141,143,157,161,163,165,169,179,201,205,207,209,213,215,217,235,237,239,245,247,249,251,253,257,259,261]

cells = extra + inside
master, skel = generateEnumeratedSkeleton(values)
#VIEW(skel)

master, skel = removeCells(master,cells)
#VIEW(skel)

#porta dim [3,1,8]

d132 = [[1],[2,3,1],[8,2]]
d103 = [[1],[2,3,1],[8,2]]
d95 = [[1],[2,3,1],[8,2]]
d88 = [[3,2,1],[1],[8,2]]
d85 = [[2,3,1],[1],[8,2]]
d80 = [[2,3,1],[1],[8,2]]
d55 = [[1,1],[1],[8,2]] 
d45 = [[1],[1],[8,2]]
d35 = [[2,1],[1],[8,2]]
d24 = [[1],[3,3],[8,2]]
d11 = [[5,3,6],[1],[8,2]]

#finestra dim [3,1,4]

d32 = [[2,1],[1],[4,4,2]]
d42 = [[1],[1],[4,4,2]]
d52 = [[1,1],[1],[4,4,2]]
d77 = [[1,3,2],[1],[4,4,2]]
d173 = [[1],[1,3,2],[4,4,2]]

#balcone

d145 = [[1],[1],[5,5]]
d159 = [[1],[1],[5,5]]
d161 = [[1],[6],[5,5]]
d163 = [[1],[1],[5,5]]
d165 = [[1],[6],[5,5]]
d167 = [[1],[1],[5,5]]
d169 = [[1],[2],[5,5]]

cells = [173,169,167,165,163,161,159,145,132,103,95,88,85,80,77,55,52,45,42,35,32,24,11]

diagrams = [d173,d169,d167,d165,d163,d161,d159,d145,d132,d103,d95,d88,d85,d80,d77,d55,d52,d45,d42,d35,d32,d24,d11] 

master,skel = multiCellPartitioning(cells,diagrams,master)
#VIEW(skel)

### rimuovo porte e finestre ###

cells = [256,252,242,235,225,212,194,206,198,188,182,179,177,175,173,171,169,167,238,248,230,220,161]

master,skel = removeCells(master,cells)
appartamento = STRUCT(MKPOLS(master))
#VIEW(appartamento)

### piastrelle ###

floor1 = STRUCT(NN(46)([STRUCT(NN(13)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
floor2 = STRUCT(NN(31)([STRUCT(NN(3)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
floor3 = STRUCT(NN(24)([STRUCT(NN(8)([piastrella_decorata, T(2)(1)])), T(1)(1)]))
floor4 = STRUCT(NN(17)([STRUCT(NN(4)([piastrella_decorata, T(2)(1)])), T(1)(1)]))

floor = STRUCT([floor1,T([1,2])([15,13])(floor2),T([1,2])([22,16])(floor3),
   T([1,2])([29,24])(floor4)])

appartamento0 = STRUCT([appartamento,T([1,2])([1,1])(floor)])

VIEW(appartamento0)

### serie di appartamenti ###

### condominio ###

pianerottolo = CUBOID([48,30,0.1])
bucoscale = CUBOID([10,20,0.1])
pianerottolo = DIFFERENCE([pianerottolo,T(2)(20)(bucoscale)])
appartamento = STRUCT([COLOR([.5,.5,.5])(pianerottolo),T(3)(0.1)(appartamento)])

#VIEW(appartamento)

scalaA = STRUCT([appartamento,T(3)(10.2)(appartamento),T(3)(20.4)(appartamento),
   T(3)(30.6)(appartamento),T(3)(40.8)(appartamento),T(3)(51)(appartamento),T(3)(61.2)(appartamento),
   T(3)(71.4)(appartamento)])

VIEW(scalaA)

scalaB = S(1)(-1)(scalaA)
scalaC = T(2)(60)(S(2)(-1)(scalaA))
scalaD = S(1)(-1)(scalaC)

parziale = STRUCT([scalaA,scalaB])
scale = STRUCT([scalaA,scalaB,scalaC,scalaD])

VIEW(scale)

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










