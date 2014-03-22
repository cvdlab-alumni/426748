from pyplasm import *

verts = [[0,0],[16,0],[16,9],[0,9]]
floor1 = JOIN(AA(MK)(verts))

verts = [[0.3,0.3],[15.7,0.3],[15.7,8.7],[0.3,8.7]]
floor2 = JOIN(AA(MK)(verts))

verts = [[0.6,0.6],[15.4,0.6],[15.4,8.4],[0.6,8.4]]
floor3 = JOIN(AA(MK)(verts))

steps = STRUCT([COLOR(WHITE)(floor1), COLOR(BLUE)(T(3)(0.15)(floor2)), 
	COLOR(GREEN)(T(3)(0.3)(floor3))])

roof = STRUCT([COLOR(ORANGE)(T(3)(4)(floor3)),
	COLOR(PURPLE)(T(3)(5)(floor2))])
 
parthenon = STRUCT([steps, roof])

VIEW(parthenon)