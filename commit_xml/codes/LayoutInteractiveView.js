
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    progressBar: cc.ProgressBar,
                    labelTitle: cc.Label,
                    labelTxt: cc.Label,
                    buttonClose: cc.Button,
                    nodeClick: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose), this.nodeClick.on(cc.Node.EventType.TOUCH_START, function (t) {
                        this.isStart = !0
                    }, this), this.nodeClick.on(cc.Node.EventType.TOUCH_END, function (t) {
                        this.isLong ? (this.isStart = !1, this.limitTime > 0 && (this.limitTime = this.tickLong, this.progressBar.progress = 0)) : (this.clickCount--, this.progressBar.progress = (this.maxClick - this.clickCount) / this.maxClick)
                    }, this)
                },
                load: function () { },
                setData: function (t) {
                    this.clickCount = t.clickCount, this.maxClick = t.clickCount, this.limitTime = t.limitTime, this.tickLong = t.limitTime, this.labelTitle.string = t.buttonText, this.labelTxt.string = t.text, this.isLong = t.isLong, this.progressBar.progress = 0, this.isStart = !1
                },
                enter: function () {
                    ftc.setTvTip(this.node, "【返回键】关闭，【确定键】点击")
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) {
                    if (this.isStart && this.limitTime > 0) {
                        if (this.limitTime -= t, this.clickCount <= 0) return ftc.sendCallback("openInteractiveView", 1), void this.cancel();
                        this.isLong ? (this.limitTime <= 0 && (this.limitTime = .016, this.clickCount--), this.progressBar.progress = (this.tickLong - this.limitTime) / this.tickLong) : this.limitTime <= 0 && (ftc.sendCallback("openInteractiveView", 0), this.cancel())
                    }
                },
                onClick: function (t) {
                    t.target === this.buttonClose.node && (ftc.sendCallback("openInteractiveView", -1), this.cancel())
                },
                onKeyOk: function (t) {
                    t ? this.isStart = !0 : this.isLong ? (this.isStart = !1, this.limitTime > 0 && (this.limitTime = this.tickLong, this.progressBar.progress = 0)) : (this.clickCount--, this.progressBar.progress = (this.maxClick - this.clickCount) / this.maxClick)
                }
            })
        