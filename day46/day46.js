/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-25 13:09:40
 * @version $Id$
 */

// 通用单例创建函数, 传递要创建单例的类, 返回单例

function Single(fn) {
	var instance = null;
	return function (){
		// fn.apply(this, arguments)是普通函数调用
		// 这里怎么用才是加new 关键字调用fn构造函数, 从而创建实例??
		return instance || (instance = fn.apply(this, arguments))
	}
}


// 餐厅类
function Restaurant(n, dishes, employees/*, customers*/){
	// 座位数量
	this.seats = n;
	// 菜品, 成员为dish实例
	this.menu = dishes;
	// 职员列表, 成员为职员类实例、厨师类实例{}, {}, 
	this.staff = employees;
	// 招聘职员
	this.hire = function (employee){
		this.staff.push(employee)
	};
	// 解雇职员
	this.fire = function (employee){
		this.staff = this.staff.filter(item => item.id !== employee.id)
	};
	var order = 0; //顾客未点好菜; 1顾客点好菜了; 3菜做好了; 5顾客用完餐
	var earnings = 0;
	this.operating = function (){
		// var cook = this.staff[1]
		// var waiter = this.staff[0]
		while (this.customers.length !== 0){
		// while (this.customers.shift()){
			var customer = this.customers.shift()
			// var order = customer.order(this.menu)
			var dish = waiter.attending(customer)
			cook.cooking(dish.name);
			waiter.serving(dish.name)
			customer.eat()
			earnings += dish.price - dish.cost;
			console.log("--------------------clean table--------------------")
		}
	};
	// 餐厅收入
	this.getMoney = function (){
		if (earnings > 350) {
			console.log('今天生意好, 大赚' + earnings)
		}else if (earnings < 100) {
			console.log('今天生意不行, 才赚了' + earnings)
		}else {
			console.log('今天生意一般, 赚了' + earnings)
		}
	};



	// 需要显式返回 this, 单例包装函数里闭包返回的是好是, 并不返回创建好的单例对象
	return this
}

// 招聘职员
Restaurant.prototype.hire = function (employee){
	this.staff.push(employee)
};
// 解雇职员
Restaurant.prototype.fire = function (employee){
	this.staff = this.staff.filter(item => item.id !== employee.id)
};


// 菜品
function Dish(name, cost, price){
	this.name = name;
	this.cost = cost;
	this.price = price;

}


// 职员类
function Employee(id, name, salary){
	this.id = id;
	this.name = name;
	this.salary = salary;
}

Employee.prototype.work = function (position, task){
	position.task();
}




// 服务员类
function Waiter(id, name, salary){

	Employee.call(this, id, name, salary);
	this.attending = function (customer){
		var orderedDish = customer.order(restaurant.menu)
		if (orderedDish) {
			console.log(`  Waiter: Our dear customer ordered ${orderedDish.name} !!!`)
			return orderedDish
		}
	};
	this.serving = function (dish){
		console.log('Waiter'.padStart(8, ' ')+': Here is your '+ dish + '. Enjoy your meal!')
	}
	return this
}

// 服务员接受点菜
// Waiter.prototype.attending = function (customer){
// 	var orderedDish = customer.order(restaurant.menu)
// 	if (orderedDish) {
// 		console.log(`Our dear customer ordered ${orderedDish.name} !!!`)
// 		return orderedDish.name
// 	}
// };

// 服务员上菜
// Waiter.prototype.serving = function (dish){
// 	console.log('Here is your '+ dish + ' Enjoy!')
// }


// 厨师类
function Cook(id, name, salary){
	Employee.call(this, id, name, salary);
	this.cooking = function (dish){
		console.log('Cook'.padStart(8, ' ')+': '+dish +' is ready')
	}
	return this
}

// 厨师做菜
// Cook.prototype.cooking = function (dish){
// 	console.log(dish +' is ready')
// 	// return progress = 4
// }



// 顾客类
function Customer(){
}
Customer.prototype.order = function (menu){
	var i = Math.floor(Math.random()*menu.length);
	console.log(`Customer: I'd like to try some ${menu[i].name}, please`)
	return menu[i]
};
Customer.prototype.eat = function (){
	console.log('Customer: Mmm! Nice!')
}







































