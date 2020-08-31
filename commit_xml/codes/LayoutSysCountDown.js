
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTime: cc.Label,
                    nodeWait: cc.Node
                },
                init: function () {
                    cc.tween(this.nodeWait).repeatForever(cc.tween().by(2, {
                        angle: -360
                    })).start()
                },
                load: function () {
                    this.labelTime.string = "15", this.tickAdd = 0
                },
                setData: function (t) {
                    ftc.send("readyTouch", 1)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) {
                    if (this.tickAdd += t, this.tickAdd >= 1) {
                        this.tickAdd = 0;
                        var e = parseInt(this.labelTime.string);
                        if (e > 0) (e -= 1) % 5 == 0 && ftc.send("readyTouch", 1), this.labelTime.string = e;
                        else {
                            this.cancel();
                            var i = {
                                text: "\u8ba2\u5355\u5931\u8d25,\u53ef\u4ee5\u8054\u7cfb\u6211\u4eec\u7684\u5ba2\u670d\u6216\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55\u6e38\u620f",
                                click1: function () { }
                            };
                            ftc.getChat() && (i.button1 = "\u8054\u7cfb\u5ba2\u670d", i.click1 = function () {
                                ftc.showChat()
                            }, i.click2 = function () { }), ftr.showDialog(i)
                        }
                    }
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t) { }
            })
        