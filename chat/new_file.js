!
function(t) {
	function e(t) {
		t.tooltip ? n(t.tooltip) : i(t)
	}
	function i(t) {
		var e = $("#message_num_total"),
			i = 0;
		for (var o in a) {
			var n = $("#" + o);
			if (0 !== n.length) {
				var s = Number(t[o] || 0) + Number(n.html());
				s > 99 && (s = 99), i += s, 0 == s ? n.html(s).hide() : n.html(s).show()
			}
		}
		i = i > 99 ? 99 : i, 0 == i ? e.html(i).hide() : e.html(i).show()
	}
	function o(e) {
		var i = $("#i_menu_community_msg_btn"),
			o = $('<div style="display:none;border:1px solid #f25d8e;background:#fff;position:absolute;border-radius:4px;line-height:36px;text-align:left;padding:0 15px;top:52px;left:-8px;white-space:nowrap;">            <div style="background: url(//static.hdslb.com/images/base/icons.png) -841px -1101px no-repeat;width:38px;height:12px;position:absolute;top:-12px;"></div>            <ul id="floag_msg"></ul>        </div>').appendTo(i),
			n = "";
		if ($.each(e, function(e, i) {
			n += '<div style="display:inline-block;margin-right:30px;">' + i.message.replace("%s", '<span id="float_msg_' + i.mc + '">' + i.count + "</span>") + '锛�<a style="color:#00a1d6" onmouseover="this.style.cssText=\'color:#f25d8e\'" onmouseout="this.style.cssText=\'color:#00a1d6\'" target="_blank" href="//message.bilibili.com/api/tooltip/clear.do?mc=' + i.mc + "&captcha=" + t.captcha_key + '">鏌ョ湅璇︽儏</a></div><i style="float:none;cursor:pointer;background-position:-472px -536px;width:16px;height:16px;" class="b-icon" data-mc="' + i.mc + '"></i>'
		}), $("#floag_msg").html(n), $(".b-icon", o).on("click", function() {
			o.hide(), p.setItem("biliMSFCount-" + $(this).data("mc"), e[0].count)
		}), $("a", o).on("click", function() {
			o.hide(), p.removeItem("biliMSFCount-" + $(this).data("mc"))
		}), o.hover(function(t) {
			t.stopPropagation()
		}, function(t) {}), "0" != __GetCookie("isNotice")) if (p) {
			var s = p.getItem("biliMSFCount-100") || 0;
			e.length > 0 && e[0].count > s && o.show()
		} else e.length > 0 && o.show()
	}
	function n(e) {
		if ("www.im9.com" != location.host && "0" != __GetCookie("isNotice")) {
			var i = Math.floor(e.mc),
				o = $("#float_msg_" + i);
			if (0 === o.length) {
				var n = '<div style="display:inline-block;margin-right:30px;">' + e.message.replace("%s", '<span id="float_msg_' + i + '">0</span>') + '锛�<a style="color:#00a1d6" onmouseover="this.style.cssText=\'color:#f25d8e\'" onmouseout="this.style.cssText=\'color:#00a1d6\'" target="_blank" href="//message.bilibili.com/api/tooltip/clear.do?mc=' + i + "&captcha=" + t.captcha_key + '">鏌ョ湅璇︽儏</a></div><i style="float:none;cursor:pointer;background-position:-472px -536px;width:16px;height:16px;" class="b-icon" data-mc="' + i + '"></i>';
				$("#floag_msg").html(n), o = $("#float_msg_" + i)
			}
			var s = Number(o.html());
			NaN === s && (s = 99), s++, s > 99 ? o.html("99+") : o.html(s), $("#floag_msg").parent().show()
		}
	}
	function s(t) {
		var e = $("#i_menu_community_msg_btn");
		if (0 != e.length) {
			var i = ($('<div class="num" id="message_num_total">0</div>').appendTo(e), $('<div class="dyn_wnd" id="community_msg">                            <div class="dyn_arrow"></div>                            <div class="dyn_menu">                                <div class="menu">                                    <ul>                                        <li>                                            <a href="//message.bilibili.com#reply" target="_blank">                                                <i class="icons2 icons-reply"></i>                                                <span class="inner-type">鍥炲鎴戠殑</span>                                                <span class="inner-num inner_notify_reply" id="reply_me">0</span>                                            </a>                                        </li>                                        <li>                                            <a href="//message.bilibili.com#at" target="_blank">                                                <i class="icons2 icons-at"></i>                                                <span class="inner-type">&nbsp;&nbsp;@鎴戠殑&nbsp;&nbsp;</span>                                                <span class="inner-num inner_notify_at" id="at_me">0</span>                                            </a>                                        </li>                                        <li>                                            <a href="//message.bilibili.com#love" target="_blank">                                                <i class="icons2 icons-love"></i>                                                <span class="inner-type">鏀跺埌鐨勮禐</span>                                                <span class="inner-num inner_notify_love" id="praise_me">0</span>                                            </a>                                        </li>                                        <li>                                            <a href="//message.bilibili.com#system" target="_blank">                                                <i class="icons2 icons-system"></i>                                                <span class="inner-type">绯荤粺閫氱煡</span>                                                <span class="inner-num inner_notify_message" id="notify_me">0</span>                                            </a>                                        </li>                                        <li>                                            <a href="//message.bilibili.com/#whisper" target="_blank">                                                <i class="icons2 icons-message"></i>                                                <span class="inner-type">鎴戠殑绉佷俊</span>                                                <span class="inner-num inner_notify_message" id="chat_me">0</span>                                            </a>                                        </li>                                    </ul>                                </div>                            </div>'));
			i.appendTo(e), i.css({
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
	var a = {
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
		m = function(n) {
			var a = {
				render: s,
				notify: e,
				getCount: i,
				getFloatCount: o
			},
				l = this;
			l.options = $.extend({}, a, n), l.options.render(), l._onLoginInfoLoaded(function() {
				if (t.captcha_key ? (l.getCount(l.options.getCount), l.getFloatCount(l.options.getFloatCount)) : $.getScript("//www.bilibili.com/plus/widget/ajaxGetCaptchaKey.php?js", function() {
					l.getCount(l.options.getCount), l.getFloatCount(l.options.getFloatCount)
				}), window.WebSocket) {
					var e = p.getItem("biliWSTS") || 0;
					if (e < (new Date).getTime() && (p.setItem("biliWS", "off"), p.removeItem("biliMS")), "on" != p.getItem("biliWS")) p.setItem("biliWS", "on"), p.setItem("biliWSTS", (new Date).getTime() + 864e5), window.onbeforeunload = function() {
						p.setItem("biliWS", "off"), p.removeItem("biliMS")
					}, l._createWebsocket(r, c);
					else {
						var i = JSON.parse(p.getItem("biliMS")) || [],
							o = i.length;
						o > 0 && (l._ts = i[o - 1]._ts), l._createPoll()
					}
				}
			}, r / 100, c)
		};
	m.prototype._onLoginInfoLoaded = function(t, e, i) {
		var o = this,
			n = window.biliLoginStatus;
		if (n && n.isLogin) t && t(window.biliLoginStatus);
		else {
			if (0 === e) return;
			setTimeout(function() {
				o._onLoginInfoLoaded(t, --e, 2 * i)
			}, i)
		}
	}, m.prototype.getFloatCount = function(e) {
		if ("www.im9.com" != location.host) {
			var i;
			if (p && (i = JSON.parse(p.getItem("biliFloatNotify"))), p && i && i.expires > (new Date).getTime()) return void(e && e(i));
			$.support.cors = !0, $.ajax({
				url: "//message.bilibili.com/api/tooltip/query.list.do",
				xhrFields: {
					withCredentials: !0
				},
				dataType: "jsonp",
				cache: !0,
				crossDomain: !0,
				data: {
					captcha: t.captcha_key,
					type: "jsonp"
				},
				success: function(t) {
					var o = t.data;
					e && e(o), p && (t.expires = (new Date).getTime() + 18e4, i = p.setItem("biliFloatNotify", JSON.stringify(o)))
				},
				error: function() {
					e && e({})
				}
			})
		}
	}, m.prototype.getCount = function(e) {
		var i;
		return p && (i = JSON.parse(p.getItem("biliNotify"))), p && i && i.expires > (new Date).getTime() ? void(e && e(i)) : ($.support.cors = !0, void $.ajax({
			url: "//message.bilibili.com/api/notify/query.notify.count.do",
			xhrFields: {
				withCredentials: !0
			},
			dataType: "jsonp",
			cache: !0,
			crossDomain: !0,
			data: {
				captcha: t.captcha_key,
				type: "jsonp"
			},
			success: function(t) {
				var o = t.data;
				e && e(o), p && (t.expires = (new Date).getTime() + 18e4, i = p.setItem("biliNotify", JSON.stringify(o)))
			},
			error: function() {
				e && e({})
			}
		}))
	}, m.prototype._createPoll = function() {
		var t = this,
			e = setInterval(function() {
				var i = JSON.parse(p.getItem("biliMS")) || [];
				if (p && "on" != p.getItem("biliWS")) return p.setItem("biliWS", "on"), p.setItem("biliWSTS", (new Date).getTime() + 864e5), window.onbeforeunload = function() {
					p.setItem("biliWS", "off"), p.removeItem("biliMS")
				}, t._createWebsocket(r, c), void clearInterval(e);
				for (var o, n = t._ts, s = 0, a = i.length; s < a; s++) o = i[s]._ts, (!n || o > n) && (n = o, t.options.notify(i[s]));
				t._ts = o
			}, 1e3)
	}, m.prototype._createWebsocket = function(t, e) {
		function i() {
			function t() {
				r.send(JSON.stringify({
					ver: 1,
					op: 2,
					seq: 2,
					body: {}
				}))
			}
			function i() {
				r.send(JSON.stringify({
					ver: 1,
					op: 7,
					seq: 1,
					body: {
						data: {}
					}
				}))
			}
			var a = "https:" === location.protocol ? "wss://push-msg.bilibili.com:8095/sub" : "ws://push-msg.bilibili.com:8090/sub",
				r = new WebSocket(a),
				c = !1;
			r.onopen = function() {
				i()
			}, r.onmessage = function(i) {
				var a = JSON.parse(i.data);
				if (8 == a.op && (c = !0, t(), s = setInterval(t, 24e4)), c || setTimeout(o, e), c && 5 == a.op && !a.body.mt) {
					var r = a.body;
					if (p) {
						var m = JSON.parse(p.getItem("biliMS")) || [];
						r._ts = (new Date).getTime(), m.push(r), m.length > l && m.shift(), p.setItem("biliMS", JSON.stringify(m))
					}
					n.options.notify(r)
				}
			}, r.onclose = function() {
				p && (p.setItem("biliWS", "off"), p.removeItem("biliMS")), s && clearInterval(s), setTimeout(o, e)
			}
		}
		function o() {
			n._createWebsocket(--t, 2 * e)
		}
		var n = this;
		if (0 !== t) {
			i();
			var s
		}
	}, t.messageModule = {
		showCount: i,
		load: function(t) {
			new m(t)
		}
	}
}(window);