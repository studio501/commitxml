

cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function () {
        this.msg && "function" == typeof this.msg && (this.msg(), ft.bindMsg(this)), this.__secondFrameEnter = 2, this.__longPressTime = 0, this.init && (this.init(), this.init = void 0)
    },
    update: function (t) {
        if (this.__secondFrameEnter <= 1) {
            if (this.__secondFrameEnter++, 2 != this.__secondFrameEnter) return;
            ftc.ManagerRes.lockClicking = void 0, this.enter && (ft.console(this._layoutName + ":enter"), this.enter()), this._checkOnEnterCallbacks(this._layoutName), ftc.ManagerRes.checkCallbackOnOpenView(this._layoutName), ftc.ManagerTV.autoShowOnEnter(this.node)
        }
        this.__longPressTime > 0 && (this.__longPressTime -= t, this.__longPressTime <= 0 && (this.onLongClick(this.__longPressEvent), this.__longPressEvent = void 0, this.__longPressTime = -1)), this.tick && this.tick(t)
    },
    onDestroy: function () {
        ftc.ManagerRes.releaseResource(this), this.cleanup && this.cleanup()
    },
    getName: function () {
        return this._layoutName
    },
    _checkOnEnterCallbacks: function (t) {
        ftc.viewOnEnterCallbacks[t] && (ftc.viewOnEnterCallbacks[t](), ftc.viewOnEnterCallbacks[t] = void 0)
    },
    prepareParts: function (t) {
        this._prepareParts = t
    },
    initPart: function (t) {
        ftc.ManagerRes.initPart(t, this)
    },
    newPart: function (t, e) {
        return ftc.ManagerRes.newPart(t, e, this)
    },
    loadResource: function (t, e, i) {
        return ftc.ManagerRes.loadResource(t, e, i, this)
    },
    releaseResource: function (t) {
        ftc.ManagerRes.releaseResource(this, t)
    },
    hideShielding: function () {
        this._showShielding = -1
    },
    cancel: function (t, e, i) {
        if (this.node) {
            if (this._layoutName) {
                ftc.ManagerRes.removeLayout(this._layoutName), ftc.setTvTip(this.node, void 0, 2);
                var a = ftc.ManagerRes.topLayout();
                a && a.node && (a.node.active = !0, a.updateData && !t && a.updateData(), i || ftc.ManagerTV.autoShowOnCancel(a.node), ftc.setTvTip(a.node, void 0, 4), 1 == ftc.ManagerRes.countLayout() && this._checkOnEnterCallbacks(a._layoutName))
            }
            this.__longPressTime = 0, ftc.ManagerRes.restoreListViewNodes(this.node), ftc.ManagerRes.restoreNode(this.node, e), ftc.ManagerRes.cleanNodes(), ftc.ManagerRes.lockClicking = void 0, ftc.ManagerRes.checkCallbackOnCancelView(this._layoutName)
        }
    },
    addClick: function (t, e, i, a) {
        ftc.ManagerRes.addClick(this, t, e, i, a, 0)
    }
})
