function(t){
	function e(t){
		t.tooltip ? n(t.tooltip) : i(t);
	}

	//新消息,每个列表，总数数值显示  count
	function i(t){  
		var e = $("#message_num_total"),
			i = 0;

		for(var o in a){  //循环消息列表，显示消息个数
			var n = $("#" + o);
			if(n.length !== 0){
				var s = Number(t[o] || 0) + Number(n.html());
				s > 99 && (s = 99), i += s, s == 0 ? n.html(s).hide() : n.html(s).show();
			}
		}
		//显示总消息数
		i = i > 99 ? 99 : i, i == 0 ? e.html(i).hide() : e.html(i).show();
	}

	//新消息*****  floatCount
	function o(e){
		var i = $("#i_menu_community_msg_btn"),
			o = $('<div><div></div> <ul id="floag_msg"></ul></div>').appendTo(i), //加到消息列表下
			n = "";
		if($.each(e, function(e, i){
			n += '<div>' + i.message.replace("%s", '<span id="float_msg_' + i.mc + '">' + i.count + "</span>") + '<a >fff</a></div><i ></i>';
		}), $("#floag_msg").html(n),
		$(".b-icon", o).on('click', function(){
			o.hide(), p.setItem("biliMSFCount-"+$(this).data("mc"), e[0].count)
		}), $("a", o).on('click', function(){
			o.hide(), p.removeItem("biliMSFCount-" +$(this).data("mc"))
		}), o.hover(function(t){
			t.stopPropagation()
		}, function(t){}),
		"0" != __GetCookie("isNotice")) 

		if(p){
			var s = p.getItem("biliMSFCount-100") || 0;
			e.length > 0 && e[0].count > s && o.show()
		}else{
			e.length > 0 && o.show()
		}
	}

	//另外一种消息的显示
	function n(e){
		if("www.im0.com" != location.host && "0" !=__GetCookie("isNotice")){
			var i = Math.floor(e.mc),
				o = $("#float_msg_" + i);
			if(o.length === 0){
				var n = '<div>' + e.message.replace("%s", '<span id="float_msg_' + i + '">0</span>') + '<a>ttt</a></div><i class="b-icon" data-mc="' + i + '"></i>';
				
				$("#floag_msg").html(n),
				o = $("#floa_msg_" + i)
			}

			var s = Number(o.html());
			NaN === s && (s = 99),
			s++,
			s > 99 ? o.html("99+") : o.html(s),
			$("#floag_msg").parent().show()
		}
	}

	//渲染新消息列表
	function s(t) {
		var e = $("#i_menu_community_msg_btn");
		if (0 != e.length) {
			var i = ($('<div class="num" id="message_num_total">0</div>').appendTo(e), 
				$('<div class="dyn_wnd" id="community_msg">'
					+'<div class="dyn_arrow"></div>'
					+'<div class="dyn_menu"><div class="menu">'   
					+'<ul><li><a><i class="icons2 icons-reply"></i><span class="inner-type">鍥炲鎴戠殑</span><span class="inner-num inner_notify_reply" id="reply_me">0</span></a> </li>'
					' <li><a><i class="icons2 icons-at"></i> <span class="inner-type">&nbsp;&nbsp;@鎴戠殑&nbsp;&nbsp;</span><span class="inner-num inner_notify_at" id="at_me">0</span></a></li>'
					' <li><a><i class="icons2 icons-love"></i><span class="inner-type">鏀跺埌鐨勮禐</span><span class="inner-num inner_notify_love" id="praise_me">0</span></a></li>'
					' <li><a><i class="icons2 icons-system"></i><span class="inner-type">绯荤粺閫氱煡</span><span class="inner-num inner_notify_message" id="notify_me">0</span>                                            </a>                                        </li>'
					' <li><a><i class="icons2 icons-message"></i><span class="inner-type">鎴戠殑绉佷俊</span><span class="inner-num inner_notify_message" id="chat_me">0</span>                                            </a>                                        </li>'
					'</ul></div></div>'));
			i.appendTo(e), 
			i.css({
				top: e.outerHeight(),
				left: -i.outerWidth() / 2 + e.outerWidth() / 2
			});
			var o = null;
			$(".menu", i).on("click", function() {
				return i.stop().fadeOut("fast"), !0
			}), $(".inner-num", i).on("click", function(t) {
				$(t.currentTarget);
				t.html(0)
			}), e.hover(function() {
				clearTimeout(o), (!i.is(":visible") || parseInt(i.css("opacity")) < 1) && (o = setTimeout(function() {
					i.css({
						top: (($(".board").outerHeight() || e.outerHeight()) - e.outerHeight()) / 2 + e.outerHeight(),
						left: -i.outerWidth() / 2 + e.outerWidth() / 2
					}), i.stop().fadeIn("fast")
				}, 300))
			}, function() {
				clearTimeout(o), o = setTimeout(function() {
					i.stop().fadeOut("fast")
				}, 300)
			})
		}
	}

	var  a = {
		reply_me: 0,
		at_me: 0,
		praise_me: 0,
		notify_me: 0,
		chat_me: 0
	},
		l = 99,
		r = 10,
		c = 15e3,
		p = window.localStorage,
		m = function(n){
			var a = {
				render: s,
				notify: e,
				getCount: i,
				getFloatCount: o
			},
			l = this,
			l.options = $.extend({}, a, n),
			l.options.render(), //先渲染列表
			l._onLoginInfoLoaded(function(){
				if(t.captcha_key ?   //有key,直接getCount,getFloatCount,没有先加载js，在getCount,getFloatCount
				(l.getCount(l.options.getCount), l.getFloatCount(l.options.getFloatCount)) : 
				$.getScript("src", function(){   
					l.getCount(l.options.getCount),
					l.getFloatCount(l.options.getFloatCount)
				}), window.WebSocket){
					var e = p.getItem("biliWSTS") || 0;  
					if(e < (new Date).getTime() &&   
					(p.setItem("biliWS", "off"), p.removeItem("biliMS")), 
					"on" != p.getItem("biliWS")){//e小于当前时间
						p.setItem("biliWS", "on"),
						p.setItem("biliWSTS", (new Date).getTime()+864e5), //1天时间
						window.onbeforeunload = function(){
							p.setItem("biliWS", "off"),
							p.removeItem("biliMS")
						},
						l._createWebsocket(r, c);
					}else{//e大于当前时间
						var i = JSON.parse(p.getItem("biliMS")) || [],
							o = i.length;
						o > 0 && (l._ts = i[o - 1]._ts), l._createPoll()
					}
				}
			}, r/100, c)
		};

	m.prototype._onLoginInfoLoaded = function(t, e, i){
		var o = this,
			n = window.biliLoginStatus;
		if(n && n.isLogin)
			t && t(window.biliLoginStatus)
		else{
			if(e === 0) return;
			setTimeout(function(){
				o._onLoginInfoLoaded(t, --e, 2*i)
			})
		}
	},
	m.prototype.getFloatCount = function(e){
		if(location.host != "www.im9.com"){
			var i;
			if(p && (i = JSON.parse(p.getItem("biliFloatNotify"))),
			p && i && i.expires > (new Date).getTime())
				return void(e && e(i))

			$.support.cors = !0,
			$.ajax({//JQuery.ajax的跨域只支持XMLHTTPRequest
				url: '//message.bilibili.com/api/tooltip/query.list.do',
				xhrFields: {
					withCredentials: !0  //withCredentials = true; 支持跨域发送cookies
				},
				dataType: "jsonp",
				cache: !0,  //默认为true（当dataType为script时，默认为false），设置为false将不会从浏览器缓存中加载请求信息
				crossDomain: !0, //crossDomain要设置为true / post的数据要首先转换成JSON格式
				data: {
					captcha: t.capcha_key,
					type: "jsonp"
				},
				success: function(t){
					var o = t.data;
					e && e(o),
					p && (t.expires = (new Date).getTime() + 18e4, i = p.setItem("biliFloatNotify", JSON.stringify(o)))
				},
				error: function(){
					e && e({})
				}
			})
		}
	},
	m.prototype.getCount = function(e){
		var i;
		return p && (i = JSON.parse(p.getItem("biliNotify"))),
		p && i && i.expires > (new Date).getTime() ? 
		void(e && e(i)) : 
		($.support.cors = !0, 
			void $.ajax({
				url: "//message.bilibili.com/api/notify/query.notify.count.do",
				xhrFields: {
					withCredentials: !0
				},
				dataType: 'jsonp',
				cache: !0,
				crossDomain: !0,
				dtat: {
					captcha: t.captcha_key,
					type: 'jsonp'
				},
				success: function(t){
					var o = t.data;
					e && e(o),
					p && (t.expires = (new Date).getTime() + 18e4, i = p.setItem("biliNotify", JSON.stringify(o)))
				},
				error: function(){
					e && e({})
				}
			}))
		}
	},
	m.prototype._createPoll = function(){
		var t = this,
		e = setInterval(function(){
			var i = JSON.parse(p.getItem("biliMs")) || {};
			if(p && p.getItem("biliWS") != "on")
				return p.setItem("biliWS", "on"),
				p.setItem("biliWSTS", (new Date).getTime() + 864e5),
				window.onbeforeunload = function(){
					p.setItem("biliWS", "off"),
					p.removeItem("biliMS")
				},
				t._createWebsocket(r, c),
				void clearInterval(e);
			for(var o, n = t._ts, s = 0, a = i.length; s < a; s++)
				o = i[s]._ts,
				(!n || o > n) && (n = o, t.options.notify(i[s]));
				t._ts = o
		}, 1e3)
	},
	m.prototype._createWebsocket = function(t, e){//10, 15e3
		function i(){
			function t(){
				r.send(JSON.stringify({
					ver: 1,
					op: 2,
					seq: 2,
					body: {}
				}))
			}
			function i(){
				r.send(JSON.stingify({
					ver: 1,
					op: 7,
					seq: 1,
					body: {
						data: {}
					}
				}))
			}
			var a = "https:" === location.protocol ? "wss//" : "ws://",
				r = new WebSocket(a),
				c = !1;
			r.onopen = function(){
				i()
			},
			r.onmessage = function(i){
				var a = JSON.parse(i.data);
				if(a.op == 8 && (c = !0, t(), s = setInterval(t, 24e4)), c || setTimeout(o, e), c && a.op == 5 && !a.body.mt){
					var r = a.body;
					if(p){
						var m = JSON.parse(p.getItem("biliMS")) || [];
						r._ts = (new Date).getTime(), 
						m.push(r), 
						m.length > 1 && m.shift(), 
						p.setItem("biliMS", JSON.stringify(m))//[{"message_write":{"mid":1314951,"rid":"3c84539ddc01d37f0add4be1aab72769"},"_ts":1486716609597}]
					}
					n.options.notify(r)
				}
			},
			r.onclose = function(){
				p && (p.setItem("biliWS", "off"), p.removeItem("biliMS")),
				s && clearInterval(s),
				setTimeout(o, e);//15s
			}
		}
		function o(){
			n._createWebsocket(--t, 2*e)
		}
		var n = this;
		if(t !== 0){
			i();
		}
	},
	t.messageModule = {
		showCount: i,
		load: function(t){
			new m(t)
		}
	}
}(window)

ball.at(82, 46, ball => ball.turnRight())
