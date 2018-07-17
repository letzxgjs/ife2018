window.onload = function(){
	var mobile = document.getElementById("mobile")
	var nickname = document.getElementById('nickname')
	var pwd = document.getElementById('pwd')
	var pwd2 = document.getElementById('pwd2')
	var code = document.getElementById('code')
	var sendsms = document.getElementById('sendsms')
	var submit = document.getElementById('submit')
	// console.log(mobile)
	
	mobile.onfocus = function(){
        mobile.onblur = function(){
            valify(mobile, /^1\d{10}$/, "输入手机号码错误! 请重新输入")
        }
    }
    nickname.onfocus = function(){
        nickname.onblur = function(){
            valify(nickname, /^\w{3,20}$/, "输入密码格式错误! 请重新输入")
        }
    }
	pwd.onfocus = function(){
        pwd.onblur = function(){
            valify(pwd, /^\w{6,}$/, "输入密码格式错误! 请重新输入")
        }
    }
	pwd2.onfocus = function(){
        pwd2.onblur = function(){
            confirmPwd(pwd, pwd2)
        }
    }
	
	
	sendsms.onclick = function(){
		// var mobile = document.getElementById("mobile").value
		var url = "sendsms.php"
		// url += "?" + "mobile=" + mobile
		// ajax("GET", url, mobile, sms)
		var para = {}
		para.mobile = mobile.value
		para.nickname = nickname.value
		para.pwd = pwd.value
		para.pwd2 = pwd2.value
		var err1 = valify(mobile, /^1\d{10}$/, "输入手机号码错误! 请重新输入");
		console.log(err1)
		if (err1) {
			// ajax("get", url, para, sms)
			ajax("GET", url, para, sms)
			// ajax("POST", url, para, sms)
		}
	}

	submit.onclick = function() {
		var url = "register.php"
		var  para = {}
		para.mobile = mobile.value
		para.nickname = nickname.value
		para.code = code.value
		para.pwd = pwd.value
		para.pwd2 = pwd2.value
		var err1 = valify(mobile, /^1\d{10}$/, "输入手机号码错误! 请重新输入")
		var err2 = valify(nickname, /^\w{3,20}$/, "输入密码格式错误! 请重新输入")
		var err3 = valify(pwd, /^\w{6,}$/, "输入密码格式错误! 请重新输入")
		var err4 = confirmPwd(pwd, pwd2)
		if(err1*err2*err3*err4){
			// ajax("POST", url, para, regi)
			ajax("GET", url, para, regi)
		}
		
	}
}


// 获取短信验证码
function sms(data){
	if (data.status == 1) {
		alert("验证码: "+data.data.code)
	}
}

// 注册
function regi(data){
	if (data.status == 1) {
		var nickname = document.getElementById('nickname').value

		// alert("注册成功: \n"+data.data.code)
		alert(`注册成功: \n
			用户名: ${nickname}\n
			请保管好密码
			`)
		// 跳转到登入页面
		location.assign("login.html")
		// location.assign("http://web.li-shang-bin.com/#/user/userinfo")
	}
}














