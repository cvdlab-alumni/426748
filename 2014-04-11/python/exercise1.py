from larcc import *

### larFunctions ###

def translatePoints (points, tvect):
	return [VECTSUM([p,tvect]) for p in points]

def rotatePoints (points, angle):
	a = angle
	return [[x*COS(a)-y*SIN(a), x*SIN(a)+y*COS(a)] for x,y in points]

def scalePoints (points, svect):
	return [AA(PROD)(TRANS([p,svect])) for p in points]

def larDomain(shape):
	V,CV = larSimplexGrid(shape)
	V = scalePoints(V, [1./d for d in shape])
	return V,CV

def larIntervals(shape):
	def larIntervals0(size):
		V,CV = larDomain(shape)
		V = scalePoints(V, [scaleFactor for scaleFactor in size])
		return V,CV
	return larIntervals0

def checkModel(model):
	V,CV = model; n = len(V)
	vertDict = defaultdict(list)
	for k,v in enumerate(V): 
		vertDict[vcode(v)].append(k)
	verts = (vertDict.values())
	invertedindex = [None]*n
	for k,value in enumerate(verts):
		for i in value:
			invertedindex[i] = value[0]
	CV = [[invertedindex[v] for v in cell] for cell in CV]
	CV = [list(set(cell)) for cell in CV if len(set(cell))==len(cell)]
	return V, CV

def larCylinder(params):
	radius,height = params
	def larCylinder0(shape=[36,1]):
		domain = larIntervals(shape)([2*PI,1])
		V,CV = domain
		x = lambda V : [radius*COS(p[0]) for p in V]
		y = lambda V : [radius*SIN(p[0]) for p in V]
		z = lambda V : [height*p[1] for p in V]
		mapping = [x,y,z]
		model = larMap(mapping)(domain)
		return model
	return larCylinder0

def larRod(params):
	radius,height= params
	def larRod0(shape=[36,1]):
		V,CV = checkModel(larCylinder(params)(shape))
		return V,[range(len(V))]
	return larRod0

### floors ###

V = [[0,0],[68,0],[68,36],[0,36]]
floor = JOIN(AA(MK)(V))
floor3D_1 = PROD([floor, Q(1)])

V = [[1,1],[67,1],[67,35],[1,35]]
floor = JOIN(AA(MK)(V))
floor3D_2 = PROD([floor, Q(1)])

V = [[2,2],[66,2],[66,34],[2,34]]
floor = JOIN(AA(MK)(V))
floor3D_3 = PROD([floor, Q(1)])

floors = STRUCT([floor3D_1, T(3)(1)(floor3D_2), T(3)(2)(floor3D_3)])

### walls ###

V = [[12,7],[56,7],[56,9],[12,9]]
south = JOIN(AA(MK)(V))
south3D = PROD([south, Q(15)])

V = [[30,9],[31,9],[31,27],[30,27]]
central = JOIN(AA(MK)(V))
central3D = PROD([central, Q(15)])

north3D = T(2)(20)(south3D)
west3D = T(1)(-15)(central3D)
east3D = T(1)(20)(central3D)

walls = (STRUCT([north3D, south3D, central3D, east3D, west3D]))

### columns ### 

V,CV = larRod([.9,14.5])([16,6])
V = translatePoints(V,[4,4,3]) 
column = STRUCT(MKPOLS([V,CV]))

south_columns = STRUCT(NN(16)([column, T(1)(4)]))
north_columns = T(2)(28)(south_columns)

west_columns = T(2)(4)(STRUCT(NN(6)([column, T(2)(4)])))
east_columns = T(1)(60)(west_columns)

columns = STRUCT([south_columns, north_columns, west_columns, east_columns])

### capitels ###

cap = CUBOID([2,2,0.5]);
south_caps = T([1,2,3])([3,3,17.5])(STRUCT(NN(16)([cap, T(1)(4)])))
north_caps = T(2)(28)(south_caps)

west_caps = T([1,2,3])([3,7,17.5])(STRUCT(NN(6)([cap, T(2)(4)])))
east_caps = T(1)(60)(west_caps)

capitels = STRUCT([south_caps, north_caps, west_caps, east_caps])

### roof ###

lower_roof = T([1,2,3])([2,2,18])(CUBOID([64,32,3.5]))
upper_roof = T(3)(21.5)(S(3)(0.5)(floor3D_2))  

V = [[2,2,22],[66,2,22],[66,34,22],[2,34,22],[2,18,28],[66,18,28]]
top = JOIN(AA(MK)(V))

V = [[1,1,22],[67,1,22],[1,18,28],[67,18,28],[1,2,22],[67,2,22],[1,18,28.5],[67,18,28.5]]
top_right = JOIN(AA(MK)(V))

V = [[1,35,22],[67,35,22],[1,18,28],[67,18,28],[1,34,22],[67,34,22],[1,18,28.5],[67,18,28.5]]
top_left = JOIN(AA(MK)(V))

roof = STRUCT([lower_roof, upper_roof, top, top_right, top_left])

### all together ###

parthenon = STRUCT([floors, T(3)(3)(walls), columns, capitels, roof])

VIEW(COLOR([0.86,0.86,0.56])(parthenon))