
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    layoutRewards: cc.Node,
                    buttonTabs: [cc.Button],
                    labelInfo: cc.Label,
                    labelInfo1: cc.Label,
                    spriteIconConsume: cc.Sprite,
                    labelConsume: cc.Label,
                    buttonEnter: cc.Button,
                    labelTimes: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonEnter);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0)
                },
                load: function () {
                    this.id = ft.value.copy.YWC, this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.node.addChild(this.partTopStatus.node);
                    for (var t = 0; t < 2; t++) {
                        var e = this.newPart("PartItem");
                        e.setData(ft.value.item.petBook1, "x???"), this.layoutRewards.addChild(e.node)
                    }
                    ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换难度")
                },
                setData: function (t) {
                    this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(this.id), "|", "\n"), this.labelInfo1.string = ft.replaceAll(ft.ExtDetail.getInfo(ft.value.detail.ywc), "|", "\n"), this.updateData(), this.selectTab(this.tabIndex)
                },
                selectTab: function (t) {
                    this.tabIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = e !== t
                },
                enter: function () { },
                updateData: function () {
                    this.opens = [!0, !1, !1, !1, !1], this.tabIndex = 0;
                    for (var t = 0; t < this.opens.length; t++) t > 0 && (this.opens[t] = !!ftc.ManagerData.get2Object("Achievement", ft.value.achievement["ywc" + (t - 1)]), this.opens[t] && (this.tabIndex = t)), this.buttonTabs[t].node.getChildByName("Text").x = this.opens[t] ? 0 : -15, this.buttonTabs[t].node.getChildByName("spriteLock").active = !this.opens[t];
                    this._updateConsumeInfo()
                },
                _updateConsumeInfo: function () {
                    this._canEnter = 1;
                    var t = ft.ExtCopy.getRemainingCount(this.id);
                    this.labelTimes.string = t + "/" + ft.ExtCopy.getCount(this.id), this.labelTimes.node.color = ftc.newColor(t > 0 ? ftc.value.color.normal : ftc.value.color.lackRed), this._canEnter &= t > 0;
                    var e = ft.ExtCopy.getConsume(this.id),
                        i = ft.ExtItem.getNum(e.ids[0]),
                        a = e.nums[0];
                    this.spriteIconConsume.spriteFrame = ft.ExtItem.getLittleIconSprite(e.ids[0]), this.labelConsume.string = a, this.labelConsume.node.color = ftc.newColor(i >= a ? ftc.value.color.normal : ftc.value.color.lackRed), this._canEnter &= i >= a, this.buttonEnter.interactable = this._canEnter
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
                        }
                    }
                },
                onKeyMenu: function (t) {
                    if (!t) return this.tabIndex++, this.tabIndex >= this.buttonTabs.length && (this.tabIndex = 0), this.selectTab(this.tabIndex), !0
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonEnter.node) this.opens[this.tabIndex] ? ftc.send("copyEnter", {
                        id: this.id,
                        param: this.tabIndex
                    }) : ftc.showTip("请先通过之前的难度");
                    else
                        for (var i = 0; i < this.buttonTabs.length; i++)
                            if (t.target === this.buttonTabs[i].node) {
                                this.selectTab(i);
                                break
                            }
                }
            })
        