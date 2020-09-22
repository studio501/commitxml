
            
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
                                text: "订单失败,可以联系我们的客服或尝试重新登录游戏",
                                click1: function () { }
                            };
                            ftc.getChat() && (i.button1 = "联系客服", i.click1 = function () {
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
        