/**
 * @author Arthas Chan
 * @date 2015-4-2
 * @description 增强原生JavaScript功能
 */

(function(){
	//为Object增加一个beget方法
	//beget方法创建一个使用原对象作为其原型的新对象
	if(typeof Object.beget !== 'function'){
		Object.beget =function(o){
			var F = function(){};
			F.prototype = o;
			return new F();
		};
	}
	
	//为Function.prototype增加方法使得该方法对所有的函数可用
	//基本类型的原型是公共结构，所以才类库混用时务必小心，一个保险的做法就是只在确定没有该方法时才添加它
	Function.prototype.method = function(name, func){
		if(!this.prototype[name]){
			this.prototype[name] = func;
		}
		return this;
	};
	
	//函数套用，为Function.prototype增加curry方法
	//curry 允许我们将函数与传递给它的参数相结合去产生一个新的函数
	//curry 方法通过创建一个保存着原始函数和被套用的参数的闭包来工作，它返回另一个函数，该函数被调用时，会返回调用原始函数的结果
	//并传递调用curry时的参数加上当前调用的参数的所有参数。
	//arguments并不是真正的数组，所以没有concat方法，所以需要在两个arguments上应用数组的slice方法，这样产生出拥有concat方法的常规数组
	Function.method('curry', function(){
		var slice = Array.prototype.slice, args = slice.apply(arguments), that = this;
		return function(){
			return that.apply(null, args.concat(slice.apply(arguments)));
		};
	});
	
	//带记忆的函数
	//memoizer函数将取得一个初始的memo数组和fundamental函数，它返回一个管理memo存储和在需要时调用fundamental函数的shell函数
	//我们传递这个shell函数和该函数的参数给fundamental函数。
	//e.g. 斐波那契数列
	//var fibonacci = Function.memoizer([0, 1], function(shell, n){
	//	return shell(n - 1) + shell(n - 2);
	//});
	//通过设计能产生其他函数的函数，可以极大减少我们必须做的工作。例如，要产生一个可记忆的阶乘函数，我们只须提供基本阶乘公式即可：
	//var factorial = Function.memoizer([1, 1], function(shell, n){
	//	return n * shell(n - 1);
	//});
	Function.memoizer = function(memo, fundamental){
		var shell = function(n){
			var result = memo[n];
			if(typeof result !== 'number'){
				result = fundamental(shell, n);
				memo[n] = result;
			}
			return result;
		};
		return shell;
	};
	
	//定义一个长度固定，指定初始化值的Array
	Array.dim = function(dimension, initial) {
		var a = [], i;
		for(i = 0;i < dimension;i += 1){
			a[i] = initial;
		}
		return a;
	};
	
	//数组增强，创建一个 m * n 的矩阵，并把值初始化
	Array.matrix = function(m, n, initial){
		var a, i, j, mat = [];
		for(i = 0;i < m;i += 1){
			a = [];
			for(j = 0;j < n;j += 1){
				a[j] = initial;
			}
			mat[i] = a;
		}
		return mat;
	};
	
	//构建一个恒等矩阵
	Array.identity = function(n){
		var i, mat = Array.matrix(n, n, 0);
		for(i = 0;i < n;i += 1){
			mat[i][i] = 1;
		}
		return mat;
	};
})();