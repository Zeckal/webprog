var theMines= new Array();
var state = new Array();
var mineCount = 0;
var blocksLeft = 2;
for (var i = 0; i < 100; i++) state[i] = 0;
for (var i=0; i<10; i++)
{
	myNum = Math.floor((Math.random()*100));	//this has a chance to not produce 10 mines, as some will be added to the same box ~andrew
	if (theMines.indexOf(myNum) == -1 ) {		//Thus we need to count the mines in play to see how many are actually added
		theMines[i] = myNum;
		mineCount = mineCount + 1;
	}
}
//console.log(theMines);
//console.log(state);

function loadgame() {	
	var mycanvas = document.getElementById("mineswiper");
	var context = mycanvas.getContext("2d");
	
	$(mycanvas).bind('contextmenu', function(e){
		return false;
	});

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
	//var clickx = document.getElementById('clickx');
	//var clicky = document.getElementById('clicky');
	var mycanvas = document.getElementById("mineswiper");
	var context = mycanvas.getContext("2d");
	
	canvx = event.pageX - mycanvas.offsetLeft;
	canvy = event.pageY - mycanvas.offsetTop;

	realx = Math.floor(((Math.floor(canvx/40)*40)+20)/40);
	realy = Math.floor(((Math.floor(canvy/40)*40)+20)/40);

        var pos = (10 * realy) + realx;
        //console.log(pos);	

	//clickx.innerText=canvx;
	//clicky.innerText=canvy;

	if(evt.button === 0) {
		if((100 - blocksLeft) < mineCount){ //check to see if there are only as many blocks as their are mines left
			//GameWin();
			context.beginPath();
			context.arc(200,200,100,0,2*Math.PI);
			context.fillStyle="#ffff00";
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(200,200,75,0,Math.PI);
			context.fillStyle="#000000";
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(200,200,70,0,Math.PI);
			context.fillStyle="#ffff00";
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(150,150,20,Math.PI,2*Math.PI);
			context.fillStyle="#000000";
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(250,150,20,Math.PI,2*Math.PI);
			context.fillStyle="#000000";
			context.fill();
			context.stroke();
			}
		drawmine(canvx, canvy);
        }

	if(evt.button === 2) {
        	if (state[pos] === 0) {
			context.clearRect((Math.floor(canvx/40)*40)+10,(Math.floor(canvy/40)*40)+10,20,20);  
			context.beginPath();
			context.rect((Math.floor(canvx/40)*40)+10,(Math.floor(canvy/40)*40)+10,20,20);
			context.fillStyle = "red";
			context.fill();
          		state[pos] = 1; 
		}
       		else if (state[pos] === 1) {
			context.clearRect((Math.floor(canvx/40)*40)+10,(Math.floor(canvy/40)*40)+10,20,20);
			context.beginPath();
			context.rect((Math.floor(canvx/40)*40)+10,(Math.floor(canvy/40)*40)+10,20,20);
			context.fillStyle = "black";
			context.fill();
          		state[pos] = 2; 
		}
        	else if (state[pos] === 2) {
			context.clearRect((Math.floor(canvx/40)*40)+10,(Math.floor(canvy/40)*40)+10,20,20);
			context.beginPath();
			context.rect((Math.floor(canvx/40)*40)+10,(Math.floor(canvy/40)*40)+10,20,20);
			context.fillStyle = "white";
			context.fill();
       		   	state[pos] = 0; 
		}
	}
}

function drawmine(locx,locy) {
	myx = (Math.floor(locx/40)*40)+20;
	myy = (Math.floor(locy/40)*40)+20;
	var pos = (10 * realy) + realx;
	if(state[pos] != -1){	//don't recount or repaint the same squares
		if (getifMine(locx,locy)) {
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
			
			//GameLose();
			context.beginPath();
			context.arc(200,200,100,0,2*Math.PI);
			context.fillStyle="#ffff00";
			context.fill();
			context.stroke();
			context.beginPath();
			context.moveTo(175,200);
			context.lineTo(225,225);
			context.fillStyle="#000000";
			context.stroke();
			context.beginPath();
			context.moveTo(225,200);
			context.lineTo(175,225);
			context.fillStyle="#000000";
			context.stroke();
			context.beginPath();
			context.arc(150,150,20,0,Math.PI);
			context.fillStyle="#000000";
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(250,150,20,0,Math.PI);
			context.fillStyle="#000000";
			context.fill();
			context.stroke();
		}
		else {
			adjMines(locx,locy);
			blocksLeft = blocksLeft + 1;
		}
		state[pos] = -1;
	}
}

function getifMine(locx,locy) {
	myx = (Math.floor(locx/40)*40)+20;
	myy = (Math.floor(locy/40)*40)+20;

	for (var i=0; i<10; i++)
	{
		if ( Math.floor(myx/40) + (10*Math.floor(myy/40)) == theMines[i] ) {
			return true;
		}
	}
	
	return false;
}

function adjMines(locx,locy) {
	myx = (Math.floor(locx/40)*40)+20;
	myy = (Math.floor(locy/40)*40)+20;
	mycellx = Math.floor(myx/40);
	mycelly = Math.floor(myy/40);
	
	var adjMine = 0;
	
	for (var x = mycellx - 1; x <= mycellx + 1; x++)
	{
		if ( x >= 0 && x <= 9) {
		for (var y = mycelly - 1; y <= mycelly + 1; y++)
		{
			if ( y >= 0 && y <= 9) {
			for (var mine = 0; mine < 10; mine++)
			{
				if ( x + (y*10) == theMines[mine] ) {
					adjMine++;
				}
			}
			}
		}
		}
	}

	var mycanvas = document.getElementById("mineswiper");
	var context = mycanvas.getContext("2d");
	
	context.beginPath();
	context.rect(myx-20,myy-20,40,40);
	context.fillStyle = "gray";
	context.fill();

	if (adjMine) {
		context.font = "bold 12pt sans-serif";
		context.textBaseline = "middle";
		context.textAlign = "center";
		context.fillStyle = "black";
		context.fillText(adjMine,myx,myy);
	}
}


function GameWin() {
	context.beginPath();
	context.arc(200,200,100,0,2*Math.PI);
	context.fillStyle="#ffff00";
	context.fill();
	context.stroke();
	context.beginPath();
	context.arc(200,200,75,0,Math*PI);
	context.fillStyle="#000000";
	context.fill();
	context.stroke();
	context.beginPath();
	context.arc(200,200,70,0,Math*PI);
	context.fillStyle="#ffff00";
	context.fill();
	context.stroke();
	context.beginPath();
	context.arc(150,150,20,0,Math.PI);
	context.fillStyle="#000000";
	context.fill();
	context.stroke();
	context.beginPath();
	context.arc(250,150,20,0,Math.PI);
	context.fillStyle="#000000";
	context.fill();
	context.stroke();
}

function GameLose() {
	context.beginPath();
	context.arc(200,200,100,0,2*Math.PI);
	context.fillStyle="#ffff00";
	context.fill();
	context.stroke();
	context.beginPath();
	context.moveTo(175,200);
	context.lineTo(225,225);
	context.fillStyle="#000000";
	context.stroke();
	context.beginPath();
	context.moveTo(225,200);
	context.lineTo(175,225);
	context.fillStyle="#000000";
	context.stroke();
	context.beginPath();
	context.arc(150,150,20,0,Math.PI);
	context.fillStyle="#000000";
	context.fill();
	context.stroke();
	context.beginPath();
	context.arc(250,150,20,0,Math.PI);
	context.fillStyle="#000000";
	context.fill();
	context.stroke();

}