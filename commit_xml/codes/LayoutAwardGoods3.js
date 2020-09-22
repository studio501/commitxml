
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    spriteBox: cc.Sprite,
                    buttonConfirm: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.addClick(this.buttonConfirm)
                },
                load: function () {
                    0 == ftc.ManagerData.get1("Player").vip && (ftc.ManagerH5.isH5() ? ftc.ManagerH5.showBanner() : "1" == ftc.callNativeFunction("openAd") && (ft.ExtPlayer.getLevel(), ft.value.com.showAdLevel))
                },
                setData: function (t) {
                    this.callback = t
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        awardAd: function (t, e) {
                            if (1 === t) ftc.showTip("获取奖励异常");
                            else {
                                for (var i = [], a = 0; a < t.ids.length; a++) i.push([t.ids[a], t.nums[a]]);
                                ftc.loadLayout("LayoutAwardGoods", function (t) {
                                    t.setData(i, this.callback)
                                }.bind(this))
                            }
                            ftc.isLastBattleWatchAd = !0, ftc.ManagerH5.isH5() ? ftc.ManagerH5.hideBanner() : ftc.callNativeFunction("hideBanner"), this.cancel()
                        },
                        c_successFullAd: function (t, e) {
                            cc.audioEngine.resumeAll(), ftc.ManagerH5.countEvent("9_4"), ftc.send("awardAd")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonSelf.node) this.callback && (this.callback(), this.callback = void 0), ftc.ManagerH5.isH5() ? ftc.ManagerH5.hideBanner() : "1" == ftc.callNativeFunction("openAd") && ftc.callNativeFunction("hideBanner"), this.cancel();
                    else if (t.target === this.buttonConfirm.node) {
                        ftc.ManagerH5.countEvent("9_5"), "1" != (ftc.ManagerH5.isH5() ? ftc.ManagerH5.showFull(2) : ftc.callNativeFunction("showFull", ft.type.fullAd.awardGoods3)) ? ftc.showTip("暂无广告，请稍后再试") : (ftc.watchingAd = !0, cc.audioEngine.pauseAll())
                    }
                }
            })
        