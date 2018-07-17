/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-02 16:46:14
 * @version $Id$
 */

window.onload = function() {
	if (localStorage.length) {
		var checkboxRegion = JSON.parse(localStorage.getItem("regionSave"))
		var checkboxProduct = JSON.parse(localStorage.getItem("productSave"))
		var tableData = JSON.parse(localStorage.getItem("dataSave"))

		var len1 = regionSelect.children.length
		for (var i = 0; i < len1; i++) {
			regionSelect.children[i].checked = checkboxRegion[i]
		}

		var len2 = productSelect.children.length
		for (var i = 0; i < len2; i++) {
			productSelect.children[i].checked = checkboxProduct[i]
		}

		tableWrapper.appendChild(createTable(tableData))
	}
}

function tableChange(e) {
	var target = e.target
	if (target.tagName.toLowerCase() === 'input') {
		if ((typeof (target.value * 1)) != 'number' || target.value * 1 == 0) {
			alert('please enter a number!')
		}
	}
}

function edit(e) {
	
}
tableWrapper.addEventListener('change',tableChange)
tableWrapper.addEventListener('mouseenter',tableChange)
// tableWrapper.onblur = tableChange


function ZChart(data) {
	this.data = data
}
ZChart.prototype.drawSVG = createBarChart
ZChart.prototype.drawCanvas = createLineChart

// 获取要绘制的数据
function getData(td) {
	var trData = []
	// 获取鼠标指向的行
	var tr = td.parentNode
	for (var i = 0; i < 12; i++){
			var tdSale = tr.children[tr.children.length - i -1]
			// tdSale.classList.add('selected')
			var sale = tdSale.getElementsByTagName("input")[0].value * 1
			trData.push(sale)
			// trData.push(tar.children[tar.children.length - i].innerHTML * 1)
		}
	return trData.reverse()
}

// 事件处理函数, 获取数据并绘制条形图
tableWrapper.onmouseover = function(e) {
	var target = e.target
	if (target.tagName.toLowerCase() === 'td') {
		// 设置样式
		// 所有表格数据清除样式
		var alltds = target.parentNode.parentNode.querySelectorAll('td')
		for (var i = 0, len = alltds.length; i < len; i++) {
			alltds[i].classList.remove('selected')
		}
		// 为选择的数据添加样式
		var tds = target.parentNode.querySelectorAll('td')
		for (var i = 0, lens = tds.length; i < 12; i++) {
			tds[lens - i - 1].classList.add('selected')
		}
		// 获取数据, 实例化对象
		var monthSale = getData(target)
		var zChart = new ZChart(monthSale)
		// 绘制条形图
		var svg = document.getElementById("svg");

		zChart.drawSVG(svg, zChart.data)
		zChart.drawCanvas(zChart.data)
	}
}
