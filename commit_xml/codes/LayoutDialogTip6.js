
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeItem: cc.Node,
                    labelTip: cc.Label,
                    slider: cc.Slider,
                    progressBar: cc.ProgressBar,
                    buttonSub: cc.Button,
                    buttonAdd: cc.Button,
                    buttonConfirm: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonConfirm), this.addClick(this.buttonSub), this.addClick(this.buttonAdd), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose), this.slider.node.on("slide", function (t) {
                        this.itemNum = parseInt(this.slider.progress * this.itemNumMax), this.itemNum <= 0 && (this.itemNum = 1), this.progressBar.progress = this.slider.progress, this.updateTip()
                    }, this)
                },
                load: function () { },
                setData: function (t, e) {
                    this.data = t, this.callback = e;
                    var i = this.newPart("PartItem");
                    i.setData(this.data.id, this.data.num, !0), this.nodeItem.addChild(i.node), this.itemNumMax = Math.min(this.data.num, 999), this.itemNum = this.itemNumMax, this.slider.progress = 1, this.progressBar.progress = 1, this.updateTip()
                },
                enter: function () {
                    this.updateData(), ftc.setTvTip(this.node, "\u8fd4\u56de\u952e\u5173\u95ed\uff0c\u5de6\u53f3\u952e\u52a0\u51cf1\uff0c\u4e0a\u4e0b\u952e\u52a0\u51cf10")
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                setItemNum: function (t) {
                    if (t > this.itemNumMax ? t = this.itemNumMax : t < 1 && (t = 1), this.itemNum !== t) {
                        this.itemNum = t;
                        var e = this.itemNum / this.itemNumMax;
                        this.slider.progress = e, this.progressBar.progress = e, this.updateTip()
                    }
                },
                updateTip: function () {
                    this.labelTip.string = ftc.language("\u4f7f\u7528{0}\u4e2a").replace("{0}", this.itemNum)
                },
                onClick: function (t, e) {
                    t.target === this.buttonConfirm.node ? (this.callback && this.callback(this.itemNum), this.cancel()) : t.target === this.buttonSub.node ? this.setItemNum(this.itemNum - 1) : t.target === this.buttonAdd.node ? this.setItemNum(this.itemNum + 1) : t.target === this.buttonClose.node && (this.callback && this.callback(0), this.cancel())
                },
                onKeyDirection: function (t, e) {
                    if (!t) {
                        if (1 == e) return this.setItemNum(this.itemNum + 10), !0;
                        if (2 == e) return this.setItemNum(this.itemNum - 10), !0;
                        if (3 == e) return this.setItemNum(this.itemNum - 1), !0;
                        if (4 == e) return this.setItemNum(this.itemNum + 1), !0
                    }
                }
            })
        