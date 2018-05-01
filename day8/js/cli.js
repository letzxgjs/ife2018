/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-05-01 11:36:12
 * @version $Id$
 */
window.onload = function(){
	var  banner = document.getElementsByClassName("banner")[0]
	var  nav = document.getElementsByClassName("nav")[0]
	var bannerli = banner.getElementsByTagName('li');
	var navli = nav.getElementsByTagName('li');
	var colors = ['#66BB33', '#0094FF', '#7F92FF', '#FF7FED'];
	console.log(bannerli.length);
	console.log(navli.length);
	// banner轮播
	for (let i = 0; i < bannerli.length; i++) {
		bannerli[i].addEventListener('click', function(){
			banner.style.backgroundColor = colors[i];
			for (var j = 0; j < bannerli.length; j++) {
				bannerli[j].classList.remove("li_click");
			}
			bannerli[i].classList.add("li_click");
		})
	}
	// nav切换按钮
	for (let i = 0; i < navli.length; i++) {
		navli[i].addEventListener('click', function(){
			for (var j = 0; j < navli.length; j++) {
				navli[j].classList.remove("li_cli");
			}
			navli[i].classList.add("li_cli");
		})
	}
}
