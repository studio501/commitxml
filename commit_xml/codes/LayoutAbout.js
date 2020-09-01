

cc.Class({
    extends: ftc.BaseView,
    properties: {
        buttonSelf: cc.Button,
        labelVersion: cc.Label,
        buttonClose: cc.Button
    },
    init: function () {
        this.addClick(this.buttonSelf, !0), this.addClick(this.buttonClose, {
            zone: 99
        }), ftc.ManagerTV.setBackButton(this.buttonClose)
    },
    load: function () {
        this.labelVersion.string = "V" + ft.getVersion() + "." + ft.getHotupdateVersion() + "(" + ftc.getShowVersion() + "-" + ftc.getBuildVersion() + ")", ftc.setTvTip(this.node)
    },
    setData: function (t) { },
    enter: function () {
        this.updateData()
    },
    updateData: function () { },
    tick: function (t) { },
    cleanup: function () { },
    msg: function () {
        this.msg = {}
    },
    onClick: function (t, e) {
        t.target !== this.buttonSelf.node && t.target !== this.buttonClose.node || this.cancel()
    }
})
