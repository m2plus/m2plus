! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function (a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.11",
        setup: function () {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function (b) {
            var c = a(b)["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return c.length || (c = a("body")), parseInt(c.css("fontSize"), 10)
        },
        getPageHeight: function (b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    })
});
/* == malihu jquery custom scrollbar plugin == Version: 3.0.3, License: MIT License (MIT) */
(function (b, a, c) {
    (function (d) {
        d(jQuery)
    }(function (j) {
        var g = "mCustomScrollbar",
            d = "mCS",
            m = ".mCustomScrollbar",
            h = {
                setWidth: false,
                setHeight: false,
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: true,
                autoHideScrollbar: false,
                autoExpandScrollbar: false,
                alwaysShowScrollbar: 0,
                snapAmount: null,
                snapOffset: 0,
                mouseWheel: {
                    enable: true,
                    scrollAmount: "auto",
                    axis: "y",
                    preventDefault: false,
                    deltaFactor: "auto",
                    normalizeDelta: false,
                    invert: false,
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    enable: false,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: true,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                advanced: {
                    autoExpandHorizontalScroll: false,
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: true,
                    updateOnImageLoad: true,
                    updateOnSelectorChange: false
                },
                theme: "light",
                callbacks: {
                    onScrollStart: false,
                    onScroll: false,
                    onTotalScroll: false,
                    onTotalScrollBack: false,
                    whileScrolling: false,
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: true
                },
                live: false,
                liveSelector: null
            },
            l = 0,
            o = {},
            f = function (p) {
                if (o[p]) {
                    clearTimeout(o[p]);
                    i._delete.call(null, o[p])
                }
            },
            k = (b.attachEvent && !b.addEventListener) ? 1 : 0,
            n = false,
            e = {
                init: function (q) {
                    var q = j.extend(true, {}, h, q),
                        p = i._selector.call(this);
                    if (q.live) {
                        var s = q.liveSelector || this.selector || m,
                            r = j(s);
                        if (q.live === "off") {
                            f(s);
                            return
                        }
                        o[s] = setTimeout(function () {
                            r.mCustomScrollbar(q);
                            if (q.live === "once" && r.length) {
                                f(s)
                            }
                        }, 500)
                    } else {
                        f(s)
                    }
                    q.setWidth = (q.set_width) ? q.set_width : q.setWidth;
                    q.setHeight = (q.set_height) ? q.set_height : q.setHeight;
                    q.axis = (q.horizontalScroll) ? "x" : i._findAxis.call(null, q.axis);
                    q.scrollInertia = q.scrollInertia < 17 ? 17 : q.scrollInertia;
                    if (typeof q.mouseWheel !== "object" && q.mouseWheel == true) {
                        q.mouseWheel = {
                            enable: true,
                            scrollAmount: "auto",
                            axis: "y",
                            preventDefault: false,
                            deltaFactor: "auto",
                            normalizeDelta: false,
                            invert: false
                        }
                    }
                    q.mouseWheel.scrollAmount = !q.mouseWheelPixels ? q.mouseWheel.scrollAmount : q.mouseWheelPixels;
                    q.mouseWheel.normalizeDelta = !q.advanced.normalizeMouseWheelDelta ? q.mouseWheel.normalizeDelta : q.advanced.normalizeMouseWheelDelta;
                    q.scrollButtons.scrollType = i._findScrollButtonsType.call(null, q.scrollButtons.scrollType);
                    i._theme.call(null, q);
                    return j(p).each(function () {
                        var u = j(this);
                        if (!u.data(d)) {
                            u.data(d, {
                                idx: ++l,
                                opt: q,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                bindEvents: false,
                                tweenRunning: false,
                                sequential: {},
                                langDir: u.css("direction"),
                                cbOffsets: null,
                                trigger: null
                            });
                            var w = u.data(d).opt,
                                v = u.data("mcs-axis"),
                                t = u.data("mcs-scrollbar-position"),
                                x = u.data("mcs-theme");
                            if (v) {
                                w.axis = v
                            }
                            if (t) {
                                w.scrollbarPosition = t
                            }
                            if (x) {
                                w.theme = x;
                                i._theme.call(null, w)
                            }
                            i._pluginMarkup.call(this);
                            e.update.call(null, u)
                        }
                    })
                },
                update: function (q) {
                    var p = q || i._selector.call(this);
                    return j(p).each(function () {
                        var t = j(this);
                        if (t.data(d)) {
                            var v = t.data(d),
                                u = v.opt,
                                r = j("#mCSB_" + v.idx + "_container"),
                                s = [j("#mCSB_" + v.idx + "_dragger_vertical"), j("#mCSB_" + v.idx + "_dragger_horizontal")];
                            if (!r.length) {
                                return
                            }
                            if (v.tweenRunning) {
                                i._stop.call(null, t)
                            }
                            if (t.hasClass("mCS_disabled")) {
                                t.removeClass("mCS_disabled")
                            }
                            if (t.hasClass("mCS_destroyed")) {
                                t.removeClass("mCS_destroyed")
                            }
                            i._maxHeight.call(this);
                            i._expandContentHorizontally.call(this);
                            if (u.axis !== "y" && !u.advanced.autoExpandHorizontalScroll) {
                                r.css("width", i._contentWidth(r.children()))
                            }
                            v.overflowed = i._overflowed.call(this);
                            i._scrollbarVisibility.call(this);
                            if (u.autoDraggerLength) {
                                i._setDraggerLength.call(this)
                            }
                            i._scrollRatio.call(this);
                            i._bindEvents.call(this);
                            var w = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                            if (u.axis !== "x") {
                                if (!v.overflowed[0]) {
                                    i._resetContentPosition.call(this);
                                    if (u.axis === "y") {
                                        i._unbindEvents.call(this)
                                    } else {
                                        if (u.axis === "yx" && v.overflowed[1]) {
                                            i._scrollTo.call(this, t, w[1].toString(), {
                                                dir: "x",
                                                dur: 0,
                                                overwrite: "none"
                                            })
                                        }
                                    }
                                } else {
                                    if (s[0].height() > s[0].parent().height()) {
                                        i._resetContentPosition.call(this)
                                    } else {
                                        i._scrollTo.call(this, t, w[0].toString(), {
                                            dir: "y",
                                            dur: 0,
                                            overwrite: "none"
                                        })
                                    }
                                }
                            }
                            if (u.axis !== "y") {
                                if (!v.overflowed[1]) {
                                    i._resetContentPosition.call(this);
                                    if (u.axis === "x") {
                                        i._unbindEvents.call(this)
                                    } else {
                                        if (u.axis === "yx" && v.overflowed[0]) {
                                            i._scrollTo.call(this, t, w[0].toString(), {
                                                dir: "y",
                                                dur: 0,
                                                overwrite: "none"
                                            })
                                        }
                                    }
                                } else {
                                    if (s[1].width() > s[1].parent().width()) {
                                        i._resetContentPosition.call(this)
                                    } else {
                                        i._scrollTo.call(this, t, w[1].toString(), {
                                            dir: "x",
                                            dur: 0,
                                            overwrite: "none"
                                        })
                                    }
                                }
                            }
                            i._autoUpdate.call(this)
                        }
                    })
                },
                scrollTo: function (r, q) {
                    if (typeof r == "undefined" || r == null) {
                        return
                    }
                    var p = i._selector.call(this);
                    return j(p).each(function () {
                        var u = j(this);
                        if (u.data(d)) {
                            var x = u.data(d),
                                w = x.opt,
                                v = {
                                    trigger: "external",
                                    scrollInertia: w.scrollInertia,
                                    scrollEasing: "mcsEaseInOut",
                                    moveDragger: false,
                                    callbacks: true,
                                    onStart: true,
                                    onUpdate: true,
                                    onComplete: true
                                },
                                s = j.extend(true, {}, v, q),
                                y = i._arr.call(this, r),
                                t = s.scrollInertia < 17 ? 17 : s.scrollInertia;
                            y[0] = i._to.call(this, y[0], "y");
                            y[1] = i._to.call(this, y[1], "x");
                            if (s.moveDragger) {
                                y[0] *= x.scrollRatio.y;
                                y[1] *= x.scrollRatio.x
                            }
                            s.dur = t;
                            setTimeout(function () {
                                if (y[0] !== null && typeof y[0] !== "undefined" && w.axis !== "x" && x.overflowed[0]) {
                                    s.dir = "y";
                                    s.overwrite = "all";
                                    i._scrollTo.call(this, u, y[0].toString(), s)
                                }
                                if (y[1] !== null && typeof y[1] !== "undefined" && w.axis !== "y" && x.overflowed[1]) {
                                    s.dir = "x";
                                    s.overwrite = "none";
                                    i._scrollTo.call(this, u, y[1].toString(), s)
                                }
                            }, 60)
                        }
                    })
                },
                stop: function () {
                    var p = i._selector.call(this);
                    return j(p).each(function () {
                        var q = j(this);
                        if (q.data(d)) {
                            i._stop.call(null, q)
                        }
                    })
                },
                disable: function (q) {
                    var p = i._selector.call(this);
                    return j(p).each(function () {
                        var r = j(this);
                        if (r.data(d)) {
                            var t = r.data(d),
                                s = t.opt;
                            i._autoUpdate.call(this, "remove");
                            i._unbindEvents.call(this);
                            if (q) {
                                i._resetContentPosition.call(this)
                            }
                            i._scrollbarVisibility.call(this, true);
                            r.addClass("mCS_disabled")
                        }
                    })
                },
                destroy: function () {
                    var p = i._selector.call(this);
                    return j(p).each(function () {
                        var s = j(this);
                        if (s.data(d)) {
                            var u = s.data(d),
                                t = u.opt,
                                q = j("#mCSB_" + u.idx),
                                r = j("#mCSB_" + u.idx + "_container"),
                                v = j(".mCSB_" + u.idx + "_scrollbar");
                            if (t.live) {
                                f(p)
                            }
                            i._autoUpdate.call(this, "remove");
                            i._unbindEvents.call(this);
                            i._resetContentPosition.call(this);
                            s.removeData(d);
                            i._delete.call(null, this.mcs);
                            v.remove();
                            q.replaceWith(r.contents());
                            s.removeClass(g + " _" + d + "_" + u.idx + " mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")
                        }
                    })
                }
            },
            i = {
                _selector: function () {
                    return (typeof j(this) !== "object" || j(this).length < 1) ? m : this
                },
                _theme: function (s) {
                    var r = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                        q = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                        p = ["minimal", "minimal-dark"],
                        u = ["minimal", "minimal-dark"],
                        t = ["minimal", "minimal-dark"];
                    s.autoDraggerLength = j.inArray(s.theme, r) > -1 ? false : s.autoDraggerLength;
                    s.autoExpandScrollbar = j.inArray(s.theme, q) > -1 ? false : s.autoExpandScrollbar;
                    s.scrollButtons.enable = j.inArray(s.theme, p) > -1 ? false : s.scrollButtons.enable;
                    s.autoHideScrollbar = j.inArray(s.theme, u) > -1 ? true : s.autoHideScrollbar;
                    s.scrollbarPosition = j.inArray(s.theme, t) > -1 ? "outside" : s.scrollbarPosition
                },
                _findAxis: function (p) {
                    return (p === "yx" || p === "xy" || p === "auto") ? "yx" : (p === "x" || p === "horizontal") ? "x" : "y"
                },
                _findScrollButtonsType: function (p) {
                    return (p === "stepped" || p === "pixels" || p === "step" || p === "click") ? "stepped" : "stepless"
                },
                _pluginMarkup: function () {
                    var y = j(this),
                        x = y.data(d),
                        r = x.opt,
                        t = r.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : "",
                        B = ["<div id='mCSB_" + x.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + x.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_vertical" + t + "'><div class='mCSB_draggerContainer'><div id='mCSB_" + x.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + x.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + x.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_horizontal" + t + "'><div class='mCSB_draggerContainer'><div id='mCSB_" + x.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                        u = r.axis === "yx" ? "mCSB_vertical_horizontal" : r.axis === "x" ? "mCSB_horizontal" : "mCSB_vertical",
                        w = r.axis === "yx" ? B[0] + B[1] : r.axis === "x" ? B[1] : B[0],
                        v = r.axis === "yx" ? "<div id='mCSB_" + x.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                        s = r.autoHideScrollbar ? " mCS-autoHide" : "",
                        p = (r.axis !== "x" && x.langDir === "rtl") ? " mCS-dir-rtl" : "";
                    if (r.setWidth) {
                        y.css("width", r.setWidth)
                    }
                    if (r.setHeight) {
                        y.css("height", r.setHeight)
                    }
                    r.setLeft = (r.axis !== "y" && x.langDir === "rtl") ? "989999px" : r.setLeft;
                    y.addClass(g + " _" + d + "_" + x.idx + s + p).wrapInner("<div id='mCSB_" + x.idx + "' class='mCustomScrollBox mCS-" + r.theme + " " + u + "'><div id='mCSB_" + x.idx + "_container' class='mCSB_container' style='position:relative; top:" + r.setTop + "; left:" + r.setLeft + ";' dir=" + x.langDir + " /></div>");
                    var q = j("#mCSB_" + x.idx),
                        z = j("#mCSB_" + x.idx + "_container");
                    if (r.axis !== "y" && !r.advanced.autoExpandHorizontalScroll) {
                        z.css("width", i._contentWidth(z.children()))
                    }
                    if (r.scrollbarPosition === "outside") {
                        if (y.css("position") === "static") {
                            y.css("position", "relative")
                        }
                        y.css("overflow", "visible");
                        q.addClass("mCSB_outside").after(w)
                    } else {
                        q.addClass("mCSB_inside").append(w);
                        z.wrap(v)
                    }
                    i._scrollButtons.call(this);
                    var A = [j("#mCSB_" + x.idx + "_dragger_vertical"), j("#mCSB_" + x.idx + "_dragger_horizontal")];
                    A[0].css("min-height", A[0].height());
                    A[1].css("min-width", A[1].width())
                },
                _contentWidth: function (p) {
                    return Math.max.apply(Math, p.map(function () {
                        return j(this).outerWidth(true)
                    }).get())
                },
                _expandContentHorizontally: function () {
                    var q = j(this),
                        s = q.data(d),
                        r = s.opt,
                        p = j("#mCSB_" + s.idx + "_container");
                    if (r.advanced.autoExpandHorizontalScroll && r.axis !== "y") {
                        p.css({
                            position: "absolute",
                            width: "auto"
                        }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                            width: (Math.ceil(p[0].getBoundingClientRect().right + 0.4) - Math.floor(p[0].getBoundingClientRect().left)),
                            position: "relative"
                        }).unwrap()
                    }
                },
                _scrollButtons: function () {
                    var s = j(this),
                        u = s.data(d),
                        t = u.opt,
                        q = j(".mCSB_" + u.idx + "_scrollbar:first"),
                        r = ["<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"],
                        p = [(t.axis === "x" ? r[2] : r[0]), (t.axis === "x" ? r[3] : r[1]), r[2], r[3]];
                    if (t.scrollButtons.enable) {
                        q.prepend(p[0]).append(p[1]).next(".mCSB_scrollTools").prepend(p[2]).append(p[3])
                    }
                },
                _maxHeight: function () {
                    var t = j(this),
                        w = t.data(d),
                        v = w.opt,
                        r = j("#mCSB_" + w.idx),
                        q = t.css("max-height"),
                        s = q.indexOf("%") !== -1,
                        p = t.css("box-sizing");
                    if (q !== "none") {
                        var u = s ? t.parent().height() * parseInt(q) / 100 : parseInt(q);
                        if (p === "border-box") {
                            u -= ((t.innerHeight() - t.height()) + (t.outerHeight() - t.innerHeight()))
                        }
                        r.css("max-height", Math.round(u))
                    }
                },
                _setDraggerLength: function () {
                    var u = j(this),
                        s = u.data(d),
                        p = j("#mCSB_" + s.idx),
                        v = j("#mCSB_" + s.idx + "_container"),
                        y = [j("#mCSB_" + s.idx + "_dragger_vertical"), j("#mCSB_" + s.idx + "_dragger_horizontal")],
                        t = [p.height() / v.outerHeight(false), p.width() / v.outerWidth(false)],
                        q = [parseInt(y[0].css("min-height")), Math.round(t[0] * y[0].parent().height()), parseInt(y[1].css("min-width")), Math.round(t[1] * y[1].parent().width())],
                        r = k && (q[1] < q[0]) ? q[0] : q[1],
                        x = k && (q[3] < q[2]) ? q[2] : q[3];
                    y[0].css({
                        height: r,
                        "max-height": (y[0].parent().height() - 10)
                    }).find(".mCSB_dragger_bar").css({
                        "line-height": q[0] + "px"
                    });
                    y[1].css({
                        width: x,
                        "max-width": (y[1].parent().width() - 10)
                    })
                },
                _scrollRatio: function () {
                    var t = j(this),
                        v = t.data(d),
                        q = j("#mCSB_" + v.idx),
                        r = j("#mCSB_" + v.idx + "_container"),
                        s = [j("#mCSB_" + v.idx + "_dragger_vertical"), j("#mCSB_" + v.idx + "_dragger_horizontal")],
                        u = [r.outerHeight(false) - q.height(), r.outerWidth(false) - q.width()],
                        p = [u[0] / (s[0].parent().height() - s[0].height()), u[1] / (s[1].parent().width() - s[1].width())];
                    v.scrollRatio = {
                        y: p[0],
                        x: p[1]
                    }
                },
                _onDragClasses: function (r, t, q) {
                    var s = q ? "mCSB_dragger_onDrag_expanded" : "",
                        p = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag"],
                        u = r.closest(".mCSB_scrollTools");
                    if (t === "active") {
                        r.toggleClass(p[0] + " " + s);
                        u.toggleClass(p[1]);
                        r[0]._draggable = r[0]._draggable ? 0 : 1
                    } else {
                        if (!r[0]._draggable) {
                            if (t === "hide") {
                                r.removeClass(p[0]);
                                u.removeClass(p[1])
                            } else {
                                r.addClass(p[0]);
                                u.addClass(p[1])
                            }
                        }
                    }
                },
                _overflowed: function () {
                    var t = j(this),
                        u = t.data(d),
                        q = j("#mCSB_" + u.idx),
                        s = j("#mCSB_" + u.idx + "_container"),
                        r = u.overflowed == null ? s.height() : s.outerHeight(false),
                        p = u.overflowed == null ? s.width() : s.outerWidth(false);
                    return [r > q.height(), p > q.width()]
                },
                _resetContentPosition: function () {
                    var t = j(this),
                        v = t.data(d),
                        u = v.opt,
                        q = j("#mCSB_" + v.idx),
                        r = j("#mCSB_" + v.idx + "_container"),
                        s = [j("#mCSB_" + v.idx + "_dragger_vertical"), j("#mCSB_" + v.idx + "_dragger_horizontal")];
                    i._stop(t);
                    if ((u.axis !== "x" && !v.overflowed[0]) || (u.axis === "y" && v.overflowed[0])) {
                        s[0].add(r).css("top", 0)
                    }
                    if ((u.axis !== "y" && !v.overflowed[1]) || (u.axis === "x" && v.overflowed[1])) {
                        var p = dx = 0;
                        if (v.langDir === "rtl") {
                            p = q.width() - r.outerWidth(false);
                            dx = Math.abs(p / v.scrollRatio.x)
                        }
                        r.css("left", p);
                        s[1].css("left", dx)
                    }
                },
                _bindEvents: function () {
                    var r = j(this),
                        t = r.data(d),
                        s = t.opt;
                    if (!t.bindEvents) {
                        i._draggable.call(this);
                        if (s.contentTouchScroll) {
                            i._contentDraggable.call(this)
                        }
                        if (s.mouseWheel.enable) {
                            function q() {
                                p = setTimeout(function () {
                                    if (!j.event.special.mousewheel) {
                                        q()
                                    } else {
                                        clearTimeout(p);
                                        i._mousewheel.call(r[0])
                                    }
                                }, 1000)
                            }
                            var p;
                            q()
                        }
                        i._draggerRail.call(this);
                        i._wrapperScroll.call(this);
                        if (s.advanced.autoScrollOnFocus) {
                            i._focus.call(this)
                        }
                        if (s.scrollButtons.enable) {
                            i._buttons.call(this)
                        }
                        if (s.keyboard.enable) {
                            i._keyboard.call(this)
                        }
                        t.bindEvents = true
                    }
                },
                _unbindEvents: function () {
                    var s = j(this),
                        t = s.data(d),
                        p = d + "_" + t.idx,
                        u = ".mCSB_" + t.idx + "_scrollbar",
                        r = j("#mCSB_" + t.idx + ",#mCSB_" + t.idx + "_container,#mCSB_" + t.idx + "_container_wrapper," + u + " .mCSB_draggerContainer,#mCSB_" + t.idx + "_dragger_vertical,#mCSB_" + t.idx + "_dragger_horizontal," + u + ">a"),
                        q = j("#mCSB_" + t.idx + "_container");
                    if (t.bindEvents) {
                        j(a).unbind("." + p);
                        r.each(function () {
                            j(this).unbind("." + p)
                        });
                        clearTimeout(s[0]._focusTimeout);
                        i._delete.call(null, s[0]._focusTimeout);
                        clearTimeout(t.sequential.step);
                        i._delete.call(null, t.sequential.step);
                        clearTimeout(q[0].onCompleteTimeout);
                        i._delete.call(null, q[0].onCompleteTimeout);
                        t.bindEvents = false
                    }
                },
                _scrollbarVisibility: function (q) {
                    var t = j(this),
                        v = t.data(d),
                        u = v.opt,
                        p = j("#mCSB_" + v.idx + "_container_wrapper"),
                        r = p.length ? p : j("#mCSB_" + v.idx + "_container"),
                        w = [j("#mCSB_" + v.idx + "_scrollbar_vertical"), j("#mCSB_" + v.idx + "_scrollbar_horizontal")],
                        s = [w[0].find(".mCSB_dragger"), w[1].find(".mCSB_dragger")];
                    if (u.axis !== "x") {
                        if (v.overflowed[0] && !q) {
                            w[0].add(s[0]).add(w[0].children("a")).css("display", "block");
                            r.removeClass("mCS_no_scrollbar_y mCS_y_hidden")
                        } else {
                            if (u.alwaysShowScrollbar) {
                                if (u.alwaysShowScrollbar !== 2) {
                                    s[0].add(w[0].children("a")).css("display", "none")
                                }
                                r.removeClass("mCS_y_hidden")
                            } else {
                                w[0].css("display", "none");
                                r.addClass("mCS_y_hidden")
                            }
                            r.addClass("mCS_no_scrollbar_y")
                        }
                    }
                    if (u.axis !== "y") {
                        if (v.overflowed[1] && !q) {
                            w[1].add(s[1]).add(w[1].children("a")).css("display", "block");
                            r.removeClass("mCS_no_scrollbar_x mCS_x_hidden")
                        } else {
                            if (u.alwaysShowScrollbar) {
                                if (u.alwaysShowScrollbar !== 2) {
                                    s[1].add(w[1].children("a")).css("display", "none")
                                }
                                r.removeClass("mCS_x_hidden")
                            } else {
                                w[1].css("display", "none");
                                r.addClass("mCS_x_hidden")
                            }
                            r.addClass("mCS_no_scrollbar_x")
                        }
                    }
                    if (!v.overflowed[0] && !v.overflowed[1]) {
                        t.addClass("mCS_no_scrollbar")
                    } else {
                        t.removeClass("mCS_no_scrollbar")
                    }
                },
                _coordinates: function (q) {
                    var p = q.type;
                    switch (p) {
                        case "pointerdown":
                        case "MSPointerDown":
                        case "pointermove":
                        case "MSPointerMove":
                        case "pointerup":
                        case "MSPointerUp":
                            return [q.originalEvent.pageY, q.originalEvent.pageX];
                            break;
                        case "touchstart":
                        case "touchmove":
                        case "touchend":
                            var r = q.originalEvent.touches[0] || q.originalEvent.changedTouches[0];
                            return [r.pageY, r.pageX];
                            break;
                        default:
                            return [q.pageY, q.pageX]
                    }
                },
                _draggable: function () {
                    var u = j(this),
                        s = u.data(d),
                        p = s.opt,
                        r = d + "_" + s.idx,
                        t = ["mCSB_" + s.idx + "_dragger_vertical", "mCSB_" + s.idx + "_dragger_horizontal"],
                        v = j("#mCSB_" + s.idx + "_container"),
                        w = j("#" + t[0] + ",#" + t[1]),
                        A, y, z;
                    w.bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r, function (E) {
                        E.stopImmediatePropagation();
                        E.preventDefault();
                        if (!i._mouseBtnLeft(E)) {
                            return
                        }
                        n = true;
                        if (k) {
                            a.onselectstart = function () {
                                return false
                            }
                        }
                        x(false);
                        i._stop(u);
                        A = j(this);
                        var F = A.offset(),
                            G = i._coordinates(E)[0] - F.top,
                            B = i._coordinates(E)[1] - F.left,
                            D = A.height() + F.top,
                            C = A.width() + F.left;
                        if (G < D && G > 0 && B < C && B > 0) {
                            y = G;
                            z = B
                        }
                        i._onDragClasses(A, "active", p.autoExpandScrollbar)
                    }).bind("touchmove." + r, function (C) {
                        C.stopImmediatePropagation();
                        C.preventDefault();
                        var D = A.offset(),
                            E = i._coordinates(C)[0] - D.top,
                            B = i._coordinates(C)[1] - D.left;
                        q(y, z, E, B)
                    });
                    j(a).bind("mousemove." + r + " pointermove." + r + " MSPointerMove." + r, function (C) {
                        if (A) {
                            var D = A.offset(),
                                E = i._coordinates(C)[0] - D.top,
                                B = i._coordinates(C)[1] - D.left;
                            if (y === E) {
                                return
                            }
                            q(y, z, E, B)
                        }
                    }).add(w).bind("mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r, function (B) {
                        if (A) {
                            i._onDragClasses(A, "active", p.autoExpandScrollbar);
                            A = null
                        }
                        n = false;
                        if (k) {
                            a.onselectstart = null
                        }
                        x(true)
                    });

                    function x(B) {
                        var C = v.find("iframe");
                        if (!C.length) {
                            return
                        }
                        var D = !B ? "none" : "auto";
                        C.css("pointer-events", D)
                    }

                    function q(D, E, G, B) {
                        v[0].idleTimer = p.scrollInertia < 233 ? 250 : 0;
                        if (A.attr("id") === t[1]) {
                            var C = "x",
                                F = ((A[0].offsetLeft - E) + B) * s.scrollRatio.x
                        } else {
                            var C = "y",
                                F = ((A[0].offsetTop - D) + G) * s.scrollRatio.y
                        }
                        i._scrollTo(u, F.toString(), {
                            dir: C,
                            drag: true
                        })
                    }
                },
                _contentDraggable: function () {
                    var y = j(this),
                        K = y.data(d),
                        I = K.opt,
                        F = d + "_" + K.idx,
                        v = j("#mCSB_" + K.idx),
                        z = j("#mCSB_" + K.idx + "_container"),
                        w = [j("#mCSB_" + K.idx + "_dragger_vertical"), j("#mCSB_" + K.idx + "_dragger_horizontal")],
                        E, G, L, M, C = [],
                        D = [],
                        H, A, u, t, J, x, r = 0,
                        q, s = I.axis === "yx" ? "none" : "all";
                    z.bind("touchstart." + F + " pointerdown." + F + " MSPointerDown." + F, function (N) {
                        if (!i._pointerTouch(N) || n) {
                            return
                        }
                        var O = z.offset();
                        E = i._coordinates(N)[0] - O.top;
                        G = i._coordinates(N)[1] - O.left
                    }).bind("touchmove." + F + " pointermove." + F + " MSPointerMove." + F, function (Q) {
                        if (!i._pointerTouch(Q) || n) {
                            return
                        }
                        Q.stopImmediatePropagation();
                        A = i._getTime();
                        var P = v.offset(),
                            S = i._coordinates(Q)[0] - P.top,
                            U = i._coordinates(Q)[1] - P.left,
                            R = "mcsLinearOut";
                        C.push(S);
                        D.push(U);
                        if (K.overflowed[0]) {
                            var O = w[0].parent().height() - w[0].height(),
                                T = ((E - S) > 0 && (S - E) > -(O * K.scrollRatio.y))
                        }
                        if (K.overflowed[1]) {
                            var N = w[1].parent().width() - w[1].width(),
                                V = ((G - U) > 0 && (U - G) > -(N * K.scrollRatio.x))
                        }
                        if (T || V) {
                            Q.preventDefault()
                        }
                        x = I.axis === "yx" ? [(E - S), (G - U)] : I.axis === "x" ? [null, (G - U)] : [(E - S), null];
                        z[0].idleTimer = 250;
                        if (K.overflowed[0]) {
                            B(x[0], r, R, "y", "all", true)
                        }
                        if (K.overflowed[1]) {
                            B(x[1], r, R, "x", s, true)
                        }
                    });
                    v.bind("touchstart." + F + " pointerdown." + F + " MSPointerDown." + F, function (N) {
                        if (!i._pointerTouch(N) || n) {
                            return
                        }
                        N.stopImmediatePropagation();
                        i._stop(y);
                        H = i._getTime();
                        var O = v.offset();
                        L = i._coordinates(N)[0] - O.top;
                        M = i._coordinates(N)[1] - O.left;
                        C = [];
                        D = []
                    }).bind("touchend." + F + " pointerup." + F + " MSPointerUp." + F, function (P) {
                        if (!i._pointerTouch(P) || n) {
                            return
                        }
                        P.stopImmediatePropagation();
                        u = i._getTime();
                        var N = v.offset(),
                            T = i._coordinates(P)[0] - N.top,
                            V = i._coordinates(P)[1] - N.left;
                        if ((u - A) > 30) {
                            return
                        }
                        J = 1000 / (u - H);
                        var Q = "mcsEaseOut",
                            R = J < 2.5,
                            W = R ? [C[C.length - 2], D[D.length - 2]] : [0, 0];
                        t = R ? [(T - W[0]), (V - W[1])] : [T - L, V - M];
                        var O = [Math.abs(t[0]), Math.abs(t[1])];
                        J = R ? [Math.abs(t[0] / 4), Math.abs(t[1] / 4)] : [J, J];
                        var U = [Math.abs(z[0].offsetTop) - (t[0] * p((O[0] / J[0]), J[0])), Math.abs(z[0].offsetLeft) - (t[1] * p((O[1] / J[1]), J[1]))];
                        x = I.axis === "yx" ? [U[0], U[1]] : I.axis === "x" ? [null, U[1]] : [U[0], null];
                        q = [(O[0] * 4) + I.scrollInertia, (O[1] * 4) + I.scrollInertia];
                        var S = parseInt(I.contentTouchScroll) || 0;
                        x[0] = O[0] > S ? x[0] : 0;
                        x[1] = O[1] > S ? x[1] : 0;
                        if (K.overflowed[0]) {
                            B(x[0], q[0], Q, "y", s, false)
                        }
                        if (K.overflowed[1]) {
                            B(x[1], q[1], Q, "x", s, false)
                        }
                    });

                    function p(P, N) {
                        var O = [N * 1.5, N * 2, N / 1.5, N / 2];
                        if (P > 90) {
                            return N > 4 ? O[0] : O[3]
                        } else {
                            if (P > 60) {
                                return N > 3 ? O[3] : O[2]
                            } else {
                                if (P > 30) {
                                    return N > 8 ? O[1] : N > 6 ? O[0] : N > 4 ? N : O[2]
                                } else {
                                    return N > 8 ? N : O[3]
                                }
                            }
                        }
                    }

                    function B(P, R, S, O, N, Q) {
                        if (!P) {
                            return
                        }
                        i._scrollTo(y, P.toString(), {
                            dur: R,
                            scrollEasing: S,
                            dir: O,
                            overwrite: N,
                            drag: Q
                        })
                    }
                },
                _mousewheel: function () {
                    var s = j(this),
                        u = s.data(d);
                    if (u) {
                        var t = u.opt,
                            q = d + "_" + u.idx,
                            p = j("#mCSB_" + u.idx),
                            r = [j("#mCSB_" + u.idx + "_dragger_vertical"), j("#mCSB_" + u.idx + "_dragger_horizontal")];
                        p.bind("mousewheel." + q, function (z, D) {
                            i._stop(s);
                            if (i._disableMousewheel(s, z.target)) {
                                return
                            }
                            var B = t.mouseWheel.deltaFactor !== "auto" ? parseInt(t.mouseWheel.deltaFactor) : (k && z.deltaFactor < 100) ? 100 : z.deltaFactor < 40 ? 40 : z.deltaFactor || 100;
                            if (t.axis === "x" || t.mouseWheel.axis === "x") {
                                var w = "x",
                                    C = [Math.round(B * u.scrollRatio.x), parseInt(t.mouseWheel.scrollAmount)],
                                    y = t.mouseWheel.scrollAmount !== "auto" ? C[1] : C[0] >= p.width() ? p.width() * 0.9 : C[0],
                                    E = Math.abs(j("#mCSB_" + u.idx + "_container")[0].offsetLeft),
                                    A = r[1][0].offsetLeft,
                                    x = r[1].parent().width() - r[1].width(),
                                    v = z.deltaX || z.deltaY || D
                            } else {
                                var w = "y",
                                    C = [Math.round(B * u.scrollRatio.y), parseInt(t.mouseWheel.scrollAmount)],
                                    y = t.mouseWheel.scrollAmount !== "auto" ? C[1] : C[0] >= p.height() ? p.height() * 0.9 : C[0],
                                    E = Math.abs(j("#mCSB_" + u.idx + "_container")[0].offsetTop),
                                    A = r[0][0].offsetTop,
                                    x = r[0].parent().height() - r[0].height(),
                                    v = z.deltaY || D
                            }
                            if ((w === "y" && !u.overflowed[0]) || (w === "x" && !u.overflowed[1])) {
                                return
                            }
                            if (t.mouseWheel.invert) {
                                v = -v
                            }
                            if (t.mouseWheel.normalizeDelta) {
                                v = v < 0 ? -1 : 1
                            }
                            if ((v > 0 && A !== 0) || (v < 0 && A !== x) || t.mouseWheel.preventDefault) {
                                z.stopImmediatePropagation();
                                z.preventDefault()
                            }
                            i._scrollTo(s, (E - (v * y)).toString(), {
                                dir: w
                            })
                        })
                    }
                },
                _disableMousewheel: function (r, t) {
                    var p = t.nodeName.toLowerCase(),
                        q = r.data(d).opt.mouseWheel.disableOver,
                        s = ["select", "textarea"];
                    return j.inArray(p, q) > -1 && !(j.inArray(p, s) > -1 && !j(t).is(":focus"))
                },
                _draggerRail: function () {
                    var s = j(this),
                        t = s.data(d),
                        q = d + "_" + t.idx,
                        r = j("#mCSB_" + t.idx + "_container"),
                        u = r.parent(),
                        p = j(".mCSB_" + t.idx + "_scrollbar .mCSB_draggerContainer");
                    p.bind("touchstart." + q + " pointerdown." + q + " MSPointerDown." + q, function (v) {
                        n = true
                    }).bind("touchend." + q + " pointerup." + q + " MSPointerUp." + q, function (v) {
                        n = false
                    }).bind("click." + q, function (z) {
                        if (j(z.target).hasClass("mCSB_draggerContainer") || j(z.target).hasClass("mCSB_draggerRail")) {
                            i._stop(s);
                            var w = j(this),
                                y = w.find(".mCSB_dragger");
                            if (w.parent(".mCSB_scrollTools_horizontal").length > 0) {
                                if (!t.overflowed[1]) {
                                    return
                                }
                                var v = "x",
                                    x = z.pageX > y.offset().left ? -1 : 1,
                                    A = Math.abs(r[0].offsetLeft) - (x * (u.width() * 0.9))
                            } else {
                                if (!t.overflowed[0]) {
                                    return
                                }
                                var v = "y",
                                    x = z.pageY > y.offset().top ? -1 : 1,
                                    A = Math.abs(r[0].offsetTop) - (x * (u.height() * 0.9))
                            }
                            i._scrollTo(s, A.toString(), {
                                dir: v,
                                scrollEasing: "mcsEaseInOut"
                            })
                        }
                    })
                },
                _focus: function () {
                    var r = j(this),
                        t = r.data(d),
                        s = t.opt,
                        p = d + "_" + t.idx,
                        q = j("#mCSB_" + t.idx + "_container"),
                        u = q.parent();
                    q.bind("focusin." + p, function (x) {
                        var w = j(a.activeElement),
                            y = q.find(".mCustomScrollBox").length,
                            v = 0;
                        if (!w.is(s.advanced.autoScrollOnFocus)) {
                            return
                        }
                        i._stop(r);
                        clearTimeout(r[0]._focusTimeout);
                        r[0]._focusTimer = y ? (v + 17) * y : 0;
                        r[0]._focusTimeout = setTimeout(function () {
                            var C = [w.offset().top - q.offset().top, w.offset().left - q.offset().left],
                                B = [q[0].offsetTop, q[0].offsetLeft],
                                z = [(B[0] + C[0] >= 0 && B[0] + C[0] < u.height() - w.outerHeight(false)), (B[1] + C[1] >= 0 && B[0] + C[1] < u.width() - w.outerWidth(false))],
                                A = (s.axis === "yx" && !z[0] && !z[1]) ? "none" : "all";
                            if (s.axis !== "x" && !z[0]) {
                                i._scrollTo(r, C[0].toString(), {
                                    dir: "y",
                                    scrollEasing: "mcsEaseInOut",
                                    overwrite: A,
                                    dur: v
                                })
                            }
                            if (s.axis !== "y" && !z[1]) {
                                i._scrollTo(r, C[1].toString(), {
                                    dir: "x",
                                    scrollEasing: "mcsEaseInOut",
                                    overwrite: A,
                                    dur: v
                                })
                            }
                        }, r[0]._focusTimer)
                    })
                },
                _wrapperScroll: function () {
                    var q = j(this),
                        r = q.data(d),
                        p = d + "_" + r.idx,
                        s = j("#mCSB_" + r.idx + "_container").parent();
                    s.bind("scroll." + p, function (t) {
                        s.scrollTop(0).scrollLeft(0)
                    })
                },
                _buttons: function () {
                    var u = j(this),
                        w = u.data(d),
                        v = w.opt,
                        p = w.sequential,
                        r = d + "_" + w.idx,
                        t = j("#mCSB_" + w.idx + "_container"),
                        s = ".mCSB_" + w.idx + "_scrollbar",
                        q = j(s + ">a");
                    q.bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function (z) {
                        z.preventDefault();
                        if (!i._mouseBtnLeft(z)) {
                            return
                        }
                        var y = j(this).attr("class");
                        p.type = v.scrollButtons.scrollType;
                        switch (z.type) {
                            case "mousedown":
                            case "touchstart":
                            case "pointerdown":
                            case "MSPointerDown":
                                if (p.type === "stepped") {
                                    return
                                }
                                n = true;
                                w.tweenRunning = false;
                                x("on", y);
                                break;
                            case "mouseup":
                            case "touchend":
                            case "pointerup":
                            case "MSPointerUp":
                            case "mouseout":
                            case "pointerout":
                            case "MSPointerOut":
                                if (p.type === "stepped") {
                                    return
                                }
                                n = false;
                                if (p.dir) {
                                    x("off", y)
                                }
                                break;
                            case "click":
                                if (p.type !== "stepped" || w.tweenRunning) {
                                    return
                                }
                                x("on", y);
                                break
                        }

                        function x(A, B) {
                            p.scrollAmount = v.snapAmount || v.scrollButtons.scrollAmount;
                            i._sequentialScroll.call(this, u, A, B)
                        }
                    })
                },
                _keyboard: function () {
                    var u = j(this),
                        t = u.data(d),
                        q = t.opt,
                        x = t.sequential,
                        s = d + "_" + t.idx,
                        r = j("#mCSB_" + t.idx),
                        w = j("#mCSB_" + t.idx + "_container"),
                        p = w.parent(),
                        v = "input,textarea,select,datalist,keygen,[contenteditable='true']";
                    r.attr("tabindex", "0").bind("blur." + s + " keydown." + s + " keyup." + s, function (D) {
                        switch (D.type) {
                            case "blur":
                                if (t.tweenRunning && x.dir) {
                                    y("off", null)
                                }
                                break;
                            case "keydown":
                            case "keyup":
                                var A = D.keyCode ? D.keyCode : D.which,
                                    B = "on";
                                if ((q.axis !== "x" && (A === 38 || A === 40)) || (q.axis !== "y" && (A === 37 || A === 39))) {
                                    if (((A === 38 || A === 40) && !t.overflowed[0]) || ((A === 37 || A === 39) && !t.overflowed[1])) {
                                        return
                                    }
                                    if (D.type === "keyup") {
                                        B = "off"
                                    }
                                    if (!j(a.activeElement).is(v)) {
                                        D.preventDefault();
                                        D.stopImmediatePropagation();
                                        y(B, A)
                                    }
                                } else {
                                    if (A === 33 || A === 34) {
                                        if (t.overflowed[0] || t.overflowed[1]) {
                                            D.preventDefault();
                                            D.stopImmediatePropagation()
                                        }
                                        if (D.type === "keyup") {
                                            i._stop(u);
                                            var C = A === 34 ? -1 : 1;
                                            if (q.axis === "x" || (q.axis === "yx" && t.overflowed[1] && !t.overflowed[0])) {
                                                var z = "x",
                                                    E = Math.abs(w[0].offsetLeft) - (C * (p.width() * 0.9))
                                            } else {
                                                var z = "y",
                                                    E = Math.abs(w[0].offsetTop) - (C * (p.height() * 0.9))
                                            }
                                            i._scrollTo(u, E.toString(), {
                                                dir: z,
                                                scrollEasing: "mcsEaseInOut"
                                            })
                                        }
                                    } else {
                                        if (A === 35 || A === 36) {
                                            if (!j(a.activeElement).is(v)) {
                                                if (t.overflowed[0] || t.overflowed[1]) {
                                                    D.preventDefault();
                                                    D.stopImmediatePropagation()
                                                }
                                                if (D.type === "keyup") {
                                                    if (q.axis === "x" || (q.axis === "yx" && t.overflowed[1] && !t.overflowed[0])) {
                                                        var z = "x",
                                                            E = A === 35 ? Math.abs(p.width() - w.outerWidth(false)) : 0
                                                    } else {
                                                        var z = "y",
                                                            E = A === 35 ? Math.abs(p.height() - w.outerHeight(false)) : 0
                                                    }
                                                    i._scrollTo(u, E.toString(), {
                                                        dir: z,
                                                        scrollEasing: "mcsEaseInOut"
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                                break
                        }

                        function y(F, G) {
                            x.type = q.keyboard.scrollType;
                            x.scrollAmount = q.snapAmount || q.keyboard.scrollAmount;
                            if (x.type === "stepped" && t.tweenRunning) {
                                return
                            }
                            i._sequentialScroll.call(this, u, F, G)
                        }
                    })
                },
                _sequentialScroll: function (r, u, s) {
                    var w = r.data(d),
                        q = w.opt,
                        y = w.sequential,
                        x = j("#mCSB_" + w.idx + "_container"),
                        p = y.type === "stepped" ? true : false;
                    switch (u) {
                        case "on":
                            y.dir = [(s === "mCSB_buttonRight" || s === "mCSB_buttonLeft" || s === 39 || s === 37 ? "x" : "y"), (s === "mCSB_buttonUp" || s === "mCSB_buttonLeft" || s === 38 || s === 37 ? -1 : 1)];
                            i._stop(r);
                            if (i._isNumeric(s) && y.type === "stepped") {
                                return
                            }
                            t(p);
                            break;
                        case "off":
                            v();
                            if (p || (w.tweenRunning && y.dir)) {
                                t(true)
                            }
                            break
                    }

                    function t(z) {
                        var F = y.type !== "stepped",
                            J = !z ? 1000 / 60 : F ? q.scrollInertia / 1.5 : q.scrollInertia,
                            B = !z ? 2.5 : F ? 7.5 : 40,
                            I = [Math.abs(x[0].offsetTop), Math.abs(x[0].offsetLeft)],
                            E = [w.scrollRatio.y > 10 ? 10 : w.scrollRatio.y, w.scrollRatio.x > 10 ? 10 : w.scrollRatio.x],
                            C = y.dir[0] === "x" ? I[1] + (y.dir[1] * (E[1] * B)) : I[0] + (y.dir[1] * (E[0] * B)),
                            H = y.dir[0] === "x" ? I[1] + (y.dir[1] * parseInt(y.scrollAmount)) : I[0] + (y.dir[1] * parseInt(y.scrollAmount)),
                            G = y.scrollAmount !== "auto" ? H : C,
                            D = !z ? "mcsLinear" : F ? "mcsLinearOut" : "mcsEaseInOut",
                            A = !z ? false : true;
                        if (z && J < 17) {
                            G = y.dir[0] === "x" ? I[1] : I[0]
                        }
                        i._scrollTo(r, G.toString(), {
                            dir: y.dir[0],
                            scrollEasing: D,
                            dur: J,
                            onComplete: A
                        });
                        if (z) {
                            y.dir = false;
                            return
                        }
                        clearTimeout(y.step);
                        y.step = setTimeout(function () {
                            t()
                        }, J)
                    }

                    function v() {
                        clearTimeout(y.step);
                        i._stop(r)
                    }
                },
                _arr: function (r) {
                    var q = j(this).data(d).opt,
                        p = [];
                    if (typeof r === "function") {
                        r = r()
                    }
                    if (!(r instanceof Array)) {
                        p[0] = r.y ? r.y : r.x || q.axis === "x" ? null : r;
                        p[1] = r.x ? r.x : r.y || q.axis === "y" ? null : r
                    } else {
                        p = r.length > 1 ? [r[0], r[1]] : q.axis === "x" ? [null, r[0]] : [r[0], null]
                    }
                    if (typeof p[0] === "function") {
                        p[0] = p[0]()
                    }
                    if (typeof p[1] === "function") {
                        p[1] = p[1]()
                    }
                    return p
                },
                _to: function (v, w) {
                    if (v == null || typeof v == "undefined") {
                        return
                    }
                    var C = j(this),
                        B = C.data(d),
                        u = B.opt,
                        D = j("#mCSB_" + B.idx + "_container"),
                        r = D.parent(),
                        F = typeof v;
                    if (!w) {
                        w = u.axis === "x" ? "x" : "y"
                    }
                    var q = w === "x" ? D.outerWidth(false) : D.outerHeight(false),
                        x = w === "x" ? D.offset().left : D.offset().top,
                        E = w === "x" ? D[0].offsetLeft : D[0].offsetTop,
                        z = w === "x" ? "left" : "top";
                    switch (F) {
                        case "function":
                            return v();
                            break;
                        case "object":
                            if (v.nodeType) {
                                var A = w === "x" ? j(v).offset().left : j(v).offset().top
                            } else {
                                if (v.jquery) {
                                    if (!v.length) {
                                        return
                                    }
                                    var A = w === "x" ? v.offset().left : v.offset().top
                                }
                            }
                            return A - x;
                            break;
                        case "string":
                        case "number":
                            if (i._isNumeric.call(null, v)) {
                                return Math.abs(v)
                            } else {
                                if (v.indexOf("%") !== -1) {
                                    return Math.abs(q * parseInt(v) / 100)
                                } else {
                                    if (v.indexOf("-=") !== -1) {
                                        return Math.abs(E - parseInt(v.split("-=")[1]))
                                    } else {
                                        if (v.indexOf("+=") !== -1) {
                                            var s = (E + parseInt(v.split("+=")[1]));
                                            return s >= 0 ? 0 : Math.abs(s)
                                        } else {
                                            if (v.indexOf("px") !== -1 && i._isNumeric.call(null, v.split("px")[0])) {
                                                return Math.abs(v.split("px")[0])
                                            } else {
                                                if (v === "top" || v === "left") {
                                                    return 0
                                                } else {
                                                    if (v === "bottom") {
                                                        return Math.abs(r.height() - D.outerHeight(false))
                                                    } else {
                                                        if (v === "right") {
                                                            return Math.abs(r.width() - D.outerWidth(false))
                                                        } else {
                                                            if (v === "first" || v === "last") {
                                                                var y = D.find(":" + v),
                                                                    A = w === "x" ? j(y).offset().left : j(y).offset().top;
                                                                return A - x
                                                            } else {
                                                                if (j(v).length) {
                                                                    var A = w === "x" ? j(v).offset().left : j(v).offset().top;
                                                                    return A - x
                                                                } else {
                                                                    D.css(z, v);
                                                                    e.update.call(null, C[0]);
                                                                    return
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            break
                    }
                },
                _autoUpdate: function (q) {
                    var t = j(this),
                        F = t.data(d),
                        z = F.opt,
                        v = j("#mCSB_" + F.idx + "_container");
                    if (q) {
                        clearTimeout(v[0].autoUpdate);
                        i._delete.call(null, v[0].autoUpdate);
                        return
                    }
                    var s = v.parent(),
                        p = [j("#mCSB_" + F.idx + "_scrollbar_vertical"), j("#mCSB_" + F.idx + "_scrollbar_horizontal")],
                        D = function () {
                            return [p[0].is(":visible") ? p[0].outerHeight(true) : 0, p[1].is(":visible") ? p[1].outerWidth(true) : 0]
                        },
                        E = y(),
                        x, u = [v.outerHeight(false), v.outerWidth(false), s.height(), s.width(), D()[0], D()[1]],
                        H, B = G(),
                        w;
                    C();

                    function C() {
                        clearTimeout(v[0].autoUpdate);
                        v[0].autoUpdate = setTimeout(function () {
                            if (z.advanced.updateOnSelectorChange) {
                                x = y();
                                if (x !== E) {
                                    r();
                                    E = x;
                                    return
                                }
                            }
                            if (z.advanced.updateOnContentResize) {
                                H = [v.outerHeight(false), v.outerWidth(false), s.height(), s.width(), D()[0], D()[1]];
                                if (H[0] !== u[0] || H[1] !== u[1] || H[2] !== u[2] || H[3] !== u[3] || H[4] !== u[4] || H[5] !== u[5]) {
                                    r();
                                    u = H
                                }
                            }
                            if (z.advanced.updateOnImageLoad) {
                                w = G();
                                if (w !== B) {
                                    v.find("img").each(function () {
                                        A(this.src)
                                    });
                                    B = w
                                }
                            }
                            if (z.advanced.updateOnSelectorChange || z.advanced.updateOnContentResize || z.advanced.updateOnImageLoad) {
                                C()
                            }
                        }, 60)
                    }

                    function G() {
                        var I = 0;
                        if (z.advanced.updateOnImageLoad) {
                            I = v.find("img").length
                        }
                        return I
                    }

                    function A(L) {
                        var I = new Image();

                        function K(M, N) {
                            return function () {
                                return N.apply(M, arguments)
                            }
                        }

                        function J() {
                            this.onload = null;
                            r()
                        }
                        I.onload = K(I, J);
                        I.src = L
                    }

                    function y() {
                        if (z.advanced.updateOnSelectorChange === true) {
                            z.advanced.updateOnSelectorChange = "*"
                        }
                        var I = 0,
                            J = v.find(z.advanced.updateOnSelectorChange);
                        if (z.advanced.updateOnSelectorChange && J.length > 0) {
                            J.each(function () {
                                I += j(this).height() + j(this).width()
                            })
                        }
                        return I
                    }

                    function r() {
                        clearTimeout(v[0].autoUpdate);
                        e.update.call(null, t[0])
                    }
                },
                _snapAmount: function (r, p, q) {
                    return (Math.round(r / p) * p - q)
                },
                _stop: function (p) {
                    var r = p.data(d),
                        q = j("#mCSB_" + r.idx + "_container,#mCSB_" + r.idx + "_container_wrapper,#mCSB_" + r.idx + "_dragger_vertical,#mCSB_" + r.idx + "_dragger_horizontal");
                    q.each(function () {
                        i._stopTween.call(this)
                    })
                },
                _scrollTo: function (q, s, u) {
                    var I = q.data(d),
                        E = I.opt,
                        D = {
                            trigger: "internal",
                            dir: "y",
                            scrollEasing: "mcsEaseOut",
                            drag: false,
                            dur: E.scrollInertia,
                            overwrite: "all",
                            callbacks: true,
                            onStart: true,
                            onUpdate: true,
                            onComplete: true
                        },
                        u = j.extend(D, u),
                        G = [u.dur, (u.drag ? 0 : u.dur)],
                        v = j("#mCSB_" + I.idx),
                        B = j("#mCSB_" + I.idx + "_container"),
                        K = E.callbacks.onTotalScrollOffset ? i._arr.call(q, E.callbacks.onTotalScrollOffset) : [0, 0],
                        p = E.callbacks.onTotalScrollBackOffset ? i._arr.call(q, E.callbacks.onTotalScrollBackOffset) : [0, 0];
                    I.trigger = u.trigger;
                    if (E.snapAmount) {
                        s = i._snapAmount(s, E.snapAmount, E.snapOffset)
                    }
                    switch (u.dir) {
                        case "x":
                            var x = j("#mCSB_" + I.idx + "_dragger_horizontal"),
                                z = "left",
                                C = B[0].offsetLeft,
                                H = [v.width() - B.outerWidth(false), x.parent().width() - x.width()],
                                r = [s, (s / I.scrollRatio.x)],
                                L = K[1],
                                J = p[1],
                                A = L > 0 ? L / I.scrollRatio.x : 0,
                                w = J > 0 ? J / I.scrollRatio.x : 0;
                            break;
                        case "y":
                            var x = j("#mCSB_" + I.idx + "_dragger_vertical"),
                                z = "top",
                                C = B[0].offsetTop,
                                H = [v.height() - B.outerHeight(false), x.parent().height() - x.height()],
                                r = [s, (s / I.scrollRatio.y)],
                                L = K[0],
                                J = p[0],
                                A = L > 0 ? L / I.scrollRatio.y : 0,
                                w = J > 0 ? J / I.scrollRatio.y : 0;
                            break
                    }
                    if (r[1] < 0) {
                        r = [0, 0]
                    } else {
                        if (r[1] >= H[1]) {
                            r = [H[0], H[1]]
                        } else {
                            r[0] = -r[0]
                        }
                    }
                    clearTimeout(B[0].onCompleteTimeout);
                    if (!I.tweenRunning && ((C === 0 && r[0] >= 0) || (C === H[0] && r[0] <= H[0]))) {
                        return
                    }
                    i._tweenTo.call(null, x[0], z, Math.round(r[1]), G[1], u.scrollEasing);
                    i._tweenTo.call(null, B[0], z, Math.round(r[0]), G[0], u.scrollEasing, u.overwrite, {
                        onStart: function () {
                            if (u.callbacks && u.onStart && !I.tweenRunning) {
                                if (t("onScrollStart")) {
                                    F();
                                    E.callbacks.onScrollStart.call(q[0])
                                }
                                I.tweenRunning = true;
                                i._onDragClasses(x);
                                I.cbOffsets = y()
                            }
                        },
                        onUpdate: function () {
                            if (u.callbacks && u.onUpdate) {
                                if (t("whileScrolling")) {
                                    F();
                                    E.callbacks.whileScrolling.call(q[0])
                                }
                            }
                        },
                        onComplete: function () {
                            if (u.callbacks && u.onComplete) {
                                if (E.axis === "yx") {
                                    clearTimeout(B[0].onCompleteTimeout)
                                }
                                var M = B[0].idleTimer || 0;
                                B[0].onCompleteTimeout = setTimeout(function () {
                                    if (t("onScroll")) {
                                        F();
                                        E.callbacks.onScroll.call(q[0])
                                    }
                                    if (t("onTotalScroll") && r[1] >= H[1] - A && I.cbOffsets[0]) {
                                        F();
                                        E.callbacks.onTotalScroll.call(q[0])
                                    }
                                    if (t("onTotalScrollBack") && r[1] <= w && I.cbOffsets[1]) {
                                        F();
                                        E.callbacks.onTotalScrollBack.call(q[0])
                                    }
                                    I.tweenRunning = false;
                                    B[0].idleTimer = 0;
                                    i._onDragClasses(x, "hide")
                                }, M)
                            }
                        }
                    });

                    function t(M) {
                        return I && E.callbacks[M] && typeof E.callbacks[M] === "function"
                    }

                    function y() {
                        return [E.callbacks.alwaysTriggerOffsets || C >= H[0] + L, E.callbacks.alwaysTriggerOffsets || C <= -J]
                    }

                    function F() {
                        var O = [B[0].offsetTop, B[0].offsetLeft],
                            P = [x[0].offsetTop, x[0].offsetLeft],
                            M = [B.outerHeight(false), B.outerWidth(false)],
                            N = [v.height(), v.width()];
                        q[0].mcs = {
                            content: B,
                            top: O[0],
                            left: O[1],
                            draggerTop: P[0],
                            draggerLeft: P[1],
                            topPct: Math.round((100 * Math.abs(O[0])) / (Math.abs(M[0]) - N[0])),
                            leftPct: Math.round((100 * Math.abs(O[1])) / (Math.abs(M[1]) - N[1])),
                            direction: u.dir
                        }
                    }
                },
                _tweenTo: function (r, u, s, q, A, t, J) {
                    var J = J || {},
                        G = J.onStart || function () { },
                        B = J.onUpdate || function () { },
                        H = J.onComplete || function () { },
                        z = i._getTime(),
                        x, v = 0,
                        D = r.offsetTop,
                        E = r.style;
                    if (u === "left") {
                        D = r.offsetLeft
                    }
                    var y = s - D;
                    r._mcsstop = 0;
                    if (t !== "none") {
                        C()
                    }
                    p();

                    function I() {
                        if (r._mcsstop) {
                            return
                        }
                        if (!v) {
                            G.call()
                        }
                        v = i._getTime() - z;
                        F();
                        if (v >= r._mcstime) {
                            r._mcstime = (v > r._mcstime) ? v + x - (v - r._mcstime) : v + x - 1;
                            if (r._mcstime < v + 1) {
                                r._mcstime = v + 1
                            }
                        }
                        if (r._mcstime < q) {
                            r._mcsid = _request(I)
                        } else {
                            H.call()
                        }
                    }

                    function F() {
                        if (q > 0) {
                            r._mcscurrVal = w(r._mcstime, D, y, q, A);
                            E[u] = Math.round(r._mcscurrVal) + "px"
                        } else {
                            E[u] = s + "px"
                        }
                        B.call()
                    }

                    function p() {
                        x = 1000 / 60;
                        r._mcstime = v + x;
                        _request = (!b.requestAnimationFrame) ? function (K) {
                            F();
                            return setTimeout(K, 0.01)
                        } : b.requestAnimationFrame;
                        r._mcsid = _request(I)
                    }

                    function C() {
                        if (r._mcsid == null) {
                            return
                        }
                        if (!b.requestAnimationFrame) {
                            clearTimeout(r._mcsid)
                        } else {
                            b.cancelAnimationFrame(r._mcsid)
                        }
                        r._mcsid = null
                    }

                    function w(M, L, Q, P, N) {
                        switch (N) {
                            case "linear":
                            case "mcsLinear":
                                return Q * M / P + L;
                                break;
                            case "mcsLinearOut":
                                M /= P;
                                M--;
                                return Q * Math.sqrt(1 - M * M) + L;
                                break;
                            case "easeInOutSmooth":
                                M /= P / 2;
                                if (M < 1) {
                                    return Q / 2 * M * M + L
                                }
                                M--;
                                return -Q / 2 * (M * (M - 2) - 1) + L;
                                break;
                            case "easeInOutStrong":
                                M /= P / 2;
                                if (M < 1) {
                                    return Q / 2 * Math.pow(2, 10 * (M - 1)) + L
                                }
                                M--;
                                return Q / 2 * (-Math.pow(2, -10 * M) + 2) + L;
                                break;
                            case "easeInOut":
                            case "mcsEaseInOut":
                                M /= P / 2;
                                if (M < 1) {
                                    return Q / 2 * M * M * M + L
                                }
                                M -= 2;
                                return Q / 2 * (M * M * M + 2) + L;
                                break;
                            case "easeOutSmooth":
                                M /= P;
                                M--;
                                return -Q * (M * M * M * M - 1) + L;
                                break;
                            case "easeOutStrong":
                                return Q * (-Math.pow(2, -10 * M / P) + 1) + L;
                                break;
                            case "easeOut":
                            case "mcsEaseOut":
                            default:
                                var O = (M /= P) * M,
                                    K = O * M;
                                return L + Q * (0.499999999999997 * K * O + -2.5 * O * O + 5.5 * K + -6.5 * O + 4 * M)
                        }
                    }
                },
                _getTime: function () {
                    if (b.performance && b.performance.now) {
                        return b.performance.now()
                    } else {
                        if (b.performance && b.performance.webkitNow) {
                            return b.performance.webkitNow()
                        } else {
                            if (Date.now) {
                                return Date.now()
                            } else {
                                return new Date().getTime()
                            }
                        }
                    }
                },
                _stopTween: function () {
                    var p = this;
                    if (p._mcsid == null) {
                        return
                    }
                    if (!b.requestAnimationFrame) {
                        clearTimeout(p._mcsid)
                    } else {
                        b.cancelAnimationFrame(p._mcsid)
                    }
                    p._mcsid = null;
                    p._mcsstop = 1
                },
                _delete: function (r) {
                    try {
                        delete r
                    } catch (q) {
                        r = null
                    }
                },
                _mouseBtnLeft: function (p) {
                    return !(p.which && p.which !== 1)
                },
                _pointerTouch: function (q) {
                    var p = q.originalEvent.pointerType;
                    return !(p && p !== "touch" && p !== 2)
                },
                _isNumeric: function (p) {
                    return !isNaN(parseFloat(p)) && isFinite(p)
                }
            };
        j.fn[g] = function (p) {
            if (e[p]) {
                return e[p].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                if (typeof p === "object" || !p) {
                    return e.init.apply(this, arguments)
                } else {
                    j.error("Method " + p + " does not exist")
                }
            }
        };
        j[g] = function (p) {
            if (e[p]) {
                return e[p].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                if (typeof p === "object" || !p) {
                    return e.init.apply(this, arguments)
                } else {
                    j.error("Method " + p + " does not exist")
                }
            }
        };
        j[g].defaults = h;
        b[g] = true;
        j(b).load(function () {
            j(m)[g]()
        })
    }))
}(window, document));