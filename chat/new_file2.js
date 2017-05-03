!function(e, t) {
    function n(e) {
        return function(t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        }
    }
    function i() {
        return m++
    }
    function r(e, t) {
        var n;
        if (n = e.charAt(0),
        E.test(e))
            n = e;
        else if ("." === n)
            for (n = (t ? t.match(w)[0] : u.cwd) + e,
            n = n.replace(x, "/"); n.match(k); )
                n = n.replace(k, "/");
        else
            n = "/" === n ? (n = u.cwd.match(C)) ? n[0] + e.substring(1) : e : u.base + e;
        return n
    }
    function o(e, t) {
        if (!e)
            return "";
        var n, i = e, o = u.alias, i = e = o && f(o[i]) ? o[i] : i, o = u.paths;
        o && (n = i.match(T)) && f(o[n[1]]) && (i = o[n[1]] + n[2]),
        n = i;
        var s = u.vars;
        s && -1 < n.indexOf("{") && (n = n.replace(j, function(e, t) {
            return f(s[t]) ? s[t] : e
        }
        )),
        i = n.length - 1,
        o = n.charAt(i),
        e = "#" === o ? n.substring(0, i) : ".js" === n.substring(i - 2) || 0 < n.indexOf("?") || ".css" === n.substring(i - 3) || "/" === o ? n : n + ".js",
        n = r(e, t);
        var i = u.map
          , a = n;
        if (i)
            for (var o = 0, l = i.length; o < l && (a = i[o],
            a = p(a) ? a(n) || n : n.replace(a[0], a[1]),
            !(a !== n)); o++)
                ;
        return a
    }
    function s(e, t) {
        var n, i = e.sheet;
        if ($)
            i && (n = !0);
        else if (i)
            try {
                i.cssRules && (n = !0)
            } catch (r) {
                "NS_ERROR_DOM_SECURITY_ERR" === r.name && (n = !0)
            }
        setTimeout(function() {
            n ? t() : s(e, t)
        }
        , 20)
    }
    function a() {
        if (v)
            return v;
        if (y && "interactive" === y.readyState)
            return y;
        for (var e = D.getElementsByTagName("script"), t = e.length - 1; 0 <= t; t--) {
            var n = e[t];
            if ("interactive" === n.readyState)
                return y = n
        }
    }
    function l(e, t) {
        this.uri = e,
        this.dependencies = t || [],
        this.exports = null ,
        this.status = 0,
        this._waitings = {},
        this._remain = 0
    }
    if (!e.seajs) {
        var c = e.seajs = {
            version: "2.1.1"
        }
          , u = c.data = {}
          , d = n("Object")
          , f = n("String")
          , h = Array.isArray || n("Array")
          , p = n("Function")
          , m = 0
          , g = u.events = {};
        c.on = function(e, t) {
            return (g[e] || (g[e] = [])).push(t),
            c
        }
        ,
        c.off = function(e, t) {
            if (!e && !t)
                return g = u.events = {},
                c;
            var n = g[e];
            if (n)
                if (t)
                    for (var i = n.length - 1; 0 <= i; i--)
                        n[i] === t && n.splice(i, 1);
                else
                    delete g[e];
            return c
        }
        ;
        var v, y, _, b = c.emit = function(e, t) {
            var n, i = g[e];
            if (i)
                for (i = i.slice(); n = i.shift(); )
                    n(t);
            return c
        }
        , w = /[^?#]*\//, x = /\/\.\//g, k = /\/[^\/]+\/\.\.\//, T = /^([^\/:]+)(\/.+)$/, j = /{([^{]+)}/g, E = /^\/\/.|:\//, C = /^.*?\/\/.*?\//, N = document, S = location, A = S.href.match(w)[0], M = N.getElementsByTagName("script"), M = N.getElementById("seajsnode") || M[M.length - 1], M = ((M.hasAttribute ? M.src : M.getAttribute("src", 4)) || A).match(w)[0], D = N.getElementsByTagName("head")[0] || N.documentElement, H = D.getElementsByTagName("base")[0], L = /\.css(?:\?|$)/i, q = /^(?:loaded|complete|undefined)$/, $ = 536 > 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1"), O = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, I = /\\\\/g, B = c.cache = {}, R = {}, F = {}, P = {}, z = l.STATUS = {
            FETCHING: 1,
            SAVED: 2,
            LOADING: 3,
            LOADED: 4,
            EXECUTING: 5,
            EXECUTED: 6
        };
        l.prototype.resolve = function() {
            for (var e = this.dependencies, t = [], n = 0, i = e.length; n < i; n++)
                t[n] = l.resolve(e[n], this.uri);
            return t
        }
        ,
        l.prototype.load = function() {
            if (!(this.status >= z.LOADING)) {
                this.status = z.LOADING;
                var e = this.resolve();
                b("load", e);
                for (var t, n = this._remain = e.length, i = 0; i < n; i++)
                    t = l.get(e[i]),
                    t.status < z.LOADED ? t._waitings[this.uri] = (t._waitings[this.uri] || 0) + 1 : this._remain--;
                if (0 === this._remain)
                    this.onload();
                else {
                    for (var r = {}, i = 0; i < n; i++)
                        t = B[e[i]],
                        t.status < z.FETCHING ? t.fetch(r) : t.status === z.SAVED && t.load();
                    for (var o in r)
                        r.hasOwnProperty(o) && r[o]()
                }
            }
        }
        ,
        l.prototype.onload = function() {
            this.status = z.LOADED,
            this.callback && this.callback();
            var e, t, n = this._waitings;
            for (e in n)
                n.hasOwnProperty(e) && (t = B[e],
                t._remain -= n[e],
                0 === t._remain) && t.onload();
            delete this._waitings,
            delete this._remain
        }
        ,
        l.prototype.fetch = function(e) {
            function t() {
                var e = r.requestUri
                  , t = r.onRequest
                  , n = r.charset
                  , i = L.test(e)
                  , o = N.createElement(i ? "link" : "script");
                n && (n = p(n) ? n(e) : n) && (o.charset = n);
                var a = o;
                !i || !$ && "onload" in a ? a.onload = a.onerror = a.onreadystatechange = function() {
                    q.test(a.readyState) && (a.onload = a.onerror = a.onreadystatechange = null ,
                    !i && !u.debug && D.removeChild(a),
                    a = null ,
                    t())
                }
                 : setTimeout(function() {
                    s(a, t)
                }
                , 1),
                i ? (o.rel = "stylesheet",
                o.href = e) : (o.async = !0,
                o.src = e),
                v = o,
                H ? D.insertBefore(o, H) : D.appendChild(o),
                v = null 
            }
            function n() {
                delete R[o],
                F[o] = !0,
                _ && (l.save(i, _),
                _ = null );
                var e, t = P[o];
                for (delete P[o]; e = t.shift(); )
                    e.load()
            }
            var i = this.uri;
            this.status = z.FETCHING;
            var r = {
                uri: i
            };
            b("fetch", r);
            var o = r.requestUri || i;
            !o || F[o] ? this.load() : R[o] ? P[o].push(this) : (R[o] = !0,
            P[o] = [this],
            b("request", r = {
                uri: i,
                requestUri: o,
                onRequest: n,
                charset: u.charset
            }),
            r.requested || (e ? e[r.requestUri] = t : t()))
        }
        ,
        l.prototype.exec = function() {
            function e(t) {
                return l.get(e.resolve(t)).exec()
            }
            if (this.status >= z.EXECUTING)
                return this.exports;
            this.status = z.EXECUTING;
            var n = this.uri;
            e.resolve = function(e) {
                return l.resolve(e, n)
            }
            ,
            e.async = function(t, i) {
                return l.use(t, i, n + "_async_" + m++),
                e
            }
            ;
            var i = this.factory
              , i = p(i) ? i(e, this.exports = {}, this) : i;
            return i === t && (i = this.exports),
            null  === i && !L.test(n) && b("error", this),
            delete this.factory,
            this.exports = i,
            this.status = z.EXECUTED,
            b("exec", this),
            i
        }
        ,
        l.resolve = function(e, t) {
            var n = {
                id: e,
                refUri: t
            };
            return b("resolve", n),
            n.uri || o(n.id, t)
        }
        ,
        l.define = function(e, n, i) {
            var r = arguments.length;
            if (1 === r ? (i = e,
            e = t) : 2 === r && (i = n,
            h(e) ? (n = e,
            e = t) : n = t),
            !h(n) && p(i)) {
                var o = [];
                i.toString().replace(I, "").replace(O, function(e, t, n) {
                    n && o.push(n)
                }
                ),
                n = o
            }
            if (r = {
                id: e,
                uri: l.resolve(e),
                deps: n,
                factory: i
            },
            !r.uri && N.attachEvent) {
                var s = a();
                s && (r.uri = s.src)
            }
            b("define", r),
            r.uri ? l.save(r.uri, r) : _ = r
        }
        ,
        l.save = function(e, t) {
            var n = l.get(e);
            n.status < z.SAVED && (n.id = t.id || e,
            n.dependencies = t.deps || [],
            n.factory = t.factory,
            n.status = z.SAVED)
        }
        ,
        l.get = function(e, t) {
            return B[e] || (B[e] = new l(e,t))
        }
        ,
        l.use = function(t, n, i) {
            var r = l.get(i, h(t) ? t : [t]);
            r.callback = function() {
                for (var t = [], i = r.resolve(), o = 0, s = i.length; o < s; o++)
                    t[o] = B[i[o]].exec();
                n && n.apply(e, t),
                delete r.callback
            }
            ,
            r.load()
        }
        ,
        l.preload = function(e) {
            var t = u.preload
              , n = t.length;
            n ? l.use(t, function() {
                t.splice(0, n),
                l.preload(e)
            }
            , u.cwd + "_preload_" + m++) : e()
        }
        ,
        c.use = function(e, t) {
            return l.preload(function() {
                l.use(e, t, u.cwd + "_use_" + m++)
            }
            ),
            c
        }
        ,
        l.define.cmd = {},
        e.define = l.define,
        c.Module = l,
        u.fetchedList = F,
        u.cid = i,
        c.resolve = o,
        c.require = function(e) {
            return (B[l.resolve(e)] || {}).exports
        }
        ,
        u.base = (M.match(/^(.+?\/)(\?\?)?(seajs\/)+/) || ["", M])[1],
        u.dir = M,
        u.cwd = A,
        u.charset = "utf-8";
        var A = u
          , W = []
          , S = S.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2")
          , S = S + (" " + N.cookie);
        S.replace(/(seajs-\w+)=1/g, function(e, t) {
            W.push(t)
        }
        ),
        A.preload = W,
        c.config = function(e) {
            for (var t in e) {
                var n = e[t]
                  , i = u[t];
                if (i && d(i))
                    for (var o in n)
                        i[o] = n[o];
                else
                    h(i) ? n = i.concat(n) : "base" === t && ("/" === n.slice(-1) || (n += "/"),
                    n = r(n)),
                    u[t] = n
            }
            return b("config", e),
            c
        }
    }
}
(this),
define("main", ["underscore", "jquery", "backbone", "modules/menu", "views/menu"], function(require, exports, module) {
    function e() {
        a.width() <= 960 && i("#message_left").css({
            left: 15 - a.scrollLeft()
        })
    }
    var t, n = require("underscore"), i = require("jquery"), r = require("backbone"), o = require("modules/menu");
    n.trimHttp = function(e) {
        return e ? e.replace(/http:/, "") : e
    }
    ;
    var s = r.Router.extend({
        routes: {
            "": "home",
            ":module": "loadModule",
            ":module/rid:rid": "loadChatRoomByRid",
            ":module/mid:mid": "loadChatRoomByMid"
        },
        home: function() {
            this.loadModule("reply")
        },
        loadModule: function(module, e) {
            o(module),
            require.async(["modules", module].join("/"), function(n) {
                n && (t = n(e))
            }
            )
        },
        loadChatRoomByRid: function(module, e) {
            this._loadChatRoom({
                rid: e
            })
        },
        loadChatRoomByMid: function(module, e) {
            this._loadChatRoom({
                mid: e
            })
        },
        _loadChatRoom: function(e) {
            return t && t.loadChatRoom ? void t.loadChatRoom(e) : void this.loadModule("whisper", e)
        }
    });
    String.prototype.parseTagA = function() {
        return this.replace(new RegExp("#{([\\s\\S][^}]*)}{([\\s\\S][^}]*)}","g"), function(e, t, i) {
            return '<a target="_blank" href=' + n.trimHttp(i) + ">" + t + "</a>"
        }
        )
    }
    ,
    Date.prototype.format = function(e) {
        var t = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in t)
            new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
        return e
    }
    ;
    var a = i(window);
    exports.run = function() {
        new s,
        r.history.start(),
        e(),
        a.on("scroll", function() {
            t && a.scrollTop() >= i("body").height() - screen.height && t.scrollLoad && t.scrollLoad(),
            e()
        }
        );
        var n;
        a.on("resize", function() {
            n && clearTimeout(n),
            n = setTimeout(function() {
                n = null ,
                location.reload()
            }
            , 500)
        }
        ),
        a.on("unload", function() {
            i("body").scrollTop(0),
            i(".chat_history_list").scrollTop(0)
        }
        )
    }
}
),
define("artDialog", [], function(require) {
    return function(e, t) {
        function n(e, t, n) {
            t = t || document,
            n = n || "*";
            for (var i = 0, r = 0, o = [], s = t.getElementsByTagName(n), a = s.length, l = new RegExp("(^|\\s)" + e + "(\\s|$)"); i < a; i++)
                l.test(s[i].className) && (o[r] = s[i],
                r++);
            return o
        }
        function i(n) {
            var i = o.expando
              , r = n === e ? 0 : n[i];
            return r === t && (n[i] = r = ++o.uuid),
            r
        }
        function r(e) {
            return o.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
        }
        var o = e.art = function(e, t) {
            return new o.fn.constructor(e,t)
        }
          , s = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/
          , a = /[\n\t]/g;
        return e.$ === t && (e.$ = o),
        o.fn = o.prototype = {
            constructor: function(e, t) {
                var n, i;
                return t = t || document,
                e ? e.nodeType ? (this[0] = e,
                this) : "string" == typeof e && (n = s.exec(e),
                n && n[2]) ? (i = t.getElementById(n[2]),
                i && i.parentNode && (this[0] = i),
                this) : (this[0] = e,
                this) : this
            },
            hasClass: function(e) {
                var t = " " + e + " ";
                return (" " + this[0].className + " ").replace(a, " ").indexOf(t) > -1
            },
            addClass: function(e) {
                return this.hasClass(e) || (this[0].className += " " + e),
                this
            },
            removeClass: function(e) {
                var t = this[0];
                return e ? this.hasClass(e) && (t.className = t.className.replace(e, " ")) : t.className = "",
                this
            },
            css: function(e, n) {
                var i, r = this[0], s = arguments[0];
                if ("string" == typeof e) {
                    if (n === t)
                        return o.css(r, e);
                    r.style[e] = n
                } else
                    for (i in s)
                        r.style[i] = s[i];
                return this
            },
            show: function() {
                return this.css("display", "block")
            },
            hide: function() {
                return this.css("display", "none")
            },
            offset: function() {
                var e = this[0]
                  , t = e.getBoundingClientRect()
                  , n = e.ownerDocument
                  , i = n.body
                  , r = n.documentElement
                  , o = r.clientTop || i.clientTop || 0
                  , s = r.clientLeft || i.clientLeft || 0
                  , a = t.top + (self.pageYOffset || r.scrollTop) - o
                  , l = t.left + (self.pageXOffset || r.scrollLeft) - s;
                return {
                    left: l,
                    top: a
                }
            },
            html: function(e) {
                var n = this[0];
                return e === t ? n.innerHTML : (o.cleanData(n.getElementsByTagName("*")),
                n.innerHTML = e,
                this)
            },
            remove: function() {
                var e = this[0];
                return o.cleanData(e.getElementsByTagName("*")),
                o.cleanData([e]),
                e.parentNode.removeChild(e),
                this
            },
            bind: function(e, t) {
                return o.event.add(this[0], e, t),
                this
            },
            unbind: function(e, t) {
                return o.event.remove(this[0], e, t),
                this
            }
        },
        o.fn.constructor.prototype = o.fn,
        o.isWindow = function(e) {
            return e && "object" == typeof e && "setInterval" in e
        }
        ,
        o.fn.find = function(e) {
            var t, i = this[0], r = e.split(".")[1];
            return t = r ? document.getElementsByClassName ? i.getElementsByClassName(r) : n(r, i) : i.getElementsByTagName(e),
            o(t[0])
        }
        ,
        o.each = function(e, n) {
            var i, r = 0, o = e.length, s = o === t;
            if (s) {
                for (i in e)
                    if (n.call(e[i], i, e[i]) === !1)
                        break
            } else
                for (var a = e[0]; r < o && n.call(a, r, a) !== !1; a = e[++r])
                    ;
            return e
        }
        ,
        o.data = function(e, n, r) {
            var s = o.cache
              , a = i(e);
            return n === t ? s[a] : (s[a] || (s[a] = {}),
            r !== t && (s[a][n] = r),
            s[a][n])
        }
        ,
        o.removeData = function(e, t) {
            var n = !0
              , r = o.expando
              , s = o.cache
              , a = i(e)
              , l = a && s[a];
            if (l)
                if (t) {
                    delete l[t];
                    for (var c in l)
                        n = !1;
                    n && delete o.cache[a]
                } else
                    delete s[a],
                    e.removeAttribute ? e.removeAttribute(r) : e[r] = null 
        }
        ,
        o.uuid = 0,
        o.cache = {},
        o.expando = "@cache" + +new Date,
        o.event = {
            add: function(e, t, n) {
                var i, r, s = o.event, a = o.data(e, "@events") || o.data(e, "@events", {});
                i = a[t] = a[t] || {},
                r = i.listeners = i.listeners || [],
                r.push(n),
                i.handler || (i.elem = e,
                i.handler = s.handler(i),
                e.addEventListener ? e.addEventListener(t, i.handler, !1) : e.attachEvent("on" + t, i.handler))
            },
            remove: function(e, t, n) {
                var i, r, s, a = o.event, l = !0, c = o.data(e, "@events");
                if (c)
                    if (t) {
                        if (r = c[t]) {
                            if (s = r.listeners,
                            n)
                                for (i = 0; i < s.length; i++)
                                    s[i] === n && s.splice(i--, 1);
                            else
                                r.listeners = [];
                            if (0 === r.listeners.length) {
                                e.removeEventListener ? e.removeEventListener(t, r.handler, !1) : e.detachEvent("on" + t, r.handler),
                                delete c[t],
                                r = o.data(e, "@events");
                                for (var u in r)
                                    l = !1;
                                l && o.removeData(e, "@events")
                            }
                        }
                    } else
                        for (i in c)
                            a.remove(e, i)
            },
            handler: function(t) {
                return function(n) {
                    n = o.event.fix(n || e.event);
                    for (var i, r = 0, s = t.listeners; i = s[r++]; )
                        i.call(t.elem, n) === !1 && (n.preventDefault(),
                        n.stopPropagation())
                }
            },
            fix: function(e) {
                if (e.target)
                    return e;
                var t = {
                    target: e.srcElement || document,
                    preventDefault: function() {
                        e.returnValue = !1
                    },
                    stopPropagation: function() {
                        e.cancelBubble = !0
                    }
                };
                for (var n in e)
                    t[n] = e[n];
                return t
            }
        },
        o.cleanData = function(e) {
            for (var t, n = 0, i = e.length, r = o.event.remove, s = o.removeData; n < i; n++)
                t = e[n],
                r(t),
                s(t)
        }
        ,
        o.css = "defaultView" in document && "getComputedStyle" in document.defaultView ? function(e, t) {
            return document.defaultView.getComputedStyle(e, !1)[t]
        }
         : function(e, t) {
            return e.currentStyle[t] || ""
        }
        ,
        o.each(["Left", "Top"], function(e, t) {
            var n = "scroll" + t;
            o.fn[n] = function() {
                var t, i = this[0];
                return t = r(i),
                t ? "pageXOffset" in t ? t[e ? "pageYOffset" : "pageXOffset"] : t.document.documentElement[n] || t.document.body[n] : i[n]
            }
        }
        ),
        o.each(["Height", "Width"], function(e, t) {
            var n = t.toLowerCase();
            o.fn[n] = function(e) {
                var n = this[0];
                return n ? o.isWindow(n) ? n.document.documentElement["client" + t] || n.document.body["client" + t] : 9 === n.nodeType ? Math.max(n.documentElement["client" + t], n.body["scroll" + t], n.documentElement["scroll" + t], n.body["offset" + t], n.documentElement["offset" + t]) : null  : null  == e ? null  : this
            }
        }
        ),
        o
    }
    (window),
    function(e, t, n) {
        function i(e) {
            var t = f.focus;
            t && t._isLock && !t.dom.wrap[0].contains(e.target) && (e.stopPropagation(),
            t.dom.outer[0].focus())
        }
        if ("BackCompat" === document.compatMode)
            throw new Error("artDialog: Document types require more than xhtml1.0");
        var r, o = 0, s = (e(document.getElementsByTagName("html")[0]),
        "artDialog" + +new Date), a = t.VBArray && !t.XMLHttpRequest, l = "createTouch" in document && !("onmousemove" in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent), c = !a && !l, u = function() {
            try {
                return document.activeElement
            } catch (e) {}
        }
        , d = u(), f = function(e, t, i) {
            e = e || {},
            "string" != typeof e && 1 !== e.nodeType || (e = {
                content: e,
                fixed: !l
            });
            var a, u = f.defaults, d = e.follow = 1 === this.nodeType && this || e.follow;
            for (var h in u)
                e[h] === n && (e[h] = u[h]);
            return e.id = d && d[s + "follow"] || e.id || s + o,
            (a = f.list[e.id]) ? (d && a.follow(d),
            a.zIndex().focus(),
            a) : (c || (e.fixed = !1),
            e.button && e.button.push || (e.button = []),
            t !== n && (e.ok = t),
            e.ok && e.button.push({
                id: "ok",
                value: e.okValue,
                callback: e.ok,
                focus: !0
            }),
            i !== n && (e.cancel = i),
            e.cancel && e.button.push({
                id: "cancel",
                value: e.cancelValue,
                callback: e.cancel
            }),
            f.defaults.zIndex = e.zIndex,
            o++,
            f.list[e.id] = r ? r._create(e) : new f.fn._create(e))
        }
        ;
        f.version = "5.0.4",
        f.fn = f.prototype = {
            _create: function(e) {
                var t;
                return this.closed = !1,
                this.config = e,
                this.dom = t = this.dom || this._innerHTML(e),
                e.skin && t.wrap.addClass(e.skin),
                t.wrap.css("position", e.fixed ? "fixed" : "absolute"),
                t.close.show(),
                t.content.css("padding", e.padding),
                this.button.apply(this, e.button),
                this.title(e.title).content(e.content).size(e.width, e.height).time(e.time),
                this._reset(),
                this.zIndex(),
                e.lock && this.lock(),
                this._addEvent(),
                this[e.visible ? "visible" : "hidden"]().focus(),
                r = null ,
                e.initialize && e.initialize.call(this),
                this
            },
            content: function(t) {
                var n, i, r, o, s = this, a = this.dom.content, l = a[0];
                return this._elemBack && (this._elemBack(),
                delete this._elemBack),
                "string" == typeof t ? a.html(t) : t && 1 === t.nodeType && (o = t.style.display,
                n = t.previousSibling,
                i = t.nextSibling,
                r = t.parentNode,
                this._elemBack = function() {
                    n && n.parentNode ? n.parentNode.insertBefore(t, n.nextSibling) : i && i.parentNode ? i.parentNode.insertBefore(t, i) : r && r.appendChild(t),
                    t.style.display = o,
                    s._elemBack = null 
                }
                ,
                a.html(""),
                l.appendChild(t),
                e(t).show()),
                this._reset(),
                this
            },
            title: function(e) {
                var t = this.dom
                  , n = t.outer
                  , i = t.title
                  , r = "d-state-noTitle";
                return e === !1 ? (i.hide().html(""),
                n.addClass(r)) : (i.show().html(e),
                n.removeClass(r)),
                this
            },
            position: function() {
                var e = this.dom
                  , t = e.wrap[0]
                  , n = e.window
                  , i = e.document
                  , r = this.config.fixed
                  , o = r ? 0 : i.scrollLeft()
                  , a = r ? 0 : i.scrollTop()
                  , l = n.width()
                  , c = n.height()
                  , u = t.offsetWidth
                  , d = t.offsetHeight
                  , f = (l - u) / 2 + o
                  , h = 382 * (c - d) / 1e3 + a
                  , p = t.style;
                return p.left = Math.max(parseInt(f), o) + "px",
                p.top = Math.max(parseInt(h), a) + "px",
                this._follow && (this._follow.removeAttribute(s + "follow"),
                this._follow = null ),
                this
            },
            size: function(e, t) {
                var n = this.dom.main[0].style;
                return "number" == typeof e && (e += "px"),
                "number" == typeof t && (t += "px"),
                n.width = e,
                n.height = t,
                this
            },
            follow: function(t) {
                var n = e(t)
                  , i = this.config;
                if (!t || !t.offsetWidth && !t.offsetHeight)
                    return this.position(this._left, this._top);
                var r = i.fixed
                  , o = s + "follow"
                  , a = this.dom
                  , l = a.window
                  , c = a.document
                  , u = l.width()
                  , d = l.height()
                  , f = c.scrollLeft()
                  , h = c.scrollTop()
                  , p = n.offset()
                  , m = t.offsetWidth
                  , g = t.offsetHeight
                  , v = r ? p.left - f : p.left
                  , y = r ? p.top - h : p.top
                  , _ = this.dom.wrap[0]
                  , b = _.style
                  , w = _.offsetWidth
                  , x = _.offsetHeight
                  , k = v - (w - m) / 2
                  , T = y + g
                  , j = r ? 0 : f
                  , E = r ? 0 : h;
                return k = k < j ? v : k + w > u && v - w > j ? v - w + m : k,
                T = T + x > d + E && y - x > E ? y - x : T,
                b.left = parseInt(k) + "px",
                b.top = parseInt(T) + "px",
                this._follow && this._follow.removeAttribute(o),
                this._follow = t,
                t[o] = i.id,
                this
            },
            button: function() {
                for (var t, n, i, r, o, a = this.dom, l = a.buttons, c = l[0], u = "d-state-highlight", d = this._listeners = this._listeners || {}, f = [].slice.call(arguments), h = 0; h < f.length; h++)
                    t = f[h],
                    n = t.value,
                    i = t.id || n,
                    r = !d[i],
                    o = r ? document.createElement("input") : d[i].elem,
                    o.type = "button",
                    o.className = "d-button",
                    d[i] || (d[i] = {}),
                    n && (o.value = n),
                    t.width && (o.style.width = t.width),
                    t.callback && (d[i].callback = t.callback),
                    t.focus && (this._focus && this._focus.removeClass(u),
                    this._focus = e(o).addClass(u),
                    this.focus()),
                    o[s + "callback"] = i,
                    o.disabled = !!t.disabled,
                    r && (d[i].elem = o,
                    c.appendChild(o));
                return l[0].style.display = f.length ? "" : "none",
                this
            },
            visible: function() {
                return this.dom.wrap.css("visibility", "visible"),
                this.dom.outer.addClass("d-state-visible"),
                this._isLock && this._lockMask.show(),
                this
            },
            hidden: function() {
                return this.dom.wrap.css("visibility", "hidden"),
                this.dom.outer.removeClass("d-state-visible"),
                this._isLock && this._lockMask.hide(),
                this
            },
            close: function() {
                if (this.closed)
                    return this;
                var e = this.dom
                  , t = e.wrap
                  , n = f.list
                  , i = this.config.beforeunload;
                if (i && i.call(this) === !1)
                    return this;
                if (f.focus === this && (f.focus = null ),
                this._follow && this._follow.removeAttribute(s + "follow"),
                this._elemBack && this._elemBack(),
                this.time(),
                this.unlock(),
                this._removeEvent(),
                delete n[this.config.id],
                r)
                    t.remove();
                else {
                    r = this,
                    e.title.html(""),
                    e.content.html(""),
                    e.buttons.html(""),
                    t[0].className = t[0].style.cssText = "",
                    e.outer[0].className = "d-outer",
                    t.css({
                        left: 0,
                        top: 0,
                        position: c ? "fixed" : "absolute"
                    });
                    for (var o in this)
                        this.hasOwnProperty(o) && "dom" !== o && delete this[o];
                    this.hidden()
                }
                return d && d.focus(),
                this.closed = !0,
                this
            },
            time: function(e) {
                var t = this
                  , n = this._timer;
                return n && clearTimeout(n),
                e && (this._timer = setTimeout(function() {
                    t._click("cancel")
                }
                , e)),
                this
            },
            focus: function() {
                var e = this
                  , t = function() {
                    var t = u();
                    return t && e.dom.wrap[0].contains(t)
                }
                ;
                return t() || (d = u()),
                setTimeout(function() {
                    if (!t())
                        try {
                            var n = e._focus || e.dom.close || taht.dom.wrap;
                            n[0].focus()
                        } catch (i) {}
                }
                , 16),
                this
            },
            zIndex: function() {
                var e = this.dom
                  , t = f.focus
                  , n = f.defaults.zIndex++;
                return e.wrap.css("zIndex", n),
                this._lockMask && this._lockMask.css("zIndex", n - 1),
                t && t.dom.outer.removeClass("d-state-focus"),
                f.focus = this,
                e.outer.addClass("d-state-focus"),
                this
            },
            lock: function() {
                if (this._isLock)
                    return this;
                var n = this
                  , i = (this.config,
                this.dom)
                  , r = document.createElement("div")
                  , o = e(r)
                  , s = f.defaults.zIndex - 1;
                return this.zIndex(),
                i.outer.addClass("d-state-lock"),
                o.css({
                    zIndex: s,
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                }).addClass("d-mask"),
                c || o.css({
                    position: "absolute",
                    width: e(t).width() + "px",
                    height: e(document).height() + "px"
                }),
                o.bind("dblclick", function() {
                    n._click("cancel")
                }
                ),
                document.body.appendChild(r),
                this._lockMask = o,
                this._isLock = !0,
                this
            },
            unlock: function() {
                return this._isLock ? (this._lockMask.unbind(),
                this._lockMask.hide(),
                this._lockMask.remove(),
                this.dom.outer.removeClass("d-state-lock"),
                this._isLock = !1,
                this) : this
            },
            _innerHTML: function(n) {
                var i = document.body;
                if (!i)
                    throw new Error('artDialog: "documents.body" not ready');
                var r = document.createElement("div");
                r.style.cssText = "position:absolute;left:0;top:0",
                r.innerHTML = f._templates.replace(/{([^}]+)}/g, function(e, t) {
                    var i = n[t];
                    return "string" == typeof i ? i : ""
                }
                ),
                i.insertBefore(r, i.firstChild);
                for (var o, s = 0, a = {}, l = r.getElementsByTagName("*"), c = l.length; s < c; s++)
                    o = l[s].className.split("d-")[1],
                    o && (a[o] = e(l[s]));
                return a.window = e(t),
                a.document = e(document),
                a.wrap = e(r),
                a
            },
            _click: function(e) {
                var t = this._listeners[e] && this._listeners[e].callback;
                return "function" != typeof t || t.call(this) !== !1 ? this.close() : this
            },
            _reset: function() {
                var e = this.config.follow || this._follow;
                e ? this.follow(e) : this.position()
            },
            _addEvent: function() {
                var e = this
                  , t = this.dom;
                t.wrap.bind("click", function(n) {
                    var i, r = n.target;
                    return !r.disabled && (r === t.close[0] ? (e._click("cancel"),
                    !1) : (i = r[s + "callback"],
                    void (i && e._click(i))))
                }
                ).bind("mousedown", function() {
                    e.zIndex()
                }
                )
            },
            _removeEvent: function() {
                this.dom.wrap.unbind()
            }
        },
        f.fn._create.prototype = f.fn,
        e.fn.dialog = e.fn.artDialog = function() {
            var e = arguments;
            return this[this.live ? "live" : "bind"]("click", function() {
                return f.apply(this, e),
                !1
            }
            ),
            this
        }
        ,
        f.focus = null ,
        f.get = function(e) {
            return e === n ? f.list : f.list[e]
        }
        ,
        f.list = {},
        e(document).bind("keydown", function(e) {
            var t = e.target
              , n = t.nodeName
              , i = /^input|textarea$/i
              , r = f.focus
              , o = e.keyCode;
            !r || i.test(n) && "button" !== t.type || 27 === o && r._click("cancel")
        }
        ),
        e.fn.live ? e("body").live("focus", i) : document.addEventListener ? document.addEventListener("focus", i, !0) : e(document).bind("focusin", i),
        e(t).bind("resize", function() {
            var e = f.list;
            for (var t in e)
                e[t]._reset()
        }
        ),
        f._templates = '<div class="d-outer" role="dialog" tabindex="-1" aria-labelledby="d-title-{id}" aria-describedby="d-content-{id}"><table class="d-border"><tbody><tr><td class="d-nw"></td><td class="d-n"></td><td class="d-ne"></td></tr><tr><td class="d-w"></td><td class="d-c"><div class="d-inner"><table class="d-dialog"><tbody><tr><td class="d-header"><div class="d-titleBar"><div id="d-title-{id}" class="d-title"></div><a class="d-close" href="javascript:;" title="{cancelValue}">×</a></div></td></tr><tr><td class="d-main"><div id="d-content-{id}" class="d-content"></div></td></tr><tr><td class="d-footer"><div class="d-buttons"></div></td></tr></tbody></table></div></td><td class="d-e"></td></tr><tr><td class="d-sw"></td><td class="d-s"></td><td class="d-se"></td></tr></tbody></table></div>',
        f.defaults = {
            content: '<div class="d-loading"><span>loading..</span></div>',
            title: "message",
            button: null ,
            ok: null ,
            cancel: null ,
            initialize: null ,
            beforeunload: null ,
            okValue: "ok",
            cancelValue: "cancel",
            width: "auto",
            height: "auto",
            padding: "20px 25px",
            skin: null ,
            time: null ,
            visible: !0,
            follow: null ,
            lock: !1,
            fixed: !1,
            zIndex: 1987
        },
        this.artDialog = e.dialog = e.artDialog = f
    }
    (this.art || this.jQuery, this),
    art
}
),
define("backbone", ["underscore", "jquery"], function(require, exports, module) {
    !function(e) {
        var t = "object" == typeof self && self.self == self && self || "object" == typeof global && global.global == global && global;
        if ("function" == typeof define && define.amd)
            define(["underscore", "jquery", "exports"], function(n, i, r) {
                t.Backbone = e(t, r, n, i)
            }
            );
        else if ("undefined" != typeof exports) {
            var n, i = require("underscore");
            try {
                n = require("jquery")
            } catch (r) {}
            e(t, exports, i, n)
        } else
            t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
    }
    (function(e, t, n, i) {
        var r = e.Backbone
          , o = [].slice;
        t.VERSION = "1.2.1",
        t.$ = i,
        t.noConflict = function() {
            return e.Backbone = r,
            this
        }
        ,
        t.emulateHTTP = !1,
        t.emulateJSON = !1;
        var s = function(e, t, i) {
            switch (e) {
            case 1:
                return function() {
                    return n[t](this[i])
                }
                ;
            case 2:
                return function(e) {
                    return n[t](this[i], e)
                }
                ;
            case 3:
                return function(e, r) {
                    return n[t](this[i], e, r)
                }
                ;
            case 4:
                return function(e, r, o) {
                    return n[t](this[i], e, r, o)
                }
                ;
            default:
                return function() {
                    var e = o.call(arguments);
                    return e.unshift(this[i]),
                    n[t].apply(n, e)
                }
            }
        }
          , a = function(e, t, i) {
            n.each(t, function(t, r) {
                n[r] && (e.prototype[r] = s(t, r, i))
            }
            )
        }
          , l = t.Events = {}
          , c = /\s+/
          , u = function(e, t, i, r, o) {
            var s, a = 0;
            if (i && "object" == typeof i) {
                void 0 !== r && "context" in o && void 0 === o.context && (o.context = r);
                for (s = n.keys(i); a < s.length; a++)
                    t = e(t, s[a], i[s[a]], o)
            } else if (i && c.test(i))
                for (s = i.split(c); a < s.length; a++)
                    t = e(t, s[a], r, o);
            else
                t = e(t, i, r, o);
            return t
        }
        ;
        l.on = function(e, t, n) {
            return d(this, e, t, n)
        }
        ;
        var d = function(e, t, n, i, r) {
            if (e._events = u(f, e._events || {}, t, n, {
                context: i,
                ctx: e,
                listening: r
            }),
            r) {
                var o = e._listeners || (e._listeners = {});
                o[r.id] = r
            }
            return e
        }
        ;
        l.listenTo = function(e, t, i) {
            if (!e)
                return this;
            var r = e._listenId || (e._listenId = n.uniqueId("l"))
              , o = this._listeningTo || (this._listeningTo = {})
              , s = o[r];
            if (!s) {
                var a = this._listenId || (this._listenId = n.uniqueId("l"));
                s = o[r] = {
                    obj: e,
                    objId: r,
                    id: a,
                    listeningTo: o,
                    count: 0
                }
            }
            return d(e, t, i, this, s),
            this
        }
        ;
        var f = function(e, t, n, i) {
            if (n) {
                var r = e[t] || (e[t] = [])
                  , o = i.context
                  , s = i.ctx
                  , a = i.listening;
                a && a.count++,
                r.push({
                    callback: n,
                    context: o,
                    ctx: o || s,
                    listening: a
                })
            }
            return e
        }
        ;
        l.off = function(e, t, n) {
            return this._events ? (this._events = u(h, this._events, e, t, {
                context: n,
                listeners: this._listeners
            }),
            this) : this
        }
        ,
        l.stopListening = function(e, t, i) {
            var r = this._listeningTo;
            if (!r)
                return this;
            for (var o = e ? [e._listenId] : n.keys(r), s = 0; s < o.length; s++) {
                var a = r[o[s]];
                if (!a)
                    break;
                a.obj.off(t, i, this)
            }
            return n.isEmpty(r) && (this._listeningTo = void 0),
            this
        }
        ;
        var h = function(e, t, i, r) {
            if (e) {
                var o, s = 0, a = r.context, l = r.listeners;
                if (t || i || a) {
                    for (var c = t ? [t] : n.keys(e); s < c.length; s++) {
                        t = c[s];
                        var u = e[t];
                        if (!u)
                            break;
                        for (var d = [], f = 0; f < u.length; f++) {
                            var h = u[f];
                            i && i !== h.callback && i !== h.callback._callback || a && a !== h.context ? d.push(h) : (o = h.listening,
                            o && 0 === --o.count && (delete l[o.id],
                            delete o.listeningTo[o.objId]))
                        }
                        d.length ? e[t] = d : delete e[t]
                    }
                    return n.size(e) ? e : void 0
                }
                for (var p = n.keys(l); s < p.length; s++)
                    o = l[p[s]],
                    delete l[o.id],
                    delete o.listeningTo[o.objId]
            }
        }
        ;
        l.once = function(e, t, i) {
            var r = u(p, {}, e, t, n.bind(this.off, this));
            return this.on(r, void 0, i)
        }
        ,
        l.listenToOnce = function(e, t, i) {
            var r = u(p, {}, t, i, n.bind(this.stopListening, this, e));
            return this.listenTo(e, r)
        }
        ;
        var p = function(e, t, i, r) {
            if (i) {
                var o = e[t] = n.once(function() {
                    r(t, o),
                    i.apply(this, arguments)
                }
                );
                o._callback = i
            }
            return e
        }
        ;
        l.trigger = function(e) {
            if (!this._events)
                return this;
            for (var t = Math.max(0, arguments.length - 1), n = Array(t), i = 0; i < t; i++)
                n[i] = arguments[i + 1];
            return u(m, this._events, e, void 0, n),
            this
        }
        ;
        var m = function(e, t, n, i) {
            if (e) {
                var r = e[t]
                  , o = e.all;
                r && o && (o = o.slice()),
                r && g(r, i),
                o && g(o, [t].concat(i))
            }
            return e
        }
          , g = function(e, t) {
            var n, i = -1, r = e.length, o = t[0], s = t[1], a = t[2];
            switch (t.length) {
            case 0:
                for (; ++i < r; )
                    (n = e[i]).callback.call(n.ctx);
                return;
            case 1:
                for (; ++i < r; )
                    (n = e[i]).callback.call(n.ctx, o);
                return;
            case 2:
                for (; ++i < r; )
                    (n = e[i]).callback.call(n.ctx, o, s);
                return;
            case 3:
                for (; ++i < r; )
                    (n = e[i]).callback.call(n.ctx, o, s, a);
                return;
            default:
                for (; ++i < r; )
                    (n = e[i]).callback.apply(n.ctx, t);
                return
            }
        }
        ;
        l.bind = l.on,
        l.unbind = l.off,
        n.extend(t, l);
        var v = t.Model = function(e, t) {
            var i = e || {};
            t || (t = {}),
            this.cid = n.uniqueId(this.cidPrefix),
            this.attributes = {},
            t.collection && (this.collection = t.collection),
            t.parse && (i = this.parse(i, t) || {}),
            i = n.defaults({}, i, n.result(this, "defaults")),
            this.set(i, t),
            this.changed = {},
            this.initialize.apply(this, arguments)
        }
        ;
        n.extend(v.prototype, l, {
            changed: null ,
            validationError: null ,
            idAttribute: "id",
            cidPrefix: "c",
            initialize: function() {},
            toJSON: function(e) {
                return n.clone(this.attributes)
            },
            sync: function() {
                return t.sync.apply(this, arguments)
            },
            get: function(e) {
                return this.attributes[e]
            },
            escape: function(e) {
                return n.escape(this.get(e))
            },
            has: function(e) {
                return null  != this.get(e)
            },
            matches: function(e) {
                return !!n.iteratee(e, this)(this.attributes)
            },
            set: function(e, t, i) {
                if (null  == e)
                    return this;
                var r;
                if ("object" == typeof e ? (r = e,
                i = t) : (r = {})[e] = t,
                i || (i = {}),
                !this._validate(r, i))
                    return !1;
                var o = i.unset
                  , s = i.silent
                  , a = []
                  , l = this._changing;
                this._changing = !0,
                l || (this._previousAttributes = n.clone(this.attributes),
                this.changed = {});
                var c = this.attributes
                  , u = this.changed
                  , d = this._previousAttributes;
                this.idAttribute in r && (this.id = r[this.idAttribute]);
                for (var f in r)
                    t = r[f],
                    n.isEqual(c[f], t) || a.push(f),
                    n.isEqual(d[f], t) ? delete u[f] : u[f] = t,
                    o ? delete c[f] : c[f] = t;
                if (!s) {
                    a.length && (this._pending = i);
                    for (var h = 0; h < a.length; h++)
                        this.trigger("change:" + a[h], this, c[a[h]], i)
                }
                if (l)
                    return this;
                if (!s)
                    for (; this._pending; )
                        i = this._pending,
                        this._pending = !1,
                        this.trigger("change", this, i);
                return this._pending = !1,
                this._changing = !1,
                this
            },
            unset: function(e, t) {
                return this.set(e, void 0, n.extend({}, t, {
                    unset: !0
                }))
            },
            clear: function(e) {
                var t = {};
                for (var i in this.attributes)
                    t[i] = void 0;
                return this.set(t, n.extend({}, e, {
                    unset: !0
                }))
            },
            hasChanged: function(e) {
                return null  == e ? !n.isEmpty(this.changed) : n.has(this.changed, e)
            },
            changedAttributes: function(e) {
                if (!e)
                    return !!this.hasChanged() && n.clone(this.changed);
                var t = this._changing ? this._previousAttributes : this.attributes
                  , i = {};
                for (var r in e) {
                    var o = e[r];
                    n.isEqual(t[r], o) || (i[r] = o)
                }
                return !!n.size(i) && i
            },
            previous: function(e) {
                return null  != e && this._previousAttributes ? this._previousAttributes[e] : null 
            },
            previousAttributes: function() {
                return n.clone(this._previousAttributes)
            },
            fetch: function(e) {
                e = n.extend({
                    parse: !0
                }, e);
                var t = this
                  , i = e.success;
                return e.success = function(n) {
                    var r = e.parse ? t.parse(n, e) : n;
                    return !!t.set(r, e) && (i && i.call(e.context, t, n, e),
                    void t.trigger("sync", t, n, e))
                }
                ,
                B(this, e),
                this.sync("read", this, e)
            },
            save: function(e, t, i) {
                var r;
                null  == e || "object" == typeof e ? (r = e,
                i = t) : (r = {})[e] = t,
                i = n.extend({
                    validate: !0,
                    parse: !0
                }, i);
                var o = i.wait;
                if (r && !o) {
                    if (!this.set(r, i))
                        return !1
                } else if (!this._validate(r, i))
                    return !1;
                var s = this
                  , a = i.success
                  , l = this.attributes;
                i.success = function(e) {
                    s.attributes = l;
                    var t = i.parse ? s.parse(e, i) : e;
                    return o && (t = n.extend({}, r, t)),
                    !(t && !s.set(t, i)) && (a && a.call(i.context, s, e, i),
                    void s.trigger("sync", s, e, i))
                }
                ,
                B(this, i),
                r && o && (this.attributes = n.extend({}, l, r));
                var c = this.isNew() ? "create" : i.patch ? "patch" : "update";
                "patch" !== c || i.attrs || (i.attrs = r);
                var u = this.sync(c, this, i);
                return this.attributes = l,
                u
            },
            destroy: function(e) {
                e = e ? n.clone(e) : {};
                var t = this
                  , i = e.success
                  , r = e.wait
                  , o = function() {
                    t.stopListening(),
                    t.trigger("destroy", t, t.collection, e)
                }
                ;
                e.success = function(n) {
                    r && o(),
                    i && i.call(e.context, t, n, e),
                    t.isNew() || t.trigger("sync", t, n, e)
                }
                ;
                var s = !1;
                return this.isNew() ? n.defer(e.success) : (B(this, e),
                s = this.sync("delete", this, e)),
                r || o(),
                s
            },
            url: function() {
                var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || I();
                if (this.isNew())
                    return e;
                var t = this.get(this.idAttribute);
                return e.replace(/[^\/]$/, "$&/") + encodeURIComponent(t)
            },
            parse: function(e, t) {
                return e
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return !this.has(this.idAttribute)
            },
            isValid: function(e) {
                return this._validate({}, n.defaults({
                    validate: !0
                }, e))
            },
            _validate: function(e, t) {
                if (!t.validate || !this.validate)
                    return !0;
                e = n.extend({}, this.attributes, e);
                var i = this.validationError = this.validate(e, t) || null ;
                return !i || (this.trigger("invalid", this, i, n.extend(t, {
                    validationError: i
                })),
                !1)
            }
        });
        var y = {
            keys: 1,
            values: 1,
            pairs: 1,
            invert: 1,
            pick: 0,
            omit: 0,
            chain: 1,
            isEmpty: 1
        };
        a(v, y, "attributes");
        var _ = t.Collection = function(e, t) {
            t || (t = {}),
            t.model && (this.model = t.model),
            void 0 !== t.comparator && (this.comparator = t.comparator),
            this._reset(),
            this.initialize.apply(this, arguments),
            e && this.reset(e, n.extend({
                silent: !0
            }, t))
        }
          , b = {
            add: !0,
            remove: !0,
            merge: !0
        }
          , w = {
            add: !0,
            remove: !1
        };
        n.extend(_.prototype, l, {
            model: v,
            initialize: function() {},
            toJSON: function(e) {
                return this.map(function(t) {
                    return t.toJSON(e)
                }
                )
            },
            sync: function() {
                return t.sync.apply(this, arguments)
            },
            add: function(e, t) {
                return this.set(e, n.extend({
                    merge: !1
                }, t, w))
            },
            remove: function(e, t) {
                t = n.extend({}, t);
                var i = !n.isArray(e);
                e = i ? [e] : n.clone(e);
                var r = this._removeModels(e, t);
                return !t.silent && r && this.trigger("update", this, t),
                i ? r[0] : r
            },
            set: function(e, t) {
                t = n.defaults({}, t, b),
                t.parse && !this._isModel(e) && (e = this.parse(e, t));
                var i = !n.isArray(e);
                e = i ? e ? [e] : [] : e.slice();
                var r, o, s, a, l, c = t.at;
                null  != c && (c = +c),
                c < 0 && (c += this.length + 1);
                for (var u = this.comparator && null  == c && t.sort !== !1, d = n.isString(this.comparator) ? this.comparator : null , f = [], h = [], p = {}, m = t.add, g = t.merge, v = t.remove, y = !(u || !m || !v) && [], _ = !1, w = 0; w < e.length; w++) {
                    if (s = e[w],
                    a = this.get(s))
                        v && (p[a.cid] = !0),
                        g && s !== a && (s = this._isModel(s) ? s.attributes : s,
                        t.parse && (s = a.parse(s, t)),
                        a.set(s, t),
                        u && !l && a.hasChanged(d) && (l = !0)),
                        e[w] = a;
                    else if (m) {
                        if (o = e[w] = this._prepareModel(s, t),
                        !o)
                            continue;f.push(o),
                        this._addReference(o, t)
                    }
                    o = a || o,
                    o && (r = this.modelId(o.attributes),
                    !y || !o.isNew() && p[r] || (y.push(o),
                    _ = _ || !this.models[w] || o.cid !== this.models[w].cid),
                    p[r] = !0)
                }
                if (v) {
                    for (var w = 0; w < this.length; w++)
                        p[(o = this.models[w]).cid] || h.push(o);
                    h.length && this._removeModels(h, t)
                }
                if (f.length || _)
                    if (u && (l = !0),
                    this.length += f.length,
                    null  != c)
                        for (var w = 0; w < f.length; w++)
                            this.models.splice(c + w, 0, f[w]);
                    else {
                        y && (this.models.length = 0);
                        for (var x = y || f, w = 0; w < x.length; w++)
                            this.models.push(x[w])
                    }
                if (l && this.sort({
                    silent: !0
                }),
                !t.silent) {
                    for (var k = null  != c ? n.clone(t) : t, w = 0; w < f.length; w++)
                        null  != c && (k.index = c + w),
                        (o = f[w]).trigger("add", o, this, k);
                    (l || _) && this.trigger("sort", this, t),
                    (f.length || h.length) && this.trigger("update", this, t);
                }
                return i ? e[0] : e
            },
            reset: function(e, t) {
                t = t ? n.clone(t) : {};
                for (var i = 0; i < this.models.length; i++)
                    this._removeReference(this.models[i], t);
                return t.previousModels = this.models,
                this._reset(),
                e = this.add(e, n.extend({
                    silent: !0
                }, t)),
                t.silent || this.trigger("reset", this, t),
                e
            },
            push: function(e, t) {
                return this.add(e, n.extend({
                    at: this.length
                }, t))
            },
            pop: function(e) {
                var t = this.at(this.length - 1);
                return this.remove(t, e)
            },
            unshift: function(e, t) {
                return this.add(e, n.extend({
                    at: 0
                }, t))
            },
            shift: function(e) {
                var t = this.at(0);
                return this.remove(t, e)
            },
            slice: function() {
                return o.apply(this.models, arguments)
            },
            get: function(e) {
                if (null  != e) {
                    var t = this.modelId(this._isModel(e) ? e.attributes : e);
                    return this._byId[e] || this._byId[t] || this._byId[e.cid]
                }
            },
            at: function(e) {
                return e < 0 && (e += this.length),
                this.models[e]
            },
            where: function(e, t) {
                var i = n.matches(e);
                return this[t ? "find" : "filter"](function(e) {
                    return i(e.attributes)
                }
                )
            },
            findWhere: function(e) {
                return this.where(e, !0)
            },
            sort: function(e) {
                if (!this.comparator)
                    throw new Error("Cannot sort a set without a comparator");
                return e || (e = {}),
                n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)),
                e.silent || this.trigger("sort", this, e),
                this
            },
            pluck: function(e) {
                return n.invoke(this.models, "get", e)
            },
            fetch: function(e) {
                e = n.extend({
                    parse: !0
                }, e);
                var t = e.success
                  , i = this;
                return e.success = function(n) {
                    var r = e.reset ? "reset" : "set";
                    i[r](n, e),
                    t && t.call(e.context, i, n, e),
                    i.trigger("sync", i, n, e)
                }
                ,
                B(this, e),
                this.sync("read", this, e)
            },
            create: function(e, t) {
                t = t ? n.clone(t) : {};
                var i = t.wait;
                if (e = this._prepareModel(e, t),
                !e)
                    return !1;
                i || this.add(e, t);
                var r = this
                  , o = t.success;
                return t.success = function(e, t, n) {
                    i && r.add(e, n),
                    o && o.call(n.context, e, t, n)
                }
                ,
                e.save(null , t),
                e
            },
            parse: function(e, t) {
                return e
            },
            clone: function() {
                return new this.constructor(this.models,{
                    model: this.model,
                    comparator: this.comparator
                })
            },
            modelId: function(e) {
                return e[this.model.prototype.idAttribute || "id"]
            },
            _reset: function() {
                this.length = 0,
                this.models = [],
                this._byId = {}
            },
            _prepareModel: function(e, t) {
                if (this._isModel(e))
                    return e.collection || (e.collection = this),
                    e;
                t = t ? n.clone(t) : {},
                t.collection = this;
                var i = new this.model(e,t);
                return i.validationError ? (this.trigger("invalid", this, i.validationError, t),
                !1) : i
            },
            _removeModels: function(e, t) {
                for (var n = [], i = 0; i < e.length; i++) {
                    var r = this.get(e[i]);
                    if (r) {
                        var o = this.indexOf(r);
                        this.models.splice(o, 1),
                        this.length--,
                        t.silent || (t.index = o,
                        r.trigger("remove", r, this, t)),
                        n.push(r),
                        this._removeReference(r, t)
                    }
                }
                return !!n.length && n
            },
            _isModel: function(e) {
                return e instanceof v
            },
            _addReference: function(e, t) {
                this._byId[e.cid] = e;
                var n = this.modelId(e.attributes);
                null  != n && (this._byId[n] = e),
                e.on("all", this._onModelEvent, this)
            },
            _removeReference: function(e, t) {
                delete this._byId[e.cid];
                var n = this.modelId(e.attributes);
                null  != n && delete this._byId[n],
                this === e.collection && delete e.collection,
                e.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(e, t, n, i) {
                if ("add" !== e && "remove" !== e || n === this) {
                    if ("destroy" === e && this.remove(t, i),
                    "change" === e) {
                        var r = this.modelId(t.previousAttributes())
                          , o = this.modelId(t.attributes);
                        r !== o && (null  != r && delete this._byId[r],
                        null  != o && (this._byId[o] = t))
                    }
                    this.trigger.apply(this, arguments)
                }
            }
        });
        var x = {
            forEach: 3,
            each: 3,
            map: 3,
            collect: 3,
            reduce: 4,
            foldl: 4,
            inject: 4,
            reduceRight: 4,
            foldr: 4,
            find: 3,
            detect: 3,
            filter: 3,
            select: 3,
            reject: 3,
            every: 3,
            all: 3,
            some: 3,
            any: 3,
            include: 2,
            contains: 2,
            invoke: 0,
            max: 3,
            min: 3,
            toArray: 1,
            size: 1,
            first: 3,
            head: 3,
            take: 3,
            initial: 3,
            rest: 3,
            tail: 3,
            drop: 3,
            last: 3,
            without: 0,
            difference: 0,
            indexOf: 3,
            shuffle: 1,
            lastIndexOf: 3,
            isEmpty: 1,
            chain: 1,
            sample: 3,
            partition: 3
        };
        a(_, x, "models");
        var k = ["groupBy", "countBy", "sortBy", "indexBy"];
        n.each(k, function(e) {
            n[e] && (_.prototype[e] = function(t, i) {
                var r = n.isFunction(t) ? t : function(e) {
                    return e.get(t)
                }
                ;
                return n[e](this.models, r, i)
            }
            )
        }
        );
        var T = t.View = function(e) {
            this.cid = n.uniqueId("view"),
            n.extend(this, n.pick(e, E)),
            this._ensureElement(),
            this.initialize.apply(this, arguments)
        }
          , j = /^(\S+)\s*(.*)$/
          , E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        n.extend(T.prototype, l, {
            tagName: "div",
            $: function(e) {
                return this.$el.find(e)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this._removeElement(),
                this.stopListening(),
                this
            },
            _removeElement: function() {
                this.$el.remove()
            },
            setElement: function(e) {
                return this.undelegateEvents(),
                this._setElement(e),
                this.delegateEvents(),
                this
            },
            _setElement: function(e) {
                this.$el = e instanceof t.$ ? e : t.$(e),
                this.el = this.$el[0]
            },
            delegateEvents: function(e) {
                if (e || (e = n.result(this, "events")),
                !e)
                    return this;
                this.undelegateEvents();
                for (var t in e) {
                    var i = e[t];
                    if (n.isFunction(i) || (i = this[i]),
                    i) {
                        var r = t.match(j);
                        this.delegate(r[1], r[2], n.bind(i, this))
                    }
                }
                return this
            },
            delegate: function(e, t, n) {
                return this.$el.on(e + ".delegateEvents" + this.cid, t, n),
                this
            },
            undelegateEvents: function() {
                return this.$el && this.$el.off(".delegateEvents" + this.cid),
                this
            },
            undelegate: function(e, t, n) {
                return this.$el.off(e + ".delegateEvents" + this.cid, t, n),
                this
            },
            _createElement: function(e) {
                return document.createElement(e)
            },
            _ensureElement: function() {
                if (this.el)
                    this.setElement(n.result(this, "el"));
                else {
                    var e = n.extend({}, n.result(this, "attributes"));
                    this.id && (e.id = n.result(this, "id")),
                    this.className && (e["class"] = n.result(this, "className")),
                    this.setElement(this._createElement(n.result(this, "tagName"))),
                    this._setAttributes(e)
                }
            },
            _setAttributes: function(e) {
                this.$el.attr(e)
            }
        }),
        t.sync = function(e, i, r) {
            var o = C[e];
            n.defaults(r || (r = {}), {
                emulateHTTP: t.emulateHTTP,
                emulateJSON: t.emulateJSON
            });
            var s = {
                type: o,
                dataType: "json"
            };
            if (r.url || (s.url = n.result(i, "url") || I()),
            null  != r.data || !i || "create" !== e && "update" !== e && "patch" !== e || (s.contentType = "application/json",
            s.data = JSON.stringify(r.attrs || i.toJSON(r))),
            r.emulateJSON && (s.contentType = "application/x-www-form-urlencoded",
            s.data = s.data ? {
                model: s.data
            } : {}),
            r.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
                s.type = "POST",
                r.emulateJSON && (s.data._method = o);
                var a = r.beforeSend;
                r.beforeSend = function(e) {
                    if (e.setRequestHeader("X-HTTP-Method-Override", o),
                    a)
                        return a.apply(this, arguments)
                }
            }
            "GET" === s.type || r.emulateJSON || (s.processData = !1);
            var l = r.error;
            r.error = function(e, t, n) {
                r.textStatus = t,
                r.errorThrown = n,
                l && l.call(r.context, e, t, n)
            }
            ;
            var c = r.xhr = t.ajax(n.extend(s, r));
            return i.trigger("request", i, c, r),
            c
        }
        ;
        var C = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            "delete": "DELETE",
            read: "GET"
        };
        t.ajax = function() {
            return t.$.ajax.apply(t.$, arguments)
        }
        ;
        var N = t.Router = function(e) {
            e || (e = {}),
            e.routes && (this.routes = e.routes),
            this._bindRoutes(),
            this.initialize.apply(this, arguments)
        }
          , S = /\((.*?)\)/g
          , A = /(\(\?)?:\w+/g
          , M = /\*\w+/g
          , D = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        n.extend(N.prototype, l, {
            initialize: function() {},
            route: function(e, i, r) {
                n.isRegExp(e) || (e = this._routeToRegExp(e)),
                n.isFunction(i) && (r = i,
                i = ""),
                r || (r = this[i]);
                var o = this;
                return t.history.route(e, function(n) {
                    var s = o._extractParameters(e, n);
                    o.execute(r, s, i) !== !1 && (o.trigger.apply(o, ["route:" + i].concat(s)),
                    o.trigger("route", i, s),
                    t.history.trigger("route", o, i, s))
                }
                ),
                this
            },
            execute: function(e, t, n) {
                e && e.apply(this, t)
            },
            navigate: function(e, n) {
                return t.history.navigate(e, n),
                this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = n.result(this, "routes");
                    for (var e, t = n.keys(this.routes); null  != (e = t.pop()); )
                        this.route(e, this.routes[e])
                }
            },
            _routeToRegExp: function(e) {
                return e = e.replace(D, "\\$&").replace(S, "(?:$1)?").replace(A, function(e, t) {
                    return t ? e : "([^/?]+)"
                }
                ).replace(M, "([^?]*?)"),
                new RegExp("^" + e + "(?:\\?([\\s\\S]*))?$")
            },
            _extractParameters: function(e, t) {
                var i = e.exec(t).slice(1);
                return n.map(i, function(e, t) {
                    return t === i.length - 1 ? e || null  : e ? decodeURIComponent(e) : null 
                }
                )
            }
        });
        var H = t.History = function() {
            this.handlers = [],
            n.bindAll(this, "checkUrl"),
            "undefined" != typeof window && (this.location = window.location,
            this.history = window.history)
        }
          , L = /^[#\/]|\s+$/g
          , q = /^\/+|\/+$/g
          , $ = /#.*$/;
        H.started = !1,
        n.extend(H.prototype, l, {
            interval: 50,
            atRoot: function() {
                var e = this.location.pathname.replace(/[^\/]$/, "$&/");
                return e === this.root && !this.getSearch()
            },
            matchRoot: function() {
                var e = this.decodeFragment(this.location.pathname)
                  , t = e.slice(0, this.root.length - 1) + "/";
                return t === this.root
            },
            decodeFragment: function(e) {
                return decodeURI(e.replace(/%25/g, "%2525"))
            },
            getSearch: function() {
                var e = this.location.href.replace(/#.*/, "").match(/\?.+/);
                return e ? e[0] : ""
            },
            getHash: function(e) {
                var t = (e || this).location.href.match(/#(.*)$/);
                return t ? t[1] : ""
            },
            getPath: function() {
                var e = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
                return "/" === e.charAt(0) ? e.slice(1) : e
            },
            getFragment: function(e) {
                return null  == e && (e = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()),
                e.replace(L, "")
            },
            start: function(e) {
                if (H.started)
                    throw new Error("Backbone.history has already been started");
                if (H.started = !0,
                this.options = n.extend({
                    root: "/"
                }, this.options, e),
                this.root = this.options.root,
                this._wantsHashChange = this.options.hashChange !== !1,
                this._hasHashChange = "onhashchange" in window,
                this._useHashChange = this._wantsHashChange && this._hasHashChange,
                this._wantsPushState = !!this.options.pushState,
                this._hasPushState = !(!this.history || !this.history.pushState),
                this._usePushState = this._wantsPushState && this._hasPushState,
                this.fragment = this.getFragment(),
                this.root = ("/" + this.root + "/").replace(q, "/"),
                this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !this.atRoot()) {
                        var t = this.root.slice(0, -1) || "/";
                        return this.location.replace(t + "#" + this.getPath()),
                        !0
                    }
                    this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {
                        replace: !0
                    })
                }
                if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                    this.iframe = document.createElement("iframe"),
                    this.iframe.src = "javascript:0",
                    this.iframe.style.display = "none",
                    this.iframe.tabIndex = -1;
                    var i = document.body
                      , r = i.insertBefore(this.iframe, i.firstChild).contentWindow;
                    r.document.open(),
                    r.document.close(),
                    r.location.hash = "#" + this.fragment
                }
                var o = window.addEventListener || function(e, t) {
                    return attachEvent("on" + e, t)
                }
                ;
                if (this._usePushState ? o("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe ? o("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)),
                !this.options.silent)
                    return this.loadUrl()
            },
            stop: function() {
                var e = window.removeEventListener || function(e, t) {
                    return detachEvent("on" + e, t)
                }
                ;
                this._usePushState ? e("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe && e("hashchange", this.checkUrl, !1),
                this.iframe && (document.body.removeChild(this.iframe),
                this.iframe = null ),
                this._checkUrlInterval && clearInterval(this._checkUrlInterval),
                H.started = !1
            },
            route: function(e, t) {
                this.handlers.unshift({
                    route: e,
                    callback: t
                })
            },
            checkUrl: function(e) {
                var t = this.getFragment();
                return t === this.fragment && this.iframe && (t = this.getHash(this.iframe.contentWindow)),
                t !== this.fragment && (this.iframe && this.navigate(t),
                void this.loadUrl())
            },
            loadUrl: function(e) {
                return !!this.matchRoot() && (e = this.fragment = this.getFragment(e),
                n.any(this.handlers, function(t) {
                    if (t.route.test(e))
                        return t.callback(e),
                        !0
                }
                ))
            },
            navigate: function(e, t) {
                if (!H.started)
                    return !1;
                t && t !== !0 || (t = {
                    trigger: !!t
                }),
                e = this.getFragment(e || "");
                var n = this.root;
                "" !== e && "?" !== e.charAt(0) || (n = n.slice(0, -1) || "/");
                var i = n + e;
                if (e = this.decodeFragment(e.replace($, "")),
                this.fragment !== e) {
                    if (this.fragment = e,
                    this._usePushState)
                        this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, i);
                    else {
                        if (!this._wantsHashChange)
                            return this.location.assign(i);
                        if (this._updateHash(this.location, e, t.replace),
                        this.iframe && e !== this.getHash(this.iframe.contentWindow)) {
                            var r = this.iframe.contentWindow;
                            t.replace || (r.document.open(),
                            r.document.close()),
                            this._updateHash(r.location, e, t.replace)
                        }
                    }
                    return t.trigger ? this.loadUrl(e) : void 0
                }
            },
            _updateHash: function(e, t, n) {
                if (n) {
                    var i = e.href.replace(/(javascript:|#).*$/, "");
                    e.replace(i + "#" + t)
                } else
                    e.hash = "#" + t
            }
        }),
        t.history = new H;
        var O = function(e, t) {
            var i, r = this;
            i = e && n.has(e, "constructor") ? e.constructor : function() {
                return r.apply(this, arguments)
            }
            ,
            n.extend(i, r, t);
            var o = function() {
                this.constructor = i
            }
            ;
            return o.prototype = r.prototype,
            i.prototype = new o,
            e && n.extend(i.prototype, e),
            i.__super__ = r.prototype,
            i
        }
        ;
        v.extend = _.extend = N.extend = T.extend = H.extend = O;
        var I = function() {
            throw new Error('A "url" property or function must be specified')
        }
          , B = function(e, t) {
            var n = t.error;
            t.error = function(i) {
                n && n.call(t.context, e, i, t),
                e.trigger("error", e, i, t)
            }
        }
        ;
        return t
    }
    )
}
),
define("jquery", [], function() {
    !function(e, t) {
        function n(e) {
            var t = pe[e] = {};
            return Q.each(e.split(te), function(e, n) {
                t[n] = !0
            }
            ),
            t
        }
        function i(e, n, i) {
            if (i === t && 1 === e.nodeType) {
                var r = "data-" + n.replace(ge, "-$1").toLowerCase();
                if (i = e.getAttribute(r),
                "string" == typeof i) {
                    try {
                        i = "true" === i || "false" !== i && ("null" === i ? null  : +i + "" === i ? +i : me.test(i) ? Q.parseJSON(i) : i)
                    } catch (o) {}
                    Q.data(e, n, i)
                } else
                    i = t
            }
            return i
        }
        function r(e) {
            var t;
            for (t in e)
                if (("data" !== t || !Q.isEmptyObject(e[t])) && "toJSON" !== t)
                    return !1;
            return !0
        }
        function o() {
            return !1
        }
        function s() {
            return !0
        }
        function a(e) {
            return !e || !e.parentNode || 11 === e.parentNode.nodeType
        }
        function l(e, t) {
            do
                e = e[t];
            while (e && 1 !== e.nodeType);return e
        }
        function c(e, t, n) {
            if (t = t || 0,
            Q.isFunction(t))
                return Q.grep(e, function(e, i) {
                    var r = !!t.call(e, i, e);
                    return r === n
                }
                );
            if (t.nodeType)
                return Q.grep(e, function(e, i) {
                    return e === t === n
                }
                );
            if ("string" == typeof t) {
                var i = Q.grep(e, function(e) {
                    return 1 === e.nodeType
                }
                );
                if ($e.test(t))
                    return Q.filter(t, i, !n);
                t = Q.filter(t, i)
            }
            return Q.grep(e, function(e, i) {
                return Q.inArray(e, t) >= 0 === n
            }
            )
        }
        function u(e) {
            var t = Be.split("|")
              , n = e.createDocumentFragment();
            if (n.createElement)
                for (; t.length; )
                    n.createElement(t.pop());
            return n
        }
        function d(e, t) {
            return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
        }
        function f(e, t) {
            if (1 === t.nodeType && Q.hasData(e)) {
                var n, i, r, o = Q._data(e), s = Q._data(t, o), a = o.events;
                if (a) {
                    delete s.handle,
                    s.events = {};
                    for (n in a)
                        for (i = 0,
                        r = a[n].length; i < r; i++)
                            Q.event.add(t, n, a[n][i])
                }
                s.data && (s.data = Q.extend({}, s.data))
            }
        }
        function h(e, t) {
            var n;
            1 === t.nodeType && (t.clearAttributes && t.clearAttributes(),
            t.mergeAttributes && t.mergeAttributes(e),
            n = t.nodeName.toLowerCase(),
            "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
            Q.support.html5Clone && e.innerHTML && !Q.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ge.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.selected = e.defaultSelected : "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue : "script" === n && t.text !== e.text && (t.text = e.text),
            t.removeAttribute(Q.expando))
        }
        function p(e) {
            return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
        }
        function m(e) {
            Ge.test(e.type) && (e.defaultChecked = e.checked)
        }
        function g(e, t) {
            if (t in e)
                return t;
            for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = gt.length; r--; )
                if (t = gt[r] + n,
                t in e)
                    return t;
            return i
        }
        function v(e, t) {
            return e = t || e,
            "none" === Q.css(e, "display") || !Q.contains(e.ownerDocument, e)
        }
        function y(e, t) {
            for (var n, i, r = [], o = 0, s = e.length; o < s; o++)
                n = e[o],
                n.style && (r[o] = Q._data(n, "olddisplay"),
                t ? (!r[o] && "none" === n.style.display && (n.style.display = ""),
                "" === n.style.display && v(n) && (r[o] = Q._data(n, "olddisplay", x(n.nodeName)))) : (i = nt(n, "display"),
                !r[o] && "none" !== i && Q._data(n, "olddisplay", i)));
            for (o = 0; o < s; o++)
                n = e[o],
                n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? r[o] || "" : "none"));
            return e
        }
        function _(e, t, n) {
            var i = ct.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
        }
        function b(e, t, n, i) {
            for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; r < 4; r += 2)
                "margin" === n && (o += Q.css(e, n + mt[r], !0)),
                i ? ("content" === n && (o -= parseFloat(nt(e, "padding" + mt[r])) || 0),
                "margin" !== n && (o -= parseFloat(nt(e, "border" + mt[r] + "Width")) || 0)) : (o += parseFloat(nt(e, "padding" + mt[r])) || 0,
                "padding" !== n && (o += parseFloat(nt(e, "border" + mt[r] + "Width")) || 0));
            return o
        }
        function w(e, t, n) {
            var i = "width" === t ? e.offsetWidth : e.offsetHeight
              , r = !0
              , o = Q.support.boxSizing && "border-box" === Q.css(e, "boxSizing");
            if (i <= 0) {
                if (i = nt(e, t),
                (i < 0 || null  == i) && (i = e.style[t]),
                ut.test(i))
                    return i;
                r = o && (Q.support.boxSizingReliable || i === e.style[t]),
                i = parseFloat(i) || 0
            }
            return i + b(e, t, n || (o ? "border" : "content"), r) + "px"
        }
        function x(e) {
            if (ft[e])
                return ft[e];
            var t = Q("<" + e + ">").appendTo(F.body)
              , n = t.css("display");
            return t.remove(),
            "none" !== n && "" !== n || (it = F.body.appendChild(it || Q.extend(F.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            })),
            rt && it.createElement || (rt = (it.contentWindow || it.contentDocument).document,
            rt.write("<!doctype html><html><body>"),
            rt.close()),
            t = rt.body.appendChild(rt.createElement(e)),
            n = nt(t, "display"),
            F.body.removeChild(it)),
            ft[e] = n,
            n
        }
        function k(e, t, n, i) {
            var r;
            if (Q.isArray(t))
                Q.each(t, function(t, r) {
                    n || _t.test(e) ? i(e, r) : k(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
                }
                );
            else if (n || "object" !== Q.type(t))
                i(e, t);
            else
                for (r in t)
                    k(e + "[" + r + "]", t[r], n, i)
        }
        function T(e) {
            return function(t, n) {
                "string" != typeof t && (n = t,
                t = "*");
                var i, r, o, s = t.toLowerCase().split(te), a = 0, l = s.length;
                if (Q.isFunction(n))
                    for (; a < l; a++)
                        i = s[a],
                        o = /^\+/.test(i),
                        o && (i = i.substr(1) || "*"),
                        r = e[i] = e[i] || [],
                        r[o ? "unshift" : "push"](n)
            }
        }
        function j(e, n, i, r, o, s) {
            o = o || n.dataTypes[0],
            s = s || {},
            s[o] = !0;
            for (var a, l = e[o], c = 0, u = l ? l.length : 0, d = e === qt; c < u && (d || !a); c++)
                a = l[c](n, i, r),
                "string" == typeof a && (!d || s[a] ? a = t : (n.dataTypes.unshift(a),
                a = j(e, n, i, r, a, s)));
            return (d || !a) && !s["*"] && (a = j(e, n, i, r, "*", s)),
            a
        }
        function E(e, n) {
            var i, r, o = Q.ajaxSettings.flatOptions || {};
            for (i in n)
                n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
            r && Q.extend(!0, e, r)
        }
        function C(e, n, i) {
            var r, o, s, a, l = e.contents, c = e.dataTypes, u = e.responseFields;
            for (o in u)
                o in i && (n[u[o]] = i[o]);
            for (; "*" === c[0]; )
                c.shift(),
                r === t && (r = e.mimeType || n.getResponseHeader("content-type"));
            if (r)
                for (o in l)
                    if (l[o] && l[o].test(r)) {
                        c.unshift(o);
                        break
                    }
            if (c[0] in i)
                s = c[0];
            else {
                for (o in i) {
                    if (!c[0] || e.converters[o + " " + c[0]]) {
                        s = o;
                        break
                    }
                    a || (a = o)
                }
                s = s || a
            }
            if (s)
                return s !== c[0] && c.unshift(s),
                i[s]
        }
        function N(e, t) {
            var n, i, r, o, s = e.dataTypes.slice(), a = s[0], l = {}, c = 0;
            if (e.dataFilter && (t = e.dataFilter(t, e.dataType)),
            s[1])
                for (n in e.converters)
                    l[n.toLowerCase()] = e.converters[n];
            for (; r = s[++c]; )
                if ("*" !== r) {
                    if ("*" !== a && a !== r) {
                        if (n = l[a + " " + r] || l["* " + r],
                        !n)
                            for (i in l)
                                if (o = i.split(" "),
                                o[1] === r && (n = l[a + " " + o[0]] || l["* " + o[0]])) {
                                    n === !0 ? n = l[i] : l[i] !== !0 && (r = o[0],
                                    s.splice(c--, 0, r));
                                    break
                                }
                        if (n !== !0)
                            if (n && e["throws"])
                                t = n(t);
                            else
                                try {
                                    t = n(t)
                                } catch (u) {
                                    return {
                                        state: "parsererror",
                                        error: n ? u : "No conversion from " + a + " to " + r
                                    }
                                }
                    }
                    a = r
                }
            return {
                state: "success",
                data: t
            }
        }
        function S() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {}
        }
        function A() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
        }
        function M() {
            return setTimeout(function() {
                Vt = t
            }
            , 0),
            Vt = Q.now()
        }
        function D(e, t) {
            Q.each(t, function(t, n) {
                for (var i = (Qt[t] || []).concat(Qt["*"]), r = 0, o = i.length; r < o; r++)
                    if (i[r].call(e, t, n))
                        return
            }
            )
        }
        function H(e, t, n) {
            var i, r = 0, o = Yt.length, s = Q.Deferred().always(function() {
                delete a.elem
            }
            ), a = function() {
                for (var t = Vt || M(), n = Math.max(0, l.startTime + l.duration - t), i = 1 - (n / l.duration || 0), r = 0, o = l.tweens.length; r < o; r++)
                    l.tweens[r].run(i);
                return s.notifyWith(e, [l, i, n]),
                i < 1 && o ? n : (s.resolveWith(e, [l]),
                !1)
            }
            , l = s.promise({
                elem: e,
                props: Q.extend({}, t),
                opts: Q.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Vt || M(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n, i) {
                    var r = Q.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r),
                    r
                },
                stop: function(t) {
                    for (var n = 0, i = t ? l.tweens.length : 0; n < i; n++)
                        l.tweens[n].run(1);
                    return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]),
                    this
                }
            }), c = l.props;
            for (L(c, l.opts.specialEasing); r < o; r++)
                if (i = Yt[r].call(l, e, c, l.opts))
                    return i;
            return D(l, c),
            Q.isFunction(l.opts.start) && l.opts.start.call(e, l),
            Q.fx.timer(Q.extend(a, {
                anim: l,
                queue: l.opts.queue,
                elem: e
            })),
            l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }
        function L(e, t) {
            var n, i, r, o, s;
            for (n in e)
                if (i = Q.camelCase(n),
                r = t[i],
                o = e[n],
                Q.isArray(o) && (r = o[1],
                o = e[n] = o[0]),
                n !== i && (e[i] = o,
                delete e[n]),
                s = Q.cssHooks[i],
                s && "expand" in s) {
                    o = s.expand(o),
                    delete e[i];
                    for (n in o)
                        n in e || (e[n] = o[n],
                        t[n] = r)
                } else
                    t[i] = r
        }
        function q(e, t, n) {
            var i, r, o, s, a, l, c, u, d = this, f = e.style, h = {}, p = [], m = e.nodeType && v(e);
            n.queue || (c = Q._queueHooks(e, "fx"),
            null  == c.unqueued && (c.unqueued = 0,
            u = c.empty.fire,
            c.empty.fire = function() {
                c.unqueued || u()
            }
            ),
            c.unqueued++,
            d.always(function() {
                d.always(function() {
                    c.unqueued--,
                    Q.queue(e, "fx").length || c.empty.fire()
                }
                )
            }
            )),
            1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY],
            "inline" === Q.css(e, "display") && "none" === Q.css(e, "float") && (Q.support.inlineBlockNeedsLayout && "inline" !== x(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")),
            n.overflow && (f.overflow = "hidden",
            Q.support.shrinkWrapBlocks || d.done(function() {
                f.overflow = n.overflow[0],
                f.overflowX = n.overflow[1],
                f.overflowY = n.overflow[2]
            }
            ));
            for (i in t)
                if (o = t[i],
                Jt.exec(o)) {
                    if (delete t[i],
                    o === (m ? "hide" : "show"))
                        continue;p.push(i)
                }
            if (s = p.length)
                for (a = Q._data(e, "fxshow") || Q._data(e, "fxshow", {}),
                m ? Q(e).show() : d.done(function() {
                    Q(e).hide()
                }
                ),
                d.done(function() {
                    var t;
                    Q.removeData(e, "fxshow", !0);
                    for (t in h)
                        Q.style(e, t, h[t])
                }
                ),
                i = 0; i < s; i++)
                    r = p[i],
                    l = d.createTween(r, m ? a[r] : 0),
                    h[r] = a[r] || Q.style(e, r),
                    r in a || (a[r] = l.start,
                    m && (l.end = l.start,
                    l.start = "width" === r || "height" === r ? 1 : 0))
        }
        function $(e, t, n, i, r) {
            return new $.prototype.init(e,t,n,i,r)
        }
        function O(e, t) {
            for (var n, i = {
                height: e
            }, r = 0; r < 4; r += 2 - t)
                n = mt[r],
                i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e),
            i
        }
        function I(e) {
            return Q.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
        }
        var B, R, F = e.document, P = e.location, z = e.navigator, W = e.jQuery, U = e.$, V = Array.prototype.push, X = Array.prototype.slice, J = Array.prototype.indexOf, G = Object.prototype.toString, K = Object.prototype.hasOwnProperty, Y = String.prototype.trim, Q = function(e, t) {
            return new Q.fn.init(e,t,B)
        }
        , Z = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, ee = /\S/, te = /\s+/, ne = ee.test(" ") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, ie = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, re = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, oe = /^[\],:{}\s]*$/, se = /(?:^|:|,)(?:\s*\[)+/g, ae = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, le = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, ce = /^-ms-/, ue = /-([\da-z])/gi, de = function(e, t) {
            return (t + "").toUpperCase()
        }
        , fe = function() {
            F.addEventListener ? (F.removeEventListener("DOMContentLoaded", fe, !1),
            Q.ready()) : "complete" === F.readyState && (F.detachEvent("onreadystatechange", fe),
            Q.ready())
        }
        , he = {};
        Q.fn = Q.prototype = {
            constructor: Q,
            init: function(e, n, i) {
                var r, o, s;
                if (!e)
                    return this;
                if (e.nodeType)
                    return this.context = this[0] = e,
                    this.length = 1,
                    this;
                if ("string" == typeof e) {
                    if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null , e, null ] : ie.exec(e),
                    r && (r[1] || !n)) {
                        if (r[1])
                            return n = n instanceof Q ? n[0] : n,
                            s = n && n.nodeType ? n.ownerDocument || n : F,
                            e = Q.parseHTML(r[1], s, !0),
                            re.test(r[1]) && Q.isPlainObject(n) && this.attr.call(e, n, !0),
                            Q.merge(this, e);
                        if (o = F.getElementById(r[2]),
                        o && o.parentNode) {
                            if (o.id !== r[2])
                                return i.find(e);
                            this.length = 1,
                            this[0] = o
                        }
                        return this.context = F,
                        this.selector = e,
                        this
                    }
                    return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e)
                }
                return Q.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector,
                this.context = e.context),
                Q.makeArray(e, this))
            },
            selector: "",
            jquery: "1.8.0",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return X.call(this)
            },
            get: function(e) {
                return null  == e ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
            },
            pushStack: function(e, t, n) {
                var i = Q.merge(this.constructor(), e);
                return i.prevObject = this,
                i.context = this.context,
                "find" === t ? i.selector = this.selector + (this.selector ? " " : "") + n : t && (i.selector = this.selector + "." + t + "(" + n + ")"),
                i
            },
            each: function(e, t) {
                return Q.each(this, e, t)
            },
            ready: function(e) {
                return Q.ready.promise().done(e),
                this
            },
            eq: function(e) {
                return e = +e,
                e === -1 ? this.slice(e) : this.slice(e, e + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(X.apply(this, arguments), "slice", X.call(arguments).join(","))
            },
            map: function(e) {
                return this.pushStack(Q.map(this, function(t, n) {
                    return e.call(t, n, t)
                }
                ))
            },
            end: function() {
                return this.prevObject || this.constructor(null )
            },
            push: V,
            sort: [].sort,
            splice: [].splice
        },
        Q.fn.init.prototype = Q.fn,
        Q.extend = Q.fn.extend = function() {
            var e, n, i, r, o, s, a = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
            for ("boolean" == typeof a && (u = a,
            a = arguments[1] || {},
            l = 2),
            "object" != typeof a && !Q.isFunction(a) && (a = {}),
            c === l && (a = this,
            --l); l < c; l++)
                if (null  != (e = arguments[l]))
                    for (n in e)
                        i = a[n],
                        r = e[n],
                        a !== r && (u && r && (Q.isPlainObject(r) || (o = Q.isArray(r))) ? (o ? (o = !1,
                        s = i && Q.isArray(i) ? i : []) : s = i && Q.isPlainObject(i) ? i : {},
                        a[n] = Q.extend(u, s, r)) : r !== t && (a[n] = r));
            return a
        }
        ,
        Q.extend({
            noConflict: function(t) {
                return e.$ === Q && (e.$ = U),
                t && e.jQuery === Q && (e.jQuery = W),
                Q
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? Q.readyWait++ : Q.ready(!0)
            },
            ready: function(e) {
                if (e === !0 ? !--Q.readyWait : !Q.isReady) {
                    if (!F.body)
                        return setTimeout(Q.ready, 1);
                    Q.isReady = !0,
                    e !== !0 && --Q.readyWait > 0 || (R.resolveWith(F, [Q]),
                    Q.fn.trigger && Q(F).trigger("ready").off("ready"))
                }
            },
            isFunction: function(e) {
                return "function" === Q.type(e)
            },
            isArray: Array.isArray || function(e) {
                return "array" === Q.type(e)
            }
            ,
            isWindow: function(e) {
                return null  != e && e == e.window
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return null  == e ? String(e) : he[G.call(e)] || "object"
            },
            isPlainObject: function(e) {
                if (!e || "object" !== Q.type(e) || e.nodeType || Q.isWindow(e))
                    return !1;
                try {
                    if (e.constructor && !K.call(e, "constructor") && !K.call(e.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (n) {
                    return !1
                }
                var i;
                for (i in e)
                    ;
                return i === t || K.call(e, i)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            error: function(e) {
                throw new Error(e)
            },
            parseHTML: function(e, t, n) {
                var i;
                return e && "string" == typeof e ? ("boolean" == typeof t && (n = t,
                t = 0),
                t = t || F,
                (i = re.exec(e)) ? [t.createElement(i[1])] : (i = Q.buildFragment([e], t, n ? null  : []),
                Q.merge([], (i.cacheable ? Q.clone(i.fragment) : i.fragment).childNodes))) : null 
            },
            parseJSON: function(t) {
                return t && "string" == typeof t ? (t = Q.trim(t),
                e.JSON && e.JSON.parse ? e.JSON.parse(t) : oe.test(t.replace(ae, "@").replace(le, "]").replace(se, "")) ? new Function("return " + t)() : void Q.error("Invalid JSON: " + t)) : null 
            },
            parseXML: function(n) {
                var i, r;
                if (!n || "string" != typeof n)
                    return null ;
                try {
                    e.DOMParser ? (r = new DOMParser,
                    i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"),
                    i.async = "false",
                    i.loadXML(n))
                } catch (o) {
                    i = t
                }
                return (!i || !i.documentElement || i.getElementsByTagName("parsererror").length) && Q.error("Invalid XML: " + n),
                i
            },
            noop: function() {},
            globalEval: function(t) {
                t && ee.test(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                }
                )(t)
            },
            camelCase: function(e) {
                return e.replace(ce, "ms-").replace(ue, de)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
            },
            each: function(e, n, i) {
                var r, o = 0, s = e.length, a = s === t || Q.isFunction(e);
                if (i)
                    if (a) {
                        for (r in e)
                            if (n.apply(e[r], i) === !1)
                                break
                    } else
                        for (; o < s && n.apply(e[o++], i) !== !1; )
                            ;
                else if (a) {
                    for (r in e)
                        if (n.call(e[r], r, e[r]) === !1)
                            break
                } else
                    for (; o < s && n.call(e[o], o, e[o++]) !== !1; )
                        ;
                return e
            },
            trim: Y ? function(e) {
                return null  == e ? "" : Y.call(e)
            }
             : function(e) {
                return null  == e ? "" : e.toString().replace(ne, "")
            }
            ,
            makeArray: function(e, t) {
                var n, i = t || [];
                return null  != e && (n = Q.type(e),
                null  == e.length || "string" === n || "function" === n || "regexp" === n || Q.isWindow(e) ? V.call(i, e) : Q.merge(i, e)),
                i
            },
            inArray: function(e, t, n) {
                var i;
                if (t) {
                    if (J)
                        return J.call(t, e, n);
                    for (i = t.length,
                    n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                        if (n in t && t[n] === e)
                            return n
                }
                return -1
            },
            merge: function(e, n) {
                var i = n.length
                  , r = e.length
                  , o = 0;
                if ("number" == typeof i)
                    for (; o < i; o++)
                        e[r++] = n[o];
                else
                    for (; n[o] !== t; )
                        e[r++] = n[o++];
                return e.length = r,
                e
            },
            grep: function(e, t, n) {
                var i, r = [], o = 0, s = e.length;
                for (n = !!n; o < s; o++)
                    i = !!t(e[o], o),
                    n !== i && r.push(e[o]);
                return r
            },
            map: function(e, n, i) {
                var r, o, s = [], a = 0, l = e.length, c = e instanceof Q || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || Q.isArray(e));
                if (c)
                    for (; a < l; a++)
                        r = n(e[a], a, i),
                        null  != r && (s[s.length] = r);
                else
                    for (o in e)
                        r = n(e[o], o, i),
                        null  != r && (s[s.length] = r);
                return s.concat.apply([], s)
            },
            guid: 1,
            proxy: function(e, n) {
                var i, r, o;
                return "string" == typeof n && (i = e[n],
                n = e,
                e = i),
                Q.isFunction(e) ? (r = X.call(arguments, 2),
                o = function() {
                    return e.apply(n, r.concat(X.call(arguments)))
                }
                ,
                o.guid = e.guid = e.guid || o.guid || Q.guid++,
                o) : t
            },
            access: function(e, n, i, r, o, s, a) {
                var l, c = null  == i, u = 0, d = e.length;
                if (i && "object" == typeof i) {
                    for (u in i)
                        Q.access(e, n, u, i[u], 1, s, r);
                    o = 1
                } else if (r !== t) {
                    if (l = a === t && Q.isFunction(r),
                    c && (l ? (l = n,
                    n = function(e, t, n) {
                        return l.call(Q(e), n)
                    }
                    ) : (n.call(e, r),
                    n = null )),
                    n)
                        for (; u < d; u++)
                            n(e[u], i, l ? r.call(e[u], u, n(e[u], i)) : r, a);
                    o = 1
                }
                return o ? e : c ? n.call(e) : d ? n(e[0], i) : s
            },
            now: function() {
                return (new Date).getTime()
            }
        }),
        Q.ready.promise = function(t) {
            if (!R)
                if (R = Q.Deferred(),
                "complete" === F.readyState || "loading" !== F.readyState && F.addEventListener)
                    setTimeout(Q.ready, 1);
                else if (F.addEventListener)
                    F.addEventListener("DOMContentLoaded", fe, !1),
                    e.addEventListener("load", Q.ready, !1);
                else {
                    F.attachEvent("onreadystatechange", fe),
                    e.attachEvent("onload", Q.ready);
                    var n = !1;
                    try {
                        n = null  == e.frameElement && F.documentElement
                    } catch (i) {}
                    n && n.doScroll && function r() {
                        if (!Q.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (e) {
                                return setTimeout(r, 50)
                            }
                            Q.ready()
                        }
                    }
                    ()
                }
            return R.promise(t)
        }
        ,
        Q.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
            he["[object " + t + "]"] = t.toLowerCase()
        }
        ),
        B = Q(F);
        var pe = {};
        Q.Callbacks = function(e) {
            e = "string" == typeof e ? pe[e] || n(e) : Q.extend({}, e);
            var i, r, o, s, a, l, c = [], u = !e.once && [], d = function(t) {
                for (i = e.memory && t,
                r = !0,
                l = s || 0,
                s = 0,
                a = c.length,
                o = !0; c && l < a; l++)
                    if (c[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        i = !1;
                        break
                    }
                o = !1,
                c && (u ? u.length && d(u.shift()) : i ? c = [] : f.disable())
            }
            , f = {
                add: function() {
                    if (c) {
                        var t = c.length;
                        !function n(t) {
                            Q.each(t, function(t, i) {
                                !Q.isFunction(i) || e.unique && f.has(i) ? i && i.length && n(i) : c.push(i)
                            }
                            )
                        }
                        (arguments),
                        o ? a = c.length : i && (s = t,
                        d(i))
                    }
                    return this
                },
                remove: function() {
                    return c && Q.each(arguments, function(e, t) {
                        for (var n; (n = Q.inArray(t, c, n)) > -1; )
                            c.splice(n, 1),
                            o && (n <= a && a--,
                            n <= l && l--)
                    }
                    ),
                    this
                },
                has: function(e) {
                    return Q.inArray(e, c) > -1
                },
                empty: function() {
                    return c = [],
                    this
                },
                disable: function() {
                    return c = u = i = t,
                    this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return u = t,
                    i || f.disable(),
                    this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, t) {
                    return t = t || [],
                    t = [e, t.slice ? t.slice() : t],
                    c && (!r || u) && (o ? u.push(t) : d(t)),
                    this
                },
                fire: function() {
                    return f.fireWith(this, arguments),
                    this
                },
                fired: function() {
                    return !!r
                }
            };
            return f
        }
        ,
        Q.extend({
            Deferred: function(e) {
                var t = [["resolve", "done", Q.Callbacks("once memory"), "resolved"], ["reject", "fail", Q.Callbacks("once memory"), "rejected"], ["notify", "progress", Q.Callbacks("memory")]]
                  , n = "pending"
                  , i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments),
                        this
                    },
                    then: function() {
                        var e = arguments;
                        return Q.Deferred(function(n) {
                            Q.each(t, function(t, i) {
                                var o = i[0]
                                  , s = e[t];
                                r[i[1]](Q.isFunction(s) ? function() {
                                    var e = s.apply(this, arguments);
                                    e && Q.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n : this, [e])
                                }
                                 : n[o])
                            }
                            ),
                            e = null 
                        }
                        ).promise()
                    },
                    promise: function(e) {
                        return "object" == typeof e ? Q.extend(e, i) : i
                    }
                }
                  , r = {};
                return i.pipe = i.then,
                Q.each(t, function(e, o) {
                    var s = o[2]
                      , a = o[3];
                    i[o[1]] = s.add,
                    a && s.add(function() {
                        n = a
                    }
                    , t[1 ^ e][2].disable, t[2][2].lock),
                    r[o[0]] = s.fire,
                    r[o[0] + "With"] = s.fireWith
                }
                ),
                i.promise(r),
                e && e.call(r, r),
                r
            },
            when: function(e) {
                var t, n, i, r = 0, o = X.call(arguments), s = o.length, a = 1 !== s || e && Q.isFunction(e.promise) ? s : 0, l = 1 === a ? e : Q.Deferred(), c = function(e, n, i) {
                    return function(r) {
                        n[e] = this,
                        i[e] = arguments.length > 1 ? X.call(arguments) : r,
                        i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                    }
                }
                ;
                if (s > 1)
                    for (t = new Array(s),
                    n = new Array(s),
                    i = new Array(s); r < s; r++)
                        o[r] && Q.isFunction(o[r].promise) ? o[r].promise().done(c(r, i, o)).fail(l.reject).progress(c(r, n, t)) : --a;
                return a || l.resolveWith(i, o),
                l.promise()
            }
        }),
        Q.support = function() {
            var t, n, i, r, o, s, a, l, c, u, d, f = F.createElement("div");
            if (f.setAttribute("className", "t"),
            f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
            n = f.getElementsByTagName("*"),
            i = f.getElementsByTagName("a")[0],
            i.style.cssText = "top:1px;float:left;opacity:.5",
            !n || !n.length || !i)
                return {};
            r = F.createElement("select"),
            o = r.appendChild(F.createElement("option")),
            s = f.getElementsByTagName("input")[0],
            t = {
                leadingWhitespace: 3 === f.firstChild.nodeType,
                tbody: !f.getElementsByTagName("tbody").length,
                htmlSerialize: !!f.getElementsByTagName("link").length,
                style: /top/.test(i.getAttribute("style")),
                hrefNormalized: "/a" === i.getAttribute("href"),
                opacity: /^0.5/.test(i.style.opacity),
                cssFloat: !!i.style.cssFloat,
                checkOn: "on" === s.value,
                optSelected: o.selected,
                getSetAttribute: "t" !== f.className,
                enctype: !!F.createElement("form").enctype,
                html5Clone: "<:nav></:nav>" !== F.createElement("nav").cloneNode(!0).outerHTML,
                boxModel: "CSS1Compat" === F.compatMode,
                submitBubbles: !0,
                changeBubbles: !0,
                focusinBubbles: !1,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0,
                boxSizingReliable: !0,
                pixelPosition: !1
            },
            s.checked = !0,
            t.noCloneChecked = s.cloneNode(!0).checked,
            r.disabled = !0,
            t.optDisabled = !o.disabled;
            try {
                delete f.test
            } catch (h) {
                t.deleteExpando = !1
            }
            if (!f.addEventListener && f.attachEvent && f.fireEvent && (f.attachEvent("onclick", d = function() {
                t.noCloneEvent = !1
            }
            ),
            f.cloneNode(!0).fireEvent("onclick"),
            f.detachEvent("onclick", d)),
            s = F.createElement("input"),
            s.value = "t",
            s.setAttribute("type", "radio"),
            t.radioValue = "t" === s.value,
            s.setAttribute("checked", "checked"),
            s.setAttribute("name", "t"),
            f.appendChild(s),
            a = F.createDocumentFragment(),
            a.appendChild(f.lastChild),
            t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked,
            t.appendChecked = s.checked,
            a.removeChild(s),
            a.appendChild(f),
            f.attachEvent)
                for (c in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                })
                    l = "on" + c,
                    u = l in f,
                    u || (f.setAttribute(l, "return;"),
                    u = "function" == typeof f[l]),
                    t[c + "Bubbles"] = u;
            return Q(function() {
                var n, i, r, o, s = "padding:0;margin:0;border:0;display:block;overflow:hidden;", a = F.getElementsByTagName("body")[0];
                a && (n = F.createElement("div"),
                n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
                a.insertBefore(n, a.firstChild),
                i = F.createElement("div"),
                n.appendChild(i),
                i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                r = i.getElementsByTagName("td"),
                r[0].style.cssText = "padding:0;margin:0;border:0;display:none",
                u = 0 === r[0].offsetHeight,
                r[0].style.display = "",
                r[1].style.display = "none",
                t.reliableHiddenOffsets = u && 0 === r[0].offsetHeight,
                i.innerHTML = "",
                i.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                t.boxSizing = 4 === i.offsetWidth,
                t.doesNotIncludeMarginInBodyOffset = 1 !== a.offsetTop,
                e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null ) || {}).top,
                t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null ) || {
                    width: "4px"
                }).width,
                o = F.createElement("div"),
                o.style.cssText = i.style.cssText = s,
                o.style.marginRight = o.style.width = "0",
                i.style.width = "1px",
                i.appendChild(o),
                t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null ) || {}).marginRight)),
                "undefined" != typeof i.style.zoom && (i.innerHTML = "",
                i.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1",
                t.inlineBlockNeedsLayout = 3 === i.offsetWidth,
                i.style.display = "block",
                i.style.overflow = "visible",
                i.innerHTML = "<div></div>",
                i.firstChild.style.width = "5px",
                t.shrinkWrapBlocks = 3 !== i.offsetWidth,
                n.style.zoom = 1),
                a.removeChild(n),
                n = i = r = o = null )
            }
            ),
            a.removeChild(f),
            n = i = r = o = s = a = f = null ,
            t
        }
        ();
        var me = /^(?:\{.*\}|\[.*\])$/
          , ge = /([A-Z])/g;
        Q.extend({
            cache: {},
            deletedIds: [],
            uuid: 0,
            expando: "jQuery" + (Q.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(e) {
                return e = e.nodeType ? Q.cache[e[Q.expando]] : e[Q.expando],
                !!e && !r(e)
            },
            data: function(e, n, i, r) {
                if (Q.acceptData(e)) {
                    var o, s, a = Q.expando, l = "string" == typeof n, c = e.nodeType, u = c ? Q.cache : e, d = c ? e[a] : e[a] && a;
                    if (d && u[d] && (r || u[d].data) || !l || i !== t)
                        return d || (c ? e[a] = d = Q.deletedIds.pop() || ++Q.uuid : d = a),
                        u[d] || (u[d] = {},
                        c || (u[d].toJSON = Q.noop)),
                        "object" != typeof n && "function" != typeof n || (r ? u[d] = Q.extend(u[d], n) : u[d].data = Q.extend(u[d].data, n)),
                        o = u[d],
                        r || (o.data || (o.data = {}),
                        o = o.data),
                        i !== t && (o[Q.camelCase(n)] = i),
                        l ? (s = o[n],
                        null  == s && (s = o[Q.camelCase(n)])) : s = o,
                        s
                }
            },
            removeData: function(e, t, n) {
                if (Q.acceptData(e)) {
                    var i, o, s, a = e.nodeType, l = a ? Q.cache : e, c = a ? e[Q.expando] : Q.expando;
                    if (l[c]) {
                        if (t && (i = n ? l[c] : l[c].data)) {
                            Q.isArray(t) || (t in i ? t = [t] : (t = Q.camelCase(t),
                            t = t in i ? [t] : t.split(" ")));
                            for (o = 0,
                            s = t.length; o < s; o++)
                                delete i[t[o]];
                            if (!(n ? r : Q.isEmptyObject)(i))
                                return
                        }
                        (n || (delete l[c].data,
                        r(l[c]))) && (a ? Q.cleanData([e], !0) : Q.support.deleteExpando || l != l.window ? delete l[c] : l[c] = null )
                    }
                }
            },
            _data: function(e, t, n) {
                return Q.data(e, t, n, !0)
            },
            acceptData: function(e) {
                var t = e.nodeName && Q.noData[e.nodeName.toLowerCase()];
                return !t || t !== !0 && e.getAttribute("classid") === t
            }
        }),
        Q.fn.extend({
            data: function(e, n) {
                var r, o, s, a, l, c = this[0], u = 0, d = null ;
                if (e === t) {
                    if (this.length && (d = Q.data(c),
                    1 === c.nodeType && !Q._data(c, "parsedAttrs"))) {
                        for (s = c.attributes,
                        l = s.length; u < l; u++)
                            a = s[u].name,
                            0 === a.indexOf("data-") && (a = Q.camelCase(a.substring(5)),
                            i(c, a, d[a]));
                        Q._data(c, "parsedAttrs", !0)
                    }
                    return d
                }
                return "object" == typeof e ? this.each(function() {
                    Q.data(this, e)
                }
                ) : (r = e.split(".", 2),
                r[1] = r[1] ? "." + r[1] : "",
                o = r[1] + "!",
                Q.access(this, function(n) {
                    return n === t ? (d = this.triggerHandler("getData" + o, [r[0]]),
                    d === t && c && (d = Q.data(c, e),
                    d = i(c, e, d)),
                    d === t && r[1] ? this.data(r[0]) : d) : (r[1] = n,
                    void this.each(function() {
                        var t = Q(this);
                        t.triggerHandler("setData" + o, r),
                        Q.data(this, e, n),
                        t.triggerHandler("changeData" + o, r)
                    }
                    ))
                }
                , null , n, arguments.length > 1, null , !1))
            },
            removeData: function(e) {
                return this.each(function() {
                    Q.removeData(this, e)
                }
                )
            }
        }),
        Q.extend({
            queue: function(e, t, n) {
                var i;
                if (e)
                    return t = (t || "fx") + "queue",
                    i = Q._data(e, t),
                    n && (!i || Q.isArray(n) ? i = Q._data(e, t, Q.makeArray(n)) : i.push(n)),
                    i || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = Q.queue(e, t)
                  , i = n.shift()
                  , r = Q._queueHooks(e, t)
                  , o = function() {
                    Q.dequeue(e, t)
                }
                ;
                "inprogress" === i && (i = n.shift()),
                i && ("fx" === t && n.unshift("inprogress"),
                delete r.stop,
                i.call(e, o, r)),
                !n.length && r && r.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return Q._data(e, n) || Q._data(e, n, {
                    empty: Q.Callbacks("once memory").add(function() {
                        Q.removeData(e, t + "queue", !0),
                        Q.removeData(e, n, !0)
                    }
                    )
                })
            }
        }),
        Q.fn.extend({
            queue: function(e, n) {
                var i = 2;
                return "string" != typeof e && (n = e,
                e = "fx",
                i--),
                arguments.length < i ? Q.queue(this[0], e) : n === t ? this : this.each(function() {
                    var t = Q.queue(this, e, n);
                    Q._queueHooks(this, e),
                    "fx" === e && "inprogress" !== t[0] && Q.dequeue(this, e)
                }
                )
            },
            dequeue: function(e) {
                return this.each(function() {
                    Q.dequeue(this, e)
                }
                )
            },
            delay: function(e, t) {
                return e = Q.fx ? Q.fx.speeds[e] || e : e,
                t = t || "fx",
                this.queue(t, function(t, n) {
                    var i = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(i)
                    }
                }
                )
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, n) {
                var i, r = 1, o = Q.Deferred(), s = this, a = this.length, l = function() {
                    --r || o.resolveWith(s, [s])
                }
                ;
                for ("string" != typeof e && (n = e,
                e = t),
                e = e || "fx"; a--; )
                    (i = Q._data(s[a], e + "queueHooks")) && i.empty && (r++,
                    i.empty.add(l));
                return l(),
                o.promise(n)
            }
        });
        var ve, ye, _e, be = /[\t\r\n]/g, we = /\r/g, xe = /^(?:button|input)$/i, ke = /^(?:button|input|object|select|textarea)$/i, Te = /^a(?:rea|)$/i, je = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Ee = Q.support.getSetAttribute;
        Q.fn.extend({
            attr: function(e, t) {
                return Q.access(this, Q.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    Q.removeAttr(this, e)
                }
                )
            },
            prop: function(e, t) {
                return Q.access(this, Q.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return e = Q.propFix[e] || e,
                this.each(function() {
                    try {
                        this[e] = t,
                        delete this[e]
                    } catch (n) {}
                }
                )
            },
            addClass: function(e) {
                var t, n, i, r, o, s, a;
                if (Q.isFunction(e))
                    return this.each(function(t) {
                        Q(this).addClass(e.call(this, t, this.className))
                    }
                    );
                if (e && "string" == typeof e)
                    for (t = e.split(te),
                    n = 0,
                    i = this.length; n < i; n++)
                        if (r = this[n],
                        1 === r.nodeType)
                            if (r.className || 1 !== t.length) {
                                for (o = " " + r.className + " ",
                                s = 0,
                                a = t.length; s < a; s++)
                                    ~o.indexOf(" " + t[s] + " ") || (o += t[s] + " ");
                                r.className = Q.trim(o)
                            } else
                                r.className = e;
                return this
            },
            removeClass: function(e) {
                var n, i, r, o, s, a, l;
                if (Q.isFunction(e))
                    return this.each(function(t) {
                        Q(this).removeClass(e.call(this, t, this.className))
                    }
                    );
                if (e && "string" == typeof e || e === t)
                    for (n = (e || "").split(te),
                    a = 0,
                    l = this.length; a < l; a++)
                        if (r = this[a],
                        1 === r.nodeType && r.className) {
                            for (i = (" " + r.className + " ").replace(be, " "),
                            o = 0,
                            s = n.length; o < s; o++)
                                for (; i.indexOf(" " + n[o] + " ") > -1; )
                                    i = i.replace(" " + n[o] + " ", " ");
                            r.className = e ? Q.trim(i) : ""
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e
                  , i = "boolean" == typeof t;
                return Q.isFunction(e) ? this.each(function(n) {
                    Q(this).toggleClass(e.call(this, n, this.className, t), t)
                }
                ) : this.each(function() {
                    if ("string" === n)
                        for (var r, o = 0, s = Q(this), a = t, l = e.split(te); r = l[o++]; )
                            a = i ? a : !s.hasClass(r),
                            s[a ? "addClass" : "removeClass"](r);
                    else
                        "undefined" !== n && "boolean" !== n || (this.className && Q._data(this, "__className__", this.className),
                        this.className = this.className || e === !1 ? "" : Q._data(this, "__className__") || "")
                }
                )
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", n = 0, i = this.length; n < i; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(be, " ").indexOf(t) > -1)
                        return !0;
                return !1
            },
            val: function(e) {
                var n, i, r, o = this[0];
                {
                    if (arguments.length)
                        return r = Q.isFunction(e),
                        this.each(function(i) {
                            var o, s = Q(this);
                            1 === this.nodeType && (o = r ? e.call(this, i, s.val()) : e,
                            null  == o ? o = "" : "number" == typeof o ? o += "" : Q.isArray(o) && (o = Q.map(o, function(e) {
                                return null  == e ? "" : e + ""
                            }
                            )),
                            n = Q.valHooks[this.type] || Q.valHooks[this.nodeName.toLowerCase()],
                            n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
                        }
                        );
                    if (o)
                        return n = Q.valHooks[o.type] || Q.valHooks[o.nodeName.toLowerCase()],
                        n && "get" in n && (i = n.get(o, "value")) !== t ? i : (i = o.value,
                        "string" == typeof i ? i.replace(we, "") : null  == i ? "" : i)
                }
            }
        }),
        Q.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = e.attributes.value;
                        return !t || t.specified ? e.value : e.text
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, i, r, o = e.selectedIndex, s = [], a = e.options, l = "select-one" === e.type;
                        if (o < 0)
                            return null ;
                        for (n = l ? o : 0,
                        i = l ? o + 1 : a.length; n < i; n++)
                            if (r = a[n],
                            r.selected && (Q.support.optDisabled ? !r.disabled : null  === r.getAttribute("disabled")) && (!r.parentNode.disabled || !Q.nodeName(r.parentNode, "optgroup"))) {
                                if (t = Q(r).val(),
                                l)
                                    return t;
                                s.push(t)
                            }
                        return l && !s.length && a.length ? Q(a[o]).val() : s
                    },
                    set: function(e, t) {
                        var n = Q.makeArray(t);
                        return Q(e).find("option").each(function() {
                            this.selected = Q.inArray(Q(this).val(), n) >= 0
                        }
                        ),
                        n.length || (e.selectedIndex = -1),
                        n
                    }
                }
            },
            attrFn: {},
            attr: function(e, n, i, r) {
                var o, s, a, l = e.nodeType;
                if (e && 3 !== l && 8 !== l && 2 !== l)
                    return r && Q.isFunction(Q.fn[n]) ? Q(e)[n](i) : "undefined" == typeof e.getAttribute ? Q.prop(e, n, i) : (a = 1 !== l || !Q.isXMLDoc(e),
                    a && (n = n.toLowerCase(),
                    s = Q.attrHooks[n] || (je.test(n) ? ye : ve)),
                    i !== t ? null  === i ? void Q.removeAttr(e, n) : s && "set" in s && a && (o = s.set(e, i, n)) !== t ? o : (e.setAttribute(n, "" + i),
                    i) : s && "get" in s && a && null  !== (o = s.get(e, n)) ? o : (o = e.getAttribute(n),
                    null  === o ? t : o))
            },
            removeAttr: function(e, t) {
                var n, i, r, o, s = 0;
                if (t && 1 === e.nodeType)
                    for (i = t.split(te); s < i.length; s++)
                        r = i[s],
                        r && (n = Q.propFix[r] || r,
                        o = je.test(r),
                        o || Q.attr(e, r, ""),
                        e.removeAttribute(Ee ? r : n),
                        o && n in e && (e[n] = !1))
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (xe.test(e.nodeName) && e.parentNode)
                            Q.error("type property can't be changed");
                        else if (!Q.support.radioValue && "radio" === t && Q.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                            n && (e.value = n),
                            t
                        }
                    }
                },
                value: {
                    get: function(e, t) {
                        return ve && Q.nodeName(e, "button") ? ve.get(e, t) : t in e ? e.value : null 
                    },
                    set: function(e, t, n) {
                        return ve && Q.nodeName(e, "button") ? ve.set(e, t, n) : void (e.value = t)
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(e, n, i) {
                var r, o, s, a = e.nodeType;
                if (e && 3 !== a && 8 !== a && 2 !== a)
                    return s = 1 !== a || !Q.isXMLDoc(e),
                    s && (n = Q.propFix[n] || n,
                    o = Q.propHooks[n]),
                    i !== t ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : e[n] = i : o && "get" in o && null  !== (r = o.get(e, n)) ? r : e[n]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var n = e.getAttributeNode("tabindex");
                        return n && n.specified ? parseInt(n.value, 10) : ke.test(e.nodeName) || Te.test(e.nodeName) && e.href ? 0 : t
                    }
                }
            }
        }),
        ye = {
            get: function(e, n) {
                var i, r = Q.prop(e, n);
                return r === !0 || "boolean" != typeof r && (i = e.getAttributeNode(n)) && i.nodeValue !== !1 ? n.toLowerCase() : t
            },
            set: function(e, t, n) {
                var i;
                return t === !1 ? Q.removeAttr(e, n) : (i = Q.propFix[n] || n,
                i in e && (e[i] = !0),
                e.setAttribute(n, n.toLowerCase())),
                n
            }
        },
        Ee || (_e = {
            name: !0,
            id: !0,
            coords: !0
        },
        ve = Q.valHooks.button = {
            get: function(e, n) {
                var i;
                return i = e.getAttributeNode(n),
                i && (_e[n] ? "" !== i.value : i.specified) ? i.value : t
            },
            set: function(e, t, n) {
                var i = e.getAttributeNode(n);
                return i || (i = F.createAttribute(n),
                e.setAttributeNode(i)),
                i.value = t + ""
            }
        },
        Q.each(["width", "height"], function(e, t) {
            Q.attrHooks[t] = Q.extend(Q.attrHooks[t], {
                set: function(e, n) {
                    if ("" === n)
                        return e.setAttribute(t, "auto"),
                        n
                }
            })
        }
        ),
        Q.attrHooks.contenteditable = {
            get: ve.get,
            set: function(e, t, n) {
                "" === t && (t = "false"),
                ve.set(e, t, n)
            }
        }),
        Q.support.hrefNormalized || Q.each(["href", "src", "width", "height"], function(e, n) {
            Q.attrHooks[n] = Q.extend(Q.attrHooks[n], {
                get: function(e) {
                    var i = e.getAttribute(n, 2);
                    return null  === i ? t : i
                }
            })
        }
        ),
        Q.support.style || (Q.attrHooks.style = {
            get: function(e) {
                return e.style.cssText.toLowerCase() || t
            },
            set: function(e, t) {
                return e.style.cssText = "" + t
            }
        }),
        Q.support.optSelected || (Q.propHooks.selected = Q.extend(Q.propHooks.selected, {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex,
                t.parentNode && t.parentNode.selectedIndex),
                null 
            }
        })),
        Q.support.enctype || (Q.propFix.enctype = "encoding"),
        Q.support.checkOn || Q.each(["radio", "checkbox"], function() {
            Q.valHooks[this] = {
                get: function(e) {
                    return null  === e.getAttribute("value") ? "on" : e.value
                }
            }
        }
        ),
        Q.each(["radio", "checkbox"], function() {
            Q.valHooks[this] = Q.extend(Q.valHooks[this], {
                set: function(e, t) {
                    if (Q.isArray(t))
                        return e.checked = Q.inArray(Q(e).val(), t) >= 0
                }
            })
        }
        );
        var Ce = /^(?:textarea|input|select)$/i
          , Ne = /^([^\.]*|)(?:\.(.+)|)$/
          , Se = /(?:^|\s)hover(\.\S+|)\b/
          , Ae = /^key/
          , Me = /^(?:mouse|contextmenu)|click/
          , De = /^(?:focusinfocus|focusoutblur)$/
          , He = function(e) {
            return Q.event.special.hover ? e : e.replace(Se, "mouseenter$1 mouseleave$1")
        }
        ;
        Q.event = {
            add: function(e, n, i, r, o) {
                var s, a, l, c, u, d, f, h, p, m, g;
                if (3 !== e.nodeType && 8 !== e.nodeType && n && i && (s = Q._data(e))) {
                    for (i.handler && (p = i,
                    i = p.handler,
                    o = p.selector),
                    i.guid || (i.guid = Q.guid++),
                    l = s.events,
                    l || (s.events = l = {}),
                    a = s.handle,
                    a || (s.handle = a = function(e) {
                        return "undefined" == typeof Q || e && Q.event.triggered === e.type ? t : Q.event.dispatch.apply(a.elem, arguments)
                    }
                    ,
                    a.elem = e),
                    n = Q.trim(He(n)).split(" "),
                    c = 0; c < n.length; c++)
                        u = Ne.exec(n[c]) || [],
                        d = u[1],
                        f = (u[2] || "").split(".").sort(),
                        g = Q.event.special[d] || {},
                        d = (o ? g.delegateType : g.bindType) || d,
                        g = Q.event.special[d] || {},
                        h = Q.extend({
                            type: d,
                            origType: u[1],
                            data: r,
                            handler: i,
                            guid: i.guid,
                            selector: o,
                            namespace: f.join(".")
                        }, p),
                        m = l[d],
                        m || (m = l[d] = [],
                        m.delegateCount = 0,
                        g.setup && g.setup.call(e, r, f, a) !== !1 || (e.addEventListener ? e.addEventListener(d, a, !1) : e.attachEvent && e.attachEvent("on" + d, a))),
                        g.add && (g.add.call(e, h),
                        h.handler.guid || (h.handler.guid = i.guid)),
                        o ? m.splice(m.delegateCount++, 0, h) : m.push(h),
                        Q.event.global[d] = !0;
                    e = null 
                }
            },
            global: {},
            remove: function(e, t, n, i, r) {
                var o, s, a, l, c, u, d, f, h, p, m, g = Q.hasData(e) && Q._data(e);
                if (g && (f = g.events)) {
                    for (t = Q.trim(He(t || "")).split(" "),
                    o = 0; o < t.length; o++)
                        if (s = Ne.exec(t[o]) || [],
                        a = l = s[1],
                        c = s[2],
                        a) {
                            for (h = Q.event.special[a] || {},
                            a = (i ? h.delegateType : h.bindType) || a,
                            p = f[a] || [],
                            u = p.length,
                            c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
                            d = 0; d < p.length; d++)
                                m = p[d],
                                (r || l === m.origType) && (!n || n.guid === m.guid) && (!c || c.test(m.namespace)) && (!i || i === m.selector || "**" === i && m.selector) && (p.splice(d--, 1),
                                m.selector && p.delegateCount--,
                                h.remove && h.remove.call(e, m));
                            0 === p.length && u !== p.length && ((!h.teardown || h.teardown.call(e, c, g.handle) === !1) && Q.removeEvent(e, a, g.handle),
                            delete f[a])
                        } else
                            for (a in f)
                                Q.event.remove(e, a + t[o], n, i, !0);
                    Q.isEmptyObject(f) && (delete g.handle,
                    Q.removeData(e, "events", !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(n, i, r, o) {
                if (!r || 3 !== r.nodeType && 8 !== r.nodeType) {
                    var s, a, l, c, u, d, f, h, p, m, g = n.type || n, v = [];
                    if (De.test(g + Q.event.triggered))
                        return;
                    if (g.indexOf("!") >= 0 && (g = g.slice(0, -1),
                    a = !0),
                    g.indexOf(".") >= 0 && (v = g.split("."),
                    g = v.shift(),
                    v.sort()),
                    (!r || Q.event.customEvent[g]) && !Q.event.global[g])
                        return;
                    if (n = "object" == typeof n ? n[Q.expando] ? n : new Q.Event(g,n) : new Q.Event(g),
                    n.type = g,
                    n.isTrigger = !0,
                    n.exclusive = a,
                    n.namespace = v.join("."),
                    n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
                    d = g.indexOf(":") < 0 ? "on" + g : "",
                    !r) {
                        s = Q.cache;
                        for (l in s)
                            s[l].events && s[l].events[g] && Q.event.trigger(n, i, s[l].handle.elem, !0);
                        return
                    }
                    if (n.result = t,
                    n.target || (n.target = r),
                    i = null  != i ? Q.makeArray(i) : [],
                    i.unshift(n),
                    f = Q.event.special[g] || {},
                    f.trigger && f.trigger.apply(r, i) === !1)
                        return;
                    if (p = [[r, f.bindType || g]],
                    !o && !f.noBubble && !Q.isWindow(r)) {
                        for (m = f.delegateType || g,
                        c = De.test(m + g) ? r : r.parentNode,
                        u = r; c; c = c.parentNode)
                            p.push([c, m]),
                            u = c;
                        u === (r.ownerDocument || F) && p.push([u.defaultView || u.parentWindow || e, m])
                    }
                    for (l = 0; l < p.length && !n.isPropagationStopped(); l++)
                        c = p[l][0],
                        n.type = p[l][1],
                        h = (Q._data(c, "events") || {})[n.type] && Q._data(c, "handle"),
                        h && h.apply(c, i),
                        h = d && c[d],
                        h && Q.acceptData(c) && h.apply(c, i) === !1 && n.preventDefault();
                    return n.type = g,
                    !o && !n.isDefaultPrevented() && (!f._default || f._default.apply(r.ownerDocument, i) === !1) && ("click" !== g || !Q.nodeName(r, "a")) && Q.acceptData(r) && d && r[g] && ("focus" !== g && "blur" !== g || 0 !== n.target.offsetWidth) && !Q.isWindow(r) && (u = r[d],
                    u && (r[d] = null ),
                    Q.event.triggered = g,
                    r[g](),
                    Q.event.triggered = t,
                    u && (r[d] = u)),
                    n.result
                }
            },
            dispatch: function(n) {
                n = Q.event.fix(n || e.event);
                var i, r, o, s, a, l, c, u, d, f, h = (Q._data(this, "events") || {})[n.type] || [], p = h.delegateCount, m = [].slice.call(arguments), g = !n.exclusive && !n.namespace, v = Q.event.special[n.type] || {}, y = [];
                if (m[0] = n,
                n.delegateTarget = this,
                !v.preDispatch || v.preDispatch.call(this, n) !== !1) {
                    if (p && (!n.button || "click" !== n.type))
                        for (s = Q(this),
                        s.context = this,
                        o = n.target; o != this; o = o.parentNode || this)
                            if (o.disabled !== !0 || "click" !== n.type) {
                                for (l = {},
                                u = [],
                                s[0] = o,
                                i = 0; i < p; i++)
                                    d = h[i],
                                    f = d.selector,
                                    l[f] === t && (l[f] = s.is(f)),
                                    l[f] && u.push(d);
                                u.length && y.push({
                                    elem: o,
                                    matches: u
                                })
                            }
                    for (h.length > p && y.push({
                        elem: this,
                        matches: h.slice(p)
                    }),
                    i = 0; i < y.length && !n.isPropagationStopped(); i++)
                        for (c = y[i],
                        n.currentTarget = c.elem,
                        r = 0; r < c.matches.length && !n.isImmediatePropagationStopped(); r++)
                            d = c.matches[r],
                            (g || !n.namespace && !d.namespace || n.namespace_re && n.namespace_re.test(d.namespace)) && (n.data = d.data,
                            n.handleObj = d,
                            a = ((Q.event.special[d.origType] || {}).handle || d.handler).apply(c.elem, m),
                            a !== t && (n.result = a,
                            a === !1 && (n.preventDefault(),
                            n.stopPropagation())));
                    return v.postDispatch && v.postDispatch.call(this, n),
                    n.result
                }
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null  == e.which && (e.which = null  != t.charCode ? t.charCode : t.keyCode),
                    e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, n) {
                    var i, r, o, s = n.button, a = n.fromElement;
                    return null  == e.pageX && null  != n.clientX && (i = e.target.ownerDocument || F,
                    r = i.documentElement,
                    o = i.body,
                    e.pageX = n.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0),
                    e.pageY = n.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)),
                    !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a),
                    !e.which && s !== t && (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
                    e
                }
            },
            fix: function(e) {
                if (e[Q.expando])
                    return e;
                var t, n, i = e, r = Q.event.fixHooks[e.type] || {}, o = r.props ? this.props.concat(r.props) : this.props;
                for (e = Q.Event(i),
                t = o.length; t; )
                    n = o[--t],
                    e[n] = i[n];
                return e.target || (e.target = i.srcElement || F),
                3 === e.target.nodeType && (e.target = e.target.parentNode),
                e.metaKey = !!e.metaKey,
                r.filter ? r.filter(e, i) : e
            },
            special: {
                ready: {
                    setup: Q.bindReady
                },
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function(e, t, n) {
                        Q.isWindow(this) && (this.onbeforeunload = n)
                    },
                    teardown: function(e, t) {
                        this.onbeforeunload === t && (this.onbeforeunload = null )
                    }
                }
            },
            simulate: function(e, t, n, i) {
                var r = Q.extend(new Q.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? Q.event.trigger(r, null , t) : Q.event.dispatch.call(t, r),
                r.isDefaultPrevented() && n.preventDefault()
            }
        },
        Q.event.handle = Q.event.dispatch,
        Q.removeEvent = F.removeEventListener ? function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        }
         : function(e, t, n) {
            var i = "on" + t;
            e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null ),
            e.detachEvent(i, n))
        }
        ,
        Q.Event = function(e, t) {
            return this instanceof Q.Event ? (e && e.type ? (this.originalEvent = e,
            this.type = e.type,
            this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? s : o) : this.type = e,
            t && Q.extend(this, t),
            this.timeStamp = e && e.timeStamp || Q.now(),
            this[Q.expando] = !0,
            void 0) : new Q.Event(e,t)
        }
        ,
        Q.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = s;
                var e = this.originalEvent;
                e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function() {
                this.isPropagationStopped = s;
                var e = this.originalEvent;
                e && (e.stopPropagation && e.stopPropagation(),
                e.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = s,
                this.stopPropagation()
            },
            isDefaultPrevented: o,
            isPropagationStopped: o,
            isImmediatePropagationStopped: o
        },
        Q.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(e, t) {
            Q.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this, r = e.relatedTarget, o = e.handleObj;
                    o.selector;
                    return r && (r === i || Q.contains(i, r)) || (e.type = o.origType,
                    n = o.handler.apply(this, arguments),
                    e.type = t),
                    n
                }
            }
        }
        ),
        Q.support.submitBubbles || (Q.event.special.submit = {
            setup: function() {
                return !Q.nodeName(this, "form") && void Q.event.add(this, "click._submit keypress._submit", function(e) {
                    var n = e.target
                      , i = Q.nodeName(n, "input") || Q.nodeName(n, "button") ? n.form : t;
                    i && !Q._data(i, "_submit_attached") && (Q.event.add(i, "submit._submit", function(e) {
                        e._submit_bubble = !0
                    }
                    ),
                    Q._data(i, "_submit_attached", !0))
                }
                )
            },
            postDispatch: function(e) {
                e._submit_bubble && (delete e._submit_bubble,
                this.parentNode && !e.isTrigger && Q.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function() {
                return !Q.nodeName(this, "form") && void Q.event.remove(this, "._submit")
            }
        }),
        Q.support.changeBubbles || (Q.event.special.change = {
            setup: function() {
                return Ce.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (Q.event.add(this, "propertychange._change", function(e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }
                ),
                Q.event.add(this, "click._change", function(e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1),
                    Q.event.simulate("change", this, e, !0)
                }
                )),
                !1) : void Q.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    Ce.test(t.nodeName) && !Q._data(t, "_change_attached") && (Q.event.add(t, "change._change", function(e) {
                        this.parentNode && !e.isSimulated && !e.isTrigger && Q.event.simulate("change", this.parentNode, e, !0)
                    }
                    ),
                    Q._data(t, "_change_attached", !0))
                }
                )
            },
            handle: function(e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type)
                    return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                return Q.event.remove(this, "._change"),
                Ce.test(this.nodeName)
            }
        }),
        Q.support.focusinBubbles || Q.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = 0
              , i = function(e) {
                Q.event.simulate(t, e.target, Q.event.fix(e), !0)
            }
            ;
            Q.event.special[t] = {
                setup: function() {
                    0 === n++ && F.addEventListener(e, i, !0)
                },
                teardown: function() {
                    0 === --n && F.removeEventListener(e, i, !0)
                }
            }
        }
        ),
        Q.fn.extend({
            on: function(e, n, i, r, s) {
                var a, l;
                if ("object" == typeof e) {
                    "string" != typeof n && (i = i || n,
                    n = t);
                    for (l in e)
                        this.on(l, n, i, e[l], s);
                    return this
                }
                if (null  == i && null  == r ? (r = n,
                i = n = t) : null  == r && ("string" == typeof n ? (r = i,
                i = t) : (r = i,
                i = n,
                n = t)),
                r === !1)
                    r = o;
                else if (!r)
                    return this;
                return 1 === s && (a = r,
                r = function(e) {
                    return Q().off(e),
                    a.apply(this, arguments)
                }
                ,
                r.guid = a.guid || (a.guid = Q.guid++)),
                this.each(function() {
                    Q.event.add(this, e, r, i, n)
                }
                )
            },
            one: function(e, t, n, i) {
                return this.on(e, t, n, i, 1)
            },
            off: function(e, n, i) {
                var r, s;
                if (e && e.preventDefault && e.handleObj)
                    return r = e.handleObj,
                    Q(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                    this;
                if ("object" == typeof e) {
                    for (s in e)
                        this.off(s, n, e[s]);
                    return this
                }
                return n !== !1 && "function" != typeof n || (i = n,
                n = t),
                i === !1 && (i = o),
                this.each(function() {
                    Q.event.remove(this, e, i, n)
                }
                )
            },
            bind: function(e, t, n) {
                return this.on(e, null , t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null , t)
            },
            live: function(e, t, n) {
                return Q(this.context).on(e, this.selector, t, n),
                this
            },
            die: function(e, t) {
                return Q(this.context).off(e, this.selector || "**", t),
                this
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 == arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            trigger: function(e, t) {
                return this.each(function() {
                    Q.event.trigger(e, t, this)
                }
                )
            },
            triggerHandler: function(e, t) {
                if (this[0])
                    return Q.event.trigger(e, t, this[0], !0)
            },
            toggle: function(e) {
                var t = arguments
                  , n = e.guid || Q.guid++
                  , i = 0
                  , r = function(n) {
                    var r = (Q._data(this, "lastToggle" + e.guid) || 0) % i;
                    return Q._data(this, "lastToggle" + e.guid, r + 1),
                    n.preventDefault(),
                    t[r].apply(this, arguments) || !1
                }
                ;
                for (r.guid = n; i < t.length; )
                    t[i++].guid = n;
                return this.click(r)
            },
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }),
        Q.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            Q.fn[t] = function(e, n) {
                return null  == n && (n = e,
                e = null ),
                arguments.length > 0 ? this.on(t, null , e, n) : this.trigger(t)
            }
            ,
            Ae.test(t) && (Q.event.fixHooks[t] = Q.event.keyHooks),
            Me.test(t) && (Q.event.fixHooks[t] = Q.event.mouseHooks)
        }
        ),
        function(e, t) {
            function n(e, t, n, i) {
                for (var r = 0, o = t.length; r < o; r++)
                    oe(e, t[r], n, i)
            }
            function i(e, t, i, r, o, s) {
                var a, l = se.setFilters[t.toLowerCase()];
                return l || oe.error(t),
                (e || !(a = o)) && n(e || "*", r, a = [], o),
                a.length > 0 ? l(a, i, s) : []
            }
            function r(e, r, o, s, a) {
                for (var l, c, u, d, f, h, p, m, g = 0, v = a.length, y = W.POS, _ = new RegExp("^" + y.source + "(?!" + T + ")","i"), b = function() {
                    for (var e = 1, n = arguments.length - 2; e < n; e++)
                        arguments[e] === t && (l[e] = t)
                }
                ; g < v; g++) {
                    for (y.exec(""),
                    e = a[g],
                    d = [],
                    u = 0,
                    f = s; l = y.exec(e); )
                        m = y.lastIndex = l.index + l[0].length,
                        m > u && (p = e.slice(u, l.index),
                        u = m,
                        h = [r],
                        L.test(p) && (f && (h = f),
                        f = s),
                        (c = R.test(p)) && (p = p.slice(0, -5).replace(L, "$&*")),
                        l.length > 1 && l[0].replace(_, b),
                        f = i(p, l[1], l[2], h, f, c));
                    f ? (d = d.concat(f),
                    (p = e.slice(u)) && ")" !== p ? L.test(p) ? n(p, d, o, s) : oe(p, r, o, s ? s.concat(f) : f) : x.apply(o, d)) : oe(e, r, o, s)
                }
                return 1 === v ? o : oe.uniqueSort(o)
            }
            function o(e, t, n) {
                for (var i, r, o, s = [], a = 0, l = $.exec(e), c = !l.pop() && !l.pop(), u = c && e.match(q) || [""], d = se.preFilter, f = se.filter, h = !n && t !== m; null  != (r = u[a]) && c; a++)
                    for (s.push(i = []),
                    h && (r = " " + r); r; ) {
                        c = !1,
                        (l = L.exec(r)) && (r = r.slice(l[0].length),
                        c = i.push({
                            part: l.pop().replace(H, " "),
                            captures: l
                        }));
                        for (o in f)
                            (l = W[o].exec(r)) && (!d[o] || (l = d[o](l, t, n))) && (r = r.slice(l.shift().length),
                            c = i.push({
                                part: o,
                                captures: l
                            }));
                        if (!c)
                            break
                    }
                return c || oe.error(e),
                s
            }
            function s(e, t, n) {
                var i = t.dir
                  , r = b++;
                return e || (e = function(e) {
                    return e === n
                }
                ),
                t.first ? function(t, n) {
                    for (; t = t[i]; )
                        if (1 === t.nodeType)
                            return e(t, n) && t
                }
                 : function(t, n) {
                    for (var o, s = r + "." + d, a = s + "." + u; t = t[i]; )
                        if (1 === t.nodeType) {
                            if ((o = t[k]) === a)
                                return t.sizset;
                            if ("string" == typeof o && 0 === o.indexOf(s)) {
                                if (t.sizset)
                                    return t
                            } else {
                                if (t[k] = a,
                                e(t, n))
                                    return t.sizset = !0,
                                    t;
                                t.sizset = !1
                            }
                        }
                }
            }
            function a(e, t) {
                return e ? function(n, i) {
                    var r = t(n, i);
                    return r && e(r === !0 ? n : r, i)
                }
                 : t
            }
            function l(e, t, n) {
                for (var i, r, o = 0; i = e[o]; o++)
                    se.relative[i.part] ? r = s(r, se.relative[i.part], t) : (i.captures.push(t, n),
                    r = a(r, se.filter[i.part].apply(null , i.captures)));
                return r
            }
            function c(e) {
                return function(t, n) {
                    for (var i, r = 0; i = e[r]; r++)
                        if (i(t, n))
                            return !0;
                    return !1
                }
            }
            var u, d, f, h, p, m = e.document, g = m.documentElement, v = "undefined", y = !1, _ = !0, b = 0, w = [].slice, x = [].push, k = ("sizcache" + Math.random()).replace(".", ""), T = "[\\x20\\t\\r\\n\\f]", j = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", E = j.replace("w", "w#"), C = "([*^$|!~]?=)", N = "\\[" + T + "*(" + j + ")" + T + "*(?:" + C + T + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + E + ")|)|)" + T + "*\\]", S = ":(" + j + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)", A = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", M = T + "*([\\x20\\t\\r\\n\\f>+~])" + T + "*", D = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + N + "|" + S.replace(2, 7) + "|[^\\\\(),])+", H = new RegExp("^" + T + "+|((?:^|[^\\\\])(?:\\\\.)*)" + T + "+$","g"), L = new RegExp("^" + M), q = new RegExp(D + "?(?=" + T + "*,|$)","g"), $ = new RegExp("^(?:(?!,)(?:(?:^|,)" + T + "*" + D + ")*?|" + T + "*(.*?))(\\)|$)"), O = new RegExp(D.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + M,"g"), I = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, B = /[\x20\t\r\n\f]*[+~]/, R = /:not\($/, F = /h\d/i, P = /input|select|textarea|button/i, z = /\\(?!\\)/g, W = {
                ID: new RegExp("^#(" + j + ")"),
                CLASS: new RegExp("^\\.(" + j + ")"),
                NAME: new RegExp("^\\[name=['\"]?(" + j + ")['\"]?\\]"),
                TAG: new RegExp("^(" + j.replace("[-", "[-\\*") + ")"),
                ATTR: new RegExp("^" + N),
                PSEUDO: new RegExp("^" + S),
                CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + T + "*(even|odd|(([+-]|)(\\d*)n|)" + T + "*(?:([+-]|)" + T + "*(\\d+)|))" + T + "*\\)|)","i"),
                POS: new RegExp(A,"ig"),
                needsContext: new RegExp("^" + T + "*[>+~]|" + A,"i")
            }, U = {}, V = [], X = {}, J = [], G = function(e) {
                return e.sizzleFilter = !0,
                e
            }
            , K = function(e) {
                return function(t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }
            , Y = function(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }
            , Z = function(e) {
                var t = !1
                  , n = m.createElement("div");
                try {
                    t = e(n)
                } catch (i) {}
                return n = null ,
                t
            }
            , ee = Z(function(e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return "boolean" !== t && "string" !== t
            }
            ), te = Z(function(e) {
                e.id = k + 0,
                e.innerHTML = "<a name='" + k + "'></a><div name='" + k + "'></div>",
                g.insertBefore(e, g.firstChild);
                var t = m.getElementsByName && m.getElementsByName(k).length === 2 + m.getElementsByName(k + 0).length;
                return p = !m.getElementById(k),
                g.removeChild(e),
                t
            }
            ), ne = Z(function(e) {
                return e.appendChild(m.createComment("")),
                0 === e.getElementsByTagName("*").length
            }
            ), ie = Z(function(e) {
                return e.innerHTML = "<a href='#'></a>",
                e.firstChild && typeof e.firstChild.getAttribute !== v && "#" === e.firstChild.getAttribute("href")
            }
            ), re = Z(function(e) {
                return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
                !(!e.getElementsByClassName || 0 === e.getElementsByClassName("e").length) && (e.lastChild.className = "e",
                1 !== e.getElementsByClassName("e").length)
            }
            ), oe = function(e, t, n, i) {
                n = n || [],
                t = t || m;
                var r, o, s, a, l = t.nodeType;
                if (1 !== l && 9 !== l)
                    return [];
                if (!e || "string" != typeof e)
                    return n;
                if (s = le(t),
                !s && !i && (r = I.exec(e)))
                    if (a = r[1]) {
                        if (9 === l) {
                            if (o = t.getElementById(a),
                            !o || !o.parentNode)
                                return n;
                            if (o.id === a)
                                return n.push(o),
                                n
                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && ce(t, o) && o.id === a)
                            return n.push(o),
                            n
                    } else {
                        if (r[2])
                            return x.apply(n, w.call(t.getElementsByTagName(e), 0)),
                            n;
                        if ((a = r[3]) && re && t.getElementsByClassName)
                            return x.apply(n, w.call(t.getElementsByClassName(a), 0)),
                            n
                    }
                return fe(e, t, n, i, s)
            }
            , se = oe.selectors = {
                cacheLength: 50,
                match: W,
                order: ["ID", "TAG"],
                attrHandle: {},
                createPseudo: G,
                find: {
                    ID: p ? function(e, t, n) {
                        if (typeof t.getElementById !== v && !n) {
                            var i = t.getElementById(e);
                            return i && i.parentNode ? [i] : []
                        }
                    }
                     : function(e, n, i) {
                        if (typeof n.getElementById !== v && !i) {
                            var r = n.getElementById(e);
                            return r ? r.id === e || typeof r.getAttributeNode !== v && r.getAttributeNode("id").value === e ? [r] : t : []
                        }
                    }
                    ,
                    TAG: ne ? function(e, t) {
                        if (typeof t.getElementsByTagName !== v)
                            return t.getElementsByTagName(e)
                    }
                     : function(e, t) {
                        var n = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (var i, r = [], o = 0; i = n[o]; o++)
                                1 === i.nodeType && r.push(i);
                            return r
                        }
                        return n
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(z, ""),
                        e[3] = (e[4] || e[5] || "").replace(z, ""),
                        "~=" === e[2] && (e[3] = " " + e[3] + " "),
                        e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(),
                        "nth" === e[1] ? (e[2] || oe.error(e[0]),
                        e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])),
                        e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && oe.error(e[0]),
                        e
                    },
                    PSEUDO: function(e) {
                        var t, n = e[4];
                        return W.CHILD.test(e[0]) ? null  : (n && (t = $.exec(n)) && t.pop() && (e[0] = e[0].slice(0, t[0].length - n.length - 1),
                        n = t[0].slice(0, -1)),
                        e.splice(2, 3, n || e[3]),
                        e)
                    }
                },
                filter: {
                    ID: p ? function(e) {
                        return e = e.replace(z, ""),
                        function(t) {
                            return t.getAttribute("id") === e
                        }
                    }
                     : function(e) {
                        return e = e.replace(z, ""),
                        function(t) {
                            var n = typeof t.getAttributeNode !== v && t.getAttributeNode("id");
                            return n && n.value === e
                        }
                    }
                    ,
                    TAG: function(e) {
                        return "*" === e ? function() {
                            return !0
                        }
                         : (e = e.replace(z, "").toLowerCase(),
                        function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                        )
                    },
                    CLASS: function(e) {
                        var t = U[e];
                        return t || (t = U[e] = new RegExp("(^|" + T + ")" + e + "(" + T + "|$)"),
                        V.push(e),
                        V.length > se.cacheLength && delete U[V.shift()]),
                        function(e) {
                            return t.test(e.className || typeof e.getAttribute !== v && e.getAttribute("class") || "")
                        }
                    },
                    ATTR: function(e, t, n) {
                        return t ? function(i) {
                            var r = oe.attr(i, e)
                              , o = r + "";
                            if (null  == r)
                                return "!=" === t;
                            switch (t) {
                            case "=":
                                return o === n;
                            case "!=":
                                return o !== n;
                            case "^=":
                                return n && 0 === o.indexOf(n);
                            case "*=":
                                return n && o.indexOf(n) > -1;
                            case "$=":
                                return n && o.substr(o.length - n.length) === n;
                            case "~=":
                                return (" " + o + " ").indexOf(n) > -1;
                            case "|=":
                                return o === n || o.substr(0, n.length + 1) === n + "-"
                            }
                        }
                         : function(t) {
                            return null  != oe.attr(t, e)
                        }
                    },
                    CHILD: function(e, t, n, i) {
                        if ("nth" === e) {
                            var r = b++;
                            return function(e) {
                                var t, o, s = 0, a = e;
                                if (1 === n && 0 === i)
                                    return !0;
                                if (t = e.parentNode,
                                t && (t[k] !== r || !e.sizset)) {
                                    for (a = t.firstChild; a && (1 !== a.nodeType || (a.sizset = ++s,
                                    a !== e)); a = a.nextSibling)
                                        ;
                                    t[k] = r
                                }
                                return o = e.sizset - i,
                                0 === n ? 0 === o : o % n === 0 && o / n >= 0
                            }
                        }
                        return function(t) {
                            var n = t;
                            switch (e) {
                            case "only":
                            case "first":
                                for (; n = n.previousSibling; )
                                    if (1 === n.nodeType)
                                        return !1;
                                if ("first" === e)
                                    return !0;
                                n = t;
                            case "last":
                                for (; n = n.nextSibling; )
                                    if (1 === n.nodeType)
                                        return !1;
                                return !0
                            }
                        }
                    },
                    PSEUDO: function(e, t, n, i) {
                        var r = se.pseudos[e] || se.pseudos[e.toLowerCase()];
                        return r || oe.error("unsupported pseudo: " + e),
                        r.sizzleFilter ? r(t, n, i) : r
                    }
                },
                pseudos: {
                    not: G(function(e, t, n) {
                        var i = de(e.replace(H, "$1"), t, n);
                        return function(e) {
                            return !i(e)
                        }
                    }
                    ),
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex,
                        e.selected === !0
                    },
                    parent: function(e) {
                        return !se.pseudos.empty(e)
                    },
                    empty: function(e) {
                        var t;
                        for (e = e.firstChild; e; ) {
                            if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t)
                                return !1;
                            e = e.nextSibling
                        }
                        return !0
                    },
                    contains: G(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || ue(t)).indexOf(e) > -1
                        }
                    }
                    ),
                    has: G(function(e) {
                        return function(t) {
                            return oe(e, t).length > 0
                        }
                    }
                    ),
                    header: function(e) {
                        return F.test(e.nodeName)
                    },
                    text: function(e) {
                        var t, n;
                        return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null  == (n = e.getAttribute("type")) || n.toLowerCase() === t)
                    },
                    radio: K("radio"),
                    checkbox: K("checkbox"),
                    file: K("file"),
                    password: K("password"),
                    image: K("image"),
                    submit: Y("submit"),
                    reset: Y("reset"),
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    input: function(e) {
                        return P.test(e.nodeName)
                    },
                    focus: function(e) {
                        var t = e.ownerDocument;
                        return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && (!!e.type || !!e.href)
                    },
                    active: function(e) {
                        return e === e.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function(e, t, n) {
                        return n ? e.slice(1) : [e[0]]
                    },
                    last: function(e, t, n) {
                        var i = e.pop();
                        return n ? e : [i]
                    },
                    even: function(e, t, n) {
                        for (var i = [], r = n ? 1 : 0, o = e.length; r < o; r += 2)
                            i.push(e[r]);
                        return i
                    },
                    odd: function(e, t, n) {
                        for (var i = [], r = n ? 0 : 1, o = e.length; r < o; r += 2)
                            i.push(e[r]);
                        return i
                    },
                    lt: function(e, t, n) {
                        return n ? e.slice(+t) : e.slice(0, +t)
                    },
                    gt: function(e, t, n) {
                        return n ? e.slice(0, +t + 1) : e.slice(+t + 1)
                    },
                    eq: function(e, t, n) {
                        var i = e.splice(+t, 1);
                        return n ? e : i
                    }
                }
            };
            se.setFilters.nth = se.setFilters.eq,
            se.filters = se.pseudos,
            ie || (se.attrHandle = {
                href: function(e) {
                    return e.getAttribute("href", 2)
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            }),
            te && (se.order.push("NAME"),
            se.find.NAME = function(e, t) {
                if (typeof t.getElementsByName !== v)
                    return t.getElementsByName(e)
            }
            ),
            re && (se.order.splice(1, 0, "CLASS"),
            se.find.CLASS = function(e, t, n) {
                if (typeof t.getElementsByClassName !== v && !n)
                    return t.getElementsByClassName(e)
            }
            );
            try {
                w.call(g.childNodes, 0)[0].nodeType
            } catch (ae) {
                w = function(e) {
                    for (var t, n = []; t = this[e]; e++)
                        n.push(t);
                    return n
                }
            }
            var le = oe.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }
              , ce = oe.contains = g.compareDocumentPosition ? function(e, t) {
                return !!(16 & e.compareDocumentPosition(t))
            }
             : g.contains ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , i = t.parentNode;
                return e === i || !!(i && 1 === i.nodeType && n.contains && n.contains(i))
            }
             : function(e, t) {
                for (; t = t.parentNode; )
                    if (t === e)
                        return !0;
                return !1
            }
              , ue = oe.getText = function(e) {
                var t, n = "", i = 0, r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            n += ue(e)
                    } else if (3 === r || 4 === r)
                        return e.nodeValue
                } else
                    for (; t = e[i]; i++)
                        n += ue(t);
                return n
            }
            ;
            oe.attr = function(e, t) {
                var n, i = le(e);
                return i || (t = t.toLowerCase()),
                se.attrHandle[t] ? se.attrHandle[t](e) : ee || i ? e.getAttribute(t) : (n = e.getAttributeNode(t),
                n ? "boolean" == typeof e[t] ? e[t] ? t : null  : n.specified ? n.value : null  : null )
            }
            ,
            oe.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }
            ,
            [0, 0].sort(function() {
                return _ = 0
            }
            ),
            g.compareDocumentPosition ? f = function(e, t) {
                return e === t ? (y = !0,
                0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
            }
             : (f = function(e, t) {
                if (e === t)
                    return y = !0,
                    0;
                if (e.sourceIndex && t.sourceIndex)
                    return e.sourceIndex - t.sourceIndex;
                var n, i, r = [], o = [], s = e.parentNode, a = t.parentNode, l = s;
                if (s === a)
                    return h(e, t);
                if (!s)
                    return -1;
                if (!a)
                    return 1;
                for (; l; )
                    r.unshift(l),
                    l = l.parentNode;
                for (l = a; l; )
                    o.unshift(l),
                    l = l.parentNode;
                n = r.length,
                i = o.length;
                for (var c = 0; c < n && c < i; c++)
                    if (r[c] !== o[c])
                        return h(r[c], o[c]);
                return c === n ? h(e, o[c], -1) : h(r[c], t, 1)
            }
            ,
            h = function(e, t, n) {
                if (e === t)
                    return n;
                for (var i = e.nextSibling; i; ) {
                    if (i === t)
                        return -1;
                    i = i.nextSibling
                }
                return 1
            }
            ),
            oe.uniqueSort = function(e) {
                var t, n = 1;
                if (f && (y = _,
                e.sort(f),
                y))
                    for (; t = e[n]; n++)
                        t === e[n - 1] && e.splice(n--, 1);
                return e
            }
            ;
            var de = oe.compile = function(e, t, n) {
                var i, r, s, a = X[e];
                if (a && a.context === t)
                    return a;
                for (r = o(e, t, n),
                s = 0; i = r[s]; s++)
                    r[s] = l(i, t, n);
                return a = X[e] = c(r),
                a.context = t,
                a.runs = a.dirruns = 0,
                J.push(e),
                J.length > se.cacheLength && delete X[J.shift()],
                a
            }
            ;
            oe.matches = function(e, t) {
                return oe(e, null , null , t)
            }
            ,
            oe.matchesSelector = function(e, t) {
                return oe(t, null , null , [e]).length > 0
            }
            ;
            var fe = function(e, t, n, i, o) {
                e = e.replace(H, "$1");
                var s, a, l, c, f, h, p, m, g, v = e.match(q), y = e.match(O), _ = t.nodeType;
                if (W.POS.test(e))
                    return r(e, t, n, i, v);
                if (i)
                    s = w.call(i, 0);
                else if (v && 1 === v.length) {
                    if (y.length > 1 && 9 === _ && !o && (v = W.ID.exec(y[0]))) {
                        if (t = se.find.ID(v[1], t, o)[0],
                        !t)
                            return n;
                        e = e.slice(y.shift().length)
                    }
                    for (m = (v = B.exec(y[0])) && !v.index && t.parentNode || t,
                    g = y.pop(),
                    h = g.split(":not")[0],
                    l = 0,
                    c = se.order.length; l < c; l++)
                        if (p = se.order[l],
                        v = W[p].exec(h)) {
                            if (s = se.find[p]((v[1] || "").replace(z, ""), m, o),
                            null  == s)
                                continue;h === g && (e = e.slice(0, e.length - g.length) + h.replace(W[p], ""),
                            e || x.apply(n, w.call(s, 0)));
                            break
                        }
                }
                if (e)
                    for (a = de(e, t, o),
                    d = a.dirruns++,
                    null  == s && (s = se.find.TAG("*", B.test(e) && t.parentNode || t)),
                    l = 0; f = s[l]; l++)
                        u = a.runs++,
                        a(f, t) && n.push(f);
                return n
            }
            ;
            m.querySelectorAll && function() {
                var e, t = fe, n = /'|\\/g, i = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, r = [], o = [":active"], s = g.matchesSelector || g.mozMatchesSelector || g.webkitMatchesSelector || g.oMatchesSelector || g.msMatchesSelector;
                Z(function(e) {
                    e.innerHTML = "<select><option selected></option></select>",
                    e.querySelectorAll("[selected]").length || r.push("\\[" + T + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                    e.querySelectorAll(":checked").length || r.push(":checked")
                }
                ),
                Z(function(e) {
                    e.innerHTML = "<p test=''></p>",
                    e.querySelectorAll("[test^='']").length && r.push("[*^$]=" + T + "*(?:\"\"|'')"),
                    e.innerHTML = "<input type='hidden'>",
                    e.querySelectorAll(":enabled").length || r.push(":enabled", ":disabled")
                }
                ),
                r = r.length && new RegExp(r.join("|")),
                fe = function(e, i, o, s, a) {
                    if (!(s || a || r && r.test(e)))
                        if (9 === i.nodeType)
                            try {
                                return x.apply(o, w.call(i.querySelectorAll(e), 0)),
                                o
                            } catch (l) {}
                        else if (1 === i.nodeType && "object" !== i.nodeName.toLowerCase()) {
                            var c = i.getAttribute("id")
                              , u = c || k
                              , d = B.test(e) && i.parentNode || i;
                            c ? u = u.replace(n, "\\$&") : i.setAttribute("id", u);
                            try {
                                return x.apply(o, w.call(d.querySelectorAll(e.replace(q, "[id='" + u + "'] $&")), 0)),
                                o
                            } catch (l) {} finally {
                                c || i.removeAttribute("id")
                            }
                        }
                    return t(e, i, o, s, a)
                }
                ,
                s && (Z(function(t) {
                    e = s.call(t, "div");
                    try {
                        s.call(t, "[test!='']:sizzle"),
                        o.push(se.match.PSEUDO)
                    } catch (n) {}
                }
                ),
                o = new RegExp(o.join("|")),
                oe.matchesSelector = function(t, n) {
                    if (n = n.replace(i, "='$1']"),
                    !(le(t) || o.test(n) || r && r.test(n)))
                        try {
                            var a = s.call(t, n);
                            if (a || e || t.document && 11 !== t.document.nodeType)
                                return a
                        } catch (l) {}
                    return oe(n, null , null , [t]).length > 0
                }
                )
            }
            (),
            oe.attr = Q.attr,
            Q.find = oe,
            Q.expr = oe.selectors,
            Q.expr[":"] = Q.expr.pseudos,
            Q.unique = oe.uniqueSort,
            Q.text = oe.getText,
            Q.isXMLDoc = oe.isXML,
            Q.contains = oe.contains
        }
        (e);
        var Le = /Until$/
          , qe = /^(?:parents|prev(?:Until|All))/
          , $e = /^.[^:#\[\.,]*$/
          , Oe = Q.expr.match.needsContext
          , Ie = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        Q.fn.extend({
            find: function(e) {
                var t, n, i, r, o, s, a = this;
                if ("string" != typeof e)
                    return Q(e).filter(function() {
                        for (t = 0,
                        n = a.length; t < n; t++)
                            if (Q.contains(a[t], this))
                                return !0
                    }
                    );
                for (s = this.pushStack("", "find", e),
                t = 0,
                n = this.length; t < n; t++)
                    if (i = s.length,
                    Q.find(e, this[t], s),
                    t > 0)
                        for (r = i; r < s.length; r++)
                            for (o = 0; o < i; o++)
                                if (s[o] === s[r]) {
                                    s.splice(r--, 1);
                                    break
                                }
                return s
            },
            has: function(e) {
                var t, n = Q(e, this), i = n.length;
                return this.filter(function() {
                    for (t = 0; t < i; t++)
                        if (Q.contains(this, n[t]))
                            return !0
                }
                )
            },
            not: function(e) {
                return this.pushStack(c(this, e, !1), "not", e)
            },
            filter: function(e) {
                return this.pushStack(c(this, e, !0), "filter", e)
            },
            is: function(e) {
                return !!e && ("string" == typeof e ? Oe.test(e) ? Q(e, this.context).index(this[0]) >= 0 : Q.filter(e, this).length > 0 : this.filter(e).length > 0)
            },
            closest: function(e, t) {
                for (var n, i = 0, r = this.length, o = [], s = Oe.test(e) || "string" != typeof e ? Q(e, t || this.context) : 0; i < r; i++)
                    for (n = this[i]; n && n.ownerDocument && n !== t && 11 !== n.nodeType; ) {
                        if (s ? s.index(n) > -1 : Q.find.matchesSelector(n, e)) {
                            o.push(n);
                            break
                        }
                        n = n.parentNode
                    }
                return o = o.length > 1 ? Q.unique(o) : o,
                this.pushStack(o, "closest", e)
            },
            index: function(e) {
                return e ? "string" == typeof e ? Q.inArray(this[0], Q(e)) : Q.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
            },
            add: function(e, t) {
                var n = "string" == typeof e ? Q(e, t) : Q.makeArray(e && e.nodeType ? [e] : e)
                  , i = Q.merge(this.get(), n);
                return this.pushStack(a(n[0]) || a(i[0]) ? i : Q.unique(i))
            },
            addBack: function(e) {
                return this.add(null  == e ? this.prevObject : this.prevObject.filter(e))
            }
        }),
        Q.fn.andSelf = Q.fn.addBack,
        Q.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null 
            },
            parents: function(e) {
                return Q.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return Q.dir(e, "parentNode", n)
            },
            next: function(e) {
                return l(e, "nextSibling")
            },
            prev: function(e) {
                return l(e, "previousSibling")
            },
            nextAll: function(e) {
                return Q.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return Q.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return Q.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return Q.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return Q.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return Q.sibling(e.firstChild)
            },
            contents: function(e) {
                return Q.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : Q.merge([], e.childNodes)
            }
        }, function(e, t) {
            Q.fn[e] = function(n, i) {
                var r = Q.map(this, t, n);
                return Le.test(e) || (i = n),
                i && "string" == typeof i && (r = Q.filter(i, r)),
                r = this.length > 1 && !Ie[e] ? Q.unique(r) : r,
                this.length > 1 && qe.test(e) && (r = r.reverse()),
                this.pushStack(r, e, X.call(arguments).join(","))
            }
        }
        ),
        Q.extend({
            filter: function(e, t, n) {
                return n && (e = ":not(" + e + ")"),
                1 === t.length ? Q.find.matchesSelector(t[0], e) ? [t[0]] : [] : Q.find.matches(e, t)
            },
            dir: function(e, n, i) {
                for (var r = [], o = e[n]; o && 9 !== o.nodeType && (i === t || 1 !== o.nodeType || !Q(o).is(i)); )
                    1 === o.nodeType && r.push(o),
                    o = o[n];
                return r
            },
            sibling: function(e, t) {
                for (var n = []; e; e = e.nextSibling)
                    1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        });
        var Be = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
          , Re = / jQuery\d+="(?:null|\d+)"/g
          , Fe = /^\s+/
          , Pe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
          , ze = /<([\w:]+)/
          , We = /<tbody/i
          , Ue = /<|&#?\w+;/
          , Ve = /<(?:script|style|link)/i
          , Xe = /<(?:script|object|embed|option|style)/i
          , Je = new RegExp("<(?:" + Be + ")[\\s/>]","i")
          , Ge = /^(?:checkbox|radio)$/
          , Ke = /checked\s*(?:[^=]|=\s*.checked.)/i
          , Ye = /\/(java|ecma)script/i
          , Qe = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
          , Ze = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }
          , et = u(F)
          , tt = et.appendChild(F.createElement("div"));
        Ze.optgroup = Ze.option,
        Ze.tbody = Ze.tfoot = Ze.colgroup = Ze.caption = Ze.thead,
        Ze.th = Ze.td,
        Q.support.htmlSerialize || (Ze._default = [1, "X<div>", "</div>"]),
        Q.fn.extend({
            text: function(e) {
                return Q.access(this, function(e) {
                    return e === t ? Q.text(this) : this.empty().append((this[0] && this[0].ownerDocument || F).createTextNode(e))
                }
                , null , e, arguments.length)
            },
            wrapAll: function(e) {
                if (Q.isFunction(e))
                    return this.each(function(t) {
                        Q(this).wrapAll(e.call(this, t))
                    }
                    );
                if (this[0]) {
                    var t = Q(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]),
                    t.map(function() {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                            e = e.firstChild;
                        return e
                    }
                    ).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return Q.isFunction(e) ? this.each(function(t) {
                    Q(this).wrapInner(e.call(this, t))
                }
                ) : this.each(function() {
                    var t = Q(this)
                      , n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                }
                )
            },
            wrap: function(e) {
                var t = Q.isFunction(e);
                return this.each(function(n) {
                    Q(this).wrapAll(t ? e.call(this, n) : e)
                }
                )
            },
            unwrap: function() {
                return this.parent().each(function() {
                    Q.nodeName(this, "body") || Q(this).replaceWith(this.childNodes)
                }
                ).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(e) {
                    (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
                }
                )
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(e) {
                    (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
                }
                )
            },
            before: function() {
                if (!a(this[0]))
                    return this.domManip(arguments, !1, function(e) {
                        this.parentNode.insertBefore(e, this)
                    }
                    );
                if (arguments.length) {
                    var e = Q.clean(arguments);
                    return this.pushStack(Q.merge(e, this), "before", this.selector)
                }
            },
            after: function() {
                if (!a(this[0]))
                    return this.domManip(arguments, !1, function(e) {
                        this.parentNode.insertBefore(e, this.nextSibling)
                    }
                    );
                if (arguments.length) {
                    var e = Q.clean(arguments);
                    return this.pushStack(Q.merge(this, e), "after", this.selector)
                }
            },
            remove: function(e, t) {
                for (var n, i = 0; null  != (n = this[i]); i++)
                    e && !Q.filter(e, [n]).length || (!t && 1 === n.nodeType && (Q.cleanData(n.getElementsByTagName("*")),
                    Q.cleanData([n])),
                    n.parentNode && n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                for (var e, t = 0; null  != (e = this[t]); t++)
                    for (1 === e.nodeType && Q.cleanData(e.getElementsByTagName("*")); e.firstChild; )
                        e.removeChild(e.firstChild);
                return this
            },
            clone: function(e, t) {
                return e = null  != e && e,
                t = null  == t ? e : t,
                this.map(function() {
                    return Q.clone(this, e, t)
                }
                )
            },
            html: function(e) {
                return Q.access(this, function(e) {
                    var n = this[0] || {}
                      , i = 0
                      , r = this.length;
                    if (e === t)
                        return 1 === n.nodeType ? n.innerHTML.replace(Re, "") : t;
                    if ("string" == typeof e && !Ve.test(e) && (Q.support.htmlSerialize || !Je.test(e)) && (Q.support.leadingWhitespace || !Fe.test(e)) && !Ze[(ze.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(Pe, "<$1></$2>");
                        try {
                            for (; i < r; i++)
                                n = this[i] || {},
                                1 === n.nodeType && (Q.cleanData(n.getElementsByTagName("*")),
                                n.innerHTML = e);
                            n = 0
                        } catch (o) {}
                    }
                    n && this.empty().append(e)
                }
                , null , e, arguments.length)
            },
            replaceWith: function(e) {
                return a(this[0]) ? this.length ? this.pushStack(Q(Q.isFunction(e) ? e() : e), "replaceWith", e) : this : Q.isFunction(e) ? this.each(function(t) {
                    var n = Q(this)
                      , i = n.html();
                    n.replaceWith(e.call(this, t, i))
                }
                ) : ("string" != typeof e && (e = Q(e).detach()),
                this.each(function() {
                    var t = this.nextSibling
                      , n = this.parentNode;
                    Q(this).remove(),
                    t ? Q(t).before(e) : Q(n).append(e)
                }
                ))
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, n, i) {
                e = [].concat.apply([], e);
                var r, o, s, a, l = 0, c = e[0], u = [], f = this.length;
                if (!Q.support.checkClone && f > 1 && "string" == typeof c && Ke.test(c))
                    return this.each(function() {
                        Q(this).domManip(e, n, i)
                    }
                    );
                if (Q.isFunction(c))
                    return this.each(function(r) {
                        var o = Q(this);
                        e[0] = c.call(this, r, n ? o.html() : t),
                        o.domManip(e, n, i)
                    }
                    );
                if (this[0]) {
                    if (r = Q.buildFragment(e, this, u),
                    s = r.fragment,
                    o = s.firstChild,
                    1 === s.childNodes.length && (s = o),
                    o)
                        for (n = n && Q.nodeName(o, "tr"),
                        a = r.cacheable || f - 1; l < f; l++)
                            i.call(n && Q.nodeName(this[l], "table") ? d(this[l], "tbody") : this[l], l === a ? s : Q.clone(s, !0, !0));
                    s = o = null ,
                    u.length && Q.each(u, function(e, t) {
                        t.src ? Q.ajax ? Q.ajax({
                            url: t.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        }) : Q.error("no ajax") : Q.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Qe, "")),
                        t.parentNode && t.parentNode.removeChild(t)
                    }
                    )
                }
                return this
            }
        }),
        Q.buildFragment = function(e, n, i) {
            var r, o, s, a = e[0];
            return n = n || F,
            n = (n[0] || n).ownerDocument || n[0] || n,
            "undefined" == typeof n.createDocumentFragment && (n = F),
            1 === e.length && "string" == typeof a && a.length < 512 && n === F && "<" === a.charAt(0) && !Xe.test(a) && (Q.support.checkClone || !Ke.test(a)) && (Q.support.html5Clone || !Je.test(a)) && (o = !0,
            r = Q.fragments[a],
            s = r !== t),
            r || (r = n.createDocumentFragment(),
            Q.clean(e, n, r, i),
            o && (Q.fragments[a] = s && r)),
            {
                fragment: r,
                cacheable: o
            }
        }
        ,
        Q.fragments = {},
        Q.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            Q.fn[e] = function(n) {
                var i, r = 0, o = [], s = Q(n), a = s.length, l = 1 === this.length && this[0].parentNode;
                if ((null  == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === a)
                    return s[t](this[0]),
                    this;
                for (; r < a; r++)
                    i = (r > 0 ? this.clone(!0) : this).get(),
                    Q(s[r])[t](i),
                    o = o.concat(i);
                return this.pushStack(o, e, s.selector)
            }
        }
        ),
        Q.extend({
            clone: function(e, t, n) {
                var i, r, o, s;
                if (Q.support.html5Clone || Q.isXMLDoc(e) || !Je.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (tt.innerHTML = e.outerHTML,
                tt.removeChild(s = tt.firstChild)),
                !(Q.support.noCloneEvent && Q.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Q.isXMLDoc(e)))
                    for (h(e, s),
                    i = p(e),
                    r = p(s),
                    o = 0; i[o]; ++o)
                        r[o] && h(i[o], r[o]);
                if (t && (f(e, s),
                n))
                    for (i = p(e),
                    r = p(s),
                    o = 0; i[o]; ++o)
                        f(i[o], r[o]);
                return i = r = null ,
                s
            },
            clean: function(e, t, n, i) {
                var r, o, s, a, l, c, d, f, h, p, g, v = 0, y = [];
                for (t && "undefined" != typeof t.createDocumentFragment || (t = F),
                o = t === F && et; null  != (s = e[v]); v++)
                    if ("number" == typeof s && (s += ""),
                    s) {
                        if ("string" == typeof s)
                            if (Ue.test(s)) {
                                for (o = o || u(t),
                                d = d || o.appendChild(t.createElement("div")),
                                s = s.replace(Pe, "<$1></$2>"),
                                a = (ze.exec(s) || ["", ""])[1].toLowerCase(),
                                l = Ze[a] || Ze._default,
                                c = l[0],
                                d.innerHTML = l[1] + s + l[2]; c--; )
                                    d = d.lastChild;
                                if (!Q.support.tbody)
                                    for (f = We.test(s),
                                    h = "table" !== a || f ? "<table>" !== l[1] || f ? [] : d.childNodes : d.firstChild && d.firstChild.childNodes,
                                    r = h.length - 1; r >= 0; --r)
                                        Q.nodeName(h[r], "tbody") && !h[r].childNodes.length && h[r].parentNode.removeChild(h[r]);
                                !Q.support.leadingWhitespace && Fe.test(s) && d.insertBefore(t.createTextNode(Fe.exec(s)[0]), d.firstChild),
                                s = d.childNodes,
                                d = o.lastChild
                            } else
                                s = t.createTextNode(s);
                        s.nodeType ? y.push(s) : y = Q.merge(y, s)
                    }
                if (d && (o.removeChild(d),
                s = d = o = null ),
                !Q.support.appendChecked)
                    for (v = 0; null  != (s = y[v]); v++)
                        Q.nodeName(s, "input") ? m(s) : "undefined" != typeof s.getElementsByTagName && Q.grep(s.getElementsByTagName("input"), m);
                if (n)
                    for (p = function(e) {
                        if (!e.type || Ye.test(e.type))
                            return i ? i.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                    }
                    ,
                    v = 0; null  != (s = y[v]); v++)
                        Q.nodeName(s, "script") && p(s) || (n.appendChild(s),
                        "undefined" != typeof s.getElementsByTagName && (g = Q.grep(Q.merge([], s.getElementsByTagName("script")), p),
                        y.splice.apply(y, [v + 1, 0].concat(g)),
                        v += g.length));
                return y
            },
            cleanData: function(e, t) {
                for (var n, i, r, o, s = 0, a = Q.expando, l = Q.cache, c = Q.support.deleteExpando, u = Q.event.special; null  != (r = e[s]); s++)
                    if ((t || Q.acceptData(r)) && (i = r[a],
                    n = i && l[i])) {
                        if (n.events)
                            for (o in n.events)
                                u[o] ? Q.event.remove(r, o) : Q.removeEvent(r, o, n.handle);
                        l[i] && (delete l[i],
                        c ? delete r[a] : r.removeAttribute ? r.removeAttribute(a) : r[a] = null ,
                        Q.deletedIds.push(i))
                    }
            }
        }),
        function() {
            var e, t;
            Q.uaMatch = function(e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }
            ,
            e = Q.uaMatch(z.userAgent),
            t = {},
            e.browser && (t[e.browser] = !0,
            t.version = e.version),
            t.webkit && (t.safari = !0),
            Q.browser = t,
            Q.sub = function() {
                function e(t, n) {
                    return new e.fn.init(t,n)
                }
                Q.extend(!0, e, this),
                e.superclass = this,
                e.fn = e.prototype = this(),
                e.fn.constructor = e,
                e.sub = this.sub,
                e.fn.init = function n(n, i) {
                    return i && i instanceof Q && !(i instanceof e) && (i = e(i)),
                    Q.fn.init.call(this, n, i, t)
                }
                ,
                e.fn.init.prototype = e.fn;
                var t = e(F);
                return e
            }
        }
        ();
        var nt, it, rt, ot = /alpha\([^)]*\)/i, st = /opacity=([^)]*)/, at = /^(top|right|bottom|left)$/, lt = /^margin/, ct = new RegExp("^(" + Z + ")(.*)$","i"), ut = new RegExp("^(" + Z + ")(?!px)[a-z%]+$","i"), dt = new RegExp("^([-+])=(" + Z + ")","i"), ft = {}, ht = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, pt = {
            letterSpacing: 0,
            fontWeight: 400,
            lineHeight: 1
        }, mt = ["Top", "Right", "Bottom", "Left"], gt = ["Webkit", "O", "Moz", "ms"], vt = Q.fn.toggle;
        Q.fn.extend({
            css: function(e, n) {
                return Q.access(this, function(e, n, i) {
                    return i !== t ? Q.style(e, n, i) : Q.css(e, n)
                }
                , e, n, arguments.length > 1)
            },
            show: function() {
                return y(this, !0)
            },
            hide: function() {
                return y(this)
            },
            toggle: function(e, t) {
                var n = "boolean" == typeof e;
                return Q.isFunction(e) && Q.isFunction(t) ? vt.apply(this, arguments) : this.each(function() {
                    (n ? e : v(this)) ? Q(this).show() : Q(this).hide()
                }
                )
            }
        }),
        Q.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = nt(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": Q.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, n, i, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var o, s, a, l = Q.camelCase(n), c = e.style;
                    if (n = Q.cssProps[l] || (Q.cssProps[l] = g(c, l)),
                    a = Q.cssHooks[n] || Q.cssHooks[l],
                    i === t)
                        return a && "get" in a && (o = a.get(e, !1, r)) !== t ? o : c[n];
                    if (s = typeof i,
                    "string" === s && (o = dt.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(Q.css(e, n)),
                    s = "number"),
                    !(null  == i || "number" === s && isNaN(i) || ("number" === s && !Q.cssNumber[l] && (i += "px"),
                    a && "set" in a && (i = a.set(e, i, r)) === t)))
                        try {
                            c[n] = i
                        } catch (u) {}
                }
            },
            css: function(e, n, i, r) {
                var o, s, a, l = Q.camelCase(n);
                return n = Q.cssProps[l] || (Q.cssProps[l] = g(e.style, l)),
                a = Q.cssHooks[n] || Q.cssHooks[l],
                a && "get" in a && (o = a.get(e, !0, r)),
                o === t && (o = nt(e, n)),
                "normal" === o && n in pt && (o = pt[n]),
                i || r !== t ? (s = parseFloat(o),
                i || Q.isNumeric(s) ? s || 0 : o) : o
            },
            swap: function(e, t, n) {
                var i, r, o = {};
                for (r in t)
                    o[r] = e.style[r],
                    e.style[r] = t[r];
                i = n.call(e);
                for (r in t)
                    e.style[r] = o[r];
                return i
            }
        }),
        e.getComputedStyle ? nt = function(e, t) {
            var n, i, r, o, s = getComputedStyle(e, null ), a = e.style;
            return s && (n = s[t],
            "" === n && !Q.contains(e.ownerDocument.documentElement, e) && (n = Q.style(e, t)),
            ut.test(n) && lt.test(t) && (i = a.width,
            r = a.minWidth,
            o = a.maxWidth,
            a.minWidth = a.maxWidth = a.width = n,
            n = s.width,
            a.width = i,
            a.minWidth = r,
            a.maxWidth = o)),
            n
        }
         : F.documentElement.currentStyle && (nt = function(e, t) {
            var n, i, r = e.currentStyle && e.currentStyle[t], o = e.style;
            return null  == r && o && o[t] && (r = o[t]),
            ut.test(r) && !at.test(t) && (n = o.left,
            i = e.runtimeStyle && e.runtimeStyle.left,
            i && (e.runtimeStyle.left = e.currentStyle.left),
            o.left = "fontSize" === t ? "1em" : r,
            r = o.pixelLeft + "px",
            o.left = n,
            i && (e.runtimeStyle.left = i)),
            "" === r ? "auto" : r
        }
        ),
        Q.each(["height", "width"], function(e, t) {
            Q.cssHooks[t] = {
                get: function(e, n, i) {
                    if (n)
                        return 0 !== e.offsetWidth || "none" !== nt(e, "display") ? w(e, t, i) : Q.swap(e, ht, function() {
                            return w(e, t, i)
                        }
                        )
                },
                set: function(e, n, i) {
                    return _(e, n, i ? b(e, t, i, Q.support.boxSizing && "border-box" === Q.css(e, "boxSizing")) : 0)
                }
            }
        }
        ),
        Q.support.opacity || (Q.cssHooks.opacity = {
            get: function(e, t) {
                return st.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style
                  , i = e.currentStyle
                  , r = Q.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
                  , o = i && i.filter || n.filter || "";
                n.zoom = 1,
                t >= 1 && "" === Q.trim(o.replace(ot, "")) && n.removeAttribute && (n.removeAttribute("filter"),
                i && !i.filter) || (n.filter = ot.test(o) ? o.replace(ot, r) : o + " " + r)
            }
        }),
        Q(function() {
            Q.support.reliableMarginRight || (Q.cssHooks.marginRight = {
                get: function(e, t) {
                    return Q.swap(e, {
                        display: "inline-block"
                    }, function() {
                        if (t)
                            return nt(e, "marginRight")
                    }
                    )
                }
            }),
            !Q.support.pixelPosition && Q.fn.position && Q.each(["top", "left"], function(e, t) {
                Q.cssHooks[t] = {
                    get: function(e, n) {
                        if (n) {
                            var i = nt(e, t);
                            return ut.test(i) ? Q(e).position()[t] + "px" : i
                        }
                    }
                }
            }
            )
        }
        ),
        Q.expr && Q.expr.filters && (Q.expr.filters.hidden = function(e) {
            return 0 === e.offsetWidth && 0 === e.offsetHeight || !Q.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || nt(e, "display"))
        }
        ,
        Q.expr.filters.visible = function(e) {
            return !Q.expr.filters.hidden(e)
        }
        ),
        Q.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            Q.cssHooks[e + t] = {
                expand: function(n) {
                    var i, r = "string" == typeof n ? n.split(" ") : [n], o = {};
                    for (i = 0; i < 4; i++)
                        o[e + mt[i] + t] = r[i] || r[i - 2] || r[0];
                    return o
                }
            },
            lt.test(e) || (Q.cssHooks[e + t].set = _)
        }
        );
        var yt = /%20/g
          , _t = /\[\]$/
          , bt = /\r?\n/g
          , wt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
          , xt = /^(?:select|textarea)/i;
        Q.fn.extend({
            serialize: function() {
                return Q.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    return this.elements ? Q.makeArray(this.elements) : this
                }
                ).filter(function() {
                    return this.name && !this.disabled && (this.checked || xt.test(this.nodeName) || wt.test(this.type))
                }
                ).map(function(e, t) {
                    var n = Q(this).val();
                    return null  == n ? null  : Q.isArray(n) ? Q.map(n, function(e, n) {
                        return {
                            name: t.name,
                            value: e.replace(bt, "\r\n")
                        }
                    }
                    ) : {
                        name: t.name,
                        value: n.replace(bt, "\r\n")
                    }
                }
                ).get()
            }
        }),
        Q.param = function(e, n) {
            var i, r = [], o = function(e, t) {
                t = Q.isFunction(t) ? t() : null  == t ? "" : t,
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            }
            ;
            if (n === t && (n = Q.ajaxSettings && Q.ajaxSettings.traditional),
            Q.isArray(e) || e.jquery && !Q.isPlainObject(e))
                Q.each(e, function() {
                    o(this.name, this.value)
                }
                );
            else
                for (i in e)
                    k(i, e[i], n, o);
            return r.join("&").replace(yt, "+")
        }
        ;
        var kt, Tt, jt = /#.*$/, Et = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Ct = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Nt = /^(?:GET|HEAD)$/, St = /^\/\//, At = /\?/, Mt = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Dt = /([?&])_=[^&]*/, Ht = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Lt = Q.fn.load, qt = {}, $t = {}, Ot = ["*/"] + ["*"];
        try {
            kt = P.href
        } catch (It) {
            kt = F.createElement("a"),
            kt.href = "",
            kt = kt.href
        }
        Tt = Ht.exec(kt.toLowerCase()) || [],
        Q.fn.load = function(e, n, i) {
            if ("string" != typeof e && Lt)
                return Lt.apply(this, arguments);
            if (!this.length)
                return this;
            var r, o, s, a = this, l = e.indexOf(" ");
            return l >= 0 && (r = e.slice(l, e.length),
            e = e.slice(0, l)),
            Q.isFunction(n) ? (i = n,
            n = t) : "object" == typeof n && (o = "POST"),
            Q.ajax({
                url: e,
                type: o,
                dataType: "html",
                data: n,
                complete: function(e, t) {
                    i && a.each(i, s || [e.responseText, t, e])
                }
            }).done(function(e) {
                s = arguments,
                a.html(r ? Q("<div>").append(e.replace(Mt, "")).find(r) : e)
            }
            ),
            this
        }
        ,
        Q.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
            Q.fn[t] = function(e) {
                return this.on(t, e)
            }
        }
        ),
        Q.each(["get", "post"], function(e, n) {
            Q[n] = function(e, i, r, o) {
                return Q.isFunction(i) && (o = o || r,
                r = i,
                i = t),
                Q.ajax({
                    type: n,
                    url: e,
                    data: i,
                    success: r,
                    dataType: o
                })
            }
        }
        ),
        Q.extend({
            getScript: function(e, n) {
                return Q.get(e, t, n, "script")
            },
            getJSON: function(e, t, n) {
                return Q.get(e, t, n, "json")
            },
            ajaxSetup: function(e, t) {
                return t ? E(e, Q.ajaxSettings) : (t = e,
                e = Q.ajaxSettings),
                E(e, t),
                e
            },
            ajaxSettings: {
                url: kt,
                isLocal: Ct.test(Tt[1]),
                global: !0,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: !0,
                async: !0,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": Ot
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": e.String,
                    "text html": !0,
                    "text json": Q.parseJSON,
                    "text xml": Q.parseXML
                },
                flatOptions: {
                    context: !0,
                    url: !0
                }
            },
            ajaxPrefilter: T(qt),
            ajaxTransport: T($t),
            ajax: function(e, n) {
                function i(e, n, i, s) {
                    var c, d, y, _, w, k = n;
                    2 !== b && (b = 2,
                    l && clearTimeout(l),
                    a = t,
                    o = s || "",
                    x.readyState = e > 0 ? 4 : 0,
                    i && (_ = C(f, x, i)),
                    e >= 200 && e < 300 || 304 === e ? (f.ifModified && (w = x.getResponseHeader("Last-Modified"),
                    w && (Q.lastModified[r] = w),
                    w = x.getResponseHeader("Etag"),
                    w && (Q.etag[r] = w)),
                    304 === e ? (k = "notmodified",
                    c = !0) : (c = N(f, _),
                    k = c.state,
                    d = c.data,
                    y = c.error,
                    c = !y)) : (y = k,
                    k && !e || (k = "error",
                    e < 0 && (e = 0))),
                    x.status = e,
                    x.statusText = "" + (n || k),
                    c ? m.resolveWith(h, [d, k, x]) : m.rejectWith(h, [x, k, y]),
                    x.statusCode(v),
                    v = t,
                    u && p.trigger("ajax" + (c ? "Success" : "Error"), [x, f, c ? d : y]),
                    g.fireWith(h, [x, k]),
                    u && (p.trigger("ajaxComplete", [x, f]),
                    --Q.active || Q.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (n = e,
                e = t),
                n = n || {};
                var r, o, s, a, l, c, u, d, f = Q.ajaxSetup({}, n), h = f.context || f, p = h !== f && (h.nodeType || h instanceof Q) ? Q(h) : Q.event, m = Q.Deferred(), g = Q.Callbacks("once memory"), v = f.statusCode || {}, y = {}, _ = {}, b = 0, w = "canceled", x = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!b) {
                            var n = e.toLowerCase();
                            e = _[n] = _[n] || e,
                            y[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? o : null 
                    },
                    getResponseHeader: function(e) {
                        var n;
                        if (2 === b) {
                            if (!s)
                                for (s = {}; n = Et.exec(o); )
                                    s[n[1].toLowerCase()] = n[2];
                            n = s[e.toLowerCase()]
                        }
                        return n === t ? null  : n
                    },
                    overrideMimeType: function(e) {
                        return b || (f.mimeType = e),
                        this
                    },
                    abort: function(e) {
                        return e = e || w,
                        a && a.abort(e),
                        i(0, e),
                        this
                    }
                };
                if (m.promise(x),
                x.success = x.done,
                x.error = x.fail,
                x.complete = g.add,
                x.statusCode = function(e) {
                    if (e) {
                        var t;
                        if (b < 2)
                            for (t in e)
                                v[t] = [v[t], e[t]];
                        else
                            t = e[x.status],
                            x.always(t)
                    }
                    return this
                }
                ,
                f.url = ((e || f.url) + "").replace(jt, "").replace(St, Tt[1] + "//"),
                f.dataTypes = Q.trim(f.dataType || "*").toLowerCase().split(te),
                null  == f.crossDomain && (c = Ht.exec(f.url.toLowerCase()),
                f.crossDomain = !(!c || c[1] == Tt[1] && c[2] == Tt[2] && (c[3] || ("http:" === c[1] ? 80 : 443)) == (Tt[3] || ("http:" === Tt[1] ? 80 : 443)))),
                f.data && f.processData && "string" != typeof f.data && (f.data = Q.param(f.data, f.traditional)),
                j(qt, f, n, x),
                2 === b)
                    return x;
                if (u = f.global,
                f.type = f.type.toUpperCase(),
                f.hasContent = !Nt.test(f.type),
                u && 0 === Q.active++ && Q.event.trigger("ajaxStart"),
                !f.hasContent && (f.data && (f.url += (At.test(f.url) ? "&" : "?") + f.data,
                delete f.data),
                r = f.url,
                f.cache === !1)) {
                    var k = Q.now()
                      , T = f.url.replace(Dt, "$1_=" + k);
                    f.url = T + (T === f.url ? (At.test(f.url) ? "&" : "?") + "_=" + k : "")
                }
                (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", f.contentType),
                f.ifModified && (r = r || f.url,
                Q.lastModified[r] && x.setRequestHeader("If-Modified-Since", Q.lastModified[r]),
                Q.etag[r] && x.setRequestHeader("If-None-Match", Q.etag[r])),
                x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ot + "; q=0.01" : "") : f.accepts["*"]);
                for (d in f.headers)
                    x.setRequestHeader(d, f.headers[d]);
                if (!f.beforeSend || f.beforeSend.call(h, x, f) !== !1 && 2 !== b) {
                    w = "abort";
                    for (d in {
                        success: 1,
                        error: 1,
                        complete: 1
                    })
                        x[d](f[d]);
                    if (a = j($t, f, n, x)) {
                        x.readyState = 1,
                        u && p.trigger("ajaxSend", [x, f]),
                        f.async && f.timeout > 0 && (l = setTimeout(function() {
                            x.abort("timeout")
                        }
                        , f.timeout));
                        try {
                            b = 1,
                            a.send(y, i)
                        } catch (E) {
                            if (!(b < 2))
                                throw E;
                            i(-1, E)
                        }
                    } else
                        i(-1, "No Transport");
                    return x
                }
                return x.abort()
            },
            active: 0,
            lastModified: {},
            etag: {}
        });
        var Bt = []
          , Rt = /\?/
          , Ft = /(=)\?(?=&|$)|\?\?/
          , Pt = Q.now();
        Q.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Bt.pop() || Q.expando + "_" + Pt++;
                return this[e] = !0,
                e
            }
        }),
        Q.ajaxPrefilter("json jsonp", function(n, i, r) {
            var o, s, a, l = n.data, c = n.url, u = n.jsonp !== !1, d = u && Ft.test(c), f = u && !d && "string" == typeof l && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Ft.test(l);
            if ("jsonp" === n.dataTypes[0] || d || f)
                return o = n.jsonpCallback = Q.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
                s = e[o],
                d ? n.url = c.replace(Ft, "$1" + o) : f ? n.data = l.replace(Ft, "$1" + o) : u && (n.url += (Rt.test(c) ? "&" : "?") + n.jsonp + "=" + o),
                n.converters["script json"] = function() {
                    return a || Q.error(o + " was not called"),
                    a[0]
                }
                ,
                n.dataTypes[0] = "json",
                e[o] = function() {
                    a = arguments
                }
                ,
                r.always(function() {
                    e[o] = s,
                    n[o] && (n.jsonpCallback = i.jsonpCallback,
                    Bt.push(o)),
                    a && Q.isFunction(s) && s(a[0]),
                    a = s = t
                }
                ),
                "script"
        }
        ),
        Q.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /javascript|ecmascript/
            },
            converters: {
                "text script": function(e) {
                    return Q.globalEval(e),
                    e
                }
            }
        }),
        Q.ajaxPrefilter("script", function(e) {
            e.cache === t && (e.cache = !1),
            e.crossDomain && (e.type = "GET",
            e.global = !1)
        }
        ),
        Q.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var n, i = F.head || F.getElementsByTagName("head")[0] || F.documentElement;
                return {
                    send: function(r, o) {
                        n = F.createElement("script"),
                        n.async = "async",
                        e.scriptCharset && (n.charset = e.scriptCharset),
                        n.src = e.url,
                        n.onload = n.onreadystatechange = function(e, r) {
                            (r || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null ,
                            i && n.parentNode && i.removeChild(n),
                            n = t,
                            r || o(200, "success"))
                        }
                        ,
                        i.insertBefore(n, i.firstChild)
                    },
                    abort: function() {
                        n && n.onload(0, 1)
                    }
                }
            }
        }
        );
        var zt, Wt = !!e.ActiveXObject && function() {
            for (var e in zt)
                zt[e](0, 1)
        }
        , Ut = 0;
        Q.ajaxSettings.xhr = e.ActiveXObject ? function() {
            return !this.isLocal && S() || A()
        }
         : S,
        function(e) {
            Q.extend(Q.support, {
                ajax: !!e,
                cors: !!e && "withCredentials" in e
            })
        }
        (Q.ajaxSettings.xhr()),
        Q.support.ajax && Q.ajaxTransport(function(n) {
            if (!n.crossDomain || Q.support.cors) {
                var i;
                return {
                    send: function(r, o) {
                        var s, a, l = n.xhr();
                        if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async),
                        n.xhrFields)
                            for (a in n.xhrFields)
                                l[a] = n.xhrFields[a];
                        n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType),
                        !n.crossDomain && !r["X-Requested-With"] && (r["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (a in r)
                                l.setRequestHeader(a, r[a])
                        } catch (c) {}
                        l.send(n.hasContent && n.data || null ),
                        i = function(e, r) {
                            var a, c, u, d, f;
                            try {
                                if (i && (r || 4 === l.readyState))
                                    if (i = t,
                                    s && (l.onreadystatechange = Q.noop,
                                    Wt && delete zt[s]),
                                    r)
                                        4 !== l.readyState && l.abort();
                                    else {
                                        a = l.status,
                                        u = l.getAllResponseHeaders(),
                                        d = {},
                                        f = l.responseXML,
                                        f && f.documentElement && (d.xml = f);
                                        try {
                                            d.text = l.responseText
                                        } catch (e) {}
                                        try {
                                            c = l.statusText
                                        } catch (h) {
                                            c = ""
                                        }
                                        a || !n.isLocal || n.crossDomain ? 1223 === a && (a = 204) : a = d.text ? 200 : 404
                                    }
                            } catch (p) {
                                r || o(-1, p)
                            }
                            d && o(a, c, d, u)
                        }
                        ,
                        n.async ? 4 === l.readyState ? setTimeout(i, 0) : (s = ++Ut,
                        Wt && (zt || (zt = {},
                        Q(e).unload(Wt)),
                        zt[s] = i),
                        l.onreadystatechange = i) : i()
                    },
                    abort: function() {
                        i && i(0, 1)
                    }
                }
            }
        }
        );
        var Vt, Xt, Jt = /^(?:toggle|show|hide)$/, Gt = new RegExp("^(?:([-+])=|)(" + Z + ")([a-z%]*)$","i"), Kt = /queueHooks$/, Yt = [q], Qt = {
            "*": [function(e, t) {
                var n, i, r, o = this.createTween(e, t), s = Gt.exec(t), a = o.cur(), l = +a || 0, c = 1;
                if (s) {
                    if (n = +s[2],
                    i = s[3] || (Q.cssNumber[e] ? "" : "px"),
                    "px" !== i && l) {
                        l = Q.css(o.elem, e, !0) || n || 1;
                        do
                            r = c = c || ".5",
                            l /= c,
                            Q.style(o.elem, e, l + i),
                            c = o.cur() / a;
                        while (1 !== c && c !== r)
                    }
                    o.unit = i,
                    o.start = l,
                    o.end = s[1] ? l + (s[1] + 1) * n : n
                }
                return o
            }
            ]
        };
        Q.Animation = Q.extend(H, {
            tweener: function(e, t) {
                Q.isFunction(e) ? (t = e,
                e = ["*"]) : e = e.split(" ");
                for (var n, i = 0, r = e.length; i < r; i++)
                    n = e[i],
                    Qt[n] = Qt[n] || [],
                    Qt[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? Yt.unshift(e) : Yt.push(e)
            }
        }),
        Q.Tween = $,
        $.prototype = {
            constructor: $,
            init: function(e, t, n, i, r, o) {
                this.elem = e,
                this.prop = n,
                this.easing = r || "swing",
                this.options = t,
                this.start = this.now = this.cur(),
                this.end = i,
                this.unit = o || (Q.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = $.propHooks[this.prop];
                return e && e.get ? e.get(this) : $.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = $.propHooks[this.prop];
                return this.pos = t = Q.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration),
                this.now = (this.end - this.start) * t + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                n && n.set ? n.set(this) : $.propHooks._default.set(this),
                this
            }
        },
        $.prototype.init.prototype = $.prototype,
        $.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null  == e.elem[e.prop] || e.elem.style && null  != e.elem.style[e.prop] ? (t = Q.css(e.elem, e.prop, !1, ""),
                    t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    Q.fx.step[e.prop] ? Q.fx.step[e.prop](e) : e.elem.style && (null  != e.elem.style[Q.cssProps[e.prop]] || Q.cssHooks[e.prop]) ? Q.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        },
        $.propHooks.scrollTop = $.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        Q.each(["toggle", "show", "hide"], function(e, t) {
            var n = Q.fn[t];
            Q.fn[t] = function(i, r, o) {
                return null  == i || "boolean" == typeof i || !e && Q.isFunction(i) && Q.isFunction(r) ? n.apply(this, arguments) : this.animate(O(t, !0), i, r, o)
            }
        }
        ),
        Q.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(v).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var r = Q.isEmptyObject(e)
                  , o = Q.speed(t, n, i)
                  , s = function() {
                    var t = H(this, Q.extend({}, e), o);
                    r && t.stop(!0)
                }
                ;
                return r || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
            },
            stop: function(e, n, i) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop,
                    t(i)
                }
                ;
                return "string" != typeof e && (i = n,
                n = e,
                e = t),
                n && e !== !1 && this.queue(e || "fx", []),
                this.each(function() {
                    var t = !0
                      , n = null  != e && e + "queueHooks"
                      , o = Q.timers
                      , s = Q._data(this);
                    if (n)
                        s[n] && s[n].stop && r(s[n]);
                    else
                        for (n in s)
                            s[n] && s[n].stop && Kt.test(n) && r(s[n]);
                    for (n = o.length; n--; )
                        o[n].elem === this && (null  == e || o[n].queue === e) && (o[n].anim.stop(i),
                        t = !1,
                        o.splice(n, 1));
                    (t || !i) && Q.dequeue(this, e)
                }
                )
            }
        }),
        Q.each({
            slideDown: O("show"),
            slideUp: O("hide"),
            slideToggle: O("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            Q.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }
        ),
        Q.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? Q.extend({}, e) : {
                complete: n || !n && t || Q.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !Q.isFunction(t) && t
            };
            return i.duration = Q.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in Q.fx.speeds ? Q.fx.speeds[i.duration] : Q.fx.speeds._default,
            null  != i.queue && i.queue !== !0 || (i.queue = "fx"),
            i.old = i.complete,
            i.complete = function() {
                Q.isFunction(i.old) && i.old.call(this),
                i.queue && Q.dequeue(this, i.queue)
            }
            ,
            i
        }
        ,
        Q.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        },
        Q.timers = [],
        Q.fx = $.prototype.init,
        Q.fx.tick = function() {
            for (var e, t = Q.timers, n = 0; n < t.length; n++)
                e = t[n],
                !e() && t[n] === e && t.splice(n--, 1);
            t.length || Q.fx.stop()
        }
        ,
        Q.fx.timer = function(e) {
            e() && Q.timers.push(e) && !Xt && (Xt = setInterval(Q.fx.tick, Q.fx.interval))
        }
        ,
        Q.fx.interval = 13,
        Q.fx.stop = function() {
            clearInterval(Xt),
            Xt = null 
        }
        ,
        Q.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        Q.fx.step = {},
        Q.expr && Q.expr.filters && (Q.expr.filters.animated = function(e) {
            return Q.grep(Q.timers, function(t) {
                return e === t.elem
            }
            ).length
        }
        );
        var Zt = /^(?:body|html)$/i;
        Q.fn.offset = function(e) {
            if (arguments.length)
                return e === t ? this : this.each(function(t) {
                    Q.offset.setOffset(this, e, t)
                }
                );
            var n, i, r, o, s, a, l, c, u, d, f = this[0], h = f && f.ownerDocument;
            if (h)
                return (r = h.body) === f ? Q.offset.bodyOffset(f) : (i = h.documentElement,
                Q.contains(i, f) ? (n = f.getBoundingClientRect(),
                o = I(h),
                s = i.clientTop || r.clientTop || 0,
                a = i.clientLeft || r.clientLeft || 0,
                l = o.pageYOffset || i.scrollTop,
                c = o.pageXOffset || i.scrollLeft,
                u = n.top + l - s,
                d = n.left + c - a,
                {
                    top: u,
                    left: d
                }) : {
                    top: 0,
                    left: 0
                })
        }
        ,
        Q.offset = {
            bodyOffset: function(e) {
                var t = e.offsetTop
                  , n = e.offsetLeft;
                return Q.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(Q.css(e, "marginTop")) || 0,
                n += parseFloat(Q.css(e, "marginLeft")) || 0),
                {
                    top: t,
                    left: n
                }
            },
            setOffset: function(e, t, n) {
                var i = Q.css(e, "position");
                "static" === i && (e.style.position = "relative");
                var r, o, s = Q(e), a = s.offset(), l = Q.css(e, "top"), c = Q.css(e, "left"), u = ("absolute" === i || "fixed" === i) && Q.inArray("auto", [l, c]) > -1, d = {}, f = {};
                u ? (f = s.position(),
                r = f.top,
                o = f.left) : (r = parseFloat(l) || 0,
                o = parseFloat(c) || 0),
                Q.isFunction(t) && (t = t.call(e, n, a)),
                null  != t.top && (d.top = t.top - a.top + r),
                null  != t.left && (d.left = t.left - a.left + o),
                "using" in t ? t.using.call(e, d) : s.css(d)
            }
        },
        Q.fn.extend({
            position: function() {
                if (this[0]) {
                    var e = this[0]
                      , t = this.offsetParent()
                      , n = this.offset()
                      , i = Zt.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                    return n.top -= parseFloat(Q.css(e, "marginTop")) || 0,
                    n.left -= parseFloat(Q.css(e, "marginLeft")) || 0,
                    i.top += parseFloat(Q.css(t[0], "borderTopWidth")) || 0,
                    i.left += parseFloat(Q.css(t[0], "borderLeftWidth")) || 0,
                    {
                        top: n.top - i.top,
                        left: n.left - i.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || F.body; e && !Zt.test(e.nodeName) && "static" === Q.css(e, "position"); )
                        e = e.offsetParent;
                    return e || F.body
                }
                )
            }
        }),
        Q.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, n) {
            var i = /Y/.test(n);
            Q.fn[e] = function(r) {
                return Q.access(this, function(e, r, o) {
                    var s = I(e);
                    return o === t ? s ? n in s ? s[n] : s.document.documentElement[r] : e[r] : void (s ? s.scrollTo(i ? Q(s).scrollLeft() : o, i ? o : Q(s).scrollTop()) : e[r] = o)
                }
                , e, r, arguments.length, null )
            }
        }
        ),
        Q.each({
            Height: "height",
            Width: "width"
        }, function(e, n) {
            Q.each({
                padding: "inner" + e,
                content: n,
                "": "outer" + e
            }, function(i, r) {
                Q.fn[r] = function(r, o) {
                    var s = arguments.length && (i || "boolean" != typeof r)
                      , a = i || (r === !0 || o === !0 ? "margin" : "border");
                    return Q.access(this, function(n, i, r) {
                        var o;
                        return Q.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement,
                        Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : r === t ? Q.css(n, i, r, a) : Q.style(n, i, r, a)
                    }
                    , n, s ? r : t, s)
                }
            }
            )
        }
        ),
        e.jQuery = e.$ = Q,
        "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return Q
        }
        )
    }
    (window);
    var e = window.jQuery = window.$ = $.noConflict(!0);
    return e
}
),
define("underscore", [], function(require, exports, module) {
    (function() {
        function e(e) {
            function t(t, n, i, r, o, s) {
                for (; o >= 0 && s > o; o += e) {
                    var a = r ? r[o] : o;
                    i = n(i, t[a], a, t)
                }
                return i
            }
            return function(n, i, r, o) {
                i = _(i, o, 4);
                var s = !E(n) && y.keys(n)
                  , a = (s || n).length
                  , l = e > 0 ? 0 : a - 1;
                return arguments.length < 3 && (r = n[s ? s[l] : l],
                l += e),
                t(n, i, r, s, l, a)
            }
        }
        function t(e) {
            return function(t, n, i) {
                n = b(n, i);
                for (var r = j(t), o = e > 0 ? 0 : r - 1; o >= 0 && r > o; o += e)
                    if (n(t[o], o, t))
                        return o;
                return -1
            }
        }
        function n(e, t, n) {
            return function(i, r, o) {
                var s = 0
                  , a = j(i);
                if ("number" == typeof o)
                    e > 0 ? s = o >= 0 ? o : Math.max(o + a, s) : a = o >= 0 ? Math.min(o + 1, a) : o + a + 1;
                else if (n && o && a)
                    return o = n(i, r),
                    i[o] === r ? o : -1;
                if (r !== r)
                    return o = t(u.call(i, s, a), y.isNaN),
                    o >= 0 ? o + s : -1;
                for (o = e > 0 ? s : a - 1; o >= 0 && a > o; o += e)
                    if (i[o] === r)
                        return o;
                return -1
            }
        }
        function i(e, t) {
            var n = M.length
              , i = e.constructor
              , r = y.isFunction(i) && i.prototype || a
              , o = "constructor";
            for (y.has(e, o) && !y.contains(t, o) && t.push(o); n--; )
                o = M[n],
                o in e && e[o] !== r[o] && !y.contains(t, o) && t.push(o)
        }
        var r = this
          , o = r._
          , s = Array.prototype
          , a = Object.prototype
          , l = Function.prototype
          , c = s.push
          , u = s.slice
          , d = a.toString
          , f = a.hasOwnProperty
          , h = Array.isArray
          , p = Object.keys
          , m = l.bind
          , g = Object.create
          , v = function() {}
          , y = function(e) {
            return e instanceof y ? e : this instanceof y ? void (this._wrapped = e) : new y(e)
        }
        ;
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = y),
        exports._ = y) : r._ = y,
        y.VERSION = "1.8.3";
        var _ = function(e, t, n) {
            if (void 0 === t)
                return e;
            switch (null  == n ? 3 : n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                }
                ;
            case 2:
                return function(n, i) {
                    return e.call(t, n, i)
                }
                ;
            case 3:
                return function(n, i, r) {
                    return e.call(t, n, i, r)
                }
                ;
            case 4:
                return function(n, i, r, o) {
                    return e.call(t, n, i, r, o)
                }
            }
            return function() {
                return e.apply(t, arguments)
            }
        }
          , b = function(e, t, n) {
            return null  == e ? y.identity : y.isFunction(e) ? _(e, t, n) : y.isObject(e) ? y.matcher(e) : y.property(e)
        }
        ;
        y.iteratee = function(e, t) {
            return b(e, t, 1 / 0)
        }
        ;
        var w = function(e, t) {
            return function(n) {
                var i = arguments.length;
                if (2 > i || null  == n)
                    return n;
                for (var r = 1; i > r; r++)
                    for (var o = arguments[r], s = e(o), a = s.length, l = 0; a > l; l++) {
                        var c = s[l];
                        t && void 0 !== n[c] || (n[c] = o[c])
                    }
                return n
            }
        }
          , x = function(e) {
            if (!y.isObject(e))
                return {};
            if (g)
                return g(e);
            v.prototype = e;
            var t = new v;
            return v.prototype = null ,
            t
        }
          , k = function(e) {
            return function(t) {
                return null  == t ? void 0 : t[e]
            }
        }
          , T = Math.pow(2, 53) - 1
          , j = k("length")
          , E = function(e) {
            var t = j(e);
            return "number" == typeof t && t >= 0 && T >= t
        }
        ;
        y.each = y.forEach = function(e, t, n) {
            t = _(t, n);
            var i, r;
            if (E(e))
                for (i = 0,
                r = e.length; r > i; i++)
                    t(e[i], i, e);
            else {
                var o = y.keys(e);
                for (i = 0,
                r = o.length; r > i; i++)
                    t(e[o[i]], o[i], e)
            }
            return e
        }
        ,
        y.map = y.collect = function(e, t, n) {
            t = b(t, n);
            for (var i = !E(e) && y.keys(e), r = (i || e).length, o = Array(r), s = 0; r > s; s++) {
                var a = i ? i[s] : s;
                o[s] = t(e[a], a, e)
            }
            return o
        }
        ,
        y.reduce = y.foldl = y.inject = e(1),
        y.reduceRight = y.foldr = e(-1),
        y.find = y.detect = function(e, t, n) {
            var i;
            return i = E(e) ? y.findIndex(e, t, n) : y.findKey(e, t, n),
            void 0 !== i && i !== -1 ? e[i] : void 0
        }
        ,
        y.filter = y.select = function(e, t, n) {
            var i = [];
            return t = b(t, n),
            y.each(e, function(e, n, r) {
                t(e, n, r) && i.push(e)
            }
            ),
            i
        }
        ,
        y.reject = function(e, t, n) {
            return y.filter(e, y.negate(b(t)), n)
        }
        ,
        y.every = y.all = function(e, t, n) {
            t = b(t, n);
            for (var i = !E(e) && y.keys(e), r = (i || e).length, o = 0; r > o; o++) {
                var s = i ? i[o] : o;
                if (!t(e[s], s, e))
                    return !1
            }
            return !0
        }
        ,
        y.some = y.any = function(e, t, n) {
            t = b(t, n);
            for (var i = !E(e) && y.keys(e), r = (i || e).length, o = 0; r > o; o++) {
                var s = i ? i[o] : o;
                if (t(e[s], s, e))
                    return !0
            }
            return !1
        }
        ,
        y.contains = y.includes = y.include = function(e, t, n, i) {
            return E(e) || (e = y.values(e)),
            ("number" != typeof n || i) && (n = 0),
            y.indexOf(e, t, n) >= 0
        }
        ,
        y.invoke = function(e, t) {
            var n = u.call(arguments, 2)
              , i = y.isFunction(t);
            return y.map(e, function(e) {
                var r = i ? t : e[t];
                return null  == r ? r : r.apply(e, n)
            }
            )
        }
        ,
        y.pluck = function(e, t) {
            return y.map(e, y.property(t))
        }
        ,
        y.where = function(e, t) {
            return y.filter(e, y.matcher(t))
        }
        ,
        y.findWhere = function(e, t) {
            return y.find(e, y.matcher(t))
        }
        ,
        y.max = function(e, t, n) {
            var i, r, o = -1 / 0, s = -1 / 0;
            if (null  == t && null  != e) {
                e = E(e) ? e : y.values(e);
                for (var a = 0, l = e.length; l > a; a++)
                    i = e[a],
                    i > o && (o = i)
            } else
                t = b(t, n),
                y.each(e, function(e, n, i) {
                    r = t(e, n, i),
                    (r > s || r === -1 / 0 && o === -1 / 0) && (o = e,
                    s = r)
                }
                );
            return o
        }
        ,
        y.min = function(e, t, n) {
            var i, r, o = 1 / 0, s = 1 / 0;
            if (null  == t && null  != e) {
                e = E(e) ? e : y.values(e);
                for (var a = 0, l = e.length; l > a; a++)
                    i = e[a],
                    o > i && (o = i)
            } else
                t = b(t, n),
                y.each(e, function(e, n, i) {
                    r = t(e, n, i),
                    (s > r || 1 / 0 === r && 1 / 0 === o) && (o = e,
                    s = r)
                }
                );
            return o
        }
        ,
        y.shuffle = function(e) {
            for (var t, n = E(e) ? e : y.values(e), i = n.length, r = Array(i), o = 0; i > o; o++)
                t = y.random(0, o),
                t !== o && (r[o] = r[t]),
                r[t] = n[o];
            return r
        }
        ,
        y.sample = function(e, t, n) {
            return null  == t || n ? (E(e) || (e = y.values(e)),
            e[y.random(e.length - 1)]) : y.shuffle(e).slice(0, Math.max(0, t))
        }
        ,
        y.sortBy = function(e, t, n) {
            return t = b(t, n),
            y.pluck(y.map(e, function(e, n, i) {
                return {
                    value: e,
                    index: n,
                    criteria: t(e, n, i)
                }
            }
            ).sort(function(e, t) {
                var n = e.criteria
                  , i = t.criteria;
                if (n !== i) {
                    if (n > i || void 0 === n)
                        return 1;
                    if (i > n || void 0 === i)
                        return -1
                }
                return e.index - t.index
            }
            ), "value")
        }
        ;
        var C = function(e) {
            return function(t, n, i) {
                var r = {};
                return n = b(n, i),
                y.each(t, function(i, o) {
                    var s = n(i, o, t);
                    e(r, i, s)
                }
                ),
                r
            }
        }
        ;
        y.groupBy = C(function(e, t, n) {
            y.has(e, n) ? e[n].push(t) : e[n] = [t]
        }
        ),
        y.indexBy = C(function(e, t, n) {
            e[n] = t
        }
        ),
        y.countBy = C(function(e, t, n) {
            y.has(e, n) ? e[n]++ : e[n] = 1
        }
        ),
        y.toArray = function(e) {
            return e ? y.isArray(e) ? u.call(e) : E(e) ? y.map(e, y.identity) : y.values(e) : []
        }
        ,
        y.size = function(e) {
            return null  == e ? 0 : E(e) ? e.length : y.keys(e).length
        }
        ,
        y.partition = function(e, t, n) {
            t = b(t, n);
            var i = []
              , r = [];
            return y.each(e, function(e, n, o) {
                (t(e, n, o) ? i : r).push(e)
            }
            ),
            [i, r]
        }
        ,
        y.first = y.head = y.take = function(e, t, n) {
            return null  == e ? void 0 : null  == t || n ? e[0] : y.initial(e, e.length - t)
        }
        ,
        y.initial = function(e, t, n) {
            return u.call(e, 0, Math.max(0, e.length - (null  == t || n ? 1 : t)))
        }
        ,
        y.last = function(e, t, n) {
            return null  == e ? void 0 : null  == t || n ? e[e.length - 1] : y.rest(e, Math.max(0, e.length - t))
        }
        ,
        y.rest = y.tail = y.drop = function(e, t, n) {
            return u.call(e, null  == t || n ? 1 : t)
        }
        ,
        y.compact = function(e) {
            return y.filter(e, y.identity)
        }
        ;
        var N = function(e, t, n, i) {
            for (var r = [], o = 0, s = i || 0, a = j(e); a > s; s++) {
                var l = e[s];
                if (E(l) && (y.isArray(l) || y.isArguments(l))) {
                    t || (l = N(l, t, n));
                    var c = 0
                      , u = l.length;
                    for (r.length += u; u > c; )
                        r[o++] = l[c++]
                } else
                    n || (r[o++] = l)
            }
            return r
        }
        ;
        y.flatten = function(e, t) {
            return N(e, t, !1)
        }
        ,
        y.without = function(e) {
            return y.difference(e, u.call(arguments, 1))
        }
        ,
        y.uniq = y.unique = function(e, t, n, i) {
            y.isBoolean(t) || (i = n,
            n = t,
            t = !1),
            null  != n && (n = b(n, i));
            for (var r = [], o = [], s = 0, a = j(e); a > s; s++) {
                var l = e[s]
                  , c = n ? n(l, s, e) : l;
                t ? (s && o === c || r.push(l),
                o = c) : n ? y.contains(o, c) || (o.push(c),
                r.push(l)) : y.contains(r, l) || r.push(l)
            }
            return r
        }
        ,
        y.union = function() {
            return y.uniq(N(arguments, !0, !0))
        }
        ,
        y.intersection = function(e) {
            for (var t = [], n = arguments.length, i = 0, r = j(e); r > i; i++) {
                var o = e[i];
                if (!y.contains(t, o)) {
                    for (var s = 1; n > s && y.contains(arguments[s], o); s++)
                        ;
                    s === n && t.push(o)
                }
            }
            return t
        }
        ,
        y.difference = function(e) {
            var t = N(arguments, !0, !0, 1);
            return y.filter(e, function(e) {
                return !y.contains(t, e)
            }
            )
        }
        ,
        y.zip = function() {
            return y.unzip(arguments)
        }
        ,
        y.unzip = function(e) {
            for (var t = e && y.max(e, j).length || 0, n = Array(t), i = 0; t > i; i++)
                n[i] = y.pluck(e, i);
            return n
        }
        ,
        y.object = function(e, t) {
            for (var n = {}, i = 0, r = j(e); r > i; i++)
                t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
            return n
        }
        ,
        y.findIndex = t(1),
        y.findLastIndex = t(-1),
        y.sortedIndex = function(e, t, n, i) {
            n = b(n, i, 1);
            for (var r = n(t), o = 0, s = j(e); s > o; ) {
                var a = Math.floor((o + s) / 2);
                n(e[a]) < r ? o = a + 1 : s = a
            }
            return o
        }
        ,
        y.indexOf = n(1, y.findIndex, y.sortedIndex),
        y.lastIndexOf = n(-1, y.findLastIndex),
        y.range = function(e, t, n) {
            null  == t && (t = e || 0,
            e = 0),
            n = n || 1;
            for (var i = Math.max(Math.ceil((t - e) / n), 0), r = Array(i), o = 0; i > o; o++,
            e += n)
                r[o] = e;
            return r
        }
        ;
        var S = function(e, t, n, i, r) {
            if (!(i instanceof t))
                return e.apply(n, r);
            var o = x(e.prototype)
              , s = e.apply(o, r);
            return y.isObject(s) ? s : o
        }
        ;
        y.bind = function(e, t) {
            if (m && e.bind === m)
                return m.apply(e, u.call(arguments, 1));
            if (!y.isFunction(e))
                throw new TypeError("Bind must be called on a function");
            var n = u.call(arguments, 2)
              , i = function() {
                return S(e, i, t, this, n.concat(u.call(arguments)))
            }
            ;
            return i
        }
        ,
        y.partial = function(e) {
            var t = u.call(arguments, 1)
              , n = function() {
                for (var i = 0, r = t.length, o = Array(r), s = 0; r > s; s++)
                    o[s] = t[s] === y ? arguments[i++] : t[s];
                for (; i < arguments.length; )
                    o.push(arguments[i++]);
                return S(e, n, this, this, o)
            }
            ;
            return n
        }
        ,
        y.bindAll = function(e) {
            var t, n, i = arguments.length;
            if (1 >= i)
                throw new Error("bindAll must be passed function names");
            for (t = 1; i > t; t++)
                n = arguments[t],
                e[n] = y.bind(e[n], e);
            return e
        }
        ,
        y.memoize = function(e, t) {
            var n = function(i) {
                var r = n.cache
                  , o = "" + (t ? t.apply(this, arguments) : i);
                return y.has(r, o) || (r[o] = e.apply(this, arguments)),
                r[o]
            }
            ;
            return n.cache = {},
            n
        }
        ,
        y.delay = function(e, t) {
            var n = u.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null , n)
            }
            , t)
        }
        ,
        y.defer = y.partial(y.delay, y, 1),
        y.throttle = function(e, t, n) {
            var i, r, o, s = null , a = 0;
            n || (n = {});
            var l = function() {
                a = n.leading === !1 ? 0 : y.now(),
                s = null ,
                o = e.apply(i, r),
                s || (i = r = null )
            }
            ;
            return function() {
                var c = y.now();
                a || n.leading !== !1 || (a = c);
                var u = t - (c - a);
                return i = this,
                r = arguments,
                0 >= u || u > t ? (s && (clearTimeout(s),
                s = null ),
                a = c,
                o = e.apply(i, r),
                s || (i = r = null )) : s || n.trailing === !1 || (s = setTimeout(l, u)),
                o
            }
        }
        ,
        y.debounce = function(e, t, n) {
            var i, r, o, s, a, l = function() {
                var c = y.now() - s;
                t > c && c >= 0 ? i = setTimeout(l, t - c) : (i = null ,
                n || (a = e.apply(o, r),
                i || (o = r = null )))
            }
            ;
            return function() {
                o = this,
                r = arguments,
                s = y.now();
                var c = n && !i;
                return i || (i = setTimeout(l, t)),
                c && (a = e.apply(o, r),
                o = r = null ),
                a
            }
        }
        ,
        y.wrap = function(e, t) {
            return y.partial(t, e)
        }
        ,
        y.negate = function(e) {
            return function() {
                return !e.apply(this, arguments)
            }
        }
        ,
        y.compose = function() {
            var e = arguments
              , t = e.length - 1;
            return function() {
                for (var n = t, i = e[t].apply(this, arguments); n--; )
                    i = e[n].call(this, i);
                return i
            }
        }
        ,
        y.after = function(e, t) {
            return function() {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }
        ,
        y.before = function(e, t) {
            var n;
            return function() {
                return --e > 0 && (n = t.apply(this, arguments)),
                1 >= e && (t = null ),
                n
            }
        }
        ,
        y.once = y.partial(y.before, 2);
        var A = !{
            toString: null 
        }.propertyIsEnumerable("toString")
          , M = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        y.keys = function(e) {
            if (!y.isObject(e))
                return [];
            if (p)
                return p(e);
            var t = [];
            for (var n in e)
                y.has(e, n) && t.push(n);
            return A && i(e, t),
            t
        }
        ,
        y.allKeys = function(e) {
            if (!y.isObject(e))
                return [];
            var t = [];
            for (var n in e)
                t.push(n);
            return A && i(e, t),
            t
        }
        ,
        y.values = function(e) {
            for (var t = y.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++)
                i[r] = e[t[r]];
            return i
        }
        ,
        y.mapObject = function(e, t, n) {
            t = b(t, n);
            for (var i, r = y.keys(e), o = r.length, s = {}, a = 0; o > a; a++)
                i = r[a],
                s[i] = t(e[i], i, e);
            return s
        }
        ,
        y.pairs = function(e) {
            for (var t = y.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++)
                i[r] = [t[r], e[t[r]]];
            return i
        }
        ,
        y.invert = function(e) {
            for (var t = {}, n = y.keys(e), i = 0, r = n.length; r > i; i++)
                t[e[n[i]]] = n[i];
            return t
        }
        ,
        y.functions = y.methods = function(e) {
            var t = [];
            for (var n in e)
                y.isFunction(e[n]) && t.push(n);
            return t.sort()
        }
        ,
        y.extend = w(y.allKeys),
        y.extendOwn = y.assign = w(y.keys),
        y.findKey = function(e, t, n) {
            t = b(t, n);
            for (var i, r = y.keys(e), o = 0, s = r.length; s > o; o++)
                if (i = r[o],
                t(e[i], i, e))
                    return i
        }
        ,
        y.pick = function(e, t, n) {
            var i, r, o = {}, s = e;
            if (null  == s)
                return o;
            y.isFunction(t) ? (r = y.allKeys(s),
            i = _(t, n)) : (r = N(arguments, !1, !1, 1),
            i = function(e, t, n) {
                return t in n
            }
            ,
            s = Object(s));
            for (var a = 0, l = r.length; l > a; a++) {
                var c = r[a]
                  , u = s[c];
                i(u, c, s) && (o[c] = u)
            }
            return o
        }
        ,
        y.omit = function(e, t, n) {
            if (y.isFunction(t))
                t = y.negate(t);
            else {
                var i = y.map(N(arguments, !1, !1, 1), String);
                t = function(e, t) {
                    return !y.contains(i, t)
                }
            }
            return y.pick(e, t, n)
        }
        ,
        y.defaults = w(y.allKeys, !0),
        y.create = function(e, t) {
            var n = x(e);
            return t && y.extendOwn(n, t),
            n
        }
        ,
        y.clone = function(e) {
            return y.isObject(e) ? y.isArray(e) ? e.slice() : y.extend({}, e) : e
        }
        ,
        y.tap = function(e, t) {
            return t(e),
            e
        }
        ,
        y.isMatch = function(e, t) {
            var n = y.keys(t)
              , i = n.length;
            if (null  == e)
                return !i;
            for (var r = Object(e), o = 0; i > o; o++) {
                var s = n[o];
                if (t[s] !== r[s] || !(s in r))
                    return !1
            }
            return !0
        }
        ;
        var D = function(e, t, n, i) {
            if (e === t)
                return 0 !== e || 1 / e === 1 / t;
            if (null  == e || null  == t)
                return e === t;
            e instanceof y && (e = e._wrapped),
            t instanceof y && (t = t._wrapped);
            var r = d.call(e);
            if (r !== d.call(t))
                return !1;
            switch (r) {
            case "[object RegExp]":
            case "[object String]":
                return "" + e == "" + t;
            case "[object Number]":
                return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e === +t
            }
            var o = "[object Array]" === r;
            if (!o) {
                if ("object" != typeof e || "object" != typeof t)
                    return !1;
                var s = e.constructor
                  , a = t.constructor;
                if (s !== a && !(y.isFunction(s) && s instanceof s && y.isFunction(a) && a instanceof a) && "constructor" in e && "constructor" in t)
                    return !1
            }
            n = n || [],
            i = i || [];
            for (var l = n.length; l--; )
                if (n[l] === e)
                    return i[l] === t;
            if (n.push(e),
            i.push(t),
            o) {
                if (l = e.length,
                l !== t.length)
                    return !1;
                for (; l--; )
                    if (!D(e[l], t[l], n, i))
                        return !1
            } else {
                var c, u = y.keys(e);
                if (l = u.length,
                y.keys(t).length !== l)
                    return !1;
                for (; l--; )
                    if (c = u[l],
                    !y.has(t, c) || !D(e[c], t[c], n, i))
                        return !1
            }
            return n.pop(),
            i.pop(),
            !0
        }
        ;
        y.isEqual = function(e, t) {
            return D(e, t)
        }
        ,
        y.isEmpty = function(e) {
            return null  == e || (E(e) && (y.isArray(e) || y.isString(e) || y.isArguments(e)) ? 0 === e.length : 0 === y.keys(e).length)
        }
        ,
        y.isElement = function(e) {
            return !(!e || 1 !== e.nodeType)
        }
        ,
        y.isArray = h || function(e) {
            return "[object Array]" === d.call(e)
        }
        ,
        y.isObject = function(e) {
            var t = typeof e;
            return "function" === t || "object" === t && !!e
        }
        ,
        y.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(e) {
            y["is" + e] = function(t) {
                return d.call(t) === "[object " + e + "]"
            }
        }
        ),
        y.isArguments(arguments) || (y.isArguments = function(e) {
            return y.has(e, "callee")
        }
        ),
        "function" != typeof /./ && "object" != typeof Int8Array && (y.isFunction = function(e) {
            return "function" == typeof e || !1
        }
        ),
        y.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }
        ,
        y.isNaN = function(e) {
            return y.isNumber(e) && e !== +e
        }
        ,
        y.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" === d.call(e)
        }
        ,
        y.isNull = function(e) {
            return null  === e
        }
        ,
        y.isUndefined = function(e) {
            return void 0 === e
        }
        ,
        y.has = function(e, t) {
            return null  != e && f.call(e, t)
        }
        ,
        y.noConflict = function() {
            return r._ = o,
            this
        }
        ,
        y.identity = function(e) {
            return e
        }
        ,
        y.constant = function(e) {
            return function() {
                return e
            }
        }
        ,
        y.noop = function() {}
        ,
        y.property = k,
        y.propertyOf = function(e) {
            return null  == e ? function() {}
             : function(t) {
                return e[t]
            }
        }
        ,
        y.matcher = y.matches = function(e) {
            return e = y.extendOwn({}, e),
            function(t) {
                return y.isMatch(t, e)
            }
        }
        ,
        y.times = function(e, t, n) {
            var i = Array(Math.max(0, e));
            t = _(t, n, 1);
            for (var r = 0; e > r; r++)
                i[r] = t(r);
            return i
        }
        ,
        y.random = function(e, t) {
            return null  == t && (t = e,
            e = 0),
            e + Math.floor(Math.random() * (t - e + 1))
        }
        ,
        y.now = Date.now || function() {
            return (new Date).getTime()
        }
        ;
        var H = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }
          , L = y.invert(H)
          , q = function(e) {
            var t = function(t) {
                return e[t]
            }
              , n = "(?:" + y.keys(e).join("|") + ")"
              , i = RegExp(n)
              , r = RegExp(n, "g");
            return function(e) {
                return e = null  == e ? "" : "" + e,
                i.test(e) ? e.replace(r, t) : e
            }
        }
        ;
        y.escape = q(H),
        y.unescape = q(L),
        y.result = function(e, t, n) {
            var i = null  == e ? void 0 : e[t];
            return void 0 === i && (i = n),
            y.isFunction(i) ? i.call(e) : i
        }
        ;
        var $ = 0;
        y.uniqueId = function(e) {
            var t = ++$ + "";
            return e ? e + t : t
        }
        ,
        y.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var O = /(.)^/
          , I = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
          , B = /\\|'|\r|\n|\u2028|\u2029/g
          , R = function(e) {
            return "\\" + I[e]
        }
        ;
        y.template = function(e, t, n) {
            !t && n && (t = n),
            t = y.defaults({}, t, y.templateSettings);
            var i = RegExp([(t.escape || O).source, (t.interpolate || O).source, (t.evaluate || O).source].join("|") + "|$", "g")
              , r = 0
              , o = "__p+='";
            e.replace(i, function(t, n, i, s, a) {
                return o += e.slice(r, a).replace(B, R),
                r = a + t.length,
                n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? o += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : s && (o += "';\n" + s + "\n__p+='"),
                t
            }
            ),
            o += "';\n",
            t.variable || (o = "with(obj||{}){\n" + o + "}\n"),
            o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
            try {
                var s = new Function(t.variable || "obj","_",o)
            } catch (a) {
                throw a.source = o,
                a
            }
            var l = function(e) {
                return s.call(this, e, y)
            }
              , c = t.variable || "obj";
            return l.source = "function(" + c + "){\n" + o + "}",
            l
        }
        ,
        y.chain = function(e) {
            var t = y(e);
            return t._chain = !0,
            t
        }
        ;
        var F = function(e, t) {
            return e._chain ? y(t).chain() : t
        }
        ;
        y.mixin = function(e) {
            y.each(y.functions(e), function(t) {
                var n = y[t] = e[t];
                y.prototype[t] = function() {
                    var e = [this._wrapped];
                    return c.apply(e, arguments),
                    F(this, n.apply(y, e))
                }
            }
            )
        }
        ,
        y.mixin(y),
        y.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = s[e];
            y.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments),
                "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0],
                F(this, n)
            }
        }
        ),
        y.each(["concat", "join", "slice"], function(e) {
            var t = s[e];
            y.prototype[e] = function() {
                return F(this, t.apply(this._wrapped, arguments))
            }
        }
        ),
        y.prototype.value = function() {
            return this._wrapped
        }
        ,
        y.prototype.valueOf = y.prototype.toJSON = y.prototype.value,
        y.prototype.toString = function() {
            return "" + this._wrapped
        }
        ,
        "function" == typeof define && define.amd && define("underscore", [], function() {
            return y
        }
        )
    }
    ).call(this)
}
),
define("modules/at", ["modules/base", "backbone", "underscore", "utils/loading", "utils/nodata", "views/at"], function(require, exports, module) {
    var e = require("modules/base")
      , t = require("views/at")
      , n = e.Collection.extend({
        url: "/api/notify/query.atme.list.do"
    })
      , i = e.View.extend({
        template: t
    });
    return function() {
        return new i(new n)
    }
}
),
define("modules/base", ["backbone", "underscore", "jquery", "utils/loading", "utils/nodata"], function(require, exports, module) {
    var e = require("backbone")
      , t = require("underscore")
      , n = require("utils/loading")
      , i = require("utils/nodata")
      , r = {};
    return r.Model = e.Model.extend({
        parse: function(e) {
            var n = e.publisher ? e.publisher.mid : null 
              , i = t.extend({
                source: {},
                title: "",
                content: ""
            }, e);
            return i.publisher = t.extend({
                face: "//static.hdslb.com/images/member/noface.gif",
                link: n ? "//space.bilibili.com/" + n : "javascript: void(0);"
            }, e.publisher),
            i
        }
    }),
    r.Collection = e.Collection.extend({
        model: r.Model,
        parse: function(e) {
            return e.code == -101 && (location.href = "https://account.bilibili.com/login?gourl=" + encodeURIComponent(location.href)),
            0 != e.code ? [] : e.data ? e.data : []
        }
    }),
    r.View = e.View.extend({
        el: ".message-main-lists",
        initialize: function(e) {
            $(window).scrollTop(0),
            this.Collection = e,
            this.Collection.bind("sync", this.render, this),
            this.loading(),
            this.Collection.fetch({
                data: {
                    captcha: window.captcha_key,
                    data_type: 1
                }
            })
        },
        loading: function() {
            this.$loading = n(),
            this.$el.append(this.$loading)
        },
        render: function() {
            this.$loading && (this.$loading.remove(),
            this.$loading = null ),
            this.$el.append(this.template(this.Collection.toJSON())),
            0 === this.$el.children().length && i()
        },
        scrollLoad: function() {
            var e = this.Collection;
            if (!this.$loading && 0 !== e.length) {
                var t = e.length - 1;
                this.loading(),
                this.Collection.fetch({
                    data: {
                        captcha: window.captcha_key,
                        cursor: e.at(t).get("cursor"),
                        data_type: 1
                    }
                })
            }
        }
    }),
    r
}
),
define("modules/config", ["backbone", "underscore", "jquery", "views/config", "utils/popup", "artDialog", "utils/errorcode"], function(require, exports, module) {
    var e = require("backbone")
      , t = require("views/config")
      , n = require("utils/popup")
      , i = require("jquery")
      , r = require("utils/errorcode")
      , o = 300
      , s = '<p style="line-height:24px">关闭私信自动回复后，</p><p style="line-height:24px">向您发送私信的用户将不会收到自动回复的私信，</p><p style="line-height:24px;margin-bottom:25px;">这项设置将立即生效。</p>'
      , a = "//message.bilibili.com"
      , l = {
        query: a + "/api/autoreply/query.autoreply.do",
        validate: a + "/api/autoreply/validate.autoreply.do",
        save: a + "/api/autoreply/save.autoreply.do"
    }
      , c = e.View.extend({
        el: ".message-main-lists",
        template: t,
        events: {
            "click .emoji-btn": "openEmoji",
            "click .emoji-text-wrap > a": "addEmoji",
            "click .save-btn": "save",
            "click .switch-btn": "switchClick",
            "input textarea": "updateCountStatus"
        },
        initialize: function() {
            this.render()
        },
        render: function() {
            var e = this;
            this.$el.html(this.template({})),
            i.ajax({
                url: l.query,
                data: {
                    captcha: window.captcha_key
                },
                dataType: "json"
            }).done(function(t) {
                t && 0 == t.code && e.updateSwitchUI(t.data.autoFlag, t.data.content)
            }
            ).fail(function() {}
            )
        },
        switchClick: function() {
            var e = this
              , t = this.$el.find(".switch-btn");
            t.hasClass("on") ? n.confirm.show("", s, function() {
                e["switch"](!1)
            }
            ) : this["switch"](!0)
        },
        requestSwitch: function(e) {
            return i.ajax({
                type: "post",
                url: l.validate + "?captcha=" + window.captcha_key + "&autoFlag=" + e,
                dataType: "json"
            })
        },
        updateSwitchUI: function(e, t) {
            var n = this.$el.find(".status-text")
              , i = this.$el.find(".switch-btn")
              , r = this.$el.find(".content-on")
              , o = this.$el.find(".content-off")
              , s = this.$el.find(".text-area");
            e ? (n.html("已开启"),
            i.addClass("on"),
            r.show(),
            o.hide(),
            s.val(t.replace(/\[br\]/g, "\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">") || ""),
            this.updateCountStatus()) : (n.html("未开启"),
            i.removeClass("on"),
            o.show(),
            r.hide())
        },
        "switch": function(e) {
            var t = this
              , n = this.$el.find(".switch-btn");
            this.requestSwitch(e).done(function(i) {
                i && 0 == i.code ? t.updateSwitchUI(e, "") : (new MessageBox).show(n, r[i.code] || "操作失败", 2e3, "error")
            }
            ).fail(function() {}
            )
        },
        updateCountStatus: function() {
            var e = this.$el.find(".text-area")
              , t = this.$el.find(".text-num")
              , n = this.$el.find(".save-btn")
              , i = e.val().trim();
            t.text(i.length),
            i.length > o ? t.addClass("over") : t.removeClass("over"),
            i.length > o || 0 === i.length ? n.addClass("disabled") : n.removeClass("disabled")
        },
        openEmoji: function(e) {
            this.$el.find(".emoji-wrap").toggleClass("open"),
            e.stopPropagation()
        },
        addEmoji: function(e) {
            var t = this.$el.find(".text-area");
            this.insertAtCursor(t.get(0), i(e.target).text()),
            this.updateCountStatus()
        },
        save: function() {
            var e = this.$el.find(".save-btn")
              , t = this.$el.find(".text-area");
            if (!e.hasClass("disabled")) {
                var n = t.val().trim().replace(/\n/g, "[br]").replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
                i.ajax({
                    type: "post",
                    url: l.save,
                    dataType: "json",
                    data: {
                        captcha: window.captcha_key,
                        content: n
                    }
                }).done(function(t) {
                    t && 0 == t.code ? (new MessageBox).show(e, "保存成功") : (new MessageBox).show(e, r[t.code] || "操作失败", 2e3, "error")
                }
                )
            }
        },
        insertAtCursor: function(e, t) {
            if (document.selection)
                e.focus(),
                sel = document.selection.createRange(),
                sel.text = t,
                sel.select();
            else if (e.selectionStart || "0" == e.selectionStart) {
                var n = e.selectionStart
                  , i = e.selectionEnd
                  , r = e.scrollTop;
                e.value = e.value.substring(0, n) + t + e.value.substring(i, e.value.length),
                r > 0 && (e.scrollTop = r),
                e.focus(),
                e.selectionStart = n + t.length,
                e.selectionEnd = n + t.length
            } else
                e.value += t,
                e.focus()
        }
    });
    return i("body").on("click", function() {
        i(".emoji-wrap").removeClass("open")
    }
    ),
    function() {
        return new c
    }
}
),
define("modules/love", ["modules/base", "backbone", "underscore", "utils/loading", "utils/nodata", "views/love"], function(require, exports, module) {
    var e = require("modules/base")
      , t = require("views/love")
      , n = e.Collection.extend({
        url: "/api/notify/query.praiseme.list.do"
    })
      , i = e.View.extend({
        template: t
    });
    return function() {
        return new i(new n)
    }
}
),
define("modules/menu", ["jquery", "underscore", "backbone", "views/menu"], function(require, exports, module) {
    function e(e) {
        var i = t("#message_num_total")
          , r = 0;
        n.each(e, function(e) {
            var n = t("#" + e.key);
            if (0 !== n.length) {
                var i = e.active ? 0 : Number(n.html());
                r += i,
                0 == i ? n.html(i).hide() : n.html(i).show()
            }
        }
        ),
        r = r > 99 ? 99 : r,
        0 == r ? i.html(r).hide() : i.html(r).show()
    }
    var t = require("jquery")
      , n = require("underscore")
      , i = require("backbone")
      , r = require("views/menu")
      , o = i.Model.extend({})
      , s = i.Collection.extend({
        model: o,
        url: "/api/notify/query.notify.count.do",
        parse: function(e) {
            if (e.code == -101 && (location.href = "https://account.bilibili.com/login?gourl=" + encodeURIComponent(location.href)),
            0 != e.code)
                return {};
            var t = e.data
              , n = this;
            return t && n.each(function(e) {
                e.set("num", e.get("active") ? 0 : t[e.get("key")])
            }
            ),
            n.toJSON()
        }
    })
      , a = i.View.extend({
        el: "#message_center_box",
        template: r,
        initialize: function(e) {
            this.Collection = e,
            this.render()
        },
        render: function() {
            this.$el.html(this.template(this.Collection.toJSON())),
            t("#message_right").css({
                minHeight: t(window).innerHeight() - 56
            })
        }
    })
      , l = i.View.extend({
        el: "#message_pagination_lists",
        template: r,
        initialize: function(e) {
            this.Collection = e,
            this.Collection.bind("sync", this.render, this),
            this.Collection.fetch({
                data: {
                    captcha: window.captcha_key,
                    ts: (new Date).getTime()
                }
            })
        },
        render: function() {
            var n = this
              , i = this.Collection.toJSON();
            n.$el.html(t(this.template(i)).find("#message_pagination_lists").html()),
            setTimeout(function() {
                e(i)
            }
            , 500)
        }
    });
    return function(module) {
        var e = new s;
        e.add([{
            name: "回复我的",
            key: "reply_me",
            icon: "icons-reply",
            link: "#reply",
            active: "reply" == module,
            num: 0
        }, {
            name: "@&nbsp;我的&nbsp;&nbsp;",
            key: "at_me",
            icon: "icons-at",
            link: "#at",
            active: "at" == module,
            num: 0
        }, {
            name: "收到的赞",
            key: "praise_me",
            icon: "icons-love",
            link: "#love",
            active: "love" == module,
            num: 0
        }, {
            name: "系统通知",
            key: "notify_me",
            icon: "icons-system",
            link: "#system",
            active: "system" == module,
            num: 0
        }, {
            name: "我的私信",
            key: "chat_me",
            icon: "icons-whisper",
            link: "#whisper",
            active: "whisper" == module,
            num: 0
        }, {
            name: "消息设置",
            key: "config_me",
            icon: "icons-config",
            link: "#config",
            active: "config" == module
        }]),
        new a(e),
        new l(e)
    }
}
),
define("modules/reply", ["modules/base", "backbone", "underscore", "utils/loading", "utils/nodata", "views/reply"], function(require, exports, module) {
    var e = require("modules/base")
      , t = require("views/reply")
      , n = e.Collection.extend({
        url: "/api/notify/query.replyme.list.do"
    })
      , i = e.View.extend({
        template: t
    });
    return function() {
        return new i(new n)
    }
}
),
define("modules/system", ["modules/base", "backbone", "underscore", "utils/loading", "utils/nodata", "views/system"], function(require, exports, module) {
    var e = require("modules/base")
      , t = require("views/system")
      , n = e.Collection.extend({
        url: "/api/notify/query.sysnotify.list.do"
    })
      , i = e.View.extend({
        template: t
    });
    return function() {
        return new i(new n)
    }
}
),
define("modules/whisper", ["backbone", "underscore", "jquery", "whisper/chat", "utils/request", "whisper/base", "views/chat", "whisper/room", "utils/getuser", "utils/store", "whisper/bubble", "utils/popup", "views/room", "views/report", "artDialog", "views/whisper", "whisper/websocket"], function(require, exports, module) {
    var e, t, n = require("backbone"), i = require("jquery"), r = require("underscore"), o = require("whisper/chat"), s = require("whisper/room"), a = require("utils/popup"), l = require("views/whisper");
    window.WebSocket ? t = require("whisper/websocket") : a.alert.show("提示", "少年哟～你的浏览器太老了辣～赶快去换个chrome吧～");
    var c = n.View.extend({
        el: ".message-main-lists",
        template: l,
        events: {},
        initialize: function(e) {
            this.rid = e.rid,
            this.mid = e.mid,
            i(window).scrollTop(0),
            this.render()
        },
        render: function() {
            this.$el.append(this.template({})),
            i(".chat_history_list, .contact_container").css({
                height: i(window).innerHeight() - 150
            }),
            this.chats = new o.ChatView(new o.ChatModel,this.rid),
            this.chats.on("init", function() {
                (this.rid || this.mid) && this.loadChatRoom({
                    rid: this.rid,
                    mid: this.mid
                })
            }
            , this)
        },
        clickTab: function(e) {
            i(".chat_tab").removeClass("active"),
            i(e.currentTarget).addClass("active"),
            i(".chat_history").hasClass("active") ? (i(".chat_history_list").show(),
            i(".contact_container").hide()) : (i(".chat_history_list").hide(),
            i(".contact_container").show())
        },
        collapse: function(e) {
            i(e.currentTarget).toggleClass("collapse")
        },
        scrollContact: function() {
            return this.atten.hasClass("collapse") ? this.black.hasClass("collapse") ? void 0 : void this.black.scrollLoad() : void this.atten.scrollLoad()
        },
        loadChatRoom: function(e) {
            var t = this;
            t.room && t.room.removeRoom(),
            t.room = new s.RoomView(new s.RoomModel,e),
            t.room.on("init", function(e) {
                i(".chat_history").click(),
                i("a.rname_card").removeClass("active");
                var n = i("a.rname_card[data-rid=" + e + "]");
                if (0 === n.length) {
                    var r = t.room.Model.toJSON();
                    r.msg_count = 0,
                    n = t.chats.addChat(r)
                }
                n.addClass("active"),
                n.children(".msg_num").hide(),
                n.children(".last_msg").html(""),
                t.chats.rid = e
            }
            , this)
        },
        notify: function(e) {
            e.message_chat ? (this.room && this.room.notify(e.message_chat),
            this.chats.notify(e.message_chat)) : e.message_write && this.room && this.room.inputing(e.message_write)
        }
    });
    return i("body").on("click", function() {
        i(".chat_opts_menu").hide(),
        i(".emotion_list").hide(),
        i("#emotion").removeClass("open")
    }
    ),
    function(n) {
        return e = new c(n || {}),
        t && t(r.bind(e.notify, e)),
        e
    }
}
),
define("views/at", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            _.each(obj, function(e) {
                __p += ' \n    <li class="message-main-list">\n        <img class="message-source-logo" src="' + (null  == (__t = _.trimHttp(e.source.logo)) ? "" : __t) + '" alt="' + (null  == (__t = e.source.name) ? "" : __t) + '" title="' + (null  == (__t = e.source.name) ? "" : __t) + '">\n        <div class="message-main-left">\n            <a target="_blank" class="medium-pic round" href="' + (null  == (__t = _.trimHttp(e.publisher.link)) ? "" : __t) + '" title="' + (null  == (__t = e.publisher.name) ? "" : __t) + '">\n                <img src="' + (null  == (__t = _.trimHttp(e.publisher.face)) ? "" : __t) + '" alt="' + (null  == (__t = e.publisher.name) ? "" : __t) + '">\n            </a>\n        </div>\n        <div class="message-main-right">\n            <a class="message-username" href="' + (null  == (__t = _.trimHttp(e.publisher.link)) ? "" : __t) + '" title="' + (null  == (__t = e.publisher.name) ? "" : __t) + '">\n                ' + (null  == (__t = e.publisher.name) ? "" : __t) + '\n            </a>\n            <span class="message-source-time">\n                ' + (null  == (__t = e.time_at) ? "" : __t) + '\n            </span>\n            <div class="message-content-title">\n                ' + (null  == (__t = e.content.parseTagA()) ? "" : __t) + '\n            </div>\n            <div class="message-content-wrapper">\n                <div class="message-content">\n                    ' + (null  == (__t = e.title.parseTagA()) ? "" : __t) + "\n                </div>\n                ",
                e.ext_info && (__p += ' \n                    <a class="message-content-community" href="' + (null  == (__t = _.trimHttp(e.ext_info.from_app.link)) ? "" : __t) + '">\n                        ' + (null  == (__t = e.ext_info.from_app.name) ? "" : __t) + "\n                    </a>\n                "),
                __p += "\n            </div>\n        </div>\n    </li>\n"
            }
            ),
            __p += "\n";
        return __p
    }
}
),
define("views/bubble", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            __p += "<div ",
            __p += 1 == data.is_me ? 'class="my_msg"' : 'class="other_msg"',
            __p += ' data-ts="' + (null  == (__t = data.send_time) ? "" : __t) + '" data-cursor="' + (null  == (__t = data.cursor) ? "" : __t) + '">\n
            
	            <div class="chat_msg_time">\n        ' + (null  == (__t = new Date(Number(data.send_time)).format("hh:mm:ss yyyy-MM-dd")) ? "" : __t) + '\n    </div>\n    
	            
	            <div class="chat_msg">\n        <a href="//space.bilibili.com/' + (null  == (__t = data.mid) ? "" : __t) + '" target="_blank">
	            <img src="' + (null  == (__t = _.trimHttp(data.avatar_url)) ? "" : __t) + '"></a>\n        <i class="chat_bubble_arrow"></i>\n        
	            <div class="chat_bubble">' + (null  == (__t = data.message.replace(/\[br\]/g, "<br>")) ? "" : __t) + "</div>\n    </div>\n
            </div>";
        return __p
    }
}
),
define("views/chat", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            __p += '<a class="rname_card" data-rid="' + (null  == (__t = data.rid) ? "" : __t) + '" href="#whisper/rid' + (null  == (__t = data.rid) ? "" : __t) + '">\n    <img src="' + (null  == (__t = _.trimHttp(data.avatar_url)) ? "" : __t) + '">\n    <div class="name">' + (null  == (__t = data.room_name) ? "" : __t) + '</div>\n    <div class="last_msg">' + (null  == (__t = data.last_msg) ? "" : __t) + '</div>\n    <div class="msg_num"',
            0 == data.msg_count && (__p += ' style="display: none"'),
            __p += ">" + (null  == (__t = data.msg_count) ? "" : __t) + '</div>\n    <i class="chat_close"></i>\n</a>';
        return __p
    }
}
),
define("views/config", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with (obj)
            __p += '<div class="config-page clearfix">\n  <div class="config-side">\n    <div class="open-status">\n      <div class="status-wrap clearfix">\n        <i class="icon icon-msg left"></i>\n        <span class="left">私信自动回复</span>\n        <span class="right status-text">未开启</span>\n      </div>\n    </div>\n  </div>\n  <div class="config-content">\n    <div class="switch">\n      <span>私信自动回复</span>\n      <span class="switch-btn right"><span class="ball"></span></span>\n    </div>\n    <div class="info content-off">开启自动回复后，功能将对所有用户生效。</div>\n    <div class="content-on">\n      <div class="info">当用户给你发私信时，会收到以下自动回复内容。三小时内用户只会收到1次自动回复私信。</div>\n      <div class="input-wrap">\n        <textarea class="text-area" placeholder="输入你想要发送的自动回复内容~"></textarea>\n        <div class="num-count"><span class="text-num">0</span>/300</div>\n      </div>\n      <div class="clearfix save-wrap">\n        <div class="left emoji-trigger">\n          <div class="btn emoji-btn">(/ ω \\)颜表情</div>\n          <div class="emoji-wrap clearfix">\n            <div class="hint">颜文字</div>\n            <div class="emoji-text-wrap clearfix">\n              <a>(⌒▽⌒)</a><a>（￣▽￣）</a><a>(=・ω・=)</a><a>(｀・ω・´)</a><a>(〜￣△￣)〜</a><a>(･∀･)</a><a>(°∀°)ﾉ</a><a>(￣3￣)</a><a>╮(￣▽￣)╭</a><a>(´_ゝ｀)</a><a>←_←</a><a>→_→</a><a>(&lt;_&lt;)</a><a>(&gt;_&gt;)</a><a>(;¬_¬)</a><a>("▔□▔)/</a><a>(ﾟДﾟ≡ﾟдﾟ)!?</a><a>Σ(ﾟдﾟ;)</a><a>Σ(￣□￣||)</a><a>(´；ω；`)</a><a>（/TДT)/</a><a>(^・ω・^ )</a><a>(｡･ω･｡)</a><a>(●￣(ｴ)￣●)</a><a>ε=ε=(ノ≧∇≦)ノ</a><a>(´･_･`)</a><a>(-_-#)</a><a>（￣へ￣）</a><a>(￣ε(#￣)Σ</a><a>ヽ(`Д´)ﾉ</a><a>(╯°口°)╯(┴—┴</a><a>（#-_-)┯━┯</a><a>_(:3」∠)_</a><a>(笑)</a><a>(汗)</a><a>(泣)</a><a>(苦笑)</a>\n            </div>\n          </div>\n        </div>\n        <div class="right btn save-btn disabled">保存</div>\n      </div>\n    </div>\n  </div>\n</div>';
        return __p
    }
}
),
define("views/inputing", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with (obj)
            __p += '<div class="inputing_msg">\n    <div class="chat_msg">\n        <img src="' + (null  == (__t = _.trimHttp(data.avatar)) ? "" : __t) + '">\n        <i class="chat_bubble_arrow"></i>\n        <div class="chat_bubble">\n            <div class="inputing"></div>\n        </div>\n    </div>\n</div>';
        return __p
    }
}
),
define("views/love", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            _.each(obj, function(e) {
                __p += ' \n    <li class="message-main-list" style="padding: 24px 0;">\n        <img class="message-source-logo" src="' + (null  == (__t = _.trimHttp(e.source.logo)) ? "" : __t) + '" alt="' + (null  == (__t = e.source.name) ? "" : __t) + '" title="' + (null  == (__t = e.source.name) ? "" : __t) + '">\n        <div class="message-main-left">\n            <i class="icons2 icons-essence" title="赞"></i>\n        </div>\n        <div class="message-main-right">\n            <div class="message-love">\n                <a target="_blank" class="message-username" href="' + (null  == (__t = _.trimHttp(e.publisher.link)) ? "" : __t) + '" title="' + (null  == (__t = e.publisher.name) ? "" : __t) + '">\n                    ' + (null  == (__t = e.publisher.name) ? "" : __t) + '\n                </a>\n                <span class="message-context">\n                    ' + (null  == (__t = e.title.parseTagA()) ? "" : __t) + '\n                </span>\n                <span class="message-source-time">\n                    ' + (null  == (__t = e.time_at) ? "" : __t) + "\n                </span>\n            </div>\n        </div>\n    </li>\n"
            }
            );
        return __p
    }
}
),
define("views/menu", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            __p += '<div id="message_left">\n    <div id="message_head">\n        <i class="icon_plane"></i>\n        消息中心\n    </div>\n    <ul id="message_pagination_lists">\n    ',
            _.each(obj, function(e) {
                __p += ' \n        <li class="message_pagination_list ',
                e.active && (__p += "active"),
                __p += " ",
                "config_me" == e.key && (__p += "config-me"),
                __p += '">\n            <a href="' + (null  == (__t = _.trimHttp(e.link)) ? "" : __t) + '">\n                ',
                __p += "config_me" == e.key ? '\n                <span class="message-type"><span class="new-flag"></span><i class="icon-config"></i>' + (null  == (__t = e.name) ? "" : __t) + "</span>\n                " : '\n                <span class="message-type">●&nbsp;&nbsp;' + (null  == (__t = e.name) ? "" : __t) + "</span>\n                ",
                __p += "\n                ",
                e.num > 0 && (__p += '\n                    <span class="button-round inner_notify_reply">\n                        ' + (null  == (__t = e.num) ? "" : __t) + "\n                    </span>\n                "),
                __p += "\n            </a>\n        </li>\n    "
            }
            ),
            __p += '\n    </ul>\n</div>\n<div id="message_right">\n    <div class="message-main">\n    <div class="message-title group-title-3">' + (null  == (__t = _.find(obj, function(e) {
                return e.active
            }
            ).name) ? "" : __t) + '</div>\n    <ul class="message-main-lists"></ul>       \n</div>';
        return __p
    }
}
),
define("views/reply", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            _.each(obj, function(e) {
                __p += ' \n    <li class="message-main-list">\n        <img class="message-source-logo" src="' + (null  == (__t = _.trimHttp(e.source.logo)) ? "" : __t) + '" alt="' + (null  == (__t = e.source.name) ? "" : __t) + '" title="' + (null  == (__t = e.source.name) ? "" : __t) + '">\n        <div class="message-main-left">\n            <a target="_blank" class="medium-pic round" href="' + (null  == (__t = _.trimHttp(e.publisher.link)) ? "" : __t) + '" title="' + (null  == (__t = e.publisher.name) ? "" : __t) + '">\n                <img src="' + (null  == (__t = _.trimHttp(e.publisher.face)) ? "" : __t) + '" alt="' + (null  == (__t = e.publisher.name) ? "" : __t) + '">\n            </a>\n        </div>\n        <div class="message-main-right">\n            <a class="message-username" href="' + (null  == (__t = _.trimHttp(e.publisher.link)) ? "" : __t) + '" title="' + (null  == (__t = e.publisher.name) ? "" : __t) + '">\n                ' + (null  == (__t = e.publisher.name) ? "" : __t) + '\n            </a>\n            <span class="message-source-time">\n                ' + (null  == (__t = e.time_at) ? "" : __t) + '\n            </span>\n            <div class="message-content-title">\n                ' + (null  == (__t = e.content.parseTagA()) ? "" : __t) + '\n            </div>\n            <div class="message-content-wrapper">\n                <div class="message-content">\n                    ' + (null  == (__t = e.title.parseTagA()) ? "" : __t) + "\n                </div>\n                ",
                e.ext_info && (__p += ' \n                    <a class="message-content-community" href="' + (null  == (__t = _.trimHttp(e.ext_info.from_app.link)) ? "" : __t) + '">\n                        ' + (null  == (__t = e.ext_info.from_app.name) ? "" : __t) + "\n                    </a>\n                "),
                __p += "\n            </div>\n        </div>\n    </li>\n"
            }
            ),
            __p += "\n";
        return __p
    }
}
),
define("views/report", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            __p += '<h5>请选择您举报<strong style="font-weight:bold;">' + (null  == (__t = uname) ? "" : __t) + '</strong>的理由</h5>\n<div style="color: #aaa; text-align: left;font-size: 12px;margin-top:12px;margin-bottom:30px;"><i class="icon_info"></i>您与被举报人最新对话的10条私信将作为证据一并提交</div>\n<div style="margin-bottom: 20px;">\n    ',
            _.each(typelist, function(e, t) {
                __p += " \n        <label ",
                t != typelist.length - 1 && (__p += 'style="margin-right: 40px;"'),
                __p += '>\n            <input type="radio" value="' + (null  == (__t = e.type) ? "" : __t) + '" name="type" ',
                0 == t && (__p += 'checked="checked"'),
                __p += ">\n            " + (null  == (__t = e.name) ? "" : __t) + "\n        </label>\n    "
            }
            ),
            __p += "\n</div>";
        return __p
    }
}
),
define("views/room", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            __p += '<div class="chat_room_title">\n    ' + (null  == (__t = room_name) ? "" : __t) + '\n    <i class="chat_opts"></i>\n    <div class="chat_opts_menu">\n        ',
            __p += 20 == status || 40 == status ? '\n            <a class="J_cancel_black" href="javascript: void(0);">取消拉黑</a>\n        ' : '\n            <a class="J_black" href="javascript: void(0);">拉黑</a>\n        ',
            __p += '\n        <a class="J_report" href="javascript: void(0);">举报</a>\n    </div>\n</div>\n',
            20 != status && 40 != status || (__p += '\n    <div class="chat_room_black">(&gt;﹏&lt; )您已屏蔽来自该用户的消息</div>\n'),
            __p += '\n<div class="chat_room_content"></div>\n<div class="chat_msg_sender">\n    ',
            30 != status && 40 != status || (__p += '\n        <div class="chat_room_disable"></div>\n    '),
            __p += '\n    <textarea id="chat_msg" placeholder="回复一下吧～" maxlength="800"></textarea>\n    <div id="emotion">( ・ω・ )颜文字</div>\n    <button id="send">发送</button>\n    <div class="emotion_list">\n        <span>(⌒▽⌒)</span><span>（￣▽￣）</span><span>(=・ω・=)</span><span>(｀・ω・´)</span><span>(〜￣△￣)〜</span><span>(･∀･)</span><span>(°∀°)ﾉ</span><span>(￣3￣)</span><span>╮(￣▽￣)╭</span><span>( ´_ゝ｀)</span><span>←_←</span><span>→_→</span><span>(&lt;_&lt;)</span><span>(&gt;_&gt;)</span><span>(;¬_¬)</span><span>("▔□▔)/</span><span>(ﾟДﾟ≡ﾟдﾟ)!?</span><span>Σ(ﾟдﾟ;)</span><span>Σ( ￣□￣||)</span><span>(´；ω；`)</span><span>（/TДT)/</span><span>(^・ω・^ )</span><span>(｡･ω･｡)</span><span>(●￣(ｴ)￣●)</span><span>ε=ε=(ノ≧∇≦)ノ</span><span>(´･_･`)</span><span>(-_-#)</span><span>（￣へ￣）</span><span>(￣ε(#￣) Σ</span><span>ヽ(`Д´)ﾉ</span><span>(╯°口°)╯(┴—┴</span><span>（#-_-)┯━┯</span><span>_(:3」∠)_</span><span>(笑)</span><span>(汗)</span><span>(泣)</span><span>(苦笑)</span>\n    </div>\n</div>';
        return __p
    }
}
),
define("views/system", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            _.each(obj, function(e) {
                __p += " \n    ";
                var t = e.content && "" != e.content;
                __p += "\n    ",
                __p += t ? '\n        <li class="message-main-list">\n    ' : ' \n        <li class="message-main-list no-content">\n    ',
                __p += '\n        <div class="message-main-right system">\n            <img class="message-source-logo" src="' + (null  == (__t = _.trimHttp(e.source.logo)) ? "" : __t) + '" alt="' + (null  == (__t = e.source.name) ? "" : __t) + '" title="' + (null  == (__t = e.source.name) ? "" : __t) + '">\n            <div class="message-main-head">\n                ' + (null  == (__t = e.title.parseTagA()) ? "" : __t) + '\n                <span class="message-source-time">\n                    ' + (null  == (__t = e.time_at) ? "" : __t) + "\n                </span>\n            </div>\n            ",
                t && (__p += ' \n                <div class="message-main-bottom">\n                    ' + (null  == (__t = e.content.parseTagA()) ? "" : __t) + "\n                </div>\n            "),
                __p += "\n        </div>\n    </li>\n"
            }
            ),
            __p += "\n";
        return __p
    }
}
),
define("views/user", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        function print() {
            __p += __j.call(arguments, "")
        }
        obj || (obj = {});
        var __t, __p = "", __j = Array.prototype.join;
        with (obj)
            __p += '<a class="uname_card" data-mid="' + (null  == (__t = data.mid) ? "" : __t) + '" ',
            data.group && (__p += 'data-group="' + (null  == (__t = data.group) ? "" : __t) + '"'),
            __p += ' href="#whisper/mid' + (null  == (__t = data.mid) ? "" : __t) + '">\n    <img src="' + (null  == (__t = _.trimHttp(data.avatar_url)) ? "" : __t) + '">\n    <div class="name">' + (null  == (__t = data.uname) ? "" : __t) + "</div>\n</a>";
        return __p
    }
}
),
define("views/whisper", ["underscore"], function(require, exports, module) {
    var _ = require("underscore");
    return function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with (obj)
            __p += '<div class="whisper">\n    <div class="whisper_left">\n        <div class="chat_tab_wrapper">\n            <div class="chat_tab" style="color: #00a1d6;">近期会话</div>\n        </div>\n        <!-- <div class="chat_tab_wrapper">\n            <div class="chat_tab chat_history active">近期会话</div>\n            <div class="chat_tab chat_contact">联系人</div>\n        </div> -->\n        <div class="chat_history_list"></div>\n        <!-- <div class="contact_container">\n            <div class="atten_list collapse_list">\n                <h4><i></i>我关注的人<em>（）</em></h4>\n            </div>\n            <div class="black_list collapse_list collapse">\n                <h4><i></i>黑名单<em>（）</em></h4>\n            </div>\n        </div> -->\n    </div>\n    <div class="whisper_right">\n        <div class="placeholder"></div>\n    </div>\n</div>';
        return __p
    }
}
),
define("utils/errorcode", [], function(require) {
    var e = {
        0: "接口正常",
        "-1": "ppKey未找到",
        "-2": "accessKey错误",
        "-3": "签名错误",
        "-4": "数据不一致",
        "-101": "帐号未登陆",
        "-102": "帐号被封停",
        "-103": "帐号未激活",
        "-104": "账号不存在",
        "-107": "帐号非正式会员或在适应期",
        "-108": "应用沒有存取相应功能的权限",
        "-400": "请求有误",
        "-403": "系统权限不足",
        "-404": "文档不存在",
        "-405": "请求类型不正确Method Not Allowed!",
        "-406": "无法生成请求头中的指定资源类型",
        "-415": "不支持的媒体和数据类型Unsupported Media Type!",
        "-500": "服务器内部错误",
        "-503": "调用速度过快",
        "-600": "API请求验证失败",
        "-601": "请求参数存在问题",
        "-602": "请求附带的cookie信息存在问题",
        "-700": "消息来源不存在",
        "-701": "消息来源extInfo没权限",
        "-710": "消息业务码不存在",
        "-800": "检测到用户不存在",
        "-801": "你已被管理员封禁,无法发送电波",
        "-802": "当前节操值过低,无法发送电波",
        "-803": "只有正式会员才能开启自动回复功能哦",
        "-805": "你已被对方屏蔽,无法发送电波 ",
        "-806": "电波发送失败",
        "-807": "房间不存在",
        "-808": "获取房间信息失败",
        "-809": "你无法向该房间发送电波",
        "-811": "获取用户信息失败",
        "-900": "无法将该用户拉黑",
        "-910": "举报次数超过限制",
        "-901": "无法将该用户从黑名单移除"
    };
    return e
}
),
define("utils/getuser", ["jquery", "backbone", "underscore", "./popup", "artDialog"], function(require) {
    var e = require("jquery")
      , t = (require("backbone"),
    require("./popup"),
    function(t, n) {
        e.ajax({
            url: "https://account.bilibili.com/api/member/getInfoByMid",
            dataType: "jsonp",
            data: {
                type: "jsonp",
                mid: t
            },
            success: function(e) {
                if (0 == e.code) {
                    var i = e.cards[t];
                    n && n(i)
                }
            }
        })
    }
    );
    return t
}
),
define("utils/loading", ["jquery"], function(require, exports, module) {
    var e = require("jquery");
    return function() {
        return e('<li class="message-main-list"><span class="loading"></span></li>').appendTo(".message-main-lists")
    }
}
),
define("utils/nodata", ["jquery"], function(require, exports, module) {
    var e = require("jquery");
    return function() {
        return e(".message-main-lists").html('<li class="message-main-list"><div class="no-data"></div></li>')
    }
}
),
define("utils/popup", ["artDialog"], function(require) {
    var e = require("artDialog");
    return function(e) {
        e.okValue = "确定",
        e.cancelValue = "取消",
        e.title = "消息",
        e.lock = !0,
        e.esc = !1,
        e.focus = !1
    }
    (e.dialog.defaults),
    {
        submit: {
            show: function(t, n, i, r, o, s) {
                e.dialog({
                    title: t,
                    width: 390,
                    cancel: function() {
                        if (r)
                            return r()
                    },
                    content: n,
                    ok: function() {
                        if (i)
                            return i()
                    },
                    okValue: o ? o : "提交",
                    cancelValue: s ? s : "取消"
                })
            }
        },
        alert: {
            show: function(t, n, i, r) {
                e.dialog({
                    title: t,
                    width: 390,
                    cancel: !1,
                    content: n,
                    ok: function() {
                        if (i)
                            return i()
                    },
                    okValue: r ? r : "确定"
                })
            }
        },
        confirm: {
            show: function(t, n, i, r, o, s) {
                e.dialog({
                    title: t,
                    width: 390,
                    cancel: function() {
                        if (r)
                            return r()
                    },
                    content: n,
                    ok: function() {
                        if (i)
                            return i()
                    },
                    okValue: o ? o : "确定",
                    cancelValue: s ? s : "取消"
                })
            }
        }
    }
}
),
define("utils/request", ["jquery", "backbone", "underscore", "./popup", "artDialog"], function(require) {
    var e = require("jquery")
      , t = (require("backbone"),
    require("./popup"))
      , n = e.ajax
      , i = {};
    return i.ajax = function(i) {
        var r = {
            error: function(e, n, i) {
                0 !== e.readyState && t.alert.show("提示", "系统错误，请稍后再试")
            },
            success: function(e, t) {}
        };
        i.error && (r.error = i.error),
        i.success && (r.success = i.success);
        var o = {
            captcha: window.captcha_key
        };
        i.data = i.data ? e.extend(i.data, o) : o;
        var s = e.extend(i, {
            dataType: "json",
            error: function(e, t, n) {
                r.error(e, t, n)
            },
            success: function(n, i) {
                var o = "string" == typeof n ? e.parseJSON(n) : n;
                return o && void 0 !== o.code ? 0 != o.code ? void t.alert.show("提示", o.message) : void r.success(o.data, i) : void t.alert.show("提示", "系统错误，请稍后再试")
            }
        });
        n(s)
    }
    ,
    i
}
),
define("utils/store", [], function(require) {
    var e = window.sessionStorage
      , t = {
        setStore: function(t, n) {
            if (e) {
                var i = JSON.parse(e.getItem("biliPM") || "{}");
                if (0 === n.length)
                    return;
                i[t] = n,
                e.setItem("biliPM", JSON.stringify(i))
            }
        },
        getStore: function(t) {
            return e && e.getItem("biliPM") ? JSON.parse(e.getItem("biliPM"))[t] || [] : []
        }
    };
    return t
}
),
define("whisper/base", ["backbone", "underscore", "jquery"], function(require, exports, module) {
    var e = require("backbone")
      , t = require("underscore")
      , n = {};
    return n.Model = e.Model.extend({
        parse: function(e) {
            return e.code == -101 && (location.href = "https://account.bilibili.com/login?gourl=" + encodeURIComponent(location.href)),
            0 != e.code ? {} : e.data instanceof Array ? {
                result: e.data
            } : e.data
        }
    }),
    n.ListView = e.View.extend({
        page_no: 0,
        initialize: function(e) {
            this.bindModel(e)
        },
        bindModel: function(e) {
            this.Model = e,
            this.Model.bind("sync", this.render, this),
            this.loadData()
        },
        loading: function() {
            this.$loading = $('<span class="loading"></span>'),
            this.$el.append(this.$loading)
        },
        removeLoading: function() {
            this.$loading && (this.$loading.remove(),
            this.$loading = null )
        },
        render: function() {
            this.removeLoading(),
            this.$el.append(this.renderData())
        },
        renderData: function() {
            var e = this
              , n = "";
            return t.each(e.Model.toJSON().result, function(t) {
                n += e.template({
                    data: t
                })
            }
            ),
            n
        },
        loadData: function() {
            var e = this;
            e.loading(),
            e.page_no++,
            e.Model.fetch({
                data: {
                    captcha: window.captcha_key,
                    page_no: e.page_no
                }
            })
        },
        scrollLoad: function() {
            var e = this.$el;
            this.$loading || 0 === this.Model.get("result").length || e.scrollTop() >= e[0].scrollHeight - e.height() && this.loadData()
        }
    }),
    n
}
),
define("whisper/bubble", ["jquery", "underscore", "utils/getuser", "backbone", "utils/popup", "utils/store", "whisper/base", "views/inputing", "views/bubble"], function(require, exports, module) {
    var e = require("jquery")
      , t = require("underscore")
      , n = require("utils/getuser")
      , i = require("utils/store")
      , r = require("whisper/base")
      , o = require("views/inputing")
      , s = require("views/bubble")
      , a = {};
    return a.BubbleModel = r.Model.extend({
        url: "/api/msg/query.msg.list.do"
    }),
    a.BubbleView = r.ListView.extend({
        el: ".chat_room_content",
        template: s,
        max: 200,
        events: {
            "click .more_chat_msg": "loadHistory"
        },
        initialize: function(e, t) {
            var n = this;
            n.$el.empty(),
            n.rid = t,
            n.Model = e,
            n.Model.fetch({
                async: !1,
                data: {
                    captcha: window.captcha_key,
                    data_type: 1,
                    rid: n.rid
                },
                success: function(e, t, r) {
                    0 == t.code && (n.renderUp(),
                    n._scollBottom(),
                    i.setStore(n.rid, t.data))
                }
            })
        },
        loading: function() {
            this.$loading = e('<span class="loading_msg"></span>'),
            this.$el.prepend(this.$loading)
        },
        renderDown: function() {
            e(".inputing_msg").remove();
            var t = this
              , n = e(t.renderData());
            t.$el.append(n);
            var i = n.first();
            t._adjustTimePrev(i),
            n.each(function(n, i) {
                var r = e(i);
                t._adjustBubble(r),
                t._adjustTimeNext(r)
            }
            ),
            t._scollBottom()
        },
        renderUp: function() {
            var t = this
              , n = e(t.renderData());
            t.removeLoading(),
            t.$el.prepend(n),
            n.each(function(n, i) {
                var r = e(i);
                t._adjustBubble(r),
                t._adjustTimeNext(r)
            }
            );
            var i = t.Model.get("result");
            return i && 0 == i.length ? void t.$el.prepend('<div class="no_more">没有更多消息了～</div>') : (t.$more = e('<div class="more_chat_msg"><i></i>查看以往消息</div>'),
            void t.$el.prepend(t.$more))
        },
        renderData: function() {
            var e = this
              , n = e.Model.toJSON();
            if (!n.result)
                return "";
            var i = "";
            return t.each(n.result.reverse(), function(t) {
                i += e.template({
                    data: t
                })
            }
            ),
            i
        },
        loadData: function() {
            var e = this
              , t = i.getStore(e.rid);
            t && t.length > 0 && e.Model.fetch({
                data: {
                    captcha: window.captcha_key,
                    cursor: t[0].cursor,
                    data_type: 2,
                    rid: e.rid,
                    async: !1
                },
                success: function(t, n, r) {
                    0 == n.code && (e.renderDown(),
                    i.setStore(e.rid, n.data))
                }
            })
        },
        appendBubble: function(t) {
            var n = e(this.template({
                data: t
            })).hide();
            return this.$el.append(n.fadeIn()),
            this._adjustBubble(n),
            this._adjustTimePrev(n),
            this._scollBottom(),
            n
        },
        loadHistory: function() {
            var t = this
              , n = t.Model;
            if (!t.$loading) {
                t.$more && (t.$more.remove(),
                t.$more = null ),
                t.loading(),
                t.Model.set("direction", "up");
                var i = e(t.$el.children(".other_msg, .my_msg")[0]).data("cursor");
                n.fetch({
                    data: {
                        captcha: window.captcha_key,
                        cursor: i,
                        data_type: 1,
                        rid: t.rid
                    },
                    success: function(e, n, i) {
                        0 == n.code && t.renderUp()
                    }
                })
            }
        },
        inputing: function(t) {
            var i = this;
            n(t.mid, function(t) {
                var n = e(o({
                    data: t
                }));
                i.$el.append(n),
                i._scollBottom(),
                setTimeout(function() {
                    try {
                        n.remove()
                    } catch (e) {}
                }
                , 2800)
            }
            )
        },
        _adjustBubble: function(t) {
            var n = e(".chat_bubble", t);
            12 == n.height() && (n.prev().css({
                top: 16
            }),
            n.css({
                marginTop: 6
            }))
        },
        _adjustTimePrev: function(t) {
            var n = t.prev();
            0 !== n.length && t.data("ts") - n.data("ts") < 12e4 && e(".chat_msg_time", t).hide()
        },
        _adjustTimeNext: function(t) {
            var n = t.next();
            0 !== n.length && n.data("ts") - t.data("ts") < 12e4 && e(".chat_msg_time", n).hide()
        },
        _scollBottom: function() {
            this.$el.scrollTop(this.$el[0].scrollHeight);
            var t = this.$el.children(".other_msg, .my_msg");
            t.length > this.max && e(t[0]).remove()
        }
    }),
    a
}
),
define("whisper/chat", ["jquery", "utils/request", "backbone", "utils/popup", "whisper/base", "underscore", "views/chat"], function(require, exports, module) {
    var e = require("jquery")
      , t = require("utils/request")
      , n = require("whisper/base")
      , i = require("views/chat")
      , r = {};
    return r.ChatModel = n.Model.extend({
        url: "/api/msg/query.room.list.do"
    }),
    r.ChatView = n.ListView.extend({
        el: ".chat_history_list",
        template: i,
        events: {
            scroll: "scrollLoad",
            "click .chat_close": "closeChat"
        },
        initialize: function(e, t) {
            this.rid = t,
            this.bindModel(e)
        },
        render: function() {
            this.removeLoading(),
            this.$el.append(this.renderData()),
            this.trigger("init")
        },
        closeChat: function(n) {
            var i = e(n.currentTarget);
            t.ajax({
                url: "/api/msg/disable.room.do",
                type: "POST",
                data: {
                    rid: i.parent().data("rid")
                }
            });
            var r = i.parent();
            r.fadeOut(function() {
                r.hasClass("active") && e(".whisper_right").html('<div class="placeholder"></div>'),
                r.remove(),
                location.hash = "#whisper"
            }
            )
        },
        addChat: function(t) {
            var n = e(this.template({
                data: t
            })).height(0).animate({
                height: 66
            });
            return this.$el.prepend(n),
            n
        },
        notify: function(n) {
            var i = n.rid
              , r = this;
            if (i != r.rid) {
                var o = e("a.rname_card[data-rid=" + i + "]");
                0 === o.length ? (o = r.addChat({
                    rid: i,
                    room_name: "",
                    last_msg: "",
                    msg_count: 0
                }),
                t.ajax({
                    url: "/api/msg/query.double.room.do",
                    type: "POST",
                    data: {
                        rid: i,
                        captcha: window.captcha_key
                    },
                    success: function(e) {
                        o.children(".name").html(e.room_name),
                        o.children("img").attr("src", e.avatar_url),
                        r.getLastMsg(i)
                    }
                })) : r.getLastMsg(i)
            }
        },
        getLastMsg: function(n) {
            var i = this
              , r = e("a.rname_card[data-rid=" + n + "]");
            t.ajax({
                url: "/api/msg/query.msg.list.do",
                async: !1,
                data: {
                    rid: n,
                    data_type: 1,
                    captcha: window.captcha_key
                },
                success: function(e) {
                    r.height(0);
                    var t = r.children(".msg_num")
                      , n = r.children(".last_msg")
                      , o = Number(t.html());
                    t.html(o + 1).show(),
                    n.html(e[0].message),
                    i.$el.prepend(r),
                    r.animate({
                        height: 66
                    })
                }
            })
        }
    }),
    r
}
),
define("whisper/contact", ["jquery", "whisper/base", "backbone", "underscore", "views/user"], function(require, exports, module) {
    var e = require("jquery")
      , t = require("whisper/base")
      , n = require("views/user")
      , i = {};
    return i.AttenModel = t.Model.extend({
        url: "/api/msg/query.contact.list.do"
    }),
    i.AttenView = t.ListView.extend({
        el: ".atten_list",
        template: n,
        render: function() {
            this.removeLoading();
            var t = e(this.renderData());
            this.$el.append(t),
            t.each(function(t, n) {
                var i = e(n)
                  , r = i.data("group")
                  , o = i.prev();
                return "H4" === o[0].tagName ? void i.before("<h5>" + r + "</h5>") : void (o.data("group") != r && i.before("<h5>" + r + "</h5>"))
            }
            ),
            e("em", this.$el).html("(" + this.Model.get("total_count") + ")")
        }
    }),
    i.BlackModel = t.Model.extend({
        url: "/api/msg/query.black.list.do"
    }),
    i.BlackView = t.ListView.extend({
        el: ".black_list",
        template: n,
        render: function() {
            this.removeLoading(),
            this.$el.append(this.renderData()),
            e("em", this.$el).html("(" + this.Model.get("total_count") + ")")
        }
    }),
    i
}
),
define("whisper/room", ["jquery", "underscore", "utils/request", "backbone", "utils/popup", "utils/getuser", "utils/store", "whisper/base", "whisper/bubble", "views/inputing", "views/bubble", "artDialog", "views/room", "views/report"], function(require, exports, module) {
    var e = require("jquery")
      , t = (require("underscore"),
    require("utils/request"))
      , n = require("utils/getuser")
      , i = require("utils/store")
      , r = require("whisper/base")
      , o = require("whisper/bubble")
      , s = require("utils/popup")
      , a = require("views/room")
      , l = require("views/report")
      , c = {};
    return c.RoomModel = r.Model.extend({
        url: "/api/msg/query.double.room.do"
    }),
    c.RoomView = r.ListView.extend({
        el: ".whisper_right",
        template: a,
        events: {
            "click .chat_opts": "openMenu",
            "click #emotion": "clickEmotion",
            "click #send": "send",
            "keydown #chat_msg": "keydown",
            "click .emotion_list>span": "chooseEmotion",
            "click .J_black": "black",
            "click .J_cancel_black": "cancelBlack",
            "click .J_report": "report",
            "click .resend_chat_msg": "reSend",
            "input #chat_msg": "sendInputing",
            "propertychange #chat_msg": "sendInputing"
        },
        initialize: function(e, t) {
            this.$el.html(""),
            this.loading(),
            this.rid = t.rid,
            this.mid = t.mid,
            this.Model = e,
            this.loadData(),
            this._timeout = null ,
            this._pool = 0,
            this.MAX_POOL = 10,
            this.initReport()
        },
        loadData: function() {
            var e = this;
            e.loading();
            var t = {
                captcha: window.captcha_key
            };
            e.rid ? t.rid = e.rid : t.mid = e.mid,
            e.Model.fetch({
                type: "POST",
                data: t,
                success: function(t, n, i) {
                    return 0 != n.code ? (s.alert.show("提示", n.message),
                    void (location.href = "//message.bilibili.com/#whisper")) : void e.render()
                }
            })
        },
        render: function() {
            this.removeLoading();
            var t = this.Model.toJSON()
              , n = t.rid;
            this.callback;
            this.$el.html(this.template(t)),
            this.$content = e(".chat_room_content"),
            this.$textarea = e("#chat_msg"),
            this.adjustHeight(),
            this.trigger("init", n),
            this.bubbles = new o.BubbleView(new o.BubbleModel,n)
        },
        initReport: function() {
            var e = this;
            t.ajax({
                url: "/api/report/query.type.do",
                success: function(t) {
                    e.reportData = t
                }
            })
        },
        adjustHeight: function() {
            this.$content.css({
                height: e(window).innerHeight() - (e(".chat_room_black").length > 0 ? 371 : 343)
            })
        },
        openMenu: function(t) {
            t.stopPropagation(),
            e(".chat_opts_menu").show()
        },
        clickEmotion: function(t) {
            t.stopPropagation(),
            e("#emotion").addClass("open"),
            e(".emotion_list").show()
        },
        chooseEmotion: function(t) {
            var n = this.$textarea.val() + e(t.currentTarget).html();
            n.length > 800 || this.$textarea.val(n);
        },
        keydown: function(e) {
            13 !== e.keyCode || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || (e.preventDefault(),
            this.send())
        },
        send: function() {
            var e = this;
            if ("" != e.$textarea.val()) {
                var t = e.$textarea.val();
                e.$textarea.val(""),
                n(__GetCookie("DedeUserID"), function(n) {
                    var i = e.bubbles.appendBubble({
                        mid: n.mid,
                        avatar_url: n.avatar,
                        cursor: "",
                        message: t.replace(/\n/g, "[br]").replace(/\</g, "&lt;").replace(/\>/g, "&gt;"),
                        send_time: (new Date).getTime(),
                        is_me: 1
                    });
                    e.sendData(i)
                }
                )
            }
        },
        reSend: function(t) {
            var n = e(t.currentTarget)
              , i = n.parents(".my_msg");
            n.remove(),
            this.sendData(i)
        },
        sendInputing: function() {
            var e = this;
            e.sendStatus || (e.sendStatus = setTimeout(function() {
                e.sendStatus = null 
            }
            , 3e3),
            t.ajax({
                url: "/api/msg/send.status.do",
                type: "POST",
                data: {
                    mid: __GetCookie("DedeUserID"),
                    rid: this.Model.get("rid"),
                    data_type: 1
                }
            }))
        },
        sendData: function(t) {
            var n = this.Model.get("rid");
            e.ajax({
                url: "/api/msg/send.msg.do",
                type: "POST",
                dataType: "json",
                data: {
                    rid: n,
                    msg: t.find(".chat_bubble").html().replace(/\<br\>/g, "[br]"),
                    captcha: window.captcha_key
                },
                success: function(e) {
                    if (e.code == -801 || e.code == -802 || e.code == -803)
                        return t.remove(),
                        void s.alert.show("提示", e.message);
                    if (0 != e.code || 1 != e.data.status)
                        return void t.children(".chat_msg").prepend('<i class="resend_chat_msg"></i>');
                    if (0 == e.code) {
                        var r = e.data.msg;
                        t.data("cursor", r.cursor);
                        var o = i.getStore(n);
                        o.unshift(r),
                        i.setStore(n, o)
                    }
                }
            })
        },
        black: function(n) {
            var i = this;
            t.ajax({
                url: "/api/msg/black.user.do",
                type: "POST",
                data: {
                    mid: i.Model.get("mid")
                },
                success: function(t) {
                    e(n.currentTarget).removeClass("J_black").addClass("J_cancel_black").html("取消拉黑"),
                    i.$content.before('<div class="chat_room_black">(&gt;﹏&lt; )您已屏蔽来自该用户的消息</div>'),
                    i.adjustHeight(),
                    s.alert.show("提示", "您已成功屏蔽该用户")
                }
            })
        },
        cancelBlack: function(n) {
            var i = this;
            t.ajax({
                url: "/api/msg/cancel.black.user.do",
                type: "POST",
                data: {
                    mid: i.Model.get("mid")
                },
                success: function(t) {
                    e(n.currentTarget).removeClass("J_cancel_black").addClass("J_black").html("拉黑"),
                    e(".chat_room_black").remove(),
                    i.adjustHeight(),
                    s.alert.show("提示", "您已成功取消屏蔽该用户")
                }
            })
        },
        report: function() {
            var n = this;
            s.submit.show("", l({
                uname: n.Model.get("room_name"),
                typelist: n.reportData
            }), function() {
                t.ajax({
                    url: "/api/report/send.do",
                    type: "POST",
                    data: {
                        rid: n.Model.get("rid"),
                        mid: n.Model.get("mid"),
                        report_type: e('input[name="type"]:checked').val()
                    },
                    success: function(e) {
                        s.alert.show("提示", "举报成功")
                    }
                })
            }
            , function() {}
            , "提交", "")
        },
        notify: function(e) {
            var t = this;
            e.rid == t.rid && (t._timeout && (t._pool++,
            t._pool < t.MAX_POOL ? clearTimeout(t._timeout) : t._pool = 0),
            t._timeout = setTimeout(function() {
                t.bubbles.Model.set("direction", "down"),
                t.bubbles.loadData()
            }
            , 300))
        },
        inputing: function(e) {
            e.rid == this.rid && this.bubbles.inputing(e)
        },
        removeRoom: function() {
            this.bubbles.undelegateEvents(),
            this.undelegateEvents()
        }
    }),
    c
}
),
define("whisper/websocket", [], function(require, exports, module) {
    function e(i, r) {
        function o() {
            c.send(JSON.stringify({
                ver: 1,
                op: 2,
                seq: 2,
                body: {}
            }))
        }
        function s() {
            c.send(JSON.stringify({
                ver: 1,
                op: 7,
                seq: 1,
                body: {
                    data: {}
                }
            }))
        }
        function a() {
            e(--i, 2 * r)
        }
        var l = "https:" === location.protocol ? "wss://push-msg.bilibili.com:8095/sub" : "ws://push-msg.bilibili.com:8090/sub"
          , c = new WebSocket(l)
          , u = !1;
        c.onopen = function() {
            s()
        }
        ,
        c.onmessage = function(e) {
            var i = JSON.parse(e.data);
            if (8 == i.op && (u = !0,
            o(),
            n = setInterval(o, 24e4)),
            u || setTimeout(a, r),
            u && 5 == i.op) {
                var s = i.body;
                (s.message_chat || s.message_write) && t && t(s)
            }
        }
        ,
        c.onclose = function() {
            n && clearInterval(n),
            setTimeout(a, r)
        }
    }
    var t, n, i = 10, r = 15e3;
    return e(i, r),
    function(e) {
        t = e
    }
}
);
