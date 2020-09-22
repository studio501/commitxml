
            
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
                    this.partTopStatus = this.newPart("PartTopStatus"), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node, "【返回键】关闭界面")
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
                            0 === t || (1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("体力不足"))
                        },
                        copyEnd: function (t, e) {
                            this.id == t.id && this.updateData()
                        },
                        copyMopUp: function (t, e) {
                            0 === t ? ftc.showTip("扫荡成功") : 1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("体力不足")
                        },
                        copyYXTLower10: function (t, e) {
                            0 === t ? (ftc.showTip("下降10层成功"), this.updateData()) : 1 === t ? ftc.showTip("今日已下降过，无法再下降") : 2 === t && ftc.showTip("层数不足，无法再下降")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonChallenge1.node) ftc.send("copyEnter", {
                        id: this.id
                    });
                    else if (t.target === this.buttonLower.node) ftc.ManagerData.get1("ManagerCopy").battleYXTLower > 0 ? ftc.send("copyYXTLower10") : ftc.showTip("今日已下降过，无法再下降");
                    else if (t.target === this.buttonChallenge.node) this.selectMode(ft.type.copyMode.challenge);
                    else if (t.target === this.buttonMopUp.node) this.selectMode(ft.type.copyMode.mopUp);
                    else if (t.target === this.buttonEnter.node)
                        if (this.mode === ft.type.copyMode.challenge) ftc.send("copyEnter", {
                            id: this.id
                        });
                        else {
                            var i = ft.ExtItem.getPower();
                            if (i < 1) ftc.showTip("体力不足");
                            else if (ft.ExtItem.getNum(ft.value.item.mopUpTicket) < 1) ftc.showTip("扫荡券不足");
                            else {
                                var a = ftc.ManagerData.get1("ManagerCopy").battleYXT2,
                                    n = ftc.ManagerData.get1("ManagerCopy").battleYXT3;
                                if (a < 1) ftc.showTip("挑战完成后开启");
                                else if (a - n < 1) ftc.showTip("已达到历史最高，无需扫荡");
                                else {
                                    var s = a - n;
                                    (s = Math.min(s, i)) > 0 && ftc.showDialog({
                                        text: ft.replaceAll("确定消耗1张扫荡券和%d点体力一次性挑战%d层?", "%d", s),
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
        