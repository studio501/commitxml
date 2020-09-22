
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeWait: cc.Node
                },
                init: function () {
                    cc.tween(this.nodeWait).repeatForever(cc.tween().by(2, {
                        angle: -360
                    })).start()
                },
                load: function () {
                    this.node.active = !1, this.nodeWait.active = !1, this.time = 0, this.counts = [], this.delayHides = []
                },
                setData: function (t) { },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) {
                    if (this.time >= 0 && (this.time += t, this.time >= 1 && (this.nodeWait.active = !0)), this.delayHides.length)
                        for (var e = this.delayHides.length - 1; e >= 0; e--) this.delayHides[e][1] -= t, this.delayHides[e][1] <= 0 && (this.hide(this.delayHides[e][0]), this.delayHides.splice(e, 1))
                },
                onClick: function (t) { },
                show: function (t, e) {
                    this.nodeWait.active = !1, this.node.active = !0, e || (e = 0), this.counts[e] || (this.counts[e] = 0), this.counts[e]++, this.time = t ? 0 : -1
                },
                hide: function (t, e) {
                    if (e) this.delayHides.push([t, e]);
                    else {
                        for (var i in t || (t = 0), this.counts[t] > 0 ? this.counts[t]-- : ft.console("错误请检查 ftc.cancelTop() 多调用一次"), this.counts)
                            if (this.counts[i] > 0) return;
                        this.node.active = !1
                    }
                }
            })
        