window.onload = function() {
    var mobile = document.getElementById("mobile")
    var pwd = document.getElementById("pwd")
    var submit = document.getElementById("submit")
    var lis = document.querySelector("header ul li")

    lis.onclick = function(e){
        var target = e.target
        if(target.tagName.toLowerCase() === 'li'){
            var alink = target.querySelector("a").href
            console.log(alink)
            location.assign(alink)
        }
    }
    mobile.onfocus = function(){
        mobile.onblur = function(){
            valify(mobile, /^1\d{10}$/, "输入手机号码错误! 请重新输入")
        }
    }


    submit.onclick = function(e) {

        var url = 'login.php'
        var para = {}
        para.mobile = mobile.value
        para.pwd = pwd.value

        ajax("POST", url, para, log)
    }
}

function log(data){
    if (data.status == 1) {
        alert("欢迎登入, " + data.data["nick_name"]);
        // location.assign("http://web.li-shang-bin.com/#/user/userinfo")
    }else if(data == 2){
        // alert("密码错误, 请重新输入")
        var pwd = document.getElementById("pwd")
        clearErr(pwd)
        errInfo(pwd, "密码错误, 请重新输入")
    }else {
        alert("用户名或密码错误, 请重新输入")
    }
}



