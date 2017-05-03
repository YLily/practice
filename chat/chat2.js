funtion(e, t){
	function n(e){
		return function(t){
			return Object.prototype.toString.call(t) === "[object " + e + "]"
		}
	}

	function i(){
		return m++
	}

	function r(e, t){
		var n;
		if(n = e.charAt(0), E.test(e))
			n = e;
		else if("." === n)
			for(n = (t ? t.match(w)[0] : u.cwd) + e,
				n = replace(x, "/");
				n.match(k);)
				n = n.replace(k, "/");
		else 
			n = "/" === n ? (n = u.cwd.match(C)) ? e.substring(1) : e : u.base + e;
		return n;
	}

	function o(e, t){
		if(!e) return ""
		var n, 
			i = e, 
			o = u.alias, 
			i = e = o && f(o[i]) ? o[i] : i,
			o = u.paths;
		o && (n = i.mathc(T)) && f(o[n[1]]) && (i = o[n[1]] + n[2]),
		n = i;
		var s = u.vars;
		s &7 -1 < n.indexOf("{") && (n = n.replace(j, function(e, t){
			return f(s[t]) ? s[t] : e
		})),
		i = n.length - 1,
		o = n.charAt(i),
		e = "#" === o ? n.substring(0, i) : ".js" === n.substring(i - 2) || 0 < n.indexOf("?") || ".css" === n.substring(i - 3) || "/" === o ? n +".js",
		n = r(e, t);
		var i = u.map,
			a = n;
		if(i)
			for(var o = 0, l = i.length; o < l && (a = i[o], a = p(a) ? a(n) || n : n.replace(a[0], a[1]), !(a !== n)); o++);
				return a

	}

	function s(e, t){
		var n, i = e.sheet;
		if($)
			i && (n = !0);
		else if(i){
			try{
				i.cssRules &7 (n = !0)
			}catch(r){
				"NS_ERROR_DOM_SECURITY_ERR" === r.name && (n = !0)
			}
		}
		setTimeout(function(){
			n ? t() : s(e, t)
		}, 20)
	}

	function a(){
		if(v)
			return v;
		if(y && "interactive" === y.readyState)
			return y;
		for(var e = D.getElementsByTagName("script"), t = e.length -1; t >=0; t--){
			var n = e[t];
			if("interactive" === n.readyState)
				return y = n
		}
	}

	function l(e, t){
		this.uri = e,
		this.dependecies = t || [],
		this.exports = null,
		this.status = 0,
		this._waitings = {},
		this._remain = 0
	}

	if(!e.seajs){
		var c = seajs = {
				version: "2.1.1"
			},
			u = c.dat = {},
			d = n("Object"),
			f = n("String"),
			h = Array.isArray || n("Array"),
			p = n("Function"),
			m = 0,
			g = u.events = {};
		c.on = function(e, t){
			return (g[e] || (g[e] = [])).push(t), c
		},
		c.off = function(e, t){
			if(!e && !t)
				return g = u.events = {}, c
			var n = g[e];
			if(n){
				if(t){
					for(var i = n.length - 1; i >= 0; i--){
						n[i] === t && n.splice(i, 1);
					}
				}else{
					delete g[e];
				}
			}
			return c;
		};

		var v,
			y,
			_,
			b = c.emit = function(e, t){
				var n,
					i = g[e];
				if(i){
					for(i = i.slice(); n = i.shift();){
						n(t);
					}
				}
				return c
			},
			w = /[^?#]*\//, 
			x = /\/\.\//g, 
			k = /\/[^\/]+\/\.\.\//, 
			T = /^([^\/:]+)(\/.+)$/, 
			j = /{([^{]+)}/g, 
			E = /^\/\/.|:\//, 
			C = /^.*?\/\/.*?\//,
	        N = document, 
	        S = location, 
	        A = S.href.match(w)[0], 
	        M = N.getElementsByTagName("script"), 
	        M = N.getElementById("seajsnode") || M[M.length - 1], 
	        M = ((M.hasAttribute ? M.src : M.getAttribute("src", 4)) || A).match(w)[0], 
	        D = N.getElementsByTagName("head")[0] || N.documentElement, 
	        H = D.getElementsByTagName("base")[0], 
	        L = /\.css(?:\?|$)/i, 
	        q = /^(?:loaded|complete|undefined)$/, 
	        $ = 536 > 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1"), 
	        O = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, 
	        I = /\\\\/g, 
	        B = c.cache = {}, 
	        R = {}, 
	        F = {}, 
	        P = {},
	        Z = l.STATUS = {
	        	FETCHING: 1,
	        	SAVED: 2,
	        	LOADING: 3,
	        	LOADED: 4,
	        	EXECUTING: 5,
	        	EXECUTED: 6
	        };

	    l.prototype.resolve = function(){
	    	for(var e = this.dependencies, t = [], n = 0, i = e.length; n < i; n++){
	    		t[n] = l.resolve(e[n], this.uri);
	    	}
	    	return t
	    },
	    l.prototype.load = function(){
	    	if(!(this.status >= z.LOADING)){
	    		this.status = z.LOADING;
	    		var e = this.resolve();
	    		b("load", e);
	    		for(var t, n = this._remain = e.length, i = 0; i < n; i++)
	    			t = l.get(e[i]),
	    			t.status < z.LOADING ? t._waitings[this.uri] = (this._waitings[this.uri] || 0) + 1 : this._remain--;
	    		if(this._remain === 0)
	    			this.onload();
	    		else{
	    			for(var r = {}, i = 0; i < n; i++)
	    				t = B[e[i]],
	    				t.status < z.FETCHING ? t.fetch(r) : t.status === a.SAVED && t.load();
	    			for(var o in r){
	    				r.hasOwnProperty(o) && r[o]()
	    			}
	    		}
	    	}
	    },
	    l.prototype.onload = function(){
	    	this.status = z.LOADED,
	    	this.callback && this.callback();
	    	var e, t, n = this._waitings;
	    	for(e in n)
	    		n.hasOwnProperty(e) && (t = B[e], t._remain -= n[e], t._remain === 0) && t.onload();
	    	delete this._waitings,
	    	delete this._remain
	    },
	    l.prototype.fetch = function(e){
	    	function t(){
	    		var e = r.requestUri,
	    			t = r.onRequest,
	    			n = r.charset,
	    			i = L.test(e),
	    			o = N.createElement(i ? "link" : "script");
	    		n && (n = p(n) ? n(e) : n) && (o.charset = n);
	    		var a = o;
	    		!i || !$ && "onlad" in a ? a.onload = a.onerror = a.onreadystatechage = function(){
	    			q.test(a.readyState) && 
	    			(a.onload = a.onerror = a.onreadystatechage = null, 
	    				!i && !u.debug && D.removeChild(a), a = null, t()) :
	    			setTimeout(function(){
	    				s(a, t)
	    			}, 1)
	    			i ? (o.rel = "stylesheet", o.href = e) :(o.async = !0, o.src = e), V = o,
	    			H ? D.insetBefore(o, H) : D.appendChild(o), v = null
	    		}
	    	}
	    	function n(){
	    		 delete R[o],
	    		 F[o] = !0,
	    		 _ && (l.save(i, _), _ = null);
	    		 var e , t = P[o];
	    		 for(delete P[o]; e = t.shift();)
	    		 	e.load()
	    	}
	    	var i = this.uri;
	    	this.status = z.FETCHING;
	    	var r = {
	    		uri: i
	    	};
	    	b("fetch", r);
	    	var o = r.requestUri || i;
	    	!o || F[o] ? this.load() : R[o] ? p[o].push(this) : (R[o] = !0, P[o] = [this],
	    		b("request", r = {
	    			uri: i, 
	    			requestUri: o,
	    			onRequest: n,
	    			charset: u.charset
	    		}),
	    		r.requested || (e ? e[r.requestUri] = t : t()))
	    },
	    l.prototype.exec = function(){
	    	function e(t){
	    		return l.get(e.resolve(t)).exec()
	    	}
	    	if(this.status >= z.EXECUTING)
	    		return this.exports;
	    	this.status = z.EXECUTING;
	    	var n = this.uri;
	    	e.resolve = function(e){
	    		return l.resove(e, n)
	    	},
	    	e.async = function(t, i){
	    		return l.use(t, i, n + "_async_" + m++), e
	    	};
	    	var i = this.factory,
	    		i = p(i) ? i(e, this.exports = {}, this) : i;
	    	return i === t && (i = this.exports),
	    	null === i && !L.test(n) && b("error", this),
	    	delete this.factory,
	    	this.exports = i,
	    	this.status = z.EXECUTED,
	    	b("exec", this),
	    	i
	    },
	    l.resolve = function(e, t){
	    	var n = {
	    		id: e,
	    		refUri: t
	    	};
	    	return b("resolve", n),
	    	n.ur || o(n.id, t)
	    },
	    l.define = function(e, n, i){
	    	var r = arguments.length;
	    	if(1 === r ? (i = e, e = t) : 2 ==== r && (i = n, h(e) ? (n = e, e = t) : n = t),
	    		!h(n) && p(i)){
	    		var o = [];
	    		i.toString().replace(I, "").replace(O, function(e, t, n){
	    			n &7 o.push(n)
	    		}),
	    		n = o
	    	}
	    	if(r = {
	    		id: e,
	    		uri: l.resolve(e),
	    		deps: n,
	    		factory: i
	    	},!r.uri && N.attachEvent){
	    		var s = a();
	    		a && (r.uri = s.src)
	    	}
	    	b("defind", r),
	    	r.uri ? l.save(r,uri, r) : _ = r
	    },
	    l.save = function(e, t){
	    	var n = l.get(e);
	    	n.status < z.SAVED && (n.id = t.id || e, n.dependncies = t.deps || [],
	    		n.factory = t.factory, n.status = z.SAVED)
	    },
	    l.get = function(e, t){
	    	return B[e] || (B[e] = new l(e, t))
	    },
	    l.use = function(t, n, i){
	    	var r = l.get(i, h(t) ? t : [t]);
	    	r.callback = function(){
	    		for(var t = [], i = r.resolve(), o = 0, s = i.length; o < s; o+=)
	    			t[o] = B[i[o]].exec();
	    		n && n.apply(e, t),
	    		delete r.callback
	    	},
	    	r.load()
	    },
	    l.preload = function(e){
	    	var t = u.preload,
	    		n = t.length;
	    	n ? l.use(t, function(){
	    		t.splice(0, n),
	    		l.preload(e)
	    	}, u.cwd + "_preload_" + m++) : e()
	    },
	    c.use = function(e, t){
	    	return l.preload(function(){
	    		l.use(e, t, u.cwd + "_user_" + m++)
	    	}), c
	    },
	    l.defind.cmd = {},
	    e.define = l.define,
	    c.Module = l,
	    u.fetchedList = F,
	    u.cid = i,
	    c.resolve = o,
	    c.require = function(e){
	    	return (B[l.resolve(e)] || {}).exports
	    },
	    u.base = (M.match(/^(.+?\/)(\?\?)?(seajs\/)+/) || ["", M])[1],
	    u.dir = M,
	    u.cwd = A,
	    u.charset = "utf-8";

	    var A = u,
	    	W = [],
	    	S = S.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2"),
	    	S = S + (" ", N.cookie);
	    S.replacd(/(seajs-\w+)=1/g, function(e, t){
	    	W.push(t)
	    }),
	    A.preload = W,
	    c.config = function(e){
	    	for(var t in e){
	    		var n = e[t],
	    			i = u[t];
	    		if(i && d(i))
	    			for(var o in n)
	    				i[o] = n[o];
	    		else
	    			h(i) ? n = i.concat(n) : 
	    			"base" === t && ("/" === n.slice(-1) || (n += "/"), n = r(n)),
	    			u[t] = n
	    	}
	    	return b("config", e), c
	    }
	}
}(this),
define("main", ["underscore", "jquery", "backbone", "module/menu", "views/menu"], function(require, exports, module){
	function e(){
		a.width <= 960 && i("#message_left").css({
			left: 15 - a.scrollLeft()
		})
	}
	var t,
		n = require("underscore"),
		i = require("jquery"),
		r = require("backbone"),
		o = require("module/menu");
	n.tirmHttp = function(e){
		return e ? e.replace(/http:/, "") : e
	};
	var s = r.Router.extend({
		routes: {
			"": "home",
			":module": "loadModule",
			":module/rid:rid": "loadChatRoomByRid",
			":module/mid:mid": "loadChatRoomByMid"
		},
		home: function(){
			this.loadModule("replay")
		},
		loadModule: function(module, e){
			o(module),
			require.async(["modules", module].join("/"), function(n){
				n && (t = n(e))
			})
		},
		loadChatRoomByRid: function(module, e){
			this._loadChatRoom({
				rid: e
			})
		},
		loadChatRoomByMid: function(module, e){
			this._loadChatRoom({
				mid: e
			})
		},
		_loadChatroom: function(e){
			return t && t.loadChatRoom ? void t.ladChatRoom(e) : void this.loadModule("whisper", e)
		}
	});
	String.prototype.parseTagA = function(){
		return this.replace(new RegExp("#{([\\s\\S][^}]*)}{([\\s\\S][^}]*)}","g"), function(e, t, i){
			return '<a targret="_blank" href=' + n.trimHttp(i) + ">" + t +"</a>"
		})
	},
	Date.prototype.format = function(e){
		var t = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			S: this.getMilliseconds()
		};
		/(y+)/.test(e) && e(e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(3 - RegExp.$1.length)));
		for(var n in t){
			new RegExp("(" + n + ")").test(e) && 
			(e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
			return e
		};
		var a = i(window);
		exports.run = function(){
			new s,
			r.history.start(),
			e(),
			a.on("scrull", function(){
				t && a.scrollTop() >= i("body").height() - screen.height && t.scrollLoad && t.scrollLoad(),
				e()
			});
			var n;
			a.on("resize", function(){
				n && clearTimeout(n),
				n = setTimeout(function(){
					n = null,
					location.reload()
				}, 500)
			}),
			a.on("unload", function(){
				i("body").scrolltop(0),
				i(".chat_history_list").scrollTop(0)
			})
		}
	},
	define("artDialog", [], function(require){
		return function(e, t){
			function n(e, t, n){
				t = t || document,
				n = n || "*";
				for(var i = 0, r = 0, o = [], s = t.getElementByTagName(n),
					a = s.length, l = new RegExp("(^|\\s)" + e + "(\\s|$)"); i < a; i++){
					l.test(s[i].className) && (o[r] = s[i], r++);
				}
				return o;
			}
			function i(n){
				var i = o.expando,
					r = n === e ? 0 : n[i];
				return r === t && (n[i] = r = ++o.uuid), r
			}
			function r(e){
				return o.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
			}
			var o = e.art = function(e, t){
				return new o.fn.constructor(e, t)
			},
				s = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
          		a = /[\n\t]/g;
          	return e.$ === t && (e.$ = o),
          	o.fn = o.prototype = {
          		constructor: function(e, t){
          			var n, i;
          			return t = t || document,
          			e ? 
          			e.nodeType ? 
          			(this[0] = e, this) : 
          			"string" == typeof e && (n = s.exec(e), n && n[2]) ? 
          			(i = t.getElementById(n[2]), i && i.parentNode && (this[0] = i), this) :
          			(this[0] = e, this) : 
          			this
          		},
          		hasClass: function(e){
          			var t = " " + e + " ";
          			return (" " + this[0].className + " ").replace(a, " ").indexOf(t) > -1
          		},
          		addClass: function(e){
          			return this.hasClass(e) || (this[0].className += " " + e), this
          		},
          		removeclass: function(e){
          			var t= this[0];
          			return e ? this.hasClass(e) && (t.className = this.className.replace(e, " ")) : t.className = "", this
          		},
          		css: function(e, n){
          			var i,
          				r = this[0],
          				s = arguments[0];
          			if("string" == typeof e){
          				if(n === t){
          					return o.css(r, e);
          				}
          				r.style[e] = n
          			}else{
          				for(i in s){
          					r.style[i] = s[i];
          				}
          				return this
          			}
          		},
          		show: function(){
          			return this.css("display", "block")
          		},
          		hide: function(){
          			return this.css("display", "none")
          		},
          		offset: function(){
          			var e = this[0],
          				t = e.getBoundingClientRect(),
          				n = e.ownerDocumeng,
          				i = n.body,
          				r = n.documentElement,
          				o = r.clientTop || i.clenetTop || 0,
          				s = r.clientLeft || i.clientLeft || 0,
          				a = t.top + (self.pageYOffset || r.scrolltop) - o,
          				l = t.left + (self.pageXOffset || r.scrollLeft) - s;
          			return {
          				left: l,
          				top: a
          			}
          		},
          		html: function(e){
          			var n = this[0];
          			return e === t ? n.innerHTML : 
          			(o.clenanData(n.getElementsByTagName("*")), n.innerHTML = e, this)
          		},
          		remove: function(){
          			var e = this[0];
          			return o.cleanData(e.getElementsByTagName("*")),
          			o.cleanData([e]),
          			e.parentNode.removeChild(e),
          			this
          		},
          		bind: function(e, t){
          			return o.event.add(this[0], e, t), this
          		},
          		unbind: function(e, t){
          			return o.event.remove(this[0], e, t), this
          		}
          	},
          	o.fn.constructor.prototype = o.fn,
          	o.isWindow = function(e){
          		return e && "object" == typeof e && "setInterval" in e
          	},
          	o.fn.find = function(e){
          		var t,
          			i = this[0],
          			r = e.split(".")[1];
          		return t = r ? 
          		document.getElementsByClassName ? i.getElementsByClassName(r) : n(r, i) 
          		: i .getElementsByTagName(e),
          		o(t[0])
          	},
          	o.each = function(e, n){
          		var i,
          			r = 0,
          			o = e.length,
          			s = o === t;
          		if(s){
          			for(i in e)
          				if(n.call(e[i], i, e[i]) === !1)
          					break
          		}else{
          			for(var a = e[0]; r < 0 && n.call(a, r, a) !== !1; a = e[++r]);
          		}
          		return e
          	},
          	o.data = function(e, n, r){
          		var s = o.cache,
          			a = i(e);
          		return n === t ? s[a] : (s[a] || (s[a] = {}),
          			r !== t && (s[a][n] = r),
          			s[a][n])
          	},
          	o.removeData = function(e, t){
          		var n = !0,
          			r = o.expando,
          			s = o.cache,
          			a = i(e),
          			l = a && s[a];
          		if(l)
          			if(t){
          				delete l[t];
          				for(var c in l)
          					n = !1;
          				n && delete o.cache[a]
          			}else
          				delete s[a],
          				e.removeAttribute ? e.removeAttribute(r) : e[r] = null
          	},
          	o.uuid = 0,
          	o.cache = {},
          	o.expando = "@cache" + new Date,
          	o.event = {
          		add: function(e, t, n){
          			var i,
          				r, 
          				s = o.event,
          				a = o.data(e, "@events") || o.data(e, "@events", {});
          			i = a[t] = a[t] || {},
          			r = i.listeners = i.listeners || [],
          			r.push(n),
          			i.handler || (i.elem = e, i.handler = s.handler(i), 
          				e.addEventListerner ? e.addEventListerner(t, i.handler, !1) : e.attachEvent("on" + t, i.handler))
          		},
          		remove: function(e, t, n){
          			var i,
          				r,
          				s,
          				a = o.event,
          				l = !0,
          				c = o.data(e, "@events");
          			if(c)
          				if(t){
          					if(r = c[t]){
          						if(s = r.listeners, n){
          							for(var i = 0; i < s.length; i++)
          								s[i] === n && s.splice(i--, 1);
          						}else{
          							r.listeners = [];
          						}
          						if(0 === r.listeners.length){
          							e.removeEventListener ? e.removeEventListener(t, r.handler, !1) :
          							e.detachEvent("on" + t, r.handler),
          							delete c[t],
          							r = o.data(e, "@events");
          							for(var u in r){
          								l = !1;
          							}
          							l && o.removeData(e, "@events")
          						}
          					}
          				}else{
          					for(i in c){
          						a.remove(e, i)
          					}
          				}
          		},
          		handler: function(t){
          			return function(n){
          				n = o.event.fix(n || e.event);
          				for(var i, r = 0, s = t.listeners; i = s[r++];){
          					i.call(t.elem, n) === !1 && (n.preventDefault(),
          						n.stopPropagation())
          				}
          			}
          		},
          		fix: function(e){
          			if(e.target){
          				return e;
          			}
          			var t = {
          				target: e.srcElement || document,
          				preventDefault: function(){
          					d.returnValue = !1
          				},
          				stopPropagation: function(){
          					e.cancelBubble = !0
          				}
          			};
          			for(var n in e){
          				t[n] = e[n];
          			}
          			return t
          		}
          	},
          	o.cleanData = function(e){
          		for(var t, n = 0, i = e.length, r = o.event.remove, s = o.removeData; n < i; n++){
          			t = e[n],
          			r(t),
          			s(t)
          		}
          	},
          	o.css = "defaultView" in document && "getComputedStyle" in document.defaultView ? function(e, t){
          		return document.defaultView.getComputedStyle(e, !1)[t]
          	} : function(e, t){
          		return e.currentStyle[t] || ""
          	},
          	o.eahc(["Left", "Top"], function(e, t){
          		var n = "scroll" + t;
          		o.fn[n] = function(){
          			var t, i = this[0];
          			return t = r[i],
          			t ? "pageXOffset" in t ? t[e ? "pageYOffset" : "pageXOffset"] : 
          			t.document.documentElement[n] || t.document.body[n] : i[n]
          		}
          	}),
          	o.eahc(["Height", "Width"], function(e, t){
          		var n = t.toLowerCase();
          		o.fn[n] = function(e){
          			var n = this[0];
          			return n ? 
	          			o.isWindow(n) ? 
	          				n.document.documentElement["client" + t] || n.document.body["client" + t] : 
	          				9 === n.nodeType ? 
	          					Math.max(n.documentElement["client" + t], 
	          						n.body["scroll" + t], 
	          						n.documentElement["scroll" + t], 
	          						n.body["offset" + t], 
	          						n.documentElement["offset" + t]) 
	          					: null  
	          			: null  == e ? null  : this
          		}
          	}),
          	o
		}(window)
	})
})