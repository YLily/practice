!
function(e) {
    e.escapeToHtml = function(e) {
        return e += "",
        e = e.replace(/<|>|"/g,
        function(e) {
            var t;
            switch (e) {
            case "<":
                t = "&lt;";
                break;
            case ">":
                t = "&gt;";
                break;
            case '"':
                t = "&quot;";
                break;
            default:
                t = e
            }
            return t
        })
    },
    e.dateFormatGeGe = function(e, t, n) {
        function r(e) {
            return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime()
        }
        function a() {
            var e = g.getHours(),
            t = g.getMinutes();
            return 10 > e && (e = "0" + e),
            10 > t && (t = "0" + t),
            e + ":" + t
        } (e + "").length < 12 && (e = 1e3 * +e),
        (t + "").length < 12 && (t = 1e3 * +t);
        var g = new Date( + e),
        u = new Date( + t),
        o = Math.round((r(g) - r(u)) / 864e5);
        switch (o) {
        case - 1 : return "昨天 " + a();
        case 0:
            return (n ? "": "今天 ") + a();
        case 1:
            return "明天 " + a()
        }
        var i = u.getFullYear(),
        s = g.getFullYear(),
        c = g.getMonth() + 1,
        l = g.getDate(),
        h = c + "月" + l + "日 ";
        return i !== s && (h = s + "年" + h),
        h + a()
    },
    e.dateFormat = function() {
        Date.prototype.Format = function(e) {
            var t = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                S: this.getMilliseconds()
            };
            /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var n in t) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
            return e
        }
    },
    e.toLocalString = function(t) { (t + "").length < 12 && (t = 1e3 * +t);
        var n = new Date( + t),
        r = n.getFullYear(),
        a = n.getMonth() + 1,
        g = n.getDate(),
        u = e.toLocaleTimeString(t);
        return r + "-" + a + "-" + g + " " + u
    },
    e.toLocaleTimeString = function(e) { (e + "").length < 12 && (e = 1e3 * +e);
        var t = new Date( + e),
        n = t.getHours(),
        r = t.getMinutes(),
        a = t.getSeconds();
        return n = n > 9 ? n: "0" + n,
        r = r > 9 ? r: "0" + r,
        a = a > 9 ? a: "0" + a,
        n + ":" + r + ":" + a
    },
    e.getTimeFromString = function(e) {
        var t = /(\d{1,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/,
        n = t.exec(e);
        if (!n) return 0;
        var r = +n[1],
        a = +n[2] - 1,
        g = +n[3],
        u = +n[4],
        o = +n[5];
        return new Date(r, a, g, u, o).getTime()
    }
} ($);