define("widget/tournament/grid/grid.jsx", ["require", "exports", "module", "common:static/libs/react/react.min", "common:static/libs/react/reactdom.min", "widget/tournament/grid/components/tourGrid.jsx"],
function(t, e, n) {
    function r(t) {
        $.ajax({
            url: "/api/tournament/getgrid",
            data: {
                tid: t
            },
            dataType: "json",
            cache: !1
        }).done(function(e) {
            e.getGridResult.successful && o.render(i.createElement(a, {
                tid: t,
                tournaments: e.tournaments
            }), $(".tournament-grid-wrap")[0])
        })
    }
    var i = t("common:static/libs/react/react.min"),
    o = t("common:static/libs/react/reactdom.min"),
    a = t("widget/tournament/grid/components/tourGrid.jsx");
    n.exports = {
        init: r
    }
});