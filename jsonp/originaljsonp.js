// http://toy1.weather.com.cn/search?cityname=tj
// http://toy1.weather.com.cn/search?cityname=tj&callback=jQuery182044145281880473886_1528960964758&_=1528961007469
// 
// 
window.onload = function(){
	var inp = document.getElementById("cityname")
	inp.onkeyup = function(){

		var city = inp.value
		var url = "http://toy1.weather.com.cn/search?cityname="
		url += city + "&callback=zxg"
		// 插入script元素
		var script = document.createElement("script")
		
		// 这里定义回调函数, 报错
		// function zxg(data){
		// 	alert(typeof data)
		// 	script.parentNode.removeChild(script)
		// }
		
		// 本示例不设置charset会出现乱码,  指定utf-8就不会了
		script.charset="utf-8"
		script.src = url

		document.body.appendChild(script)
	}
}
// 回调函数, 在事件处理函数内声明时, 会报错zxg is not function
// 回调函数须更发送请求分离, 
function zxg(data){
	// data.setContentType("text/javascript;charset=utf-8");
	if (document.body.querySelector("ul")) {
			document.body.removeChild(document.body.querySelector("ul"))
	}
	var ul = document.createElement("ul")
	var len = data.length
	for(var i=0; i<len;i++){
		var li = document.createElement("li")
		var ref = data[i].ref.split('~')
		li.innerHTML = `${ref[2]}-${ref.pop()}-${ref.pop()}`
		ul.appendChild(li)
	}
	document.body.appendChild(ul)
	var script = document.getElementsByTagName("script")[0]
	script.parentNode.removeChild(script)
}