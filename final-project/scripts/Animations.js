// apertura portone 1

function openCloseDoor(pivot, alpha){
	return new TWEEN.Tween(pivot.rotation)
		.to({z: alpha*Math.PI}, 1000)
		.easing(TWEEN.Easing.Linear.None);
}

function handleAnimation(pivot, alpha, beta){
	var animation = new TWEEN.Tween(pivot.rotation)
		.to({y: beta*Math.PI}, 500)
		.delay(1000)
		.easing(TWEEN.Easing.Linear.None);
		
	return new TWEEN.Tween(pivot.rotation)
		.to({y: alpha*Math.PI}, 500)
		.easing(TWEEN.Easing.Linear.None)
		.chain(animation);
}

function handleAnimationSmallRot(pivot, alpha, beta){
	var animation = new TWEEN.Tween(pivot.rotation)
		.to({x: beta*Math.PI}, 500)
		.delay(1000)
		.easing(TWEEN.Easing.Linear.None);
		
	return new TWEEN.Tween(pivot.rotation)
		.to({x: alpha*Math.PI}, 500)
		.easing(TWEEN.Easing.Linear.None)
		.chain(animation);
}

function handleAnimationWin(pivot, alpha){
	return new TWEEN.Tween(pivot.rotation)
		.to({x: alpha*Math.PI}, 500)
		.easing(TWEEN.Easing.Linear.None);
}

function handleAnimationWinRot(pivot, alpha){
	return new TWEEN.Tween(pivot.rotation)
		.to({y: alpha*Math.PI}, 500)
		.easing(TWEEN.Easing.Linear.None);
}

function openCloseGarage(pivot1, pivot2, alpha, beta){
	var animation = new TWEEN.Tween(pivot1.rotation)
		.to({y: alpha*Math.PI}, 1000)
		.easing(TWEEN.Easing.Linear.None);
	
	return new TWEEN.Tween(pivot2.rotation)
		.to({y: beta*Math.PI}, 1000)
		.easing(TWEEN.Easing.Linear.None)
		.chain(animation);
}
	