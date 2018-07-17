/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-30 09:03:31
 * @version $Id$
 */

var canvas = document.querySelector("canvas")
var ctx = canvas.getContext('2d')
var grassWidth = canvas.width
var grassHeight = canvas.height
var scale = 0.96 * Math.min(grassWidth / 105, grassHeight / 68)
// var scale = 0.95 * Math.min(grassWidth / width, grassHeight / height)
// 绘制草坪
ctx.fillStyle = '#3EC635'
ctx.fillRect(0, 0, grassWidth, grassHeight);


// 球场类
function Field(width, height) {
	// this.scale = Math.min(grassWidth / (width+4), grassHeight / (height+2))
	this.width = width * scale
	this.height = height * scale
}

Field.prototype.draw = function (){
	// var scale = this.scale
	var gate = 7.32 * scale
	var innerPenaltyWidth = 5.5 * scale
	var innerPenaltyHeight = gate + 2 * innerPenaltyWidth
	var penaltyAreaWidth = 16.5 * scale
	var penaltyAreaHeight = 40.3 * scale
	var xStart = (grassWidth - this.width) / 2
	var yStart = (grassHeight - this.height) / 2
	var yInnerPenaltyStart = (grassHeight - gate)/2 - innerPenaltyWidth
	var yPenaltyAreaStart = (grassHeight - penaltyAreaHeight) / 2
	ctx.strokeStyle = "#fff";
	ctx.strokeRect(xStart, yStart, this.width, this.height);
	// 左边小禁区
	ctx.beginPath();
	ctx.moveTo(xStart, yInnerPenaltyStart);
	ctx.lineTo(xStart+innerPenaltyWidth, yInnerPenaltyStart);
	ctx.lineTo(xStart+innerPenaltyWidth, yInnerPenaltyStart + innerPenaltyHeight);
	ctx.lineTo(xStart, yInnerPenaltyStart + innerPenaltyHeight);
	ctx.stroke();
	// 左边大禁区
	ctx.beginPath();
	ctx.moveTo(xStart, yPenaltyAreaStart);
	ctx.lineTo(xStart+penaltyAreaWidth, yPenaltyAreaStart);
	ctx.lineTo(xStart+penaltyAreaWidth, yPenaltyAreaStart + penaltyAreaHeight);
	ctx.lineTo(xStart, yPenaltyAreaStart + penaltyAreaHeight);
	ctx.stroke();
	// 左禁区弧顶
	ctx.beginPath();
	ctx.arc(xStart + 11*scale, grassHeight/2, 9.15*scale, -0.29*Math.PI, 0.29*Math.PI);
	ctx.stroke();
	// 左点球点
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(xStart + 11*scale, grassHeight/2, scale*0.4, 0, 2*Math.PI)
	ctx.fill();


	// 右边小禁区
	ctx.beginPath();
	ctx.moveTo(grassWidth-xStart, yInnerPenaltyStart);
	ctx.lineTo(grassWidth-xStart-innerPenaltyWidth, yInnerPenaltyStart);
	ctx.lineTo(grassWidth-xStart-innerPenaltyWidth, yInnerPenaltyStart + innerPenaltyHeight);
	ctx.lineTo(grassWidth-xStart, yInnerPenaltyStart + innerPenaltyHeight);
	ctx.stroke();
	// 右边大禁区
	ctx.beginPath();
	ctx.moveTo(grassWidth-xStart, yPenaltyAreaStart);
	ctx.lineTo(grassWidth-xStart-penaltyAreaWidth, yPenaltyAreaStart);
	ctx.lineTo(grassWidth-xStart-penaltyAreaWidth, yPenaltyAreaStart + penaltyAreaHeight);
	ctx.lineTo(grassWidth-xStart, yPenaltyAreaStart + penaltyAreaHeight);
	ctx.stroke();
	// 右禁区弧顶
	ctx.beginPath();
	ctx.arc(grassWidth-xStart - 11*scale, grassHeight/2, 9.15*scale, 0.71*Math.PI, -0.71*Math.PI);
	ctx.stroke();
	// 右点球点
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(grassWidth-xStart - 11*scale, grassHeight/2, scale*0.4, 0, 2*Math.PI)
	ctx.fill();

	// 左上角球点
	ctx.beginPath();
	ctx.arc(xStart, yStart, 1*scale, 0, 0.5*Math.PI);
	ctx.stroke();
	// 左下角球点
	ctx.beginPath();
	ctx.arc(xStart, grassHeight - yStart, 1*scale, 1.5*Math.PI, 2*Math.PI);
	ctx.stroke();
	// 右上角球点
	ctx.beginPath();
	ctx.arc(grassWidth - xStart, yStart, 1*scale, 0.5*Math.PI, 1*Math.PI);
	ctx.stroke();
	// 右下角球点
	ctx.beginPath();
	ctx.arc(grassWidth - xStart, grassHeight - yStart, 1*scale, 1*Math.PI, 1.5*Math.PI);
	ctx.stroke();

	// 中线
	ctx.beginPath();
	ctx.moveTo(grassWidth/2, yStart);
	ctx.lineTo(grassWidth/2, grassHeight-yStart);
	ctx.stroke();
	// 中圈
	ctx.beginPath();
	ctx.arc(grassWidth/2, grassHeight/2, 9.15*scale, 0, 2*Math.PI);
	ctx.stroke();
}

// 创建球场实例
var field = new Field(105, 68)
field.draw()

// 随机生成能力指数
function random(){
	return num = Math.floor(Math.random() * 98) + 1;
}


// 能力指数换算
function indexConvert(num, min, max){
	return min + (num - 1) * (max - min) / 98
}





// 球员
function Footballer(x, y, speed, strength, skill, shot, stamina, explosive){
	this.xBegin = x * scale
	this.yBegin = y * scale
	this.speed = indexConvert(speed, 3, 12)/* * scale / 60*/
	this.strength = strength
	this.skill = skill
	this.shot = shot
	this.stamina = indexConvert(stamina, 10, 15)
	this.explosive = indexConvert(explosive, 4, 1)
	this.acceleration = this.speed / this.explosive
	this.vx = 0
	this.vy = 0
}



Footballer.prototype.draw = function (){
	ctx.fillStyle = "#f00";
	ctx.beginPath();
	ctx.arc(this.xBegin, this.yBegin, 1*scale, 0, 2*Math.PI);
	ctx.fill();
}


// var vx = vy = 0;
Footballer.prototype.move = function step(x, y){
	var xEnd = x * scale
	var yEnd = y * scale
	if(this.xBegin <= xEnd){
		var dx = xEnd - this.xBegin
		var dy = yEnd - this.yBegin
		var distance = Math.sqrt(dx*dx + dy*dy)
		var ax = this.acceleration * dx / distance
		var ay = this.acceleration * dy / distance
		// console.log(this.speed * dx / distance * scale / 60)
		if (this.vx <= this.speed * dx / distance * scale / 60) {
			this.vx += ax * scale / 60
			this.vy += ay * scale / 60
		}else{
			this.vx = this.speed * dx / distance * scale / 60
			this.vy = this.speed * dy / distance * scale / 60
		}
		this.xBegin += this.vx
		this.yBegin += this.vy

		// requestAnimationFrame(step)
	}else {
		cancelAnimationFrame(step)
	}
}


// 球类
function Ball(x, y) {
	this.x = x * scale
	this.y = y * scale
}

Ball.prototype.draw = function (){
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	ctx.arc(this.x, this.y, scale/2, 0, 2 * Math.PI);
	ctx.stroke();
}


// 球移动的参数
var acc = -2;
var v0 = 12
var v = v0
var i = 0
// 球移动的方法
Ball.prototype.move = function roll(angle/*, v0*/){
	// var v = v0;
	if (v * v0 >0) {
		v += acc / 60
		// console.log(++i, v)
		// debugger
		var vx = v * Math.cos(angle*Math.PI/180)
		var vy = v * Math.sin(angle*Math.PI/180)
		this.x += vx * scale / 60
		this.y += vy * scale / 60

		// 为什么在这里启动requestAnimationFrame会使得一帧耗时1ms???
		// requestAnimationFrame(roll)
	}else {
		v = 0
		cancelAnimationFrame(roll)
	}
}

var ball = new Ball(5, 5);




// var foo = new Footballer(10, 15, 99, 89, 89, 56, 87, 28)

// foo.draw()
// foo.move(100, 60)
// requestAnimationFrame(foo.move)
var footballes = []


function loop(){
	ctx.fillStyle = "#3EC635";
	ctx.fillRect(0, 0, grassWidth, grassHeight);
	field.draw()
	

	while(footballes.length < 10){
		var foo = new Footballer(random(), random(), random(), random(), 
			random(), random(), random(), random())
		footballes.push(foo)
	}

	for (var i = 0, len = footballes.length; i < len; i++) {
	    footballes[i].draw()
		footballes[i].move(grassWidth/scale-13, grassHeight/scale/2)
	}
	
	// var foo2 = new Footballer(10, 10, 99, 99, 99, 99, 99, 99)
	// 错误!! 每帧foo2对象的位置都在(10, 10), 不动
	// foo.draw()
	// foo.move(82, 15)
	
	ball.move(30, 10)

	ball.draw()


	requestAnimationFrame(loop);
}

loop()



























