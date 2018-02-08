window.onload = function() {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 512;
	canvas.height = 480;
	canvas.border = 1;
	ctx.rect(20, 20, 150, 100);
	ctx.stroke();
	document.body.appendChild(canvas);
}