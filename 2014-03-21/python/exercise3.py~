from pyplasm import *

#floors - steps

verts = [[0,0],[16,0],[16,9],[0,9]]
floor1 = JOIN(AA(MK)(verts))
floor13D = PROD([floor1, Q(0.15)])

verts = [[0.3,0.3],[15.7,0.3],[15.7,8.7],[0.3,8.7]]
floor2 = JOIN(AA(MK)(verts))
floor23D = PROD([floor2, Q(0.15)])

verts = [[0.6,0.6],[15.4,0.6],[15.4,8.4],[0.6,8.4]]
floor3 = JOIN(AA(MK)(verts))
floor33D = PROD([floor3, Q(0.15)])

#roof

roof1 = T(3)(4)(floor3)
roof13D = T(3)(4)(PROD([floor3, Q(1)]))
roof2 = T(3)(5)(floor2)
roof23D = T(3)(5)(floor23D)

# walls 

verts = [[3,2,0.45],[3,4,0.45], [3,2,4],[3,4,4]]
south = JOIN(AA(MK)(verts))

verts = [[3,2,3],[3,7,3], [3,2,4],[3,7,4]]
usouth = JOIN(AA(MK)(verts))

south = STRUCT([south,(T(2)(3)(south)),usouth])

north = T(1)(10)(south)

verts = [[3,2,0.45],[13,2,0.45],[3,2,4],[13,2,4]]
east = JOIN(AA(MK)(verts))

west = T(2)(5)(east)

verts = [[6.5,2,0.45],[6.5,7,0.45], [6.5,2,4],[6.5,7,4]]
internal = JOIN(AA(MK)(verts))

#top 

verts = [[15.4,0.3,5.15],[15.4,8.7,5.15],[15.4,4.5,6.55]]
tri = JOIN(AA(MK)(verts))

verts =[[0.3,0.3,5.15],[15.7,0.3,5.15],[0.3,4.5,6.55],[15.7,4.5,6.55]]
sid1 = JOIN(AA(MK)(verts))
sid13D = PROD([sid1, Q(0.15)])

verts =[[0.3,8.7,5.15],[15.7,8.7,5.15],[0.3,4.5,6.55],[15.7,4.5,6.55]]
sid2 = JOIN(AA(MK)(verts))
sid23D = PROD([sid2, Q(0.15)]) 

#capitels

x_capx = QUOTE([0.6, -0.4] * 15)
y_capx = QUOTE([0.6, -0.4] * 1)
cap = INSR(PROD) ([x_capx, y_capx, Q(0.15)])
capx1 = ((T([1,2,3])([0.75,0.7,3.85]))(cap))
capx2 = ((T([1,2,3])([0.75,7.7,3.85]))(cap))

x_capy = QUOTE([0.6, -0.4] * 1)
y_capy = QUOTE([0.6, -0.4] * 8)
cap = INSR(PROD) ([x_capy, y_capy, Q(0.15)])
capy1 = ((T([1,2,3])([0.75,0.7,3.85]))(cap))
capy1i = (T(1)(1)(capy1))
capy2 = ((T([1,2,3])([14.75,0.7,3.85]))(cap))
capy2i = (T(1)(-1)(capy2))

#column

def disk2D(p):
	u,v = p
	return [v*COS(u), v*SIN(u)]
domain2D = PROD([INTERVALS(2*PI)(16), INTERVALS(0.25)(3)])
column = (PROD([MAP(disk2D)(domain2D), Q(3.4)]))

pair_x = [T(1)(1), column]
columnx1 = ((T([1,2,3])([1.05,1,0.45]))(STRUCT(NN(13)(pair_x))))
columnx2 = (T(2)(7)(columnx1))

pair_y = [T(2)(1), column]
columny1 = ((T([1,2,3])([1.05,0,0.45]))(STRUCT(NN(8)(pair_y))))
columny2 = (T(1)(14)(columny1))
columny1i = (T(1)(1)(columny1))
columny2i = (T(1)(-1)(columny2))

#struct

steps = STRUCT([(floor13D),(T(3)(0.15)(floor23D)), 
	(T(3)(0.3)(floor33D))])

roof = STRUCT([roof13D, roof23D])

walls = STRUCT([east, west, south, north, internal]);

top = STRUCT([tri,(T(1)(-14.8)(tri)), sid1, sid2]);

cap = STRUCT([capx1, capx2, capy1, capy2, capy1i, capy2i])

column = STRUCT([columnx1, columnx2, columny1, columny2, columny1i,columny2i])

parthenon = STRUCT([COLOR(YELLOW)(steps), COLOR(YELLOW)(walls), COLOR(YELLOW)(roof), COLOR(YELLOW)(top), COLOR(YELLOW)(cap), COLOR(YELLOW)(column)])

#view

VIEW(parthenon)