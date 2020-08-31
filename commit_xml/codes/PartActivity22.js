
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeGames: [cc.Node],
                    buttonDetail0: cc.Button,
                    buttonGet1: cc.Button,
                    labelCode1: cc.Label,
                    labelDate1: cc.Label,
                    labelCode2: cc.Label,
                    labelDate2: cc.Label,
                    buttonGet2: cc.Button,
                    labelCode3: cc.Label,
                    labelDate3: cc.Label,
                    buttonGet3: cc.Button,
                    buttonCopy1: cc.Button,
                    buttonCopy2: cc.Button,
                    buttonCopy3: cc.Button,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonDetail0), this.addClick(this.buttonGet1), this.addClick(this.buttonGet2), this.addClick(this.buttonGet3), this.addClick(this.buttonCopy1), this.addClick(this.buttonCopy2), this.addClick(this.buttonCopy3), this.addClick(this.buttonDetail)
                },
                setData: function (t) {
                    this.data = t, this.updateData()
                },
                cleanup: function () { },
                updateData: function () {
                    var t = ftc.ManagerH5.isH5();
                    if (this.nodeGames[0].active = !t, this.nodeGames[1].active = !t, this.nodeGames[2].active = t, t)
                        if (this.buttonGet3.node.active = !1, this.labelCode3.node.active = !1, this.labelDate3.node.active = !1, this.buttonCopy3.node.active = !1, ftc.ManagerData.get1("ManagerMsg").limitedLinkAwardCode3) {
                            this.labelCode3.node.active = !0, this.labelDate3.node.active = !0, this.buttonCopy3.node.active = !0;
                            e = ftc.ManagerData.get1("ManagerMsg").limitedLinkAwardCode3.split(",");
                            this.labelCode3.string = e[0];
                            i = 864e5 * parseInt(e[1]), a = new Date(i);
                            this.labelDate3.string = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate()
                        } else this.buttonGet3.node.active = !0, this.buttonGet3.interactable = ftc.ManagerData.get1("Player").level >= 15;
                    else {
                        if (this.buttonGet1.node.active = !1, this.labelCode1.node.active = !1, this.labelDate1.node.active = !1, this.buttonCopy1.node.active = !1, ftc.ManagerData.get1("ManagerMsg").limitedLinkAwardCode2) {
                            this.labelCode1.node.active = !0, this.labelDate1.node.active = !0, this.buttonCopy1.node.active = !0;
                            var e = ftc.ManagerData.get1("ManagerMsg").limitedLinkAwardCode2.split(",");
                            this.labelCode1.string = e[0];
                            var i = 864e5 * parseInt(e[1]),
                                a = new Date(i);
                            this.labelDate1.string = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate()
                        } else this.buttonGet1.node.active = !0, this.buttonGet1.interactable = ftc.ManagerData.get1("Player").level >= 15;
                        if (this.buttonGet2.node.active = !1, this.labelCode2.node.active = !1, this.labelDate2.node.active = !1, this.buttonCopy2.node.active = !1, ftc.ManagerData.get1("ManagerMsg").limitedLinkAwardCode1) {
                            this.labelCode2.node.active = !0, this.labelDate2.node.active = !0, this.buttonCopy2.node.active = !0;
                            var e = ftc.ManagerData.get1("ManagerMsg").limitedLinkAwardCode1.split(",");
                            this.labelCode2.string = e[0];
                            var i = 864e5 * parseInt(e[1]),
                                a = new Date(i);
                            this.labelDate2.string = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate()
                        } else this.buttonGet2.node.active = !0, this.buttonGet2.interactable = ftc.ManagerData.get1("Player").level >= 15
                    }
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail0.node ? ftc.showDetailInfo(this.buttonDetail0.node, ft.replaceAll(ft.ExtMsg.getTxt(this.data), "|", "\n")) : t.target === this.buttonGet1.node ? (ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        index: 2
                    }), ftc.showWait("\u83b7\u53d6\u5151\u6362\u7801\u4e2d...")) : t.target === this.buttonGet2.node ? (ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        index: 1
                    }), ftc.showWait("\u83b7\u53d6\u5151\u6362\u7801\u4e2d...")) : t.target === this.buttonGet3.node ? (ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        index: 0
                    }), ftc.showWait("\u83b7\u53d6\u5151\u6362\u7801\u4e2d...")) : t.target === this.buttonCopy1.node ? (ftc.callNativeFunction("setClipboardData", this.labelCode1.string), ftc.showTip("\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f")) : t.target === this.buttonCopy2.node ? (ftc.callNativeFunction("setClipboardData", this.labelCode2.string), ftc.showTip("\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f")) : t.target === this.buttonCopy3.node ? (ftc.callNativeFunction("setClipboardData", this.labelCode3.string), ftc.showTip("\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f")) : t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, ft.ExtDetail.getInfo(ft.value.detail.ldjl))
                }
            })
        