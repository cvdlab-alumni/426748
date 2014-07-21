	
	// some global variables
	
	var bumpValue = 0.15;
	var repx = 1;
	var repy = 1;
	var irepx = 1;
	var irepy = 1;
	var hasBump = false;
	var isBack = false;
	var r = [0,0,0];
	var t = [0,0,0];
	
	// functions
	
	function createMesh(geom, imageFile, hasBump, repx, repy, bumpValue) {
        var mat = new THREE.MeshPhongMaterial();
		
		var texture = THREE.ImageUtils.loadTexture("assets/textures/general/" + imageFile + ".jpg")
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(repx,repy);
		mat.map = texture;
		
		if(hasBump){
			var bump = THREE.ImageUtils.loadTexture("assets/textures/general/" + imageFile + "-bump.jpg")
			bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
			bump.repeat.set(repx,repy);
			mat.bumpMap = bump;
			mat.bumpScale = bumpValue;
		}
        
		return new THREE.Mesh(geom, mat);
    }

	function drawShape(points, holes){
		var shape = new THREE.Shape();
		shape.moveTo(points[0][0], points[0][1]);
		for(var i=1;i < points.length;i++){
			shape.lineTo(points[i][0], points[i][1]);
		}
		shape.lineTo(points[0][0], points[0][1]);
		
		for(var j=0;j < holes.length;j++){
			var hole = new THREE.Path();
			hole.moveTo(holes[j][0][0], holes[j][0][1]);
			for(var k=1;k < holes[j].length;k++){
				hole.lineTo(holes[j][k][0], holes[j][k][1]);
			}
			hole.lineTo(holes[j][0][0], points[j][0][1]);
			shape.holes.push(hole);
		}
	  
		return shape;
	}

	function mkWall(obj, geom, texture, t, r, isBack, hasBump, repx, repy, bumpValue){
		var mesh = createMesh(geom, texture, hasBump, repx, repy, bumpValue);
		
		mesh.rotation.set(r[0]*Math.PI, r[1]*Math.PI, r[2]*Math.PI);
	    mesh.position.set(t[0], t[1], t[2]);
		
		if(isBack) mesh.material.side = THREE.BackSide;
	    
		obj.add(mesh);
	}
	
	// create walls
	
	function mkAllWalls(obj){
	  
	  var points = [[0,0],[0,5.6],[22.2,5.6],[22.2,0],[4.4,0],[4.4,4.3],[1.6,4.3],[1.6,0]];	
	  var holes = [[[11.8,2],[14,2],[14,4.2],[11.8,4.2]],
				   [[18.8,2],[21,2],[21,4.2],[18.8,4.2]]];							
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [0,-0.005,0], [0.5,0,0], isBack, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(1.66,0.06,1.2), "largestone", [0.8-0.035,-0.035,0.6],[0,0,0], false, true, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(17.8,0.06,1.2), "largestone", [13.3,-0.035,0.6],[0,0,0], false, true, 13, 1, bumpValue);
	  
	  // muro
	  
	  var points = [[0,0],[0,5.6],[17.8,5.6],[17.8,0],[16.6,0],[16.6,4.6],[9.6,4.6],[9.6,0]];
	  var holes =[[[3.6,2],[5.8,2],[5.8,4.2],[3.6,4.2]]];
				   
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [-0.005,0,0], [0,0.5,0.5], true, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(0.06,1.2,1.2), "largestone", [-0.035,17.2,0.6], [0,0,0], false, true, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(0.06,9.6,1.2), "largestone", [-0.035,4.8,0.6], [0,0,0], false, true, 1, 6, bumpValue);
	  
	  // muro
	  
	  var points = [[0,0],[0,5.6],[10.8,5.6],[10.8,0]];
	  var holes = [[[3.6,2],[5.8,2],[5.8,4.2],[3.6,4.2]]];
					
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [0,17.805,0], [0.5,0,0], true, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(10.835,0.06,1.2), "largestone", [5.3525,17.835,0.6], [0,0,0], false, true, 7, repy, bumpValue);
	  
	  // muro

	  var points = [[0,0],[0,5.6],[2.6,5.6],[2.6,0]];
	  var holes = [];
					
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [10.795,17.805,0], [0,0.5,0.5], true, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(0.06,2.6,1.2), "largestone", [-0.03+10.8,1.3+17.865,0.6], [0,0,0], false, true, 1, 2, bumpValue);
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [22.205,17.805,0], [0,0.5,0.5], isBack, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(0.06,2.6,1.2), "largestone", [-0.03+22.26,1.3+17.865,0.6], [0,0,0], false, true, 1, 2, bumpValue);
	  
	  // muro	  
	  
	  var points = [[0,0],[0,5.6],[11.4,5.6],[11.4,0]];				
	  var holes = [[[0.8,3],[2,3],[2,4.2],[0.8,4.2]],
				   [[7.4,2],[9.6,2],[9.6,4.2],[7.4,4.2]]];					
					
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [10.8,20.405,0], [0.5,0,0], true, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(11.4,0.06,1.2), "largestone", [5.7+10.8,0.03+20.405,0.6], [0,0,0], false, true, 7, repy, bumpValue);

	  // muro
	  
	  var points = [[0,0],[0,5.6],[5.8,5.6],[5.8,0]];
	  var holes = [];
					
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [22.2,17.805,0], [0.5,0,0], true, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(5.86,0.06,1.2), "largestone", [2.935+22.205,0.03+17.805,0.6], [0,0,0], false, true, 4, repy, bumpValue);
	  
	  // muro
	  
	  var points = [[0,0],[0,5.6],[11.8,5.6],[11.8,0]];
	  var holes = [[[1.1,1.2],[2.5,1.2],[2.5,4],[1.1,4]]];
					
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [28.005,6,0], [0,0.5,0.5], isBack, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(0.06,11.8,1.2), "largestone", [28.005+0.03,6+5.9,0.6], [0,0,0], false, true, 1, 8, bumpValue);

	  // muro
	  
	  var points = [[0,0],[0,5.6],[5.8,5.6],[5.8,0],[4,0],[4,4.3],[1.2,4.3],[1.2,0]];	
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [22.2,5.995,0], [0.5,0,0], isBack, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(1.2,0.06,1.2), "largestone", [0.6+22.205,-0.03+5.995,0.6], [0,0,0], false, true, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(1.86,0.06,1.2), "largestone", [0.93+26.205,-0.03+5.995,0.6], [0,0,0], false, true, repx, repy, bumpValue);
	  
	  // muro
	  
	  var points = [[0,0],[0,5.6],[6,5.6],[6,0]];	
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "salmon", [22.205,0,0], [0,0.5,0.5], isBack, hasBump, repx, repy, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(0.06,6,1.2), "largestone", [0.03+22.205,3-0.065,0.6], [0,0,0], false, true, 1, 4, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[8.2,5.6],[8.2,0]];
	  var holes = [[[3,2],[5.2,2],[5.2,4.2],[3,4.2]]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [0.605,0.6,0], [0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[12.2,5.6],[12.2,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [0.6,8.8-0.005,0], [0.5,0,0], false, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[13.8,5.6],[13.8,0],[3.8,0],[3.8,4.3],[1,4.3],[1,0]];
	  var holes =[[[11.2,2],[13.4,2],[13.4,4.2],[11.2,4.2]]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [0.6,0.605,0], [0.5,0,0], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[6,5.6],[6,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.4-0.005,0.6,0], [0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[1.6,5.6],[1.6,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [12.8,6.6-0.005,0], [0.5,0,0], false, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  	  
	  var points = [[0,0],[0,5.6],[2.2,5.6],[2.2,0],[2.1,0],[2.1,4.2],[0.3,4.2],[0.3,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [12.8-0.005,6.6,0], [0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  	  
	  var points = [[0,0],[0,5.6],[10.6,5.6],[10.6,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [0.6,9.005,0], [0.5,0,0], true, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[8.2,5.6],[8.2,0],[7.6,0],[7.6,4.6],[0.6,4.6],[0.6,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [0.605,9,0], [0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[10.6,5.6],[10.6,0]];
	  var holes = [[[3,2],[5.2,2],[5.2,4.2],[3,4.2]]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [0.6,17.195,0], [0.5,0,0], false, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[8.2,5.6],[8.2,0],[2.3,0],[2.3,4.2],[0.5,4.2],[0.5,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [11.195,9,0], [0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[6,5.6],[6,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.605,0.6,0], [0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [21.595,0.6,0], [0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[7,5.6],[7,0],[2,0],[2,4.2],[0.2,4.2],[0.2,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.6,6.595,0], [0.5,0,0], false, false, irepx, irepy, bumpValue);
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.6,9.005,0], [0.5,0,0], true, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[7,5.6],[7,0]];
	  var holes = [[[4.2,2],[6.4,2],[6.4,4.2],[4.2,4.2]]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.6,0.605,0], [0.5,0,0], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[10.8,5.6],[10.8,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.605,9,0], [0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [21.595,9,0], [0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[7,5.6],[7,0]];
	  var holes = [[[3.6,2],[5.8,2],[5.8,4.2],[3.6,4.2]]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.6,19.795,0],[0.5,0,0], false, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[5.2,5.6],[5.2,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [22.2,17.195,0],[0.5,0,0], false, false, irepx, irepy, bumpValue);
	  
	  //iwall
	  
	  var points = [[0,0],[0,5.6],[10.6,5.6],[10.6,0]];
	  var holes = [[[0.5,1.2],[1.9,1.2],[1.9,4],[0.5,4]]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [27.395,6.6,0],[0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[10.6,5.6],[10.6,0],[2.1,0],[2.1,4.2],[0.3,4.2],[0.3,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [22.205,6.6,0],[0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[5.2,5.6],[5.2,0],[4,0],[4,4.3],[1.2,4.3],[1.2,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [22.2,6.605,0],[0.5,0,0], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[2,5.6],[2,0],[1.9,0],[1.9,4.2],[0.1,4.2],[0.1,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [21.595,6.8,0],[0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[2.2,5.6],[2.2,0],[1.9,0],[1.9,4.2],[0.1,4.2],[0.1,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [13.005,6.8,0],[0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[8.6,5.6],[8.6,0],[3.6,0],[3.6,4.2],[1.8,4.2],[1.8,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [13,6.805,0],[0.5,0,0], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[7.2,5.6],[7.2,0],[2.2,0],[2.2,4.2],[0.4,4.2],[0.4,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.4,8.795,0],[0.5,0,0], false, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[3,5.6],[3,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.395,8.8,0],[0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[2.8,5.6],[2.8,0],[2.3,0],[2.3,4.2],[0.5,4.2],[0.5,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [11.405,9,0],[0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[1.6,5.6],[1.6,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [11.4,9.005,0],[0.5,0,0], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[3,5.6],[3,0],[2.4,0],[2.4,4.2],[0.6,4.2],[0.6,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [11.4,11.795,0],[0.5,0,0], false, false, irepx, irepy, bumpValue); 
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [11.4,12.005,0],[0.5,0,0], true, false, irepx, irepy, bumpValue);	  
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[7.8,5.6],[7.8,0]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [11.405,12,0],[0,0.5,0.5], false, false, irepx, irepy, bumpValue);
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [14.395,12,0],[0,0.5,0.5], true, false, irepx, irepy, bumpValue);
	  
	  // iwall
	  
	  var points = [[0,0],[0,5.6],[3,5.6],[3,0],[2.4,0]];
	  var holes =[[[0.2,3],[1.4,3],[1.4,4.2],[0.2,4.2]]];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [11.4,19.795,0],[0.5,0,0], false, false, irepx, irepy, bumpValue); 
	  
	  // floor
	  
	  var points = [[0,0],[0,17.8],[11.4,17.8],[11.4,12],[14.4,12],[14.4,20.4],[22.2,20.4],[22.2,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "granite_alternate", [0,0,0],[0,0,0], false, true, 0.35, 0.35, 0.05); 
	  
	  // floor
	  
	  var points = [[0,0],[0,7.8],[3,7.8],[3,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "black_tiles", [11.4,12,0],[0,0,0], false, true, 0.4, 0.4, 0.05);
	  mkWall(obj, new THREE.BoxGeometry(0.03,7.8,2.8), "black_tiles", [0.015+11.4,3.9+12,1.4],[0,0,0], false, true, 1.5, 3.5, 0.05);
	  mkWall(obj, new THREE.BoxGeometry(0.03,7.8,2.8), "black_tiles", [0.015+14.37,3.9+12,1.4],[0,0,0], false, true, 1.5, 3.5, 0.05);
	  mkWall(obj, new THREE.BoxGeometry(2.94,0.03,2.8), "black_tiles", [1.47+11.43,0.015+19.77,1.4],[0,0,0], false, true, 1.2, 1.5, 0.05);
	  
	  // floor
	  
	  var points = [[0,0],[0,11.8],[5.8,11.8],[5.8,0]];
	  var holes = [];
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "marmo", [22.2,6,0],[0,0,0], false, false, 0.4, 0.4, 0.05);
	  
	  // bathroom box
	  
	  var points = [[0,0],[0,0.6],[3,0.6],[3,0]];
	  
	  mkWall(obj, new THREE.BoxGeometry(3,3.9,0.6), "black_tiles", [12.9,1.95+12+3.9,0.3],[0,0,0], false, true, 1.2, 1.5, 0.05);
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "black_tiles_vert", [11.4,15.895,0],[0.5,0,0], false, true, 1.6, 1.6, 0.05);
	  
	  // roof
	  
	  var points = [[0,0],[0,17.8],[10.8,17.8],[10.8,20.4],[22.2,20.4],[22.2,17.8],[28,17.8],[28,6],[22.2,6],[22.2,0]];								
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "white", [0,0,5.605], [0,0,0], true, hasBump, repx, repy, bumpValue);
	  
	  // fireplace
	  
	  mkWall(obj, new THREE.BoxGeometry(2.4,2,5.6), "white", [1.8,7.8,2.8],[0,0,0], isBack, hasBump, 2, 4, bumpValue);
	  mkWall(obj, new THREE.BoxGeometry(2.8,2.4,0.3), "wood", [2,7.6,1.825],[0,0,0], isBack, hasBump, repx, repy, bumpValue);
	  
	  // picture
	  
	  mkWall(obj, new THREE.BoxGeometry(0.05,4,3), "picture", [27.405,13,2.5],[0,0,0], isBack, true, repx, repy, 0.1);
	  
	  // ground
	  
	  var points = [[-4,-4],[32,-4],[32,24.4],[-4,24.4]];	
	  var holes = [[[0,0],[0,17.8],[10.8,17.8],[10.8,20.4],[22.2,20.4],[22.2,17.8],[28,17.8],[28,6],[22.2,6],[22.2,0]]];	
	  
	  mkWall(obj, new THREE.ShapeGeometry(drawShape(points, holes)), "stone", [0,0,0], [0,0,0], isBack, true, 0.5, 0.5, 0.5);
	  
	  // columns
	  
	  mkWall(obj, new THREE.BoxGeometry(1,1,5.6), "white", [-2.8,-3,2.8],[0,0,0], isBack, true, repx, repy, 0.1);
	  mkWall(obj, new THREE.BoxGeometry(1,1,5.6), "white", [2.8,-2.8,2.8],[0,0,0], isBack, true, repx, repy, 0.1);
	  mkWall(obj, new THREE.BoxGeometry(1,1,5.6), "white", [8.4,-2.8,2.8],[0,0,0], isBack, true, repx, repy, 0.1);
	  mkWall(obj, new THREE.BoxGeometry(1,1,5.6), "white", [-2.8,2.8,2.8],[0,0,0], isBack, true, repx, repy, 0.1);
	  mkWall(obj, new THREE.BoxGeometry(1,1,5.6), "white", [-2.8,8.4,2.8],[0,0,0], isBack, true, repx, repy, 0.1);
	  
	  
	  
	}
	
	
	