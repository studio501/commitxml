
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeInfo: cc.Node,
                    labelName: cc.Label,
                    labelInfo: cc.Label,
                    labelTime: cc.Label,
                    buttonEnter: cc.Button,
                    buttonDelete: cc.Button,
                    buttonAdd: cc.Button,
                    buttonCancel: cc.Button,
                    labelEnter: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonEnter), this.addClick(this.buttonDelete), this.addClick(this.buttonCancel), this.addClick(this.buttonAdd)
                },
                load: function () { },
                updateData: function (t) {
                    if (this.nodeInfo.active = !!this.data, this.buttonAdd.node.active = !this.data, this.data) {
                        this.labelName.string = this.data.nick || ftc.language("\u6635\u79f0\u672a\u8bbe\u7f6e"), this.labelName.string.length > 14 && (this.labelName.string = this.labelName.string.substr(0, 12) + "...");
                        var e = "";
                        if (this.data.lv && (e += ftc.language("\u7b49\u7ea7:") + this.data.lv + "\n"), this.data.zhoumu && (e += ftc.language("\u5468\u76ee:") + this.data.zhoumu + "\n"), this.data.zhanli && (e += ftc.language("\u6218\u529b:") + this._format(this.data.zhanli) + "\n"), this.data.task && (e += ftc.language("\u4efb\u52a1:") + this.data.task), this.labelInfo.string = e, this.data.delete) {
                            this.buttonDelete.node.active = !1, this.buttonEnter.node.active = !1, this.buttonCancel.node.active = !0, this.labelTime.node.active = !0;
                            var i = Math.ceil((this.data.delete - ftc.getLocalTime()) / 3600);
                            0 == i && (i = 1), this.labelTime.string = i + ftc.language("\u5c0f\u65f6\u540e\u5220\u9664")
                        } else this.index == t ? (this.buttonDelete.node.active = !1, this.labelEnter.string = ftc.language("\u8fdb\u5165\u6e38\u620f")) : (this.buttonDelete.node.active = !0, this.labelEnter.string = ftc.language("\u5207\u6362\u6e38\u620f")), this.buttonEnter.node.active = !0, this.buttonCancel.node.active = !1, this.labelTime.node.active = !1
                    }
                },
                _format: function (t) {
                    return t < 1e5 ? t : t < 1e7 ? parseInt(t / 1e3) + "K" : (t / 1e6).toFixed(2) + "M"
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    t.target === this.buttonAdd.node ? ftc.sendClient("c_addDocItem", this) : t.target === this.buttonEnter.node ? ftc.sendClient("c_enterDocItem", this) : t.target === this.buttonDelete.node ? ftc.sendClient("c_deleteDocItem", this) : t.target === this.buttonCancel.node && ftc.sendClient("c_cancelDocItem", this)
                }
            })
        