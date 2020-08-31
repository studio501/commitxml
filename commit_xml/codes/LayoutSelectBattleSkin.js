
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    scrollView: cc.ScrollView,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartSelectBattleSkin"]), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setNotShowOnEnter(this.node), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this._partSelectBattleSkins = [];
                    for (var e = t, i = ft.ExtItem.mapHeroBattleSkin[e], a = ft.ExtHero.getHero(e), n = 0; n < i.length; n++) {
                        var s = this.newPart("PartSelectBattleSkin");
                        s.setData(i[n], n), s.updateData(a), s.node.x = 20 + s.node.width * n, s.node.y = -s.node.height, this.scrollView.content.addChild(s.node), this._partSelectBattleSkins.push(s), n === i.length - 1 && (this.scrollView.content.width = s.node.width * i.length)
                    }
                    this.scrollView.content.x = 0, this._partLength = this._partSelectBattleSkins.length, this._tickMoveCount = 0, ftc.isTv() && cc.tween(this.node).delay(.2).call(function () {
                        ftc.ManagerTV.nextFrameSelect(this._partSelectBattleSkins[0].buttonEnable)
                    }.bind(this)).start()
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) {
                    this._tickMoveCount < this._partLength && (cc.tween(this._partSelectBattleSkins[this._tickMoveCount].node).delay(.05 * this._tickMoveCount).to(.15, {
                        y: 0
                    }, {
                        easing: "expoOut"
                    }).start(), this._tickMoveCount++)
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        heroSetBattleSkin: function (t, e) {
                            ftc.showTip("\u5f62\u8c61\u66f4\u6362\u6210\u529f");
                            for (var i = 0; i < this._partSelectBattleSkins.length; i++) this._partSelectBattleSkins[i].updateData()
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        