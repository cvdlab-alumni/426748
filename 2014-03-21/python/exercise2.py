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

verts =[[0.3,8.7,5.15],[15.7,8.7,5.15],[0.3,4.5,6.55],[15.7,4.5,6.55]]
sid2 = JOIN(AA(MK)(verts))

#struct 
#can you see 3D model of steps and roof substituting x with x3D: (EX floor1 -> floor13D)

steps = STRUCT([COLOR(WHITE)(floor1), COLOR(BLUE)(T(3)(0.15)(floor2)), 
	COLOR(GREEN)(T(3)(0.3)(floor3))])

roof = STRUCT([COLOR(ORANGE)(roof1),
	COLOR(PURPLE)(roof2)])

walls = STRUCT([east, west, south, north, internal]);

top = STRUCT([tri,(T(1)(-14.8)(tri)), sid1, sid2]);

parthenon = STRUCT([COLOR(YELLOW)(steps), COLOR(YELLOW)(walls), COLOR(YELLOW)(roof), COLOR(YELLOW)(top)])

#view

VIEW(parthenon)