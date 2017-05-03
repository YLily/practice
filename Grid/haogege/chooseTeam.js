define("widget/tournament/nav/signup/chooseteam.jsx", ["require", "exports", "module", "common:static/libs/react/react.min"],
function(e, t, a) {
    var n = e("common:static/libs/react/react.min"),
    s = n.createClass({
        displayName: "ChooseTeamModal",
        mixins: [n.addons.PureRenderMixin],
        getInitialState: function() {
            return {
                dropdown: !1,
                selectTeamId: "",
                selectAll: !1
            }
        },
        getDefaultProps: function() {
            return {
                password: "",
                tid: "",
                tconfirmEndTime: 0,
                tconfirmTime: 0
            }
        },
        componentDidMount: function() {},
        signup: function() {
            var e = this;
            $.ajax({
                url: "/api/tournament/owsignup",
                type: "POST",
                dataType: "json",
                data: {
                    tid: e.props.tid,
                    password: e.props.password,
                    teamId: e.state.selectTeamId
                },
                cache: !1
            }).done(function(e) {
                e.result.successful ? (alert("报名成功！请在【比赛开始前1小时】内确认参赛"), window.location.reload()) : 205 === e.result.errno ? $("#miss-gameaccount-dialog").modal("show") : alert(e.result.errno + ":" + e.result.description)
            })
        },
        selectMember: function(e) {
            var t = this,
            a = t.state.selectTeamId,
            n = $(e.currentTarget).attr("data-uid"),
            s = [];
            t.props.teams.forEach(function(e) {
                if (e.teamId === a) {
                    var t = {};
                    t.teamId = e.teamId,
                    t.teamName = e.teamName,
                    t.teamType = e.teamType,
                    t.members = [],
                    e.members.forEach(function(e) {
                        if (e.uid === n) {
                            var a = {};
                            a.uid = e.uid,
                            a.uname = e.uname,
                            a.avatarIndex = e.avatarIndex,
                            a.level = e.level,
                            a.selected = !e.selected,
                            t.members.push(a)
                        } else t.members.push(e)
                    }),
                    s.push(t)
                } else s.push(e)
            }),
            t.setProps({
                teams: s
            })
        },
        selectAll: function() {
            function e() {
                var e = [],
                a = t.state.selectTeamId;
                t.props.teams.forEach(function(n) {
                    if (n.teamId === a) {
                        var s = {};
                        s.teamId = n.teamId,
                        s.teamName = n.teamName,
                        s.teamType = n.teamType,
                        s.members = [],
                        n.members.forEach(function(e) {
                            var a = {};
                            a.uid = e.uid,
                            a.uname = e.uname,
                            a.avatarIndex = e.avatarIndex,
                            a.level = e.level,
                            a.selected = t.state.selectAll ? !0 : !1,
                            s.members.push(a)
                        }),
                        e.push(s)
                    } else e.push(n)
                }),
                t.setProps({
                    teams: e
                })
            }
            var t = this;
            t.setState({
                selectAll: !t.state.selectAll
            },
            function() {
                e()
            })
        },
        findTeamNameByTeamId: function(e) {
            var t, a = this;
            return a.props.teams.forEach(function(a) {
                return a.teamId === e ? (t = a.teamName, !1) : void 0
            }),
            t
        },
        getSelectedMembers: function() {
            var e = this,
            t = [];
            return e.props.teams.forEach(function(a) {
                a.teamId === e.state.selectTeamId && a.members.forEach(function(e) {
                    e.selected && t.push(e.uid)
                })
            }),
            t
        },
        render: function() {
            function e() {
                return "" === o.state.selectTeamId ? (alert("请选择参赛队伍"), !1) : void o.signup()
            }
            function t() {
                $("#chooseTeamModal").modal("hide")
            }
            function a(e) {
                o.setState({
                    selectTeamId: $(e.target).attr("data-teamid"),
                    dropdown: !1
                })
            }
            function s() {
                o.setState({
                    dropdown: !o.state.dropdown
                })
            }
            function m() {
                var e, t;
                return t = "" === o.state.selectTeamId ? "请选择比赛队伍": o.findTeamNameByTeamId(o.state.selectTeamId),
                o.state.dropdown && (e = n.createElement("ul", {
                    className: "dropdown-menu"
                },
                o.props.teams.map(function(e) {
                    return n.createElement("li", {
                        "data-teamid": e.teamId,
                        onClick: a
                    },
                    e.teamName)
                }))),
                n.createElement("div", {
                    className: "teamDropdown",
                    onClick: s
                },
                n.createElement("span", {
                    className: "content"
                },
                t), n.createElement("img", {
                    className: "sanjiao",
                    src: "/static/widget/tournament/nav/signup/img/sanjiao_9x13_46ef4f5.png"
                }), e)
            }
            var o = this;
            return o.state ? n.createElement("div", {
                className: "modal fade",
                id: "chooseTeamModal",
                tabindex: "-1",
                role: "dialog"
            },
            n.createElement("div", {
                className: "modal-dialog"
            },
            n.createElement("div", {
                className: "modal-content"
            },
            n.createElement("i", {
                className: "close-icon",
                onClick: t
            }), n.createElement("div", {
                className: "haogege-logo-wrap"
            },
            n.createElement("img", {
                className: "haogege-logo-img",
                src: "/static/widget/team/jointeam/img/logo_444x192_405a991.png"
            })), n.createElement("div", {
                className: "chuangjianzhandui"
            },
            "报名比赛"), n.createElement("div", {
                className: "xuanzeduiwu"
            },
            "集结队伍"), m(), n.createElement("div", {
                className: "signup-btn",
                onClick: e
            },
            "报名比赛")))) : !1
        }
    });
    a.exports = s
});