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

def larMap(coordFuncs):
	def larMap0(domain):
		V,CV = domain
		V = TRANS(CONS(coordFuncs)(V))
		return V,CV
	return larMap0

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

def larDisk(radius=1.):
	def larDisk0(shape=[36,1]):
		domain = larIntervals(shape)([2*PI,radius])
		V,CV = domain
		x = lambda V : [p[1]*COS(p[0]) for p in V]
		y = lambda V : [p[1]*SIN(p[0]) for p in V]
		return larMap([x,y])(domain)
	return larDisk0

def larRing(params):
	r1,r2 = params
	def larRing0(shape=[36,1]):
		V,CV = larIntervals(shape)([2*PI,r2-r1])
		V = translatePoints(V,[0,r1])
		domain = V,CV
		x = lambda V : [p[1] * COS(p[0]) for p in V]
		y = lambda V : [p[1] * SIN(p[0]) for p in V]
		return larMap([x,y])(domain)
	return larRing0

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

def larHalfCylinder(params):
	radius,height = params
	def larHalfCylinder0(shape=[36,1]):
		domain = larIntervals(shape)([PI,1])
		V,CV = domain
		x = lambda V : [radius*COS(p[0]) for p in V]
		y = lambda V : [radius*SIN(p[0]) for p in V]
		z = lambda V : [height*p[1] for p in V]
		mapping = [x,y,z]
		model = larMap(mapping)(domain)
		return model
	return larHalfCylinder0

def larSphere(radius=1):
	def larSphere0(shape=[18,36]):
		V,CV = larIntervals(shape)([PI,2*PI])
		V = translatePoints(V,[-PI/2,-PI])
		domain = V,CV
		x = lambda V : [radius*COS(p[0])*SIN(p[1]) for p in V]
		y = lambda V : [radius*COS(p[0])*COS(p[1]) for p in V]
		z = lambda V : [radius*SIN(p[0]) for p in V]
		return larMap([x,y,z])(domain)
	return larSphere0

def larToroidal(params):
	r,R = params
	def larToroidal0(shape=[24,36]):
		domain = larIntervals(shape)([2*PI,2*PI])
		V,CV = domain
		x = lambda V : [(R + r*COS(p[0])) * COS(p[1]) for p in V]
		y = lambda V : [(R + r*COS(p[0])) * SIN(p[1]) for p in V]
		z = lambda V : [-r * SIN(p[0]) for p in V]
		return larMap([x,y,z])(domain)
	return larToroidal0

def larCrown(params):
	r,R = params
	def larCrown0(shape=[24,36]):
		V,CV = larIntervals(shape)([PI,2*PI])
		V = translatePoints(V,[-PI/2,0])
		domain = V,CV
		x = lambda V : [(R + r*COS(p[0])) * COS(p[1]) for p in V]
		y = lambda V : [(R + r*COS(p[0])) * SIN(p[1]) for p in V]
		z = lambda V : [-r * SIN(p[0]) for p in V]
		return larMap([x,y,z])(domain)
	return larCrown0

def larBall(radius=1):
	def larBall0(shape=[18,36]):
		V,CV = checkModel(larSphere(radius)(shape))
		return V,[range(len(V))]
	return larBall0

def larRod(params):
	radius,height= params
	def larRod0(shape=[36,1]):
		V,CV = checkModel(larCylinder(params)(shape))
		return V,[range(len(V))]
	return larRod0

def larHalfRod(params):
	radius,height= params
	def larHalfRod0(shape=[36,1]):
		V,CV = checkModel(larHalfCylinder(params)(shape))
		return V,[range(len(V))]
	return larHalfRod0

def larPizza(params):
	r,R= params
	def larPizza0(shape=[24,36]):
		V,CV = checkModel(larCrown(params)(shape))
		return V,[range(len(V))]
	return larPizza0

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

### columns ### 

V,CV = larRod([0.9,14.5])([16,6])
V = translatePoints(V,[4,4,3]) 
column = STRUCT(MKPOLS([V,CV]))

south_columns = STRUCT(NN(16)([column, T(1)(4)]))
north_columns = T(2)(28)(south_columns)

west_columns = T(2)(4)(STRUCT(NN(6)([column, T(2)(4)])))
east_columns = T(1)(60)(west_columns)

columns = STRUCT([south_columns, north_columns, west_columns, east_columns])

cap = CUBOID([2,2,0.5]);
south_caps = T([1,2,3])([3,3,17.5])(STRUCT(NN(16)([cap, T(1)(4)])))
north_caps = T(2)(28)(south_caps)

west_caps = T([1,2,3])([3,7,17.5])(STRUCT(NN(6)([cap, T(2)(4)])))
east_caps = T(1)(60)(west_caps)

capitels = STRUCT([south_caps, north_caps, west_caps, east_caps])

ext_columns = STRUCT([columns,capitels])

### internal (walls, column, capitels) ###

V = [[12,7],[56,7],[56,9],[12,9]]
south = JOIN(AA(MK)(V))
south3D = PROD([south, Q(15)])

central3D = T([1,2])([30,9])(CUBOID([1,18,15]))
door3D = CUBOID([1,5,11])
withDoor3D = DIFFERENCE([central3D, T([1,2])([30,15.5])(door3D)])

north3D = T(2)(20)(south3D)
west3D = T(1)(-15)(withDoor3D)
east3D = T(1)(22)(withDoor3D)

walls = T(3)(3)(STRUCT([north3D, south3D, central3D, east3D, west3D]))

V, CV = larRod([0.7,14.5])([16,6])
V = translatePoints(V,[10,8,3])
column = STRUCT(MKPOLS([V,CV]))

west_int_columns = STRUCT(NN(6)([column, T(2)(4)]))
east_int_columns = T(1)(48)(west_int_columns)

west_int_caps = T(1)(6)(west_caps)
east_int_caps = T(1)(-6)(east_caps)

internal = STRUCT([walls, west_int_columns, east_int_columns, west_int_caps, east_int_caps])

### roof ###

lower_roof = T([1,2,3])([2,2,18])(CUBOID([64,32,1.75]))
middle_roof = T([1,2,3])([1.5,1.5,19.75])(CUBOID([65,33,0.25]))
decorated_roof = T([1,2,3])([2,2,20])(CUBOID([64,32,1.5]))
upper_roof = T(3)(21.5)(S(3)(0.5)(floor3D_2))  

V = [[2,2,22],[66,2,22],[66,34,22],[2,34,22],[2,18,28],[66,18,28]]
top = JOIN(AA(MK)(V))

V = [[1,1,22],[67,1,22],[1,18,28],[67,18,28],[1,2,22],[67,2,22],[1,18,28.5],[67,18,28.5]]
top_right = JOIN(AA(MK)(V))

V = [[1,35,22],[67,35,22],[1,18,28],[67,18,28],[1,34,22],[67,34,22],[1,18,28.5],[67,18,28.5]]
top_left = JOIN(AA(MK)(V))

roof = STRUCT([lower_roof, middle_roof, decorated_roof, upper_roof, top, top_right, top_left])

### roof decoration ###

x = QUOTE([-0.1, 0.2]*3)
y = QUOTE([0.5])

long_dec = INSR(PROD)([x, y, Q(1.5)])
short_dec = INSR(PROD)([y, x, Q(1.5)])

south_decorations = T([1,2,3])([2.5,1.5,20])(STRUCT(NN(32)([long_dec, T(1)(2)])))
north_decorations = T(2)(32.5)(south_decorations)

west_decorations = T([1,2,3])([1.5,2.5,20])(STRUCT(NN(16)([short_dec, T(2)(2)])))
east_decorations = T(1)(64.5)(west_decorations)

V = [[1,1,22],[1.25,1,22],[1,0.75,22.5],[1.25,0.75,22.5],[1,18,28.5],[1.25,18,28.5],[1,18,29],[1.25,18,29]]
top_right_dec_r = JOIN(AA(MK)(V))

top_decorations_r = STRUCT(NN(132)([top_right_dec_r, T(1)(0.5)]))

V = [[1,35,22],[1.25,35,22],[1,35.25,22.5],[1.25,35.25,22.5],[1,18,28.5],[1.25,18,28.5],[1,18,29],[1.25,18,29]]
top_right_dec_l = JOIN(AA(MK)(V))

top_decorations_l = STRUCT(NN(132)([top_right_dec_l, T(1)(0.5)]))

roof_decorations = STRUCT([south_decorations, north_decorations, west_decorations, east_decorations, top_decorations_l, top_decorations_r])

### deep column and capitels (left) ###

V, CV = larRod([0.7,14.5])([16,6])
V = translatePoints(V,[20,15,3])
column = STRUCT(MKPOLS([V,CV]))

deep_columns = STRUCT(NN(2)([STRUCT(NN(2)([column, T(2)(6)])), T(1)(6)]))

deep_cap = T([1,2,3])([19,14,17.5])(cap)
deep_capitels = STRUCT(NN(2)([STRUCT(NN(2)([deep_cap, T(2)(6)])), T(1)(6)]))

deep_left = STRUCT([deep_columns, deep_capitels])

### deep column and capitels (right) ###

V, CV = larRod([0.4,7.75])([16,6])
V = translatePoints(V,[33,13,3])
column = STRUCT(MKPOLS([V,CV]))

lower_south_deep_columns = STRUCT(NN(10)([column, T(1)(2)]))
lower_north_deep_columns = T(2)(10)(lower_south_deep_columns)
lower_west_deep_columns = T(2)(2.5)(STRUCT(NN(3)([column, T(2)(2.5)])))

lower_deep_columns = STRUCT([lower_south_deep_columns, lower_north_deep_columns, lower_west_deep_columns])

lower_deep_cap = T([1,2,3])([32.5,12.5,10.75])(CUBOID([1,1,0.25]))

lower_south_deep_caps = STRUCT(NN(10)([lower_deep_cap, T(1)(2)]))
lower_north_deep_caps = T(2)(10)(lower_south_deep_caps)
lower_west_deep_caps = T(2)(2.5)(STRUCT(NN(3)([lower_deep_cap, T(2)(2.5)])))

lower_deep_caps = STRUCT([lower_south_deep_caps, lower_north_deep_caps, lower_west_deep_caps])

lower_deep_structure = STRUCT([lower_deep_columns, lower_deep_caps])

middle_floor = T([1,2,3])([32.5,12.5,11])(CUBOID([20,11,1]))
hole = T([1,2,3])([33.5,13.5,11])(CUBOID([19,9,1]))
middle_ring = DIFFERENCE([middle_floor, hole])

V, CV = larRod([0.4,5.75])([16,6])
V = translatePoints(V,[33,13,12])
column = STRUCT(MKPOLS([V,CV]))

upper_south_deep_columns = STRUCT(NN(10)([column, T(1)(2)]))
upper_north_deep_columns = T(2)(10)(upper_south_deep_columns)
upper_west_deep_columns = T(2)(2.5)(STRUCT(NN(3)([column, T(2)(2.5)])))

upper_deep_columns = STRUCT([upper_south_deep_columns, upper_north_deep_columns, upper_west_deep_columns])
upper_deep_caps = T(3)(6.75)(lower_deep_caps)

upper_deep_structure = STRUCT([upper_deep_columns, upper_deep_caps])

deep_right = STRUCT([lower_deep_structure, middle_ring, upper_deep_columns, upper_deep_structure])

### ladder ###

stair1 = T([1,2,3])([0.5,15.5,1])(CUBOID([0.5,5,0.5]))
stair2 = T([1,3])([1,1])(stair1)

ladder = STRUCT([stair1, stair2])

### all together ###

parthenon = STRUCT([floors, internal, ext_columns, deep_left, deep_right, ladder, roof, roof_decorations])

### acropolis ###

V = [[10,35,0],[50,10,0],[200,23,0],[220,35,0],[210,100,0],[180,130,0],[140,130,0],[150,140,0],[37,140,0],[8,90,0],
	 [14,40,42],[60,14,42],[180,28,42],[205,40,42],[195,90,42],[178,110,42],[140,110,42],[146,137,42],[35,120,42],[18,90,42]]
acropolis3D = JOIN(AA(MK)(V))

### ground ###

V = [[0,0],[280,0],[280,200],[0,200]]
ground = JOIN(AA(MK)(V))

### simple house (cuboid) XD ###

house1 = T([1,2])([23,177])(R([1,2])(PI/8)(CUBOID([7,12,9])))
house2 = T([1,2])([45,154])(R([1,2])(PI/6)(CUBOID([8,20,12])))
house3 = T([1,2])([20,145])(R([1,2])(PI/7)(CUBOID([20,20,14])))
house4 = T([1,2])([80,160])(CUBOID([85,15,10]))
house5 = T([1,2])([215,-105])(house2)
house6 = T([1,2])([230,56])(CUBOID([6,9,9]))
house7 = T([1,2])([235,23])(CUBOID([17,20,10]))
house8 = T([1,2,3])([177,56,42])(R([1,2])(PI/5)(CUBOID([13,18,9])))

houses = STRUCT([house1,house2,house3,house4,house5,house6,house7,house8])

### theater ###

V,CV = larHalfRod([40,24])()
V = translatePoints(V,[215,124,0]) 
theater1 = STRUCT(MKPOLS([V,CV]))

V,CV = larHalfRod([35,24])()
V = translatePoints(V,[215,124,0]) 
theater2 = STRUCT(MKPOLS([V,CV]))

theater_ext_1 = DIFFERENCE([theater1,theater2])

V,CV = larHalfRod([35,20])()
V = translatePoints(V,[215,124,0]) 
theater1 = STRUCT(MKPOLS([V,CV]))

V,CV = larHalfRod([30,20])()
V = translatePoints(V,[215,124,0]) 
theater2 = STRUCT(MKPOLS([V,CV]))

theater_ext_2 = DIFFERENCE([theater1,theater2])

V,CV = larHalfRod([30,16])()
V = translatePoints(V,[215,124,0]) 
theater1 = STRUCT(MKPOLS([V,CV]))

V,CV = larHalfRod([25,16])()
V = translatePoints(V,[215,124,0]) 
theater2 = STRUCT(MKPOLS([V,CV]))

theater_mid_1 = DIFFERENCE([theater1,theater2])

V,CV = larHalfRod([25,12])()
V = translatePoints(V,[215,124,0]) 
theater1 = STRUCT(MKPOLS([V,CV]))

V,CV = larHalfRod([20,12])()
V = translatePoints(V,[215,124,0]) 
theater2 = STRUCT(MKPOLS([V,CV]))

theater_mid_2 = DIFFERENCE([theater1,theater2])

V,CV = larHalfRod([20,8])()
V = translatePoints(V,[215,124,0]) 
theater1 = STRUCT(MKPOLS([V,CV]))

V,CV = larHalfRod([15,8])()
V = translatePoints(V,[215,124,0]) 
theater2 = STRUCT(MKPOLS([V,CV]))

theater_sml_1 = DIFFERENCE([theater1,theater2])

V,CV = larHalfRod([15,4])()
V = translatePoints(V,[215,124,0]) 
theater1 = STRUCT(MKPOLS([V,CV]))

V,CV = larHalfRod([10,4])()
V = translatePoints(V,[215,124,0]) 
theater2 = STRUCT(MKPOLS([V,CV]))

theater_sml_2 = DIFFERENCE([theater1,theater2])

theater = STRUCT([theater_ext_1, theater_ext_2, theater_mid_1, theater_mid_2, theater_sml_1, theater_sml_2]) 

theater = T([1,2])([-40, 130])(R([1,2])(-PI/6)(theater))

### more complex house ###

base = CUBOID([10,10,1])

V,CV = larRod([0.8,6])([16,6])
V = translatePoints(V,[2,2,1])
column = STRUCT(MKPOLS([V,CV]))

columns = STRUCT(NN(3)([STRUCT(NN(3)([column, T(2)(3)])), T(1)(3)]))

V = [[0.5,0.5,8],[9.5,0.5,8],[9.5,9.5,8],[0.5,9.5,8],[0,5,11],[10,5,11]]
roof = JOIN(AA(MK)(V))

greek_temple = STRUCT([base,columns,T(3)(7)(base), roof])
temple1 = T([1,2,3])([56,100,42])(R([1,2])(PI/2)(greek_temple))
templeRow = STRUCT(NN(8)([temple1, T(1)(15)]))

### traslateParthenon ###

t_parthenon = R([1,2])(PI/10)(T([1,2,3])([70,7.5,42])(parthenon))

### all together ###

athens = STRUCT([COLOR([0.8,0.47,0.13])(ground), COLOR([0.8,0.47,0.13])(acropolis3D), 
	COLOR([0.86,0.86,0.56])(t_parthenon), COLOR([0.86,0.86,0.56])(houses), 
	COLOR([0.86,0.86,0.56])(theater), COLOR([0.86,0.86,0.56])(T([1,2])([23,-32])(R([1,2])(PI/10)(templeRow)))])

VIEW(athens) (T([1,2])([23,-32])(R([1,2])(PI/10)(templeRow)))