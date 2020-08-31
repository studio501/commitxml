cc.Class({
    extends: ftc.BaseView,
    properties: {
        partActivity1004: t("PartActivity1004"),
        labelTitle: cc.Label,
        buttonClose: cc.Button
    },
    init: function () {
        this.addClick(this.buttonClose, {
            zone: 99
        }), ftc.setTvTip(this.node), ftc.ManagerTV.setBackButton(this.buttonClose)
    },
    load: function () { },
    setData: function (t) {
        this.data = t, this.labelTitle.string = ft.ExtMsg.getTitle(this.data), this.partActivity1004.setData(this.data)
    },
    enter: function () { },
    updateData: function () {
        this.partActivity1004.updateData(this.data)
    },
    tick: function (t) { },
    cleanup: function () { },
    msg: function () {
        this.msg = {
            msgActivityGet: function (t, e) {
                -1 === t.ret ? ftc.showTip("\u9886\u53d6\u5931\u8d25") : 0 === t.ret && this.partActivity1004.updateData(t.index)
            }
        }
    },
    onClick: function (t, e) {
        t.target === this.buttonClose.node && this.cancel()
    }
})
