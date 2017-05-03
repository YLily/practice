define("widget/tournament/nav/signup/choosemember.jsx", ["require", "exports", "module", "common:static/libs/react/react.min", "common:static/libs/react/reactdom.min"],
function(e, t, a) {
    var n = e("common:static/libs/react/react.min"),
    s = (e("common:static/libs/react/reactdom.min"), n.createClass({
        displayName: "ChooseMemberModal",
        mixins: [n.addons.PureRenderMixin],
        getInitialState: function() {
            return {
                selectAll: !1
            }
        },
        getDefaultProps: function() {
            return {
                tid: "",
                members: []
            }
        },
        selectMember: function(e) {
            var t = this,
            a = $(e.currentTarget).attr("data-uid"),
            n = [];
            t.props.members.forEach(function(e) {
                if (e.uid === a) {
                    var t = {};
                    t.uid = e.uid,
                    t.name = e.name,
                    t.level = e.level,
                    t.selected = !e.selected,
                    n.push(t)
                } else n.push(e)
            }),
            t.setProps({
                members: n
            })
        },
        selectAll: function() {
            function e() {
                var e = [];
                t.props.members.forEach(function(a) {
                    var n = {};
                    n.uid = a.uid,
                    n.name = a.name,
                    n.level = a.level,
                    n.selected = t.state.selectAll ? !0 : !1,
                    e.push(n)
                }),
                t.setProps({
                    members: e
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
        getSelectedMembers: function() {
            var e = this,
            t = [];
            return e.props.members.forEach(function(e) {
                e.selected && t.push(e.uid)
            }),
            t
        },
        render: function() {
            function e() {
                if (s.getSelectedMembers().length < 6 || s.getSelectedMembers().length > 8) return alert("请选择6-8名参赛队员"),
                !1;
                var e = s.getSelectedMembers().join(",");
                $.ajax({
                    url: "/api/tournament/confirm",
                    type: "POST",
                    dataType: "json",
                    data: {
                        tid: s.props.tid,
                        members: e
                    }
                }).done(function(e) {
                    e.confirmResult.successful ? (alert("确认参赛成功！"), window.location.reload()) : alert(e.confirmResult.description)
                })
            }
            function t() {
                $("#chooseMemberModal").modal("hide")
            }
            function a() {
                if (s.props.members) {
                    var e = [];
                    return e = s.props.members,
                    n.createElement("div", {
                        className: "member-panel"
                    },
                    e.map(function(e) {
                        return n.createElement("div", {
                            className: "one-member"
                        },
                        n.createElement("img", {
                            className: "radio-icon",
                            "data-uid": e.uid,
                            onClick: s.selectMember,
                            src: e.selected ? "/static/widget/tournament/nav/signup/img/select_15x15_c7c2c00.png": "/static/widget/tournament/nav/signup/img/unselect_15x15_8a06b37.png"
                        }), n.createElement("span", {
                            className: "member-name",
                            "data-uid": e.uid,
                            onClick: s.selectMember
                        },
                        e.name))
                    }))
                }
                return null
            }
            var s = this;
            return s.state ? n.createElement("div", {
                className: "modal fade",
                id: "chooseMemberModal",
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
            "确认参赛人员"), n.createElement("div", {
                className: "xuanzeduiyuan"
            },
            "召唤伙伴", n.createElement("span", {
                className: "small-font"
            },
            "（6-8名）"), n.createElement("div", {
                className: "xuanzesuoyou"
            },
            n.createElement("span", {
                className: "",
                onClick: s.selectAll
            },
            "所有人都过来"), n.createElement("img", {
                className: "radio-icon",
                onClick: s.selectAll,
                src: s.state.selectAll ? "/static/widget/tournament/nav/signup/img/select_15x15_c7c2c00.png": "/static/widget/tournament/nav/signup/img/unselect_15x15_8a06b37.png"
            }))), a(), n.createElement("div", {
                className: "signup-btn",
                onClick: e
            },
            "确认参赛")))) : !1
        }
    }));
    a.exports = s
});