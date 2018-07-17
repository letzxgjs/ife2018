/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-03 22:25:17
 * @version $Id$
 */
// 保存地区选取状态
function regionToStore() {
	var regionSave = []
	var len1 = regionSelect.children.length
	for (var i = 0; i < len1; i++) {
		regionSave.push(regionSelect.children[i].checked)
	}
	return JSON.stringify(regionSave)
}

// 保存产品选取状态
function productToStore() {
	var productSave = []
	var len2 = productSelect.children.length
	for (var i = 0; i < len2; i++) {
		productSave.push(productSelect.children[i].checked)
	}
	return JSON.stringify(productSave)
}

// 保存选取的数据
function tableToStore() {
	var dataSave = selectData(sourceData)
	var userInput = []
	var table = tableWrapper.children[0]
	for (var i = 1,len3 = table.children.length; i < len3; i++) {
		var arr = []
		var len4 = table.children[i].children.length
		for(var j = len4 - 12; j < len4; j++){
			arr.push(table.children[i].children[j].children[0].value * 1)
			// dataSave[i].sale[j] = table.children[i].children[j].children[0].value * 1
		}
		userInput.push(arr)
	}
	for(var i = 0, len5 = dataSave.length; i < len5; i++) {
		dataSave[i].sale = userInput[i]
	}
	// 
	return JSON.stringify(dataSave)
}
function store() {
	// 如果localStorage存在, 保存更改
	var regions = regionToStore()	
	var products = productToStore()	
	var tables = tableToStore()	
	localStorage.setItem('regionSave',regions)
	localStorage.setItem('productSave',products)
	localStorage.setItem('dataSave',tables)
}

document.getElementById("btn").addEventListener("click", store)
