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

#### struttura ####

values =[[1,14,1,3,1,2,1,6,1,10,1,6,1],[1,6,1,6,1,2,1,6,1,4,1],[.1,10]]

extra = range(10,22)+range(32,44)+range(58,66)+range(80,88)+range(102,110)+range(124,132)+ range(150,154)+range(172,176)
inside = [25,27,29,69,91,113,73,75,77,95,97,99,117,119,121,139,141,143,157,161,163,165,169,179,201,205,207,209,213,215,217,235,237,239,245,247,249,251,253,257,259,261]

cells = extra + inside
master, skel = generateEnumeratedSkeleton(values)
#VIEW(skel)

master, skel = removeCells(master,cells)
VIEW(skel)
#DRAW(master)

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
VIEW(skel)

### rimuovo porte e finestre ###

cells = [256,252,242,235,225,212,194,206,198,188,182,179,177,175,173,171,169,167]

master,skel = removeCells(master,cells)
DRAW(master)









