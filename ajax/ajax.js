
// 封装ajax

function ajax(method, url, parameter, callback){
	console.log(method)
	// 创建xhr对象
	var xhr = null
	try{
		xhr = new XMLHttpRequest()
	}catch(e) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP")
	}

	// 编码请求主体
	parameter = encodeData(parameter)
	if (method == 'get' || method == 'GET') {
		console.log('zxg9051')
		url += "?" + parameter
	}
	console.log(url)
	// 发起请求
	xhr.open(method, url)

	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
	// xhr.setRequestHeader('Content-type','application/multipart/form-data')
	// xhr.setRequestHeader('Content-type','application/json')

	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 ) {
			if (xhr.status == 200) {
				// var data = xhr.responseText
				// console.log(data)
				var data = JSON.parse(xhr.responseText)
				callback(data)
				// if (data.status == 1) {
				// 	alert(data.data.code)
				// }
			}else {
				alert('请求失败')
			}
			
		}
	}
console.log(parameter)
	xhr.send(parameter)
}


// 编码请求主体
function encodeData(obj){
		var pair = []
		for(var prop in obj){
			if (!obj.hasOwnProperty(prop)) continue
			if (obj.hasOwnProperty(prop)) {
				pair.push(prop + "=" + obj[prop])
			}
		}
		return pair.join("&")
}

// 输入验证
// 手机号码验证
function valify(node, reg, errmsg) {
	if (!reg.test(node.value)) {
		clearErr(node)
        errInfo(node, errmsg)
        return false
    }else {
    	clearErr(node)
    	return true
    }
}

// 确认密码
function confirmPwd(node1, node2){
	if (node1.value != node2.value) {
    	clearErr(node2)
    	errInfo(node2, '密码不一致! 请重新确认')
    	return false
    }else {
    	clearErr(node2)
    	return true
    }
}


// 错误信息提示
function errInfo(node, errmsg){
    var div = document.createElement("div")
    div.innerHTML = errmsg
    div.style = "color:#f00;"
    div.classList.add('err')
    div.id = node.id + new Date().getTime()
    if (node.nextElementSibling) {
        node.parentNode.insertBefore(div, node.nextElementSibling)
    }else {
        node.parentNode.appendChild(div)
    }
}

// 清除错误信息提示
function clearErr(node){
	if(node.nextElementSibling.classList.contains('err'))
		node.parentNode.removeChild(node.nextElementSibling)
}