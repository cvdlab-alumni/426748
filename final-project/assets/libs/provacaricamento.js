function mk3DModels(){
	var loaderOBJ = new THREE.OBJLoader();
	var loaderOBJ_MTL = new THREE.OBJMTLLoader();
	
	function mkObj(geom, t, r, imageFile, hasBump, repx, repy, bumpValue){
	  var mesh = new THREE.Mesh(geom, getMaterial(imageFile, hasBump, repx, repy, bumpValue));
	  mesh.rotation.set(r[0]*Math.PI, r[1]*Math.PI, r[2]*Math.PI);
	  mesh.position.set(t[0], t[1], t[2]);
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
	
	function loadOBJ(path, imageFile, t, r, s, hasBump, repx, repy, bumpValue){	
		loaderObj.load(path, function (obj) {
		global_o = obj;
		var mesh = mkObj(obj.children[0].geometry, t, r, imageFile, hasBump, repx, repy, bumpValue);
		mesh.scale.set(s[0],s[1],s[2]);
		return mesh;
      });
	};	
	
	function loadOBJMTL(path_obj, path_mtl, t, r, s){	
		loaderOBJ_MTL.load(path_obj, path_mtl, function (obj) {
		global_o = obj;
		var mesh = obj.children[0];
		mesh.position.set(t[0],t[1],t[2]);
		mesh.rotation.set(r[0],r[1],r[2]);
		mesh.scale.set(s[0],s[1],s[2]);
		return mesh;
      });
	};