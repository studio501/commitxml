
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    partMail: t("PartMail")
                },
                init: function () { },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("邮件"), this.node.addChild(this.partTopStatus.node), this.initPart(this.partMail), this.partMail.setData(), this.updateTvTip()
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateTvTip: function () {
                    var t = "【返回键】关闭界面，【菜单键】一键领取";
                    this.partMail.tvSte && (t += "，【确定键】" + (1 == this.partMail.tvSte ? "领取附件" : "删除邮件")), ftc.setTvTip(this.node, t)
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
                            t.length > 0 ? this.partMail.updateMailItems(t) : ftc.showTip("并没什么好领取的"), this.updateTvTip()
                        },
                        msgDelete: function (t, e) {
                            -1 != t ? (this.partMail.deleteMail(t), ftc.ManagerTV.nextSelect()) : ftc.showTip("删除失败"), this.updateTvTip()
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
        