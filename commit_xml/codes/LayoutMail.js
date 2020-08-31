
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    partMail: t("PartMail")
                },
                init: function () { },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u90ae\u4ef6"), this.node.addChild(this.partTopStatus.node), this.initPart(this.partMail), this.partMail.setData(), this.updateTvTip()
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateTvTip: function () {
                    var t = "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u4e00\u952e\u9886\u53d6";
                    this.partMail.tvSte && (t += "\uff0c\u3010\u786e\u5b9a\u952e\u3011" + (1 == this.partMail.tvSte ? "\u9886\u53d6\u9644\u4ef6" : "\u5220\u9664\u90ae\u4ef6")), ftc.setTvTip(this.node, t)
                },
                updateData: function () {
                    this.partTopStatus.updateData()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectMailItem: function (t, e) {
                            this.partMail.selectMailItem(t.index), this.updateTvTip()
                        },
                        msgRead: function (t, e) {
                            -1 != t && this.partMail.readMail(t), this.updateTvTip()
                        },
                        msgReceive: function (t, e) {
                            t.length > 0 ? this.partMail.updateMailItems(t) : ftc.showTip("\u5e76\u6ca1\u4ec0\u4e48\u597d\u9886\u53d6\u7684"), this.updateTvTip()
                        },
                        msgDelete: function (t, e) {
                            -1 != t ? (this.partMail.deleteMail(t), ftc.ManagerTV.nextSelect()) : ftc.showTip("\u5220\u9664\u5931\u8d25"), this.updateTvTip()
                        }
                    }
                },
                onClick: function (t, e) { },
                onKeyMenu: function (t) {
                    if (!t) return this.partMail.onClick({
                        target: this.partMail.buttonOneKeyGet.node
                    }), !0
                },
                onKeyOk: function (t) {
                    if (!t && this.partMail.tvSte) return 1 == this.partMail.tvSte ? this.partMail.onClick({
                        target: this.partMail.buttonGet.node
                    }) : this.partMail.onClick({
                        target: this.partMail.buttonDelete.node
                    }), !0
                }
            })
        