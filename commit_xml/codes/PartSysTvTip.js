
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelTvTip: cc.Label,
                    stackTips: []
                },
                init: function () {
                    this.node.active = !1, this._open = !0
                },
                load: function () { },
                setData: function (t, e, i) {
                    if (this.labelTvTip)
                        if (i || (i = 0), 5 == i) this._open = !0;
                        else if (6 == i) this._open = !1, this.node.active = !1;
                        else if (3 == i) this.node.active = !1;
                        else if (2 == i || 1 == i) {
                            for (var a = 0; a < this.stackTips.length; a++)
                                if (this.stackTips[a][0] == t) {
                                    2 == i && this.stackTips.splice(a, 1), this.node.active = !1;
                                    break
                                }
                        } else {
                            0 != i || e || (e = "【返回键】关闭界面");
                            for (a = 0; a < this.stackTips.length; a++)
                                if (this.stackTips[a][0] == t) return 4 == i ? i = this.stackTips[a][2] : 0 == i && (this.stackTips[a][1] = e), this.stackTips[a][2] = i, void this._updateTip(a);
                            0 == i && (this.stackTips.push([t, e, i]), this.labelTvTip.string = ftc.language(e), this._activeNode(t))
                        }
                },
                _activeNode: function (t) {
                    this._open && ftc.ManagerRes.topLayout().node == t && (this.node.active = !0)
                },
                _updateTip: function (t) {
                    if (this.stackTips.length && t < this.stackTips.length && !this.stackTips[t][2]) return this.labelTvTip.string = ftc.language(this.stackTips[t][1]), void this._activeNode(this.stackTips[t][0]);
                    this.node.active = !1
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t) { }
            })
        