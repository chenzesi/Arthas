/**
 * @author Arthas.Chan
 * @date 2014-10-22
 * @version v1.0
 * @description 
 */

Rth.util = Rth.util || (function($){
	var	OP = Object.prototype,
    	ARRAY_TOSTRING = '[object Array]',
    	FUNCTION_TOSTRING = '[object Function]',
    	OBJECT_TOSTRING = '[object Object]';
	
	return {
		/**
	     * Determines wheather or not the provided object is an array.
	     * @method isArray
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */
		isArray: function(o) { 
	        return OP.toString.apply(o) === ARRAY_TOSTRING;
	    },
	    
	    /**
	     * Determines whether or not the provided object is a boolean
	     * @method isBoolean
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */
	    isBoolean: function(o) {
	        return typeof o === 'boolean';
	    },
	    
	    /**
	     * Determines whether or not the provided object is a function.
	     * Note: Internet Explorer thinks certain functions are objects:
	     *
	     * @method isFunction
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */
	    isFunction: function(o) {
	        return (typeof o === 'function') || OP.toString.apply(o) === FUNCTION_TOSTRING;
	    },
	    
	    /**
	     * Determines whether or not the provided object is null
	     * @method isNull
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */
	    isNull: function(o) {
	        return o === null;
	    },
	    
	    /**
	     * Determines whether or not the provided object is a legal number
	     * @method isNumber
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */
	    isNumber: function(o) {
	        return typeof o === 'number' && isFinite(o);
	    },
	    
	    /**
	     * Determines whether or not the provided object is of type object
	     * or function
	     * @method isObject
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */  
	    isObject: function(o) {
	    	return (o && (typeof o === 'object' || Rth.util.isFunction(o))) || false;
	    },
	    
	    /**
	     * Determines whether or not the provided object is a string
	     * @method isString
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */
	    isString: function(o) {
	        return typeof o === 'string';
	    },
	    
	    /**
	     * Determines whether or not the provided object is undefined
	     * @method isUndefined
	     * @param {any} o The object being testing
	     * @return {boolean} the result
	     */
	    isUndefined: function(o) {
	        return typeof o === 'undefined';
	    },
	    
	    /**
	     * 校验固定电话
	     */
	    isTel: function(val){
	    	if(!val){
	    		return false;
	    	}
	    	var telRule = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
	    	if(telRule.test(val)){
	    		return true;
	    	}
	    	return false;
	    },
	    
	    /**
	     * 校验手机号码，e.g.(+86)13800138000
	     * 最新的电话号码段：
	     * 		移动：134(1349除外)135 136 137 138 139 147 150 151 152 157 158 159 182 183 184 187 188
	     * 		联通：130 131 132 155 156 185 186 145
	     * 		电信：133 153 177 180 181 189
	     */
	    isMobile: function(val){
	    	if(!val){
	    		return false;
	    	}
	        var mobileRule = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
	        if(mobileRule.test(val)){
	            return true;
	        }
	        return false;
	    },
	    
	    /**
	     * 校验电子邮箱
	     */
	    isEmail: function(val){
	    	if(!val){
	    		return false;
	    	}
	        var emailRule = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	        if(emailRule.test(val)){
	            return true;
	        }
	        return false;
	    },
	    
	 /**
	  * 日期格式化
	  * 格式 YYYY/yyyy/YY/yy 表示年份 
	  * MM/M 月份
	  * W/w 星期  
	  * dd/DD/d/D 日期
	  * hh/HH/h/H 时间  
	  * mm/m 分钟  
	  * ss/SS/s/S 秒 
	  */
	 dateFormater: function(date, formatStr)   
	 {   
	     var str = formatStr || "YYYY-MM-DD";   
	     var Week = ['周日','周一','周二','周三','周四','周五','周六'];  
	   
	     var month = date.getMonth() + 1;
	     
	     str = str.replace(/yyyy|YYYY/, date.getFullYear());   
	     str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));   
	   
	     str = str.replace(/MM/, month > 9 ? month.toString():'0' + month);   
	     str = str.replace(/M/g, month);   
	   
	     str = str.replace(/w|W/g, Week[date.getDay()]);   
	   
	     str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString():'0' + date.getDate());   
	     str=str.replace(/d|D/g,date.getDate());   
	   
	     str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
	     str=str.replace(/h|H/g,date.getHours());   
	     str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
	     str=str.replace(/m/g,date.getMinutes());   
	   
	     str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
	     str=str.replace(/s|S/g,date.getSeconds());   
	   
	     return str;   
	 },
		 
	 /**
	  * 日期转换，IE7、8不支持new Date('YYYY-MM-DD')方式
	  * 传入'YYYY-MM-DD'格式日期字符串
	  * 返回已该字符串创建的日期
	  */
	 dateISO8601: function(dateStr) 
	 {
		 var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
		 date = new Date(NaN), month,
		 parts = isoExp.exec(dateStr);
		 if(parts) {
			 month = +parts[2];
			 date.setFullYear(parts[1], month - 1, parts[3]);
			 if(month != date.getMonth() + 1) {
				 date.setTime(NaN);
			 }
		 }
		 return date;
	 },
			
	/**
	 * 生成URL地址函数
	 */
	generateURL: function(type, obj) {
		var url = "/";
		if(!type){
			return url;
		}
		switch(type){
		case "index":
		url = "/index";
			break;
		default:
			//TODO: add default url
			break;
		}
		return url;
		
	},
	    
	/**
	 * 判断IE浏览器，使用IE浏览器表达式进行判断更准确
	 * 
	 * 1,不传入IE判断表达式时，判断是否为IE浏览器
	 * 2,传入的IE表达式是数字时，判断是否为对应版本的IE浏览器
	 * 3,传入的IE表达式是字符串时，判断是否为对应表达式执行的结果
	 * 传入版本号是判断具体的IE浏览器版本
	 */
	isIE: function(expression){
		var element = document.createElement("b");
		if(expression){
			if(Rth.util.isNumber(expression)){
				element.innerHTML = "<!--[if IE " + expression + "]><i></i><![endif]-->";
			}
			if(Rth.util.isString(expression)){
				element.innerHTML = "<!--[if " + expression + "]><i></i><![endif]-->";
			}
		}else{
			element.innerHTML = "<!--[if IE]><i></i><![endif]-->";
		}
	    return element.getElementsByTagName('i').length === 1
	}		    
    };  
})(jQuery);