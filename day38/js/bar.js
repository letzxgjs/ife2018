/**
 * bar.js
 * @authors Your Name (you@example.org)
 * @date    2018-05-31 20:55:09
 * @version $Id$
 */
var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
function createBarChart(foo,data) {
	for (var i = foo.children.length - 1; i >= 0; i--) {
		// �õ�����ʱ��, i=10, foo.children[10]��������, �ᱨ��
		foo.removeChild(foo.children[i])
	}
	var chartAreaHeight = 300
	var chartAreaWidth = 520
	var axisXWidth = 390
	var axisYHeight = 260
	var barWidth = 25
	var barGap = 15
	var barColor = '#ff0000'
	var max = data.reduce(function (x, y) { return (x > y ? x : y) })
	var barHeigthRatio = axisYHeight / max * 0.9
	// ���ƺ��ᡢ����
	var axisX = makeSVG('line', {x1:"10", y1:axisYHeight,x2:"520",y2:axisYHeight,stroke:'blue',strokeWidth:"1"})
	foo.appendChild(axisX)
	var axisY = makeSVG('line', {x1:"10", y1:"10",x2:"10",y2:axisYHeight,stroke:'blue',strokeWidth:"1"})
	foo.appendChild(axisY)
	for (var i = 0, len = data.length; i < len; i++) {
		var atts = {}
		atts.x = 25 + i * (barWidth + barGap)
		atts.y = axisYHeight - data[i] * barHeigthRatio
		atts.width = barWidth
		atts.height = data[i] * barHeigthRatio
		atts.fill = barColor
		var rect = makeSVG('rect', atts);
		// console.log(rect)
		foo.appendChild(rect)
	}
}

// ����svg��Ԫ��
function makeSVG(tag, attributes) {
	var ele = document.createElementNS(svgns, tag)
	for (var attribute in attributes) {
		ele.setAttribute(attribute, attributes[attribute])
	}
	return ele
}
