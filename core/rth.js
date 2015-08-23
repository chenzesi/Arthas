/**
 * @author Arthas.Chan
 * @date 2014-10-22
 * @version v1.0
 * @description 构建 Rth namespace
 */
var Rth = Rth || {};

/**
 * 定义 Rth.extend.
 * Utility to set up the prototype, constructor and superclass properties to
 * support an inheritance strategy that can chain constructors and methods.
 * Static members will not be inherited.
 *
 * @method extend
 * @static
 * @param {Function} subc   the object to modify
 * @param {Function} superc the object to inherit
 * @param {Object} overrides  additional properties/methods to add to the
 *                              subclass prototype.  These will override the
 *                              matching items obtained from the superclass 
 *                              if present.
 */
Rth.extend = function(subc, superc, overrides) {
    if (!superc || !subc) {
        throw new Error("extend failed, please check that all dependencies are included.");
    }
    var F = function() {}, i;
    F.prototype=superc.prototype;
    subc.prototype=new F();
    subc.prototype.constructor=subc;
    subc.superclass=superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
    }

    if (overrides) {
    	$.extend(subc.prototype, overrides);
        /*for (i in overrides) {
            if (L.hasOwnProperty(overrides, i)) {
                subc.prototype[i]=overrides[i];
            }
        }

        L._IEEnumFix(subc.prototype, overrides);*/
    	
    }
}; 