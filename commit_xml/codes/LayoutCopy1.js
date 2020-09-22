
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    spriteBanner: cc.Sprite,
                    layoutRewards: cc.Node,
                    labelInfo: cc.Label,
                    labelInfo1: cc.Label,
                    toggleChallenge: cc.Toggle,
                    buttonChallenge: cc.Button,
                    toggleMopUp: cc.Toggle,
                    buttonMopUp: cc.Button,
                    spriteIconConsume: cc.Sprite,
                    labelConsume: cc.Label,
                    labelTicket: cc.Label,
                    buttonEnter: cc.Button,
                    labelTimes: cc.Label,
                    buttonAdd: cc.Button,
                    buttonLeft: cc.Button,
                    buttonRight: cc.Button,
                    nodeHJZ: cc.Node,
                    labelHJZ: cc.Label,
                    labelZYS: cc.Label,
                    nodeCCJJ: cc.Node,
                    labelCCJJ: cc.Label,
                    spriteHero: cc.Sprite,
                    labelZSJTip: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonEnter), this.addClick(this.buttonChallenge), this.addClick(this.buttonMopUp), this.addClick(this.buttonAdd), this.addClick(this.buttonLeft, !0), this.addClick(this.buttonRight, !0)
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.node.addChild(this.partTopStatus.node), this.toggleChallenge.isChecked = !0, this.toggleMopUp.isChecked = !1, this.id = void 0, this.type = void 0, this.mode = void 0, this._canEnter = 1
                },
                setData: function (t) {
                    this.id = t[0], this.type = t[1], this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.updateData(), this.id !== ft.value.copy.ZSJ ? ftc.setTvTip(this.node) : ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换神将")
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData();
                    var t = this.id;
                    if (ftc.ManagerRes.restoreNodeChildren(this.layoutRewards), this._canEnter = 1, this.buttonAdd.node.parent.active = !0, this.buttonAdd.node.active = !1, this.buttonChallenge.node.parent.active = t === ft.value.copy.ZSJ || t === ft.value.copy.CCJJ, this.buttonMopUp.node.parent.active = this.buttonChallenge.node.parent.active, this.nodeHJZ.active = t === ft.value.copy.HJZ || t === ft.value.copy.ZYS, this.labelHJZ.node.active = t === ft.value.copy.HJZ, this.labelZYS.node.active = t === ft.value.copy.ZYS, this.nodeCCJJ.active = t === ft.value.copy.CCJJ, this.spriteHero.node.active = t === ft.value.copy.ZSJ, this.labelZSJTip.node.active = !1, this.buttonLeft.node.active = !1, this.buttonRight.node.active = !1, cc.loader.loadRes("img/copy_banner_" + t, cc.SpriteFrame, function (t, e) {
                        !t && e && (this.spriteBanner.spriteFrame = e)
                    }.bind(this)), t === ft.value.copy.HJZ) {
                        this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(t), "|", "\n"), this.labelInfo1.string = "", this.labelHJZ.string = ftc.ManagerData.get1("ManagerCopy").battleHJZ1;
                        for (var e = 0; e < 3; e++) {
                            (n = this.newPart("PartItem")).node.scale = 1, n.setData(ft.value.item.gold, "x???"), this.layoutRewards.addChild(n.node)
                        }
                    } else if (t === ft.value.copy.ZYS) {
                        this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(t), "|", "\n"), this.labelInfo1.string = ftc.language("次日0点重置");
                        var i = 0,
                            a = ft.ExtCopy.getCopy(t);
                        a && (i = Number(a.ext)), this.labelZYS.string = "经验 " + ft.getNumShow(i);
                        for (e = 0; e < 3; e++) {
                            (n = this.newPart("PartItem")).node.scale = 1, n.setData(ft.value.item.expMedicine2, 1), this.layoutRewards.addChild(n.node)
                        }
                    } else if (t === ft.value.copy.CCJJ) {
                        this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(t), "|", "\n"), this.labelInfo1.string = ftc.language("每周日0点发放奖励"), this.labelCCJJ.string = ftc.language("本周最高坚持回合:") + ftc.ManagerData.get1("ManagerCopy").battleCCJJ2 + "\n" + ftc.language("历史最高坚持回合:") + ftc.ManagerData.get1("ManagerCopy").battleCCJJ1;
                        for (e = 0; e < 1; e++) {
                            var n;
                            (n = this.newPart("PartItem")).node.scale = 1, n.setData(ft.value.item.upgradeBox, "1"), this.layoutRewards.addChild(n.node)
                        }
                    } else t === ft.value.copy.ZSJ && (this.labelInfo1.string = ftc.language("次日0点重置"), this.selectSJ(this.type));
                    this.id === ft.value.copy.HJZ && this.id === ft.value.copy.ZYS ? this._updateConsumeInfo() : this.selectMode(this.mode ? this.mode : ft.type.copyMode.challenge)
                },
                _updateConsumeInfo: function () {
                    var t = ft.ExtCopy.getRemainingCount(this.id);
                    if (this.labelTimes.string = t + "/" + ft.ExtCopy.getCount(this.id), this.labelTimes.node.color = ftc.newColor(t > 0 ? ftc.value.color.normal : ftc.value.color.lackRed), this._canEnter &= t > 0, 0 === t && this.id === ft.value.copy.ZSJ) {
                        var e = ft.ExtItem.getNum(ft.value.item.challengeTicket);
                        this._canEnter = e > 0, e > 0 ? (this.buttonAdd.node.parent.active = !1, this.labelZSJTip.node.active = !0, this.labelZSJTip.string = "挑战次数已用尽，将使用挑战券 " + ft.ExtItem.getNum(ft.value.item.challengeTicket) + "/1") : this.buttonAdd.node.active = ftc.ManagerData.get1("ManagerCopy").battleZSJBuy > 0
                    }
                    var i = ft.ExtCopy.getConsume(this.id),
                        a = ft.ExtItem.getNum(i.ids[0]),
                        n = i.nums[0];
                    this.spriteIconConsume.spriteFrame = ft.ExtItem.getLittleIconSprite(i.ids[0]), this.labelConsume.string = n, this.labelConsume.node.color = ftc.newColor(a >= n ? ftc.value.color.normal : ftc.value.color.lackRed), this._canEnter &= a >= n, this.normalSpriteFrame || (this.normalSpriteFrame = this.buttonEnter.normalSprite), this.id === ft.value.copy.ZSJ ? (this.buttonEnter.interactable = !0, this.buttonEnter.normalSprite = this._canEnter ? this.normalSpriteFrame : this.buttonEnter.disabledSprite) : (this.buttonEnter.normalSprite = this.normalSpriteFrame, this.buttonEnter.interactable = this._canEnter)
                },
                selectMode: function (t) {
                    if (this.mode = t, this.toggleChallenge.isChecked = t === ft.type.copyMode.challenge, this.toggleMopUp.isChecked = t === ft.type.copyMode.mopUp, this._canEnter = 1, t === ft.type.copyMode.mopUp) {
                        this.labelTicket.node.parent.active = !0;
                        var e, i = ft.ExtItem.getNum(ft.value.item.mopUpTicket);
                        this.id === ft.value.copy.CCJJ ? e = ft.value.com.mopUpTicketNumWeekly : this.id === ft.value.copy.ZSJ && (e = ft.value.com.mopUpTicketNumDaily), this.labelTicket.string = i + "/" + e, this.labelTicket.node.color = ftc.newColor(i >= e ? ftc.value.color.normal : ftc.value.color.lackRed), this._canEnter &= i >= e
                    } else this.labelTicket.node.parent.active = !1;
                    this._updateConsumeInfo()
                },
                selectSJ: function (t) {
                    t > 2 ? t = 2 : t < 0 && (t = 0), this.type = t, this.spriteHero.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "copy3_img_" + [1039, 1024, 2546][this.type]);
                    var e = Math.floor(Number(ftc.ManagerData.get1("ManagerCopy").battleZSJ.split(",")[this.type]) / ft.value.com.copyZSJTimes);
                    e = e < 3 ? 3 * this.type + e : ftd.Copy.get(ft.value.copy.ZSJ, "a_award").length - 1, ftc.ManagerRes.restoreNodeChildren(this.layoutRewards);
                    var i = ft.ExtCopy.getAwards(ft.value.copy.ZSJ, e);
                    if (i && i.ids)
                        for (var a = 0; a < i.ids.length; a++) {
                            var n = this.newPart("PartItem");
                            n.node.scale = 1, n.setData(i.ids[a], i.nums[a]), this.layoutRewards.addChild(n.node)
                        }
                    this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(ft.value.copy.ZSJ).split("_")[this.type], "|", "\n"), this.buttonLeft.node.active = this.type > 0, this.buttonRight.node.active = this.type < 2
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        copyEnter: function (t, e) {
                            0 === t || (1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t ? ftc.showTip("体力不足") : 4 === t && ftc.showTip("挑战券不足"))
                        },
                        copyEnd: function (t, e) {
                            this.id == t.id && this.updateData()
                        },
                        copyZSJBuyCount: function (t, e) {
                            0 === t ? (ftc.showTip("购买成功"), this.labelZSJTip.node.active = !1, this.updateData()) : ftc.showTip("购买失败")
                        },
                        copyMopUp: function (t, e) {
                            0 === t ? this.updateData() : 1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("体力不足")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonChallenge.node) this.selectMode(ft.type.copyMode.challenge);
                    else if (t.target === this.buttonMopUp.node) this.selectMode(ft.type.copyMode.mopUp);
                    else if (t.target === this.buttonEnter.node) this.toggleChallenge.isChecked ? this.id === ft.value.copy.ZSJ ? ft.ExtCopy.getRemainingCount(this.id) + ft.ExtItem.getNum(ft.value.item.challengeTicket) <= 0 ? ftc.showTip("次数不足") : ft.ExtItem.getNum(ft.value.item.power) < 100 ? ftc.showTip("体力不足") : ft.ExtCopy.getRemainingCount(this.id) <= 0 ? ftc.showDialog({
                        text: "确定消耗1张挑战券和100点体力挑战一次?",
                        click1: function () {
                            ftc.send("copyEnter", {
                                id: this.id,
                                param: this.type
                            })
                        }.bind(this),
                        click2: function () { }
                    }) : ftc.send("copyEnter", {
                        id: this.id,
                        param: this.type
                    }) : ftc.send("copyEnter", {
                        id: this.id,
                        param: this.type
                    }) : this.id === ft.value.copy.CCJJ ? ft.ExtCopy.isFinishChallenge(this.id, this.type) ? 0 === ft.ExtCopy.getCopy(this.id).count ? ftc.showTip("次数不足") : ft.ExtItem.getNum(ft.value.item.power) < 1 ? ftc.showTip("体力不足") : ftc.ManagerData.get1("ManagerCopy").battleCCJJ1 < 1 ? ftc.showTip("暂无历史记录，无法扫荡") : ftc.ManagerData.get1("ManagerCopy").battleCCJJ1 <= ftc.ManagerData.get1("ManagerCopy").battleCCJJ2 ? ftc.showTip("当前已达历史最高回合数，无需扫荡") : ft.ExtItem.getNum(ft.value.item.mopUpTicket) < ft.value.com.mopUpTicketNumWeekly ? ftc.showTip("扫荡券不足") : ftc.showDialog({
                        text: ft.replaceAll("确定消耗%d张扫荡券和1点体力扫荡一次?", "%d", ft.value.com.mopUpTicketNumWeekly),
                        click1: function () {
                            ftc.send("copyMopUp", {
                                id: this.id,
                                param: this.type
                            })
                        }.bind(this),
                        click2: function () { }
                    }) : ftc.showTip("挑战完成后开启") : this.id === ft.value.copy.ZSJ && (ft.ExtCopy.isFinishChallenge(this.id, this.type) ? ft.ExtCopy.getCopy(this.id).count + ft.ExtItem.getNum(ft.value.item.challengeTicket) <= 0 ? ftc.showTip("次数不足") : ft.ExtItem.getNum(ft.value.item.power) < 100 ? ftc.showTip("体力不足") : ft.ExtItem.getNum(ft.value.item.mopUpTicket) < ft.value.com.mopUpTicketNumDaily ? ftc.showTip("扫荡券不足") : ftc.showDialog({
                        text: ft.replaceAll("确定消耗%d张扫荡券和100点体力扫荡一次?", "%d", ft.value.com.mopUpTicketNumDaily),
                        click1: function () {
                            ftc.send("copyMopUp", {
                                id: this.id,
                                param: this.type
                            })
                        }.bind(this),
                        click2: function () { }
                    }) : ftc.showTip("挑战完成后开启"));
                    else if (t.target === this.buttonAdd.node) {
                        var i = ftc.ManagerData.get1("ManagerCopy").battleZSJBuy,
                            a = ft.value.com.copyShenJiangBuyCount[2 - i];
                        ft.ExtItem.getNum(ft.value.item.gem) < a ? ftc.showTip("元宝不足") : ftc.showDialog({
                            text: "确定花费%d元宝购买1次挑战".replace("%d", a),
                            click1: function () {
                                ftc.send("copyZSJBuyCount")
                            },
                            click2: function () { }
                        })
                    } else t.target === this.buttonLeft.node ? this.selectSJ(this.type - 1) : t.target === this.buttonRight.node && this.selectSJ(this.type + 1)
                },
                onKeyMenu: function (t) {
                    this.id === ft.value.copy.ZSJ && (t || (this.type++, this.type > 2 && (this.type = 0), this.selectSJ(this.type)))
                }
            })
        