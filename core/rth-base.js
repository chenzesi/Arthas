/**
 * @author Arthas.Chan
 * @date 2014-10-23
 * @version v1.0
 * @description 定义基类 Rth.Base
 */

(function($){
	Rth.Base = function(name, id, components){
		// Mandatory properties
		this.name = (typeof name == "undefined" || name === null) ? "Rth.Base" : name;
		this.id = (typeof id == "undefined" || id === null) ? new Date().getTime() : id;
		
		// Initialise default prototype properties
		this.options = $.extend(true, this.options);
		//this.widgets = {};
		//this.modules = {};
		//this.services = {};
		
		//TODO: Register this component
	    //Rth.ComponentManager.register(this);
		
		// Load Components if req'd
		if (Rth.util.isArray(components) && components.length > 0){
			//TODO: 动态加载组件，加载完执行 onComponentsLoaded
			this.onComponentsLoaded();
		} else {
			this.onComponentsLoaded();
		}
		
		return this;
	};
	
	Rth.Base.prototype = {
		/**
		 * Object container for initialization options
		 *
		 * @property options
		 * @type object
		 * @default {}
       */
		options: {},
		
		/**
		 * Set multiple initialization options at once.
		 * 通用函数设置参数
		 * @method setOptions
		 * @param obj {object} Object literal specifying a set of options
		 * @return {object} returns 'this' for method chaining
		 */
		setOptions: function(options){
			$.extend(true, this.options, options);
			return this;
		},
		
		/**
		 * 加载组件完成
		 */
		onComponentsLoaded: function(){
			if (this.id !== "null"){
				var me = this;
				// Call component's onReady method, when content Ready
				$(function(){
					if (me.onReady && me.onReady.call)
					{
						me.onReady.call(me);
					}
				});
	         }
		},
		
		//通用函数，设置国际化文件，是一整个字符串，需要时再进行截取
		//setMessage: function(message){
		//	this.message = message;
		//	return this;
		//},
			
		//销毁对象函数
		destory: function(){
		
		}
	};
})(jQuery);