/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-02 21:19:23
 * @version $Id$
 */
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')
function createLineChart(data) {
	// for (var i = foo.children.length - 1; i >= 0; i--) {
	// 	// 用递增的时候, i=10, foo.children[10]不存在了, 会报错
	// 	foo.removeChild(foo.children[i])
	// }
	ctx.clearRect(0, 0, 500, 270);
	// var chartAreaHeight = 300
	// var chartAreaWidth = 520
	var axisXWidth = 390
	var axisYHeight = 260
	var pointBetween = 40
	var max = data.reduce(function (x, y) { return (x > y ? x : y) })
	var barHeigthRatio = axisYHeight / max * 0.9

	// 绘制横轴、纵轴
	ctx.beginPath();
	ctx.strokeStyle = 'black'
	ctx.moveTo(20, 0);
	ctx.lineTo(20, axisYHeight);
	ctx.lineTo(500, axisYHeight);
	ctx.stroke();
	// 遍历数据
	// 画折线
	ctx.beginPath();
	ctx.moveTo(40, axisYHeight - data[0] * barHeigthRatio);
	ctx.strokeStyle = "red";
	for (var i = 1, len = data.length; i < len; i++) {
		var x = pointBetween + i * pointBetween
		var y = axisYHeight - data[i] * barHeigthRatio
		ctx.lineTo(x, y);
	}
	ctx.stroke()
	// 画数据点
	ctx.beginPath();
	ctx.fillStyle = "blue";
	for (var i = 0, len = data.length; i < len; i++) {
		var x = pointBetween + i * pointBetween
		var y = axisYHeight - data[i] * barHeigthRatio
		ctx.moveTo(x, y);
		ctx.arc(x, y, 4, 0, Math.PI*2);
	}
	ctx.fill();
}