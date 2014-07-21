var path = 'assets/models/';

function load3DModels(imageFile, house, t, r, s) {
    var loader = new THREE.OBJMTLLoader();
    loader.addEventListener('load', function (event) {
		object = event.content;
		mesh = object;
        object.position.set(t[0],t[1],t[2]);
        object.rotation.set(r[0]*Math.PI,r[1]*Math.PI,r[2]*Math.PI);
	    object.scale.set(s[0],s[1],s[2]);
        house.add(mesh);
    });
    loader.load(path + imageFile + ".obj", 
	            path + imageFile + ".mtl", 
			    {side: THREE.DoubleSide});
}

function mk3DModels(house){

    var loader = new THREE.OBJLoader();
    loader.load('assets/models/master_without_floor.obj', function (obj) {
		global_o = obj;
		var material = new THREE.MeshLambertMaterial({color: 0xaaaaaa});
        material.side = THREE.DoubleSide;
		material.shading = THREE.FlatShading;
        obj.children[0].material = material;
        mesh = obj.children[0];
		mesh.position.set(0,0,-0.1);
        house.add(mesh);
    });
	
	//[0,0,0], [0,0,0], [1,1,1]);
	
	load3DModels('largeCouch', house, [7.5,-12.15,0.7], [-0.5,0,0], [0.6,-0.75,0.75]);
	load3DModels('fireplace', house, [1.75,6.4375,0.2], [0.5,0,0], [0.35,0.4,0.35]);
	load3DModels('singleChair', house, [-2,21.5,0.5], [0.5,0,0], [0.6,0.6,0.6]);
	load3DModels('singleChair', house, [-12,-2,0.5], [0.5,0.5,0], [0.6,0.6,0.6]);
	load3DModels('dining_room', house, [8,8.4,0], [0.5,0,0], [0.015,0.0225,0.015]);
	load3DModels('dishwasher', house, [13.75,6.025,0.5], [0.5,1.5,0], [0.2,0.25,0.175]);
	load3DModels('red drawers', house, [13.75,2.045,1.5], [0.5,1.5,0], [0.5,0.5,0.5]);
	load3DModels('red cabinet', house, [13.75,3.35,1.5], [0.5,1.5,0], [0.5,0.5,0.5]);
	load3DModels('stove1', house, [13.75,1.1,1.5], [0.5,1.5,0], [0.24,0.25,0.19]);
	load3DModels('upper cabinet', house, [13.8,7.45,3], [0.5,1.5,0], [-0.4,-0.4,0.4]);
	load3DModels('upper cabinet', house, [13.8,3.55,3], [0.5,1.5,0], [0.4,-0.4,0.4]);
	load3DModels('upper cabinet', house, [13.8,5.34,3], [0.5,1.5,0], [-0.4,-0.4,0.4]);
	load3DModels('upper cabinet', house, [13.8,1.44,3], [0.5,1.5,0], [0.4,-0.4,0.4]);
	load3DModels('table', house, [8,5.5,0], [0.5,0,0], [0.025,0.025,0.025]);
	load3DModels('meubleChevet', house, [10.25,1.5,1.15], [0.5,-0.5,0], [0.025,0.04,0.025]);
	load3DModels('monitorLCD', house, [9,2.8,3.29], [0.5,-0.75,0], [2,2,2]);
	load3DModels('car', house, [5.8,12.7,0.5], [0.5,0.5,0], [0.35,0.35,0.35]);
	load3DModels('toilet', house, [11.5,19.1,0.6], [0.5,0.5,0], [0.0175,0.0175,0.0175]);
	load3DModels('washbasin', house, [11.5,16.5,0.6], [0.5,0.5,0], [0.0175,0.0175,0.0175]);
	load3DModels('bidet', house, [12,18.6,0.6], [0.5,0.5,0], [0.0175,0.0175,0.0175]);
	load3DModels('mirror', house, [11.425,16.55,3.3], [0.5,0.5,0], [0.035,0.035,0.035]);
	load3DModels('shower', house, [14.385,12.8,0.6], [0.5,0.5,0], [0.0175,0.0175,0.0175]);
	load3DModels('washing machine', house, [12,15.2,0.6], [0.5,0.5,0], [0.0175,0.0175,0.0175]);
	load3DModels('largebed', house, [12.15,12.3,0], [0.5,0.5,0], [0.0225,0.0225,0.0225]);
	load3DModels('wardrobe', house, [19.2,9.65,0], [0.5,1,0], [0.0175,0.0175,0.0175]);
	load3DModels('bedsideTable', house, [15,12,0], [0.5,0.5,0], [0.02,0.02,0.02]);
	load3DModels('bedsideTable', house, [15,17.6,0], [0.5,0.5,0], [0.02,0.02,0.02]);
	load3DModels('blueBed', house, [30,10.8,0], [0.5,1.5,0], [0.0225,0.0225,0.0225]);
	load3DModels('blueBedSide', house, [30.7,10.8,0], [0.5,1.5,0], [0.0225,0.0225,0.0225]);
	load3DModels('bureau', house, [16.2,1.35,0.85], [0.5,1,0], [0.0225,0.0225,0.0225]);
	//load3DModels('hood', house, [13.8,1.45,3.2], [0.5,1.5,0], [0.6,1.1,0.7]);
}