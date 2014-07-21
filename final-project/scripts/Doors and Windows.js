	/*function mkObj(geom, texture, t, r, isBack, hasBump, repx, repy, bumpValue){
	  var mesh = createMesh(geom, texture, hasBump, repx, repy, bumpValue);
	  mesh.rotation.set(r[0]*Math.PI, r[1]*Math.PI, r[2]*Math.PI);
	  mesh.position.set(t[0], t[1], t[2]);
      if(isBack) mesh.material.side = THREE.BackSide;
	  return mesh;
	}*/
	
	function mkObj(geom, t, r){
	  var mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({color: 0xa8a8a8}));
	  mesh.rotation.set(r[0]*Math.PI, r[1]*Math.PI, r[2]*Math.PI);
	  mesh.position.set(t[0], t[1], t[2]);
	  return mesh;
	}
	
	function mkObj(geom, t, r, imageFile, hasBump, repx, repy, bumpValue){
	  var mesh = new THREE.Mesh(geom, getMaterial(imageFile, hasBump, repx, repy, bumpValue));
	  mesh.rotation.set(r[0]*Math.PI, r[1]*Math.PI, r[2]*Math.PI);
	  mesh.position.set(t[0], t[1], t[2]);
	  return mesh;
	}
	
	function mkGlass(geom, t, r, imageFile, hasBump, bumpValue){
	  var mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({color:0x00ffed, transparent: true, opacity: 0.7}));
	  
	  mesh.rotation.set(r[0]*Math.PI, r[1]*Math.PI, r[2]*Math.PI);
	  mesh.position.set(t[0], t[1], t[2]);
	  
	  var texture = THREE.ImageUtils.loadTexture("assets/textures/general/" + imageFile + ".jpg");
	  mesh.material.map = texture;
	  
	  if(hasBump){
			var bump = THREE.ImageUtils.loadTexture("assets/textures/general/" + imageFile + "-bump.jpg");
			mesh.material.bumpMap = bump;
			mesh.material.bumpScale = bumpValue;
	  }
	 
	  return mesh;
	}
	
	function getMaterial(imageFile, hasBump, repx, repy, bumpValue) {
        var mat = new THREE.MeshPhongMaterial();
		
		var texture = THREE.ImageUtils.loadTexture("assets/textures/general/" + imageFile + ".jpg");
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(repx,repy);
		mat.map = texture;
		
		if(hasBump){
			var bump = THREE.ImageUtils.loadTexture("assets/textures/general/" + imageFile + "-bump.jpg");
			bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
			bump.repeat.set(repx,repy);
			mat.bumpMap = bump;
			mat.bumpScale = bumpValue;
		}
        
		return mat;
    }	
	
	function difference(mesh, holes, texture, hasBump, repx, repy, bumpValue){
	  var meshCSG = new ThreeBSP(mesh);
	  
	  for(var i=0;i<holes.length;i++){
		  var holeCSG = new ThreeBSP(holes[i]);
		  meshCSG = meshCSG.subtract(holeCSG);
	  }
	  
	  return meshCSG.toMesh(getMaterial(texture, hasBump, repx, repy, bumpValue));
	}
	
	function addHandleBig(obj){
		var handleBody = mkObj(new  THREE.CylinderGeometry(0.125,0.125,0.35,32), [-0.525,0,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		var handlePivot = mkObj(new  THREE.CylinderGeometry(0.025,0.025,0.45,32), [-0.525,0,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		obj.add(handleBody);
		obj.add(handlePivot);
	  
		var handleBarOutdoor = mkObj(new  THREE.BoxGeometry(0.45,0.05,0.07), [0.15,-0.25,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		var handleBarIndoor = mkObj(new  THREE.BoxGeometry(0.45,0.05,0.07), [0.15,0.25,0], [0,0,0], "gold", true, repx, repy, bumpValue);	  
		handlePivot.add(handleBarOutdoor);
		handlePivot.add(handleBarIndoor);
	  
		return handlePivot;
	}
	
	function addHandleSmall(obj, reverse){
		var k = 1;
		if (reverse) k = -1;
	
		var handleBody = mkObj(new  THREE.CylinderGeometry(0.125,0.125,0.25,32), [k*-0.625,0,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		var handlePivot = mkObj(new  THREE.CylinderGeometry(0.025,0.025,0.35,32), [k*-0.625,0,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		obj.add(handleBody);
		obj.add(handlePivot);
	  
		var handleBarOutdoor = mkObj(new  THREE.BoxGeometry(0.45,0.05,0.07), [k*0.15,-0.2,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		var handleBarIndoor = mkObj(new  THREE.BoxGeometry(0.45,0.05,0.07), [k*0.15,0.2,0], [0,0,0], "gold", true, repx, repy, bumpValue);	  
		handlePivot.add(handleBarOutdoor);
		handlePivot.add(handleBarIndoor);
	  
		return handlePivot;
	}

	function addHandleSmallRot(obj, reverse){
		var k = 1;
		if (reverse) k = -1;
	
		var handleBody = mkObj(new  THREE.CylinderGeometry(0.125,0.125,0.25,32), [0,k*0.625,0], [0,0,0.5], "gold", true, repx, repy, bumpValue);
		var handlePivot = mkObj(new  THREE.CylinderGeometry(0.025,0.025,0.35,32), [0,k*0.625,0], [0,0,0.5], "gold", true, repx, repy, bumpValue);
		obj.add(handleBody);
		obj.add(handlePivot);
	  
		var handleBarOutdoor = mkObj(new  THREE.BoxGeometry(0.45,0.05,0.07), [k*-0.15,-0.2,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		var handleBarIndoor = mkObj(new  THREE.BoxGeometry(0.45,0.05,0.07), [k*-0.15,0.2,0], [0,0,0], "gold", true, repx, repy, bumpValue);	  
		handlePivot.add(handleBarOutdoor);
		handlePivot.add(handleBarIndoor);
	  
		return handlePivot;
	}	
	
	function addHandleWin(obj){
		var handleBody = mkObj(new  THREE.CylinderGeometry(0.075,0.075,0.025,32), [0.1625,-0.45,0], [0,0,0.5], "gold", true, repx, repy, bumpValue);
		var handlePivot = mkObj(new  THREE.CylinderGeometry(0.025,0.025,0.055,32), [0.1775,-0.45,0], [0,0,0.5], "gold", true, repx, repy, bumpValue);
		obj.add(handleBody);
		obj.add(handlePivot);
	  
		var handleBar = mkObj(new  THREE.BoxGeometry(0.30,0.05,0.07), [0,-0.0525,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		handlePivot.add(handleBar);
	  
		return handlePivot;
	}
	
	function addHandleWinRot(obj,reverse){
		var k = 1;
		if(reverse) k = -1;
		
		var handleBody = mkObj(new  THREE.CylinderGeometry(0.075,0.075,0.025,32), [k*0.45,k*0.1625,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		var handlePivot = mkObj(new  THREE.CylinderGeometry(0.025,0.025,0.055,32), [k*0.45,k*0.1775,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		obj.add(handleBody);
		obj.add(handlePivot);
	  
		var handleBar = mkObj(new  THREE.BoxGeometry(0.30,0.05,0.07), [0,k*0.0525,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		handlePivot.add(handleBar);
	  
		return handlePivot;
	}
	
	function addHandleBath(obj,reverse){
		var k = 1;
		if(reverse) k = -1;
		
		var handleBody = mkObj(new  THREE.CylinderGeometry(0.035,0.035,0.025,32), [k*0.25,k*0.0625,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		var handlePivot = mkObj(new  THREE.CylinderGeometry(0.015,0.015,0.055,32), [k*0.25,k*0.0775,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		obj.add(handleBody);
		obj.add(handlePivot);
	  
		var handleBar = mkObj(new  THREE.BoxGeometry(0.20,0.035,0.04), [0,k*0.0525,0], [0,0,0], "gold", true, repx, repy, bumpValue);
		handlePivot.add(handleBar);
	  
		return handlePivot;
	}
	
	function mkDaw(house){

	  // primo portone
	  
	  var pivot1 = new THREE.Object3D();
	  pivot1.position.set(1.6,0.3,0);
	  house.add(pivot1);
	  
	  var doorTHREE = mkObj(new THREE.BoxGeometry(1.4,0.3,4.3),[0.7,-0.15,2.15],[0,0,0]);
	  var hole1THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[0.7,-0.15,1.075],[0,0,0]);
	  var hole2THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[0.7,-0.15,3.125],[0,0,0]);
	  var holesTHREE = [hole1THREE, hole2THREE];
	  var door1 = difference(doorTHREE, holesTHREE, "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,-1.075],[0,0,0], "glass", true, 0.05);
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,0.975],[0,0,0], "glass", true, 0.05);
	  
	  door1.add(glass1);
	  door1.add(glass2);
	  
	  pivot1.add(door1);
	  
	  var pivot2 = new THREE.Object3D();
	  pivot2.position.set(4.4,0.3,0);
	  house.add(pivot2);
	  
	  var doorTHREE = mkObj(new THREE.BoxGeometry(1.4,0.3,4.3),[-0.7,-0.15,2.15],[0,0,0]);
	  var hole1THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[-0.7,-0.15,1.075],[0,0,0]);
	  var hole2THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[-0.7,-0.15,3.125],[0,0,0]);
	  var holesTHREE = [hole1THREE, hole2THREE];
	  var door2 = difference(doorTHREE, holesTHREE, "fine wood", true, repx, repy, bumpValue);
	  pivot2.add(door2);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,-1.075],[0,0,0], "glass", true, 0.05);
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,0.975],[0,0,0], "glass", true, 0.05);
	  door2.add(glass1);
	  door2.add(glass2);
	  
	  var handlePivot2 = addHandleBig(door2);
	  
	  door1_open = false;
	  
	  door1.interact =  door2.interact = function(){
						if(door1_open){
							handleAnimation(handlePivot2,0.5,0).start();
							openCloseDoor(pivot1,0).delay(500).start();
							openCloseDoor(pivot2,0).delay(500).start();
							door1_open = false;
							return;
						}
						handleAnimation(handlePivot2,0.5,0).start();
						openCloseDoor(pivot1,0.5).delay(500).start();
						openCloseDoor(pivot2,-0.5).delay(500).start();
						door1_open = true;
					  }	  
					  
	  // secondo portone
	  
	  var pivot3 = new THREE.Object3D();
	  pivot3.position.set(23.4,6.3,0);
	  house.add(pivot3);
	  
	  var doorTHREE = mkObj(new THREE.BoxGeometry(1.4,0.3,4.3),[0.7,-0.15,2.15],[0,0,0]);
	  var hole1THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[0.7,-0.15,1.075],[0,0,0]);
	  var hole2THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[0.7,-0.15,3.125],[0,0,0]);
	  var holesTHREE = [hole1THREE, hole2THREE];
	  var door3 = difference(doorTHREE, holesTHREE, "fine wood", true, repx, repy, bumpValue);
	  pivot3.add(door3);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,-1.075],[0,0,0], "glass", true, 0.05);
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,0.975],[0,0,0], "glass", true, 0.05);
	  door3.add(glass1);
	  door3.add(glass2);
	  
	  var pivot4 = new THREE.Object3D();
	  pivot4.position.set(26.2,6.3,0);
	  house.add(pivot4);
	  
	  var doorTHREE = mkObj(new THREE.BoxGeometry(1.4,0.3,4.3),[-0.7,-0.15,2.15],[0,0,0]);
	  var hole1THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[-0.7,-0.15,1.075],[0,0,0]);
	  var hole2THREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.4),[-0.7,-0.15,3.125],[0,0,0]);
	  var holesTHREE = [hole1THREE, hole2THREE];
	  var door4 = difference(doorTHREE, holesTHREE, "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,-1.075],[0,0,0], "glass", true, 0.05);
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.4),[0,0,0.975],[0,0,0], "glass", true, 0.05);
	  
	  door4.add(glass1);
	  door4.add(glass2);
	  
	  pivot4.add(door4);
	  
	  var handlePivot4 = addHandleBig(door4);
	  
	  door3_open = false;
	  
	  door3.interact =  door4.interact = function(){
						if(door3_open){
							handleAnimation(handlePivot4,0.5,0).start();
							openCloseDoor(pivot3,0).delay(500).start();
							openCloseDoor(pivot4,0).delay(500).start();
							door3_open = false;
							return;
						}
						handleAnimation(handlePivot4,0.5,0).start();
						openCloseDoor(pivot3,0.5).delay(500).start();
						openCloseDoor(pivot4,-0.5).delay(500).start();
						door3_open = true;
						}
	  
	  // porta salotto
	  
	  var pivot5 = new THREE.Object3D();
	  pivot5.position.set(12.8,8.7,0);
	  house.add(pivot5);
	  
	  var door5 = mkObj(new THREE.BoxGeometry(0.2,1.8,4.2),[0.1,-0.9,2.10],[0,0,0], "medium wood", true, repx, repy, bumpValue);
	  
	  pivot5.add(door5); 
	  
	  var handlePivot5 = addHandleSmallRot(door5, true);

	  door5_open = false;
	  
	  door5.interact =  function(){
						if(door5_open){
							handleAnimationSmallRot(handlePivot5,-0.5,0).start();
							openCloseDoor(pivot5,0).delay(500).start();
							door5_open = false;
							return;
						}
						handleAnimationSmallRot(handlePivot5,-0.5,0).start();
						openCloseDoor(pivot5,-0.49).delay(500).start();
						door5_open = true;
						}	  
	  
	  // porta garage
	  
	  var pivot6 = new THREE.Object3D();
	  pivot6.position.set(11.2,9.5,0);
	  house.add(pivot6);
	  
	  var door6 = mkObj(new THREE.BoxGeometry(0.2,1.8,4.2),[0.1,0.9,2.10],[0,0,0], "medium wood", true, repx, repy, bumpValue);
	  
	  pivot6.add(door6); 
	  
	  var handlePivot6 = addHandleSmallRot(door6, false);

	  door6_open = false;
	  
	  door6.interact =  function(){
						if(door6_open){
							handleAnimationSmallRot(handlePivot6,0.5,0).start();
							openCloseDoor(pivot6,0).delay(500).start();
							door6_open = false;
							return;
						}
						handleAnimationSmallRot(handlePivot6,0.5,0).start();
						openCloseDoor(pivot6,0.5).delay(500).start();
						door6_open = true;
						}	

	  // porta scale
	  
	  var pivot7 = new THREE.Object3D();
	  pivot7.position.set(22,8.7,0);
	  house.add(pivot7);
	  
	  var door7 = mkObj(new THREE.BoxGeometry(0.2,1.8,4.2),[0.1,-0.9,2.10],[0,0,0], "medium wood", true, repx, repy, bumpValue);
	  
	  pivot7.add(door7); 
	  
	  var handlePivot7 = addHandleSmallRot(door7, true);

	  door7_open = false;
	  
	  door7.interact =  function(){
						if(door7_open){
							handleAnimationSmallRot(handlePivot7,-0.5,0).start();
							openCloseDoor(pivot7,0).delay(500).start();
							door7_open = false;
							return;
						}
						handleAnimationSmallRot(handlePivot7,-0.5,0).start();
						openCloseDoor(pivot7,-0.49).delay(500).start();
						door7_open = true;
						}	

	  // porta bagno
	  
	  var pivot8 = new THREE.Object3D();
	  pivot8.position.set(13.8,12,0);
	  house.add(pivot8);
	  
	  var door8 = mkObj(new THREE.BoxGeometry(1.8,0.2,4.2),[-0.9,-0.1,2.10],[0,0,0], "medium wood rot", true, repx, repy, bumpValue);
	  
	  pivot8.add(door8); 
	  
	  var handlePivot8 = addHandleSmall(door8, false);

	  door8_open = false; 
	  
	  door8.interact =  function(){
						if(door8_open){
							handleAnimation(handlePivot8,0.5,0).start();
							openCloseDoor(pivot8, 0).delay(500).start();
							door8_open = false;
							return;
						}
						handleAnimation(handlePivot8,0.5,0).start();
						openCloseDoor(pivot8,-0.5).delay(500).start();
						door8_open = true;
						}
						
	  // porta stanzetta 					
	  
	  var pivot9 = new THREE.Object3D();
	  pivot9.position.set(14.8,6.6,0);
	  house.add(pivot9);
	  
	  var door9 = mkObj(new THREE.BoxGeometry(1.8,0.2,4.2),[0.9,0.1,2.10],[0,0,0], "medium wood rot", true, repx, repy, bumpValue);
	  
	  pivot9.add(door9); 
	  
	  var handlePivot9 = addHandleSmall(door9, true);

	  door9_open = false; 
	  
	  door9.interact =  function(){
						if(door9_open){
							handleAnimation(handlePivot9,-0.5,0).start();
							openCloseDoor(pivot9, 0).delay(500).start();
							door9_open = false;
							return;
						}
						handleAnimation(handlePivot9,-0.5,0).start();
						openCloseDoor(pivot9,-0.5).delay(500).start();
						door9_open = true;
						}
	  
	  // porta stanza della legna
	  
	  var pivot10 = new THREE.Object3D();
	  pivot10.position.set(14.8,9,0);
	  house.add(pivot10);
	  
	  var door10 = mkObj(new THREE.BoxGeometry(1.8,0.2,4.2),[0.9,-0.1,2.10],[0,0,0], "medium wood rot", true, repx, repy, bumpValue);
	  
	  pivot10.add(door10); 
	  
	  var handlePivot10 = addHandleSmall(door10, true);

	  door10_open = false; 
	  
	  door10.interact =  function(){
						if(door10_open){
							handleAnimation(handlePivot10,-0.5,0).start();
							openCloseDoor(pivot10,0).delay(500).start();
							door10_open = false;
							return;
						}
						handleAnimation(handlePivot10,-0.5,0).start();
						openCloseDoor(pivot10,0.5).delay(500).start();
						door10_open = true;
						}
						
	  // finestra salotto ovest
	  
	  var pivot11 = new THREE.Object3D();
	  pivot11.position.set(0.4,3.6,2);
	  house.add(pivot11);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(0.3,1.1,2.2),[-0.15,0.55,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.3,0.7,1.8),[-0.15,0.55,1.1],[0,0,0]);
	  var win1 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.2,0.7,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win1.add(glass1);
	  
	  pivot11.add(win1);
	  
	  var pivot12 = new THREE.Object3D();
	  pivot12.position.set(0.4,5.8,2);
	  house.add(pivot12);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(0.3,1.1,2.2),[-0.15,-0.55,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.3,0.7,1.8),[-0.15,-0.55,1.1],[0,0,0]);
	  var win2 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.2,0.7,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win2.add(glass2);
	  
	  pivot12.add(win2);
	  
	  var handlePivot12 = addHandleWin(win2);
	  
	  win1_open = false;
	  
	  win1.interact =  win2.interact = function(){
						if(win1_open){
							handleAnimationWin(handlePivot12,0).delay(1000).start();
							openCloseDoor(pivot11,0).start();
							openCloseDoor(pivot12,0).start();
							win1_open = false;
							return;
						}
						handleAnimationWin(handlePivot12,-0.5).start();
						openCloseDoor(pivot11,-0.5).delay(500).start();
						openCloseDoor(pivot12,0.5).delay(500).start();
						win1_open = true;
					  }
	  
	  // finestra salotto sud
	  
	  var pivot13 = new THREE.Object3D();
	  pivot13.position.set(11.8,0.4,2);
	  house.add(pivot13);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[0.55,-0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[0.55,-0.15,1.1],[0,0,0]);
	  var win3 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win3.add(glass1);
	  
	  pivot13.add(win3);
	  
	  var pivot14 = new THREE.Object3D();
	  pivot14.position.set(14,0.4,2);
	  house.add(pivot14);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[-0.55,-0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[-0.55,-0.15,1.1],[0,0,0]);
	  var win4 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win4.add(glass2);
	  
	  pivot14.add(win4);
	  
	  var handlePivot14 = addHandleWinRot(win3,false);
	  
	  win4_open = false;
	  
	  win3.interact =  win4.interact = function(){
						if(win4_open){
							handleAnimationWinRot(handlePivot14,0).delay(1000).start();
							openCloseDoor(pivot13,0).start();
							openCloseDoor(pivot14,0).start();
							win4_open = false;
							return;
						}
						handleAnimationWinRot(handlePivot14,-0.5).start();
						openCloseDoor(pivot13,0.5).delay(500).start();
						openCloseDoor(pivot14,-0.5).delay(500).start();
						win4_open = true;
					  }
					  
	  // finestra stanzetta
	  
	  var pivot15 = new THREE.Object3D();
	  pivot15.position.set(18.8,0.4,2);
	  house.add(pivot15);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[0.55,-0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[0.55,-0.15,1.1],[0,0,0]);
	  var win5 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win5.add(glass1);
	  
	  pivot15.add(win5);
	  
	  var pivot16 = new THREE.Object3D();
	  pivot16.position.set(21,0.4,2);
	  house.add(pivot16);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[-0.55,-0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[-0.55,-0.15,1.1],[0,0,0]);
	  var win6 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win6.add(glass2);
	  
	  pivot16.add(win6);
	  
	  var handlePivot16 = addHandleWinRot(win5,false);
	  
	  win6_open = false;
	  
	  win5.interact =  win6.interact = function(){
						if(win6_open){
							handleAnimationWinRot(handlePivot16,0).delay(1000).start();
							openCloseDoor(pivot15,0).start();
							openCloseDoor(pivot16,0).start();
							win6_open = false;
							return;
						}
						handleAnimationWinRot(handlePivot16,-0.5).start();
						openCloseDoor(pivot15,0.5).delay(500).start();
						openCloseDoor(pivot16,-0.5).delay(500).start();
						win6_open = true;
					  }
					  
	  // finestra garage
	  
	  var pivot17 = new THREE.Object3D();
	  pivot17.position.set(3.6,17.4,2);
	  house.add(pivot17);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[0.55,0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[0.55,0.15,1.1],[0,0,0]);
	  var win7 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win7.add(glass1);
	  
	  pivot17.add(win7);
	  
	  var pivot18 = new THREE.Object3D();
	  pivot18.position.set(5.8,17.4,2);
	  house.add(pivot18);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[-0.55,0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[-0.55,0.15,1.1],[0,0,0]);
	  var win8 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win8.add(glass2);
	  
	  pivot18.add(win8);
	  
	  var handlePivot18 = addHandleWinRot(win8,true);
	  
	  win8_open = false;
	  
	  win7.interact =  win8.interact = function(){
						if(win8_open){
							handleAnimationWinRot(handlePivot18,0).delay(1000).start();
							openCloseDoor(pivot17,0).start();
							openCloseDoor(pivot18,0).start();
							win8_open = false;
							return;
						}
						handleAnimationWinRot(handlePivot18,0.5).start();
						openCloseDoor(pivot17,-0.5).delay(500).start();
						openCloseDoor(pivot18,0.5).delay(500).start();
						win8_open = true;
					  }	

	  // finestra stanza legna
	  
	  var pivot19 = new THREE.Object3D();
	  pivot19.position.set(18.2,20,2);
	  house.add(pivot19);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[0.55,0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[0.55,0.15,1.1],[0,0,0]);
	  var win9 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win9.add(glass1);
	  
	  pivot19.add(win9);
	  
	  var pivot20 = new THREE.Object3D();
	  pivot20.position.set(20.4,20,2);
	  house.add(pivot20);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(1.1,0.3,2.2),[-0.55,0.15,1.1],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.7,0.3,1.8),[-0.55,0.15,1.1],[0,0,0]);
	  var win10 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.7,0.2,1.8),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win10.add(glass2);
	  
	  pivot20.add(win10);
	  
	  var handlePivot20 = addHandleWinRot(win10,true);
	  
	  win10_open = false;
	  
	  win9.interact =  win10.interact = function(){
						if(win10_open){
							handleAnimationWinRot(handlePivot20,0).delay(1000).start();
							openCloseDoor(pivot19,0).start();
							openCloseDoor(pivot20,0).start();
							win10_open = false;
							return;
						}
						handleAnimationWinRot(handlePivot20,0.5).start();
						openCloseDoor(pivot19,-0.5).delay(500).start();
						openCloseDoor(pivot20,0.5).delay(500).start();
						win10_open = true;
					  }
	  
	  // finestra bagno
	  
	  var pivot21 = new THREE.Object3D();
	  pivot21.position.set(11.6,20,3);
	  house.add(pivot21);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(0.6,0.1,1.2),[0.3,0.05,0.6],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.4,0.1,1),[0.3,0.05,0.6],[0,0,0]);
	  var win11 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.4,0.06,1),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win11.add(glass1);
	  
	  pivot21.add(win11);
	  
	  var pivot22 = new THREE.Object3D();
	  pivot22.position.set(12.8,20,3);
	  house.add(pivot22);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(0.6,0.1,1.2),[-0.3,0.05,0.6],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.4,0.1,1),[-0.3,0.05,0.6],[0,0,0]);
	  var win12 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass2 = mkGlass(new THREE.BoxGeometry(0.4,0.06,1),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win12.add(glass2);
	  
	  pivot22.add(win12);
	  
	  var handlePivot22 = addHandleBath(win12,true);
	  
	  win12_open = false;
	  
	  win11.interact =  win12.interact = function(){
						if(win12_open){
							handleAnimationWinRot(handlePivot22,0).delay(1000).start();
							openCloseDoor(pivot21,0).start();
							openCloseDoor(pivot22,0).start();
							win12_open = false;
							return;
						}
						handleAnimationWinRot(handlePivot22,0.5).start();
						openCloseDoor(pivot21,-0.5).delay(500).start();
						openCloseDoor(pivot22,0.5).delay(500).start();
						win12_open = true;
					  }
					  
	  // finestra scale
	  
	  var pivot23 = new THREE.Object3D();
	  pivot23.position.set(27.6,7.1,1.2);
	  house.add(pivot23);
	  
	  var windowTHREE = mkObj(new THREE.BoxGeometry(0.3,1.4,2.8),[0.15,0.7,1.4],[0,0,0]);
	  var holeTHREE = mkObj(new THREE.BoxGeometry(0.3,1,2.4),[0.15,0.7,1.4],[0,0,0]);
	  var win13 = difference(windowTHREE, [holeTHREE], "fine wood", true, repx, repy, bumpValue);
	  
	  var glass1 = mkGlass(new THREE.BoxGeometry(0.2,1,2.4),[0,0,0],[0,0,0], "glass", true, 0.05);
	  
	  win13.add(glass1);
	  
	  pivot23.add(win13);
	  
	  /*win13_open = false;
	  
	  win13.interact = function(){
						if(win13_open){
							openCloseDoor(pivot23,0).start();
							win13_open = false;
							return;
						}
						openCloseDoor(pivot23,0.5).start();
						win13_open = true;
					  }*/
					  
	  // garage (parte sinistra da fuori della casa)
	  
	  var pivotL1 = mkObj(new THREE.CylinderGeometry(0.075,0.075,4.6),[0.075,16.525,2.3],[0.5,0,0], "metal-rust", hasBump, repx, repy, bumpValue);
	  house.add(pivotL1);
	  
	  var doorGL1 = mkObj(new THREE.BoxGeometry(0.15,1.6,4.6),[0,0,0.875],[-0.5,0,0], "sonoma", true, repx, repy, 0.05);
	  pivotL1.add(doorGL1);
	  
	  var pivotL2 = mkObj(new THREE.CylinderGeometry(0.075,0.075,4.6),[0,-0.875,0],[0.5,0,0], "metal-rust", hasBump, repx, repy, bumpValue);
	  doorGL1.add(pivotL2);
	  
	  var doorGL2 = mkObj(new THREE.BoxGeometry(0.15,1.6,4.6),[0,0,0.875],[-0.5,0,0], "sonoma", true, repx, repy, 0.05);
	  pivotL2.add(doorGL2);
	  
	  // garage (parte destra da fuori della casa)
	  
	  var pivotR1 = mkObj(new THREE.CylinderGeometry(0.075,0.075,4.6),[0.075,9.675,2.3],[0.5,0,0], "metal-rust", hasBump, repx, repy, bumpValue);
	  house.add(pivotR1);
	  
	  var doorGR1 = mkObj(new THREE.BoxGeometry(0.15,1.6,4.6),[0,0,-0.875],[-0.5,0,0], "sonoma", true, repx, repy, 0.05);
	  pivotR1.add(doorGR1);
	  
	  var pivotR2 = mkObj(new THREE.CylinderGeometry(0.075,0.075,4.6),[0,0.875,0],[0.5,0,0], "metal-rust", hasBump, repx, repy, bumpValue);
	  doorGR1.add(pivotR2);
	  
	  var doorGR2 = mkObj(new THREE.BoxGeometry(0.15,1.6,4.6),[0,0,-0.875],[-0.5,0,0], "sonoma", true, repx, repy, 0.05);
	  pivotR2.add(doorGR2);
	  
	  garage_open = false
	  
	  doorGL1.interact = doorGL2.interact =
	  doorGR1.interact = doorGR2.interact = function(){
						if(garage_open){
							openCloseGarage(pivotL2, pivotL1, 0, 0).start();
							openCloseGarage(pivotR2, pivotR1, 0, 0).start();
							garage_open = false;
							return;
						}
						openCloseGarage(pivotL1, pivotL2, -0.7, -0.5).start();
						openCloseGarage(pivotR1, pivotR2, 0.7, 0.5).start();
						garage_open = true;
					  }	  
	  
	  // tutti gli apribili 
	  
	  var interactive = [pivot1, pivot2, pivot3, pivot4, pivot5, pivot6, pivot7, pivot8, pivot9, 
	               pivot10, pivot11, pivot12, pivot13, pivot14, pivot15, pivot16, pivot17, 
				   pivot18, pivot19, pivot20, pivot21, pivot22,
				   pivotL1,pivotL2,pivotR1,pivotR2];
				   
	  return interactive;
	}