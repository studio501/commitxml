
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelContent: cc.Label,
                    toggleNoTip: cc.Toggle,
                    button2: cc.Button,
                    label2: cc.Label,
                    button1: cc.Button,
                    label1: cc.Label,
                    nodeConsume1: cc.Node,
                    nodeConsume2: cc.Node,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.button1), this.addClick(this.button2), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.toggleNoTip.node.active = !1, ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this.param = t, this.updateData()
                },
                enter: function () { },
                updateData: function () {
                    var t = this.param;
                    if (t.text = ftc.language(t.text), t.text ? this.labelContent.string = ft.replaceAll(t.text, "|", "\n") : this.labelContent.string = "", this.button1.node.active = !1, this.button2.node.active = !1, this.nodeConsume1.active = !1, this.nodeConsume2.active = !1, (t.button1 || t.click1 || t.clickOk) && (this.button1.node.active = !0, t.button1 ? this.label1.string = ftc.language(t.button1) : this.label1.string = ftc.language("\u786e\u5b9a")), (t.button2 || t.click2 || t.clickCancel) && (this.button2.node.active = !0, t.button2 ? this.label2.string = ftc.language(t.button2) : this.label2.string = ftc.language("\u53d6\u6d88")), t.noTip && (this.toggleNoTip.node.active = !0, this.toggleNoTip.isChecked = !1), t.consume1) {
                        this.nodeConsume1.active = !0;
                        var e = this.nodeConsume1.getChildByName("spriteIcon").getComponent(cc.Sprite),
                            i = this.nodeConsume1.getChildByName("labelNum").getComponent(cc.Label);
                        e.spriteFrame = ft.ExtItem.getLittleIconSprite(t.consume1.id);
                        var a = ft.ExtItem.getNum(t.consume1.id);
                        i.string = t.consume1.num + "/" + a, i.node.color = t.consume1.num <= a ? ftc.newColor(4855815) : ftc.newColor(13512192)
                    }
                    if (t.consume2) {
                        this.nodeConsume2.active = !0;
                        e = this.nodeConsume2.getChildByName("spriteIcon").getComponent(cc.Sprite), i = this.nodeConsume2.getChildByName("labelNum").getComponent(cc.Label);
                        e.spriteFrame = ft.ExtItem.getLittleIconSprite(t.consume2.id);
                        a = ft.ExtItem.getNum(t.consume2.id);
                        i.string = t.consume2.num + "/" + a, i.node.color = t.consume2.num <= a ? ftc.newColor(4855815) : ftc.newColor(13512192)
                    }
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t) {
                    t.target === this.button2.node ? this.cancelDialog(!1) : t.target === this.button1.node ? this.cancelDialog(!0) : t.target === this.buttonClose.node && (this.param.clickClose ? (this.param.clickClose(), this.cancel()) : this.button2.node.active ? this.cancelDialog(!1) : this.cancelDialog(!0))
                },
                cancelDialog: function (t) {
                    var e = this.param;
                    t ? (e.click1 ? e.click1() : e.clickOk && e.clickOk(), this.param.noTip && this.toggleNoTip.isChecked && ftc.setDialogNoTip(this.param.noTip, !0)) : e.click2 ? e.click2() : e.clickCancel && e.clickCancel(), this.cancel(!0), ftc.ManagerTV.nextSelect()
                }
            })
        