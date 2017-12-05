var s;
var scl = 10;
var food;
var ai;
var start = false;

window.addEventListener("resize", whenResize);

function whenResize(){
	setup();
}
function setup() {

	var myCanvas = createCanvas(windowWidth, 300);
	myCanvas.parent('myContainer');
	
	ai = new Snake();

	frameRate(20);
	pickLocation();
	
}

function draw() {
  background(245);
  fill(255,0,100);
  rect(food.x,food.y,scl,scl);

  if (start) {
  	if(s.eat(food)){
  		pickLocation();
  	}else{
  		s.death();
  	}

  	s.update();
  	s.show();
  }
  

   if(ai.eat(food)){
  	pickLocation();
  }else{
  	ai.death();
  }

  
  aiMotion();
  
  ai.update();
  ai.show();
  
  
}

function pickLocation(){
	var c = floor(width/scl);
	var r = floor(height/scl);
	food = createVector(floor(random(c)), floor(random(r)));
	food.mult(scl);
}

function aiMotion(){
	if(food.y < ai.y ){
		ai.dir(0,-1);
		if (food.y == ai.y ){
			if(food.x < ai.x ){
				ai.dir(-1,0);
			}else {
				ai.dir(1,0);
			}
		}
	}else if (food.y > ai.y) {
		ai.dir(0,1);
		if (food.y == ai.y  ){
			if(food.x < ai.x ){
				ai.dir(-1,0);
			}else {
				ai.dir(1,0);
			}
		}
	}else{
		if (food.y == ai.y  ){
			if(food.x < ai.x ){
				ai.dir(-1,0);
			}else {
				ai.dir(1,0);
			}
		}
	}
}


function keyPressed() {

	if (keyCode === 87) {
		s.dir(0,-1);
	}else if (keyCode === 83) {
		s.dir(0,1);
	}else if (keyCode === 65) {
		s.dir(-1,0);
	}else if (keyCode === 68) {
		s.dir(1,0);
	}else if (keyCode === 32) {
		start = true;
		s = new Snake();
	}
}

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];

	this.death = function(){
		for (var i = 1 ; i <= this.total; i++ ) {
			var p = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
			if(p<1){
				this.total = 0;
				this.tail = [];
			}
		}
	}

	this.update = function(){
		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x , 0 , width-scl);
		this.y = constrain(this.y , 0 , height-scl);

		for (var i = this.total; i >0; i-- ) {
			this.tail[i] = this.tail[i-1];
		}
		this.tail[0] = createVector(this.x,this.y);
	}
	this.show = function(){
		for (var i = this.total; i >= 0; i-- ) {
			fill(252,106,3);
			rect(this.tail[i].x,this.tail[i].y,scl,scl);
		}
		fill(252,106,3);
		rect(this.x,this.y,scl,scl);
	}

	this.dir = function(x,y){
		this.xspeed = x;
		this.yspeed = y;
	}
	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if(d<0.5){
			this.total++;
			return true;
		}else{
			return false;
		}
	}
}