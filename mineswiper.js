function loadgame() {	
	var mycanvas = document.getElementById("mineswiper");
	var context = mycanvas.getContext("2d");
	
	for (var i=1; i<10; i++)
	{
		context.beginPath();
		context.moveTo(0,i*40);
		context.lineTo(400,i*40);
		context.stroke();
		
		context.beginPath();
		context.moveTo(i*40,0);
		context.lineTo(i*40,400);
		context.stroke();
	}

	mycanvas.addEventListener("mousedown", minesclick,false);
}

function minesclick(evt) {
	var clickx = document.getElementById('clickx');
	var clicky = document.getElementById('clicky');
	var mycanvas = document.getElementById("mineswiper");
	
	canvx = event.pageX - mycanvas.offsetLeft;
	canvy = event.pageY - mycanvas.offsetTop;
	
	//clickx.innerText=canvx;
	//clicky.innerText=canvy;
	
	drawmine(canvx, canvy);
}

function drawmine(locx,locy) {
	myx = (Math.floor(locx/40)*40)+20
	myy = (Math.floor(locy/40)*40)+20
	
	var mycanvas = document.getElementById("mineswiper");
	var context = mycanvas.getContext("2d");
	context.beginPath();
	context.arc(myx,myy,10,0,2*Math.PI);
	context.fillStyle="black";
	context.fill();
	
	context.beginPath();
	context.moveTo(myx-15,myy-15);
	context.lineTo(myx+15,myy+15);
	context.stroke();
	context.beginPath();
	context.moveTo(myx+15,myy-15);
	context.lineTo(myx-15,myy+15);
	context.stroke();
	context.beginPath();
	context.moveTo(myx-15,myy);
	context.lineTo(myx+15,myy);
	context.stroke();
	context.beginPath();
	context.moveTo(myx,myy-15);
	context.lineTo(myx,myy+15);
	context.stroke();
}
