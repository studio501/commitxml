
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    layoutRewards: cc.Node,
                    partCopy2Items: [t("PartCopy2Item")],
                    labelInfo: cc.Label,
                    nodeOrdinary: cc.Node,
                    labelFloorCur: cc.Label,
                    buttonChallenge1: cc.Button,
                    buttonLower: cc.Button,
                    labelTimes: cc.Label,
                    nodeElite: cc.Node,
                    labelFloorRecord: cc.Label,
                    toggleChallenge: cc.Toggle,
                    buttonChallenge: cc.Button,
                    toggleMopUp: cc.Toggle,
                    buttonMopUp: cc.Button,
                    spriteIconConsume: cc.Sprite,
                    labelConsume: cc.Label,
                    labelTicket: cc.Label,
                    buttonEnter: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonEnter), this.addClick(this.buttonChallenge1), this.addClick(this.buttonLower), this.addClick(this.buttonChallenge), this.addClick(this.buttonMopUp)
                },
                load: function () {
                    for (var t = 0; t < this.partCopy2Items.length; t++) this.initPart(this.partCopy2Items[t]);
                    this.partTopStatus = this.newPart("PartTopStatus"), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762")
                },
                setData: function (t) {
                    this.id = t, this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.selectTab(this.id === ft.value.copy.YXT ? 0 : 1)
                },
                selectTab: function (t) {
                    var e;
                    this._canEnter = 1, this.tabIndex = t;
                    var i = (e = 0 === t ? ftc.ManagerData.get1("ManagerCopy").battleYXT : ftc.ManagerData.get1("ManagerCopy").battleYXT3) % 10;
                    ftc.ManagerRes.restoreNodeChildren(this.layoutRewards);
                    var a = [2004, 3501][t] + (0 === t ? i : e),
                        n = ft.ExtBattle.getAwardPreview(a),
                        s = n.ids,
                        o = n.nums;
                    if (s)
                        for (var r = 0; r < s.length; r++) {
                            var c = this.newPart("PartItem");
                            c.node.scale = .88, c.setData(s[r], o[r]), this.layoutRewards.addChild(c.node)
                        }
                    1 === t && 130 === e && (e--, a--);
                    for (r = 0; r < this.partCopy2Items.length; r++) {
                        var h = e - 1 + r;
                        if (h < 0 || 1 === t && h >= 130) this.partCopy2Items[r].node.active = !1;
                        else {
                            this.partCopy2Items[r].node.active = !0;
                            var f = a - 1 + r;
                            2003 === f ? f = 2013 : 2014 === f && (f = 2004), this.partCopy2Items[r].setData(h, 1 === r, f)
                        }
                    }
                    if (this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(this.id), "|", "\n"), this.nodeOrdinary.active = 0 === t, this.nodeElite.active = 1 === t, 0 === t) {
                        var d = ft.ExtCopy.getRemainingCount(this.id);
                        this.buttonLower.interactable = !!(ftc.ManagerData.get1("ManagerCopy").battleYXT > 20 && d < 100), this.labelTimes.string = d + "/" + ft.ExtCopy.getCount(this.id), this.labelTimes.node.color = ftc.newColor(d >= ft.ExtCopy.getCount(this.id) ? ftc.value.color.normal : ftc.value.color.lackRed), this.labelFloorCur.string = ftc.ManagerData.get1("ManagerCopy").battleYXT, this._canEnter &= d > 0, this._canEnter &= ft.ExtItem.getNum(ft.value.item.power) > 0, this.buttonChallenge1.interactable = this._canEnter
                    } else this.labelFloorRecord.string = ftc.ManagerData.get1("ManagerCopy").battleYXT2, this.selectMode(this.mode ? this.mode : ft.type.copyMode.challenge), this.buttonEnter.interactable = this._canEnter
                },
                selectMode: function (t) {
                    this.mode = t, this.toggleChallenge.isChecked = t === ft.type.copyMode.challenge, this.toggleMopUp.isChecked = t === ft.type.copyMode.mopUp;
                    var e = ft.ExtCopy.getConsume(this.id);
                    this.spriteIconConsume.spriteFrame = ft.ExtItem.getLittleIconSprite(e.ids[0]), this.labelConsume.string = e.nums[0], t === ft.type.copyMode.mopUp ? (this.labelTicket.node.parent.active = !0, this.labelTicket.string = ft.ExtItem.getNum(ft.value.item.mopUpTicket) + "/" + ft.value.com.mopUpTicketNumDaily, this.labelTicket.node.color = ftc.newColor(ft.ExtItem.getNum(ft.value.item.mopUpTicket) >= ft.value.com.mopUpTicketNumDaily ? ftc.value.color.normal : ftc.value.color.lackRed), this._canEnter &= ft.ExtItem.getNum(ft.value.item.mopUpTicket) >= ft.value.com.mopUpTicketNumDaily) : this.labelTicket.node.parent.active = !1;
                    var i = ft.ExtCopy.getRemainingCount(this.id);
                    this._canEnter &= i > 0, this._canEnter &= ft.ExtItem.getNum(ft.value.item.power) > 0
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData(), this.selectTab(this.tabIndex)
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        copyEnter: function (t, e) {
                            0 === t || (1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u4f53\u529b\u4e0d\u8db3"))
                        },
                        copyEnd: function (t, e) {
                            this.id == t.id && this.updateData()
                        },
                        copyMopUp: function (t, e) {
                            0 === t ? ftc.showTip("\u626b\u8361\u6210\u529f") : 1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u4f53\u529b\u4e0d\u8db3")
                        },
                        copyYXTLower10: function (t, e) {
                            0 === t ? (ftc.showTip("\u4e0b\u964d10\u5c42\u6210\u529f"), this.updateData()) : 1 === t ? ftc.showTip("\u4eca\u65e5\u5df2\u4e0b\u964d\u8fc7\uff0c\u65e0\u6cd5\u518d\u4e0b\u964d") : 2 === t && ftc.showTip("\u5c42\u6570\u4e0d\u8db3\uff0c\u65e0\u6cd5\u518d\u4e0b\u964d")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonChallenge1.node) ftc.send("copyEnter", {
                        id: this.id
                    });
                    else if (t.target === this.buttonLower.node) ftc.ManagerData.get1("ManagerCopy").battleYXTLower > 0 ? ftc.send("copyYXTLower10") : ftc.showTip("\u4eca\u65e5\u5df2\u4e0b\u964d\u8fc7\uff0c\u65e0\u6cd5\u518d\u4e0b\u964d");
                    else if (t.target === this.buttonChallenge.node) this.selectMode(ft.type.copyMode.challenge);
                    else if (t.target === this.buttonMopUp.node) this.selectMode(ft.type.copyMode.mopUp);
                    else if (t.target === this.buttonEnter.node)
                        if (this.mode === ft.type.copyMode.challenge) ftc.send("copyEnter", {
                            id: this.id
                        });
                        else {
                            var i = ft.ExtItem.getPower();
                            if (i < 1) ftc.showTip("\u4f53\u529b\u4e0d\u8db3");
                            else if (ft.ExtItem.getNum(ft.value.item.mopUpTicket) < 1) ftc.showTip("\u626b\u8361\u5238\u4e0d\u8db3");
                            else {
                                var a = ftc.ManagerData.get1("ManagerCopy").battleYXT2,
                                    n = ftc.ManagerData.get1("ManagerCopy").battleYXT3;
                                if (a < 1) ftc.showTip("\u6311\u6218\u5b8c\u6210\u540e\u5f00\u542f");
                                else if (a - n < 1) ftc.showTip("\u5df2\u8fbe\u5230\u5386\u53f2\u6700\u9ad8\uff0c\u65e0\u9700\u626b\u8361");
                                else {
                                    var s = a - n;
                                    (s = Math.min(s, i)) > 0 && ftc.showDialog({
                                        text: ft.replaceAll("\u786e\u5b9a\u6d88\u80171\u5f20\u626b\u8361\u5238\u548c%d\u70b9\u4f53\u529b\u4e00\u6b21\u6027\u6311\u6218%d\u5c42?", "%d", s),
                                        click1: function () {
                                            ftc.send("copyMopUp", {
                                                id: ft.value.copy.YXT2
                                            })
                                        },
                                        click2: function () { }
                                    })
                                }
                            }
                        }
                }
            })
        