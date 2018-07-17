/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-02 16:30:41
 * @version $Id$
 */
var form = document.getElementById("sel")
var regionSelect = document.getElementById("region-select")
var productSelect = document.getElementById("product-select")
var tableWrapper = document.getElementById("table-wrapper")
function CheckBox(container) {
	container.addEventListener('click', function (e) {
		var target = e.target
			// 如果是checkbox
		if(target.type == 'checkbox'){
				//如果是全选checkbox
			if(target.getAttribute('data-checkbox-type') == 'all'){
				// console.log(target.getAttribute('data-checkbox-type'))
				target.checked = true
				for(var i = 1; i < target.parentNode.children.length; i++){
					target.parentNode.children[i].checked = true
				}
			}else {
				// 如果不是全选checkbox
				if (!target.checked && checkStatus(target) == 0) {
					// 1 如果是仅有的一个选上的
					target.checked = true
					// 阻止事件默认行为
					e.preventDefault()
					// return false
				}else if(target.checked && checkStatus(target) == target.parentNode.children.length - 1){
					// 2 如果是仅有的一个未选, 则选上, 且选上全选那个checkbox
					target.checked = true
					target.parentNode.children[0].checked = true
				}else {
					target.parentNode.children[0].checked = false
				}
			}
		}
	})
}

// 判断checked数目
function checkStatus(c){
	var num = 0
	for(var i = 1; i < c.parentNode.children.length; i++){
		// if(c.parentNode.children[i].checked = true){
		if(c.parentNode.children[i].checked){
			num++
		}
	}
	return num
}

// 获取选中的checkbox的value
function getSelectedCheckboxValue(container){
	var selectedCheckboxValue = []
	for(var i = 1; i < container.children.length; i++){
		if(container.children[i].checked){
			selectedCheckboxValue.push(container.children[i].value)
		}
	}
	return selectedCheckboxValue
}
// 调用生成checkbox逻辑函数, 使checkbox符合需求
CheckBox(regionSelect)
CheckBox(productSelect)

// 根据select选取数据
function selectData(source) {
	// var region = regionSelect.getAttribute('data-selected')
	// var product = productSelect.getAttribute('data-selected')
	var region = getSelectedCheckboxValue(regionSelect)
	var product = getSelectedCheckboxValue(productSelect)
	// console.log(region.push('11111111'))
	var selectedData = []
	if(region.length * product.length){
		// 如果地区和商品都有选中
		for(var i = 0; i < source.length; i++){
			// 遍历原始数据
			for(var j = 0; j < region.length; j++){
				// 比较地区是否匹配
				if (source[i].region == region[j]) {
					for(var k = 0; k < product.length; k++){
						// 比较商品是否匹配
						if (source[i].product == product[k]) {
							// 添加地区和商品都匹配的数据
							selectedData.push(source[i])
						}
					}
				}
			}
		}
		if(selectedData.length){
			// console.log(selectedData)
			return selectedData
		}
	}
}

function createTable(data) {
	// var adjust = adjustData(regionSelect, productSelect)
	var regionNum = checkStatus(regionSelect.children[1])
	var productNum = checkStatus(productSelect.children[1])
	var table = document.createElement('table')
	var thead = document.createElement('thead')
	
	if(regionNum == 1 && productNum > 1){
		var tableHead = ['地区','商品','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		var rows = productNum
		var switching = true
	} else {
		var tableHead = ['商品','地区','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		var rows = regionNum
	}
	// 创建表头
	for(var i = 0; i < 14; i++){
		var th = document.createElement('th')
		th.innerHTML = tableHead[i]
		thead.appendChild(th)
	}
	table.appendChild(thead)
	// 创建行列
	if(data){
		for(var i = 0;i < data.length; i++){
			var tr = document.createElement('tr')
			for(var j = 0; j < 14; j++){
				var td = document.createElement('td')
				if(j == 0){
					// 有需要合并的
					if(i % rows == 0){
						td.innerHTML = switching ? data[i].region : data[i].product
						// 新分类第一个合并rows个单元格
						td.setAttribute('rowspan', rows)
					}
				}else if(j ==1){
					// var td = document.createElement('td')
					td.innerHTML = switching ? data[i].product : data[i].region
				}else {
					// var td = document.createElement('td')
					var inp = document.createElement('input')
					inp.type = 'number'
					inp.value = data[i].sale[j-2]
					td.appendChild(inp)
				}
				// 最后, 如果td内容不为空, td插入tr
				if (td.innerHTML != '') {
					tr.appendChild(td)
				}
			}
			table.appendChild(tr)
		}
		return table
	}
}

// 设置表格事件监听函数
form.addEventListener('change', function () {
	// var  = selectData()
	// 把之前的table删除
	if (tableWrapper.children[0]) {
		tableWrapper.removeChild(tableWrapper.children[0])
		// tableWrapper.removeChild(tableWrapper.childNodes[0])
	}
	// 新table
	var datas = selectData(sourceData)
	if (createTable(datas)) {
		tableWrapper.appendChild(createTable(datas))
	}
})