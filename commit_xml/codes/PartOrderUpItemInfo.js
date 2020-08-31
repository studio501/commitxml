
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelName: cc.Label,
                    labelValue1: cc.Label,
                    spriteArrow: cc.Sprite,
                    labelValue2: cc.Label
                },
                init: function () { },
                load: function () {
                    this.data = void 0
                },
                setData: function (t, e) {
                    if (e) {
                        var i = t.per ? "%" : "";
                        if (this.data && void 0 !== this.data.value2) {
                            this.spriteArrow.node.active = this.labelValue2.node.active = !1;
                            var a = {
                                value1: this.data.value1
                            };
                            cc.tween(a).to(.6, {
                                value1: t.value1
                            }, {
                                progress: function (t, e, a, n) {
                                    var s = t + (e - t) * n;
                                    return this.labelValue1.string = s.toFixed(1) + i, s
                                }.bind(this)
                            }).call(function () {
                                this.setInfo(t)
                            }.bind(this)).start()
                        }
                    } else this.setInfo(t)
                },
                setInfo: function (t) {
                    var e = t.per ? "%" : "";
                    this.data = t, this.labelName.string = t.name, this.labelValue1.string = t.value1 + e, this.spriteArrow.node.active = this.labelValue2.node.active = void 0 !== t.value2, void 0 !== t.value2 && (this.labelValue2.string = t.value2 + e)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        