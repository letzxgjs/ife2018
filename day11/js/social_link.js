/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-05-03 21:11:16
 * @version $Id$
 */
window.onload = function(){
	var team = document.getElementsByClassName('team')[0];
	// var crew = team.getElementsByClassName('crew');
	var crew = team.getElementsByClassName('crew');
	len = crew.length;
	//鼠标移入显示
	for (let i = 0; i < len; i++) {
		crew[i].addEventListener('mouseover', function(){
			for (var j = 0; j < len; j++){
				crew[j].getElementsByClassName('hide')[0].classList.remove('show');
			}
			crew[i].getElementsByClassName('hide')[0].classList.add('show');
		})
	}
	//鼠标移出隐藏
	for (let i = 0; i < len; i++) {
		crew[i].addEventListener('mouseout', function(){
			for (var j = 0; j < len; j++){
				crew[j].getElementsByClassName('hide')[0].classList.remove('show');
			}
			// crew[i].getElementsByClassName('hide')[0].classList.add('show');
		})
	}
}
