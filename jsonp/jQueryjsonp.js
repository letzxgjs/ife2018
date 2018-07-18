/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-15 13:11:44
 * @version $Id$
 */

		
$(function(){
	$("#cityname").keyup(function(){
		var city = $("#cityname").val()
		$.ajax({
			url: "http://toy1.weather.com.cn/search?cityname=" + city, 
			type: "POST", 
			dataType: "jsonp", 
			scriptCharset : 'utf-8',
			// jsonp: "cb", //设置了这个, 反而没用了???
			// jsonpCallback: "zxg", 
			// success: zxg,
			success: (data) => zxg(data),
			error: () => console.log('err')
			// success: function(data){
			// 		zxg(data)
			// }, error: function(){
			// 	alert('请求失败')
			// }
		})
	})
})

function zxg(data){
	if ($("ul")) $("ul").remove()
		
	var ul = $("<ul></ul>")
	$.each(data, (i, v) => {
		var ref = v.ref.split("~")
		$("<li></li>")
			.html(`${ref[2]}-${ref.pop()}-${ref.pop()}`)
			.appendTo(ul)
	})
	
	ul.appendTo($("body"))
}