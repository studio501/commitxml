
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeRoot: cc.Node,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelCd: cc.Label,
                    labelInfo: cc.RichText,
                    nodeLevelInfo: cc.Node,
                    labelLevelInfo: cc.RichText,
                    labelUpgradeInfo: cc.RichText,
                    buttonTvClose: cc.Button
                },
                init: function () {
                    this.node.on(cc.Node.EventType.TOUCH_END, function () {
                        this.cancel()
                    }, this), this.node._touchListener.swallowTouches = !1, this.addClick(this.buttonTvClose), ftc.ManagerTV.setBackButton(this.buttonTvClose, this.node)
                },
                load: function () {
                    this._partItem = this.newPart("PartItem"), this._partItem.node.scale = .76, this._partItem.setInteractable(!1), this.nodeItem.addChild(this._partItem.node)
                },
                setData: function (t) {
                    var e = t.heroId,
                        i = t.skillId,
                        a = t.isOpen,
                        n = t.index;
                    this._partItem.setSkillData(i, !1);
                    var s = "";
                    if (1 === ft.ExtSkill.getSkillType(i)) {
                        var o = ft.ExtSkill.getCD(i);
                        if (o > 0) {
                            s += ftc.language("\u6280\u80fd\u51b7\u5374:{0}\u56de\u5408").replace("{0}", o);
                            var r = ft.ExtSkill.getPreCD(i);
                            s += "\n", s += ftc.language("\u6218\u524d\u51b7\u5374:{0}\u56de\u5408").replace("{0}", r)
                        }
                    } else s = " \u88ab\u52a8";
                    this.labelCd.string = s;
                    var c = ft.ExtSkill.getInfo(i);
                    this.labelInfo.string = ftc.replaceDigitColor(c, "d77332");
                    var h = 0;
                    if (this.nodeLevelInfo.active = t.showLvInfo, t.showLvInfo) {
                        var f = "\u6280\u80fd\u5347\u7ea7:\n";
                        if ((w = ft.ExtHero.getSkillIds(e, n + 1)).length > 0)
                            for (var d = 0; d < w.length; d++) a && i >= w[d] ? (f += "<color=#5aacd4>" + ft.ExtSkill.getUpgradeInfo(w[d]) + "</c>", h++) : f += "<color=#937052>" + ft.ExtSkill.getUpgradeInfo(w[d]) + "</c>", d !== w.length - 1 && (f += "\n");
                        this.labelLevelInfo.string = f;
                        var l = ft.ExtHero.getHero(e),
                            u = 0,
                            p = 0;
                        l && (u = l.star, p = l.up);
                        var g = "\u5f53\u524d\u5347\u7ea7\u6761\u4ef6\n";
                        if (0 === n)
                            if (a) {
                                var m = [2, 0, 0],
                                    b = [0, 0, 0];
                                for (var v in 4 === ft.ExtHero.getQuality(e) && e < 1900 && (m[1] = 2), ftd.Equip.data)
                                    if (ft.ExtEquip.getType(v) === e && ft.ExtEquip.getSkillLevelUp(v) > 0) {
                                        m[2] = 1;
                                        break
                                    } b[0] = Math.floor(u / 2), b[1] = Math.floor(p / 2);
                                var y = ftc.ManagerData.get2Object("Equip");
                                for (var v in y)
                                    if (ft.ExtEquip.getType(y[v].id) === e && ft.ExtEquip.getSkillLevelUp(y[v].id) > 0) {
                                        b[2] = 1;
                                        break
                                    } var _ = !0,
                                        x = 0;
                                for (v = 0; v < m.length; v++) b[v] < m[v] && (0 === v ? (g += "<color=#fa4b38>\u6b66\u5c06\u5347\u81f3" + 2 * (b[v] + 1) + "\u661f</c>", x++) : 1 === v ? (1 === b[v] ? g += (x ? "\u6216" : "") + "<color=#fa4b38>\u6b66\u5c06\u89c9\u9192\u81f3\u91d1\u8272</c>" : g += (x ? "\u6216" : "") + "<color=#fa4b38>\u6b66\u5c06\u89c9\u9192+" + 2 * (b[v] + 1) + "</c>", x++) : 2 === v && (g += (x ? "\u6216" : "") + "<color=#fa4b38>\u83b7\u5f97\u6b66\u5c06\u4e13\u5c5e\u6b66\u5668</c>"), _ = !1);
                                (_ || h >= w.length) && (g = "\u6280\u80fd\u7b49\u7ea7\u5df2\u8fbe\u4e0a\u9650")
                            } else g += "\u6b66\u5c06\u5347\u81f31\u661f";
                        else 1 === n && (h >= w.length ? g = "\u6280\u80fd\u7b49\u7ea7\u5df2\u8fbe\u4e0a\u9650" : g += h > 0 ? p + 1 === 4 ? (x ? "\u6216" : "") + "<color=#fa4b38>\u6b66\u5c06\u89c9\u9192\u81f3\u91d1\u8272</c>" : "<color=#fa4b38>\u6b66\u5c06\u89c9\u9192+" + (p + 1) + "</c>" : "<color=#fa4b38>\u6b66\u5c06\u89c9\u9192+2</c>");
                        this.labelUpgradeInfo.string = g
                    } else {
                        var w;
                        if ((w = ft.ExtHero.getSkillIds(e, n + 1)) && w.length > 0)
                            for (d = 0; d < w.length; d++) a && i >= w[d] && h++
                    }
                    this.labelName.string = ft.ExtSkill.getName(i) + " " + (a ? "Lv" + h : "\u672a\u89e3\u9501")
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonTvClose.node && this.cancel()
                }
            })
        