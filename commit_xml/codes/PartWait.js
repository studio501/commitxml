
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteBg: cc.Sprite,
                    labelTip: cc.Label,
                    labelTip2: cc.Label,
                    spineLoading: sp.Skeleton
                },
                init: function () { },
                load: function () { },
                showWait: function (t, e, i, a, n) {
                    if (t = ftc.language(t), this.labelTip.node.active = !1, this.labelTip2.node.active = !1, this.callback = void 0, this.spriteBg.node.opacity = 160, this.spineLoading.node.active = !1, void 0 === a && (a = 160), this.node.active = !0, this.cancelTime = e, this.callback = i, this.spriteBg.node.opacity = a, void 0 !== n && n !== ft.type.wait.inn) {
                        a = 255, this.labelTip.node.active = !0;
                        var s = [];
                        for (var o in ftd.Help.data) s.push(o);
                        this.labelTip.string = ftd.Help.get(s[Math.floor(Math.random() * s.length)], "tip"), this.spineLoading.node.active = !0, this.spineLoading.setAnimation(0, "wait" + n, !0), n != ft.type.wait.car && n != ft.type.wait.ship || ftc.playEffect(ftc.type.effect.map_transfer)
                    } else this.labelTip2.node.active = !0, this.labelTip2.string = t, this.spineLoading.node.active = !1, n == ft.type.wait.inn && ftc.playEffect(ftc.type.effect.map_huiFu);
                    ftc.ManagerTV.setDisable()
                },
                cancelWait: function (t) {
                    void 0 === t && (t = 0), "number" == typeof t && t > 0 ? this.cancelTime = t : (this.callback && this.callback(), this.node.active = !1, ftc.ManagerTV.setEnable())
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) {
                    this.cancelTime > 0 && (this.cancelTime -= t, this.cancelTime <= 0 && (this.cancelTime = 0, this.callback && this.callback(), this.node.active = !1, ftc.ManagerTV.setEnable()))
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) { }
            })
        