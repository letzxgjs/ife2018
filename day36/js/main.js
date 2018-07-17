/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-02 16:46:14
 * @version $Id$
 */
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
			var sale = tdSale.innerHTML * 1
			trData.push(sale)
			// trData.push(tar.children[tar.children.length - i].innerHTML * 1)
		}
	return trData.reverse()
}

// 设置表格事件监听函数
form.addEventListener('change', renderTableAndChart)

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
		var max = getMaxValue(monthSale)
		var zChart = new ZChart(monthSale)
		// 绘制条形图
		var svg = document.getElementById("svg");
		ctx.clearRect(0, 0, 500, 300);
		zChart.drawSVG(svg, zChart.data)
		zChart.drawCanvas(zChart.data, '#ff0000')
	}
}

// 鼠标移出
// tableWrapper.addEventListener('mouseout',renderTableAndChart)
tableWrapper.onmouseleave = function(e) {
	if (e.target.tagName.toLowerCase() != 'td') {
		// 不知道为什么目标对象没有table, 把包裹table的div设置为inline-block了
		renderTableAndChart()
	}
}