function mkVideo(){

	var videoTV = new THREE.Object3D();

	var $video = $('#video');
	$video.hide();
    var video = $video[0];
	video.pause();
	   
	texture = new THREE.Texture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    texture.generateMipmaps = false;
	   
	function createVideo (geom) {
		materialArray = [];
        materialArray.push(new THREE.MeshBasicMaterial({ color: 0x000000  }));
        materialArray.push(new THREE.MeshBasicMaterial({ color: 0x000000  }));
        materialArray.push(new THREE.MeshBasicMaterial({ color: 0x000000  }));
        materialArray.push(new THREE.MeshBasicMaterial({ color: 0x000000   }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: texture }));
        materialArray.push(new THREE.MeshBasicMaterial({ color: 0x000000  }));
        var faceMaterial = new THREE.MeshFaceMaterial(materialArray);

        mesh = new THREE.Mesh(geom, faceMaterial);

        return mesh;
    }
        
	planeVideo = createVideo(new THREE.BoxGeometry(1.2, 0.86, 0.005));
	planeVideo.position.set(10.25,1.55,2.82);
	planeVideo.rotation.set(0.5*Math.PI,-0.75*Math.PI,0)

	var time = 0;
		
	planeVideo.interact = function(){
		if(video.currentTime == time){
		   planeVideo.material.materials[4].map = texture;
		   video.play();
		}
		else{
		   time = video.currentTime;
		   video.pause();
		   planeVideo.material.materials[4].map = THREE.ImageUtils.loadTexture("assets/textures/TVoff.jpg");
		}
	};
		
	videoTV.add(planeVideo);
	return videoTV;
};