define("widget/tournament/grid/components/grid.jsx", ["require", "exports", "module", "common:static/libs/react/react.min", "widget/tournament/grid/components/match.jsx", "widget/tournament/grid/components/endNode.jsx"],
function(t, e, n) {
    var s = t("common:static/libs/react/react.min"),
    a = t("widget/tournament/grid/components/match.jsx"),
    r = t("widget/tournament/grid/components/endNode.jsx"),
    i = s.createClass({
        displayName: "Grid",
        mixins: [s.addons.PureRenderMixin],
        getInitialState: function() {
            var t = this.getRoundsInfo[this.props.type].bind(this)();
            return {
                totalRoundNum: t.totalRoundNum,
                startRoundIndex: t.startRoundIndex,
                iterateLenMaps: t.iterateLenMaps
            }
        },
        statics: {},
        getRoundsInfo: {
            normal: function() {
                var t = Math.ceil(Math.log(this.props.playerLimit) / Math.LN2);//比赛总伦次 t>=e  4
                1 > t && (t = 1);
                var e = Math.ceil(Math.log(this.props.participantNum) / Math.LN2);//参赛人数总伦次 2
                1 > e && (e = 1);
                for (var n = t - e,  
                s = {},
                a = n; t > a; a++) s[a] = Math.pow(2, t - 1 - a);  //2,3  2,1
                return {
                    totalRoundNum: t,
                    startRoundIndex: n,
                    iterateLenMaps: s
                }
            },
            victor: function() {
                return this.getRoundsInfo.normal.bind(this)()
            },
            loser: function() {
                var t = Math.ceil(Math.log(this.props.playerLimit) / Math.LN2);
                t > 1 && (t = 2 * t - 2);
                var e = Math.ceil(Math.log(this.props.participantNum) / Math.LN2);
                e > 1 && (e = 2 * e - 2);
                var n = t - e,
                s = {};
                if (1 === e) s = {
                    startRoundIndex: 1
                };
                else if (e > 1) for (var a = n; t > a; a += 2) s[a] = s[a + 1] = Math.pow(2, t / 2 - 1 - a / 2);
                return {
                    totalRoundNum: t,
                    startRoundIndex: n,
                    iterateLenMaps: s
                }
            },
            finalMatch: function() {
                return {
                    totalRoundNum: 1,
                    startRoundIndex: 0,
                    iterateLenMaps: {
                        0 : 1
                    }
                }
            }
        },
        getRoundsDOM: function() {
            for (var t = [], e = this.props.onlyUnfinished ? this.getUnfinishedStartRoundIndex() : this.state.startRoundIndex, n = this.state.totalRoundNum, i = e; n > i; i++) {
                var o = [],
                d = this.state.iterateLenMaps[i],
                u = d;
                i === this.state.totalRoundNum - 1 && this.props.hasThirdFinal && ++u;
                for (var h = 0; u > h; h++) {
                    var p = this.props.matches[i] && this.props.matches[i][h] || {},
                    l = {};
                    p.mid && (l.key = p.mid);
                    var c = "";
                    if (i < this.state.totalRoundNum - 1) if (this.props.onlyMe) c = "line-to-right";
                    else switch (this.props.type) {
                    case "loser":
                        c = i % 2 !== 0 ? h % 2 === 0 ? "line-to-right-down": "line-to-right-up": "line-to-right-B";
                        break;
                    default:
                        c = h % 2 === 0 ? "line-to-right-down": "line-to-right-up"
                    } else this.props.hasThirdFinal && (0 === h ? (c = "final", o.push(s.createElement("div", {
                        className: "first-four-img"
                    }))) : 1 === h && (c = "third-fourth-final"));
                    var m = {
                        matchClass: c,
                        curRoundIndex: i,
                        curMatchIndex: h,
                        matchInfo: this.props.matches[i] && this.props.matches[i][h] || {}
                    };
                    o.push(s.createElement(a, s.__spread({},
                    this.props, this.state, m, l)))
                }
                t.push(s.createElement("div", {
                    className: this.getRoundClass(e, d)
                },
                o))
            }
            return ("victor" === this.props.type || "loser" === this.props.type) && t.push(s.createElement("div", {
                className: this.getRoundClass(e, 1)
            },
            s.createElement(r, {
                link: "F" + this.props.tid + "_0_0",
                text: "决赛"
            }))),
            t
        },
        getUnfinishedStartRoundIndex: function() {
            var t = this.props,
            e = this.state;
            return e.startRoundIndex >= e.totalRoundNum - 3 ? e.startRoundIndex: -1 === t.matches.unfinishedStartIndex || t.matches.unfinishedStartIndex >= e.totalRoundNum - 3 ? e.totalRoundNum - 3 : t.matches.unfinishedStartIndex < e.startRoundIndex ? e.startRoundIndex: t.matches.unfinishedStartIndex
        },
        getRoundClass: function(t, e) {
            if (this.props.onlyMe) return "grid-round grid-row-1";
            var n = this.state.iterateLenMaps[t];
            return "grid-round grid-row-" + Math.round(n / e)
        },
        render: function() {
            return this.state.totalRoundNum ? s.createElement("div", {
                className: "one-grid " + this.props.type + "-group"
            },
            this.getRoundsDOM()) : s.createElement("h3", {
                className: "text-center"
            },
            "无可展示表表")
        }
    });
    n.exports = i
});