/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-25 14:02:25
 * @version $Id$
 */

//获取单例
var getSingle = function(fn){
    var result;
    return function (){
    	console.log(result)
        return result || (result=fn.apply(this,arguments));
    };
};

//创建div登录框
var createLoginLayer=function (){
    var div= document.createElement('div');
    div.innerHTML='我是登录框';
    if (div) {
	    document.body.appendChild(div);
    }
    return div;
};

//创建iframe的dom节点
var createIframe=function(){
    //创建irame节点的代码
}

var createSingleLoginLayer = getSingle(createLoginLayer);
var createSingleIframe=getSingle(createIframe);

var loginLayer1 = createSingleLoginLayer();
var loginLayer2 = createSingleLoginLayer();
var loginLayer3 = createSingleLoginLayer();
var loginLayer4 = createSingleLoginLayer();

var iframe1=createSingleIframe();
var iframe2=createSingleIframe();

console.log(loginLayer1 === loginLayer2);
console.log(loginLayer1 === loginLayer3);