/**
 * @author Arthas.Chan
 * @date 2014-10-22
 * @version v1.0
 * @description 定义Rth.Pipe管道
 */

Rth.Pipe = Rth.Pipe || (function($){
	/**
     * 定义事件队列
     */
    var _events = {};
    
    return {
    	/**
	     * 定义一个绑定方法，将事件绑定到管道上.
	     * @method on
	     * @param {name} 事件名称
	     * @param {callback} 事件触发回调函数
	     * @param {context} 执行回调函数使用的上下文
	     * @return {boolean} 是否绑定成功
	     * 
	     * Rth.Pipe.on('changeFilter', this.doSearch, this);
	     */
    	on: function(name, callback, context){
            	if(!Rth.util.isString(name) || !Rth.util.isFunction(callback) || !Rth.util.isObject(context)) {
            		return false;
            	}
            	var events = _events[name] || (_events[name] = []);
            	events.push({callback: callback, context: context});
            	return true;
        	},
    	/**
     	* 触发一个管道上对应名称的事件队列.
     	* @method trigger
     	* @param {name} 事件名称
     	* @param {arguments} 隐藏参数触发时传递的参数数组
     	* @return {boolean} 是否触发成功
     	* 
     	* Rth.Pipe.trigger('changeFilter');
     	* Rth.Pipe.trigger('changeFilter', {id :"9527", name: "John"});
     	*/
        trigger: function(name){
            	if (!Rth.util.isString(name)){
            		return false;
            	}
            	var events = _events[name];
            	if (!events){
            		return false;
            	}
            	var args = Array.prototype.slice.call(arguments).slice(1);
            	var i, len = events.length, event;
            	for (i=0; i<len; i++){
            		event = events[i];
            		event["callback"].apply(event["context"],args);
            	}
            	return true;
        	},

    	/**
     	* 解绑管道上已经绑定的对应名称的事件，可与名称对应的解除全部事件，也可解除某一个.
     	* @method off
     	* @param {name} 事件名称
     	* @param {callback} 事件触发回调函数
     	* @param {context} 执行回调函数使用的上下文
     	* @return {boolean} 是否解除绑定成功
     	* 
     	* Rth.Pipe.off('changeFilter');
     	* Rth.Pipe.off('changeFilter', this.doSearch, null);
     	* Rth.Pipe.off('changeFilter', null, this);
     	* Rth.Pipe.off('changeFilter', this.doSearch, this);
     	*/
        off: function off(name, callback, context){
            	if(!Rth.util.isString(name) || !_events[name]){
            		return false;
            	}
            
            	var i, events = _events[name], len = events.length, event, retain=[];
            
            	if(callback && context){
            		if(!Rth.util.isFunction(callback) || !Rth.util.isObject(context)){
            			return false;
            		}
            	
            		for(i = 0;i < len;i++){
            			event = events[i];
            			if (callback !== event.callback || context !== event.context){
            				retain.push(event);
            			}
            		}
            		if(!retain.length){
            			delete _events[name];
            		}else{
            			_events[name] = retain;
            		}
            	}else if(callback && !context){
            		if(!Rth.util.isFunction(callback)){
            			return false;
            		}
            		for(i = 0;i < len;i++){
            			event = events[i];
            			if (callback !== event.callback){
            				retain.push(event);
            			}
            		}
            		if(!retain.length){
            			delete _events[name];
            		}else{
            			_events[name] = retain;
            		}
            	}else if(!callback && context){
            		if(!Rth.util.isObject(context)){
            			return false;
            		}
            		for(i = 0;i < len;i++){
            			event = events[i];
            			if (context !== event.context){
            				retain.push(event);
            			}
            		}
            		if(!retain.length){
            			delete _events[name];
            		}else{
            			_events[name] = retain;
            		}
            	}else{
            		//如果没传入callback和context，则删除整个name对应的队列
            		delete _events[name];
            	}
            	return true;
        	}
    };
    
})(jQuery);