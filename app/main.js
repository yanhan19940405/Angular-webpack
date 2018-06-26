var angular = require('angular');//引入angular
require('./index.css')
require('angular-ui-router')
var routerApp = angular.module('routerApp', ['ui.router']);  
routerApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	/*路由重定向 $urlRouterProvider:如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 home.html,  
	 *这个页面就是状态名称被声明的地方. */
	$urlRouterProvider.otherwise('/home');
	console.log(1)
	$stateProvider
		.state('home', {
			url: '/home',
			template: require('./home.html')
		})
		/*  nested list with custom controller*/
		.state('home.list', {
			url: '/list',
			template: require('./home-list.html'),
			controller: function($scope) {
				$scope.topics = ['Butterscotch', 'Black Current', 'Mango'];
			}
		})
		// nested list with just some random string data  
		.state('home.paragraph', {
			url: '/paragraph',
			template: 'I could sure use a scoop of ice-cream. '
		})
		.state('about', {
			url: '/about',
			/* view 用在该状态下有多个 ui-view 的情况，可以对不同的 ui-view 使用特定的 template, controller, resolve data 
			 绝对 view 使用 '@' 符号来区别，比如 'columnOne@about' 表明名为 'columnOne' 的 ui-view 使用了 'about' 状态的 
			 模板(template)，相对 view 则无*/
			views: {
				// 无名 view  
				'': {
					template: require('./about.html')
				},
				// for "ui-view='columnOne'"  
				'columnOne@about': {
					template: '这里是第一列的内容'
				},
				// for "ui-view='columnTwo'"  
				'columnTwo@about': {
					template: require('./table-data.html'),
					controller: 'Controller'
				}
			}
		});
}]);
routerApp.controller('Controller', function($scope,$http) {
	$scope.message = 'test';
	$scope.topics = [{
		name: 'Butterscotch',
		price: 50
	}, {
		name: 'Black Current',
		price: 100
	}, {
		name: 'Mango',
		price: 20
	}];
	$scope.action=function(){
  $http.get("/try/angularjs/data/sites.php")
  .success(function (response) {$scope.page =response.sites[0].Url ;
  console.log($scope)})
}
})
