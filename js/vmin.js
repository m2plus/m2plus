(function (f, e, g) {
    "undefined" != typeof module && module.exports ? module.exports = g() : f[e] = g()
})(this, "verge", function () {
    function f() {
    }
    var e = window,
        g = document.documentElement,
        l = e.Modernizr,
        h = e.matchMedia || e.msMatchMedia,
        m = h ? function (a) {
            return !!h.call(e, a).matches
        } : function () {
            return !1
        },
        d = function (a, c, b) {
            return g[b] < e[c] && m("(min-" + a + ":" + e[c] + "px)") ? function () {
                return e[c]
            } : function () {
                return g[b]
            }
        },
        j = d("width", "innerWidth", "clientWidth"),
        k = d("height", "innerHeight", "clientHeight"),
        d = {};
    d.viewportW = j;
    d.viewportH = k;
    d.rectangle = f;
    return d
});