
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    partOrder: t("PartOrder"),
                    labelInfo: cc.Label,
                    listView: ftc.ListView,
                    nodeLayout: cc.Node,
                    labelGold: cc.Label,
                    buttonUp: cc.Button,
                    labelUp: cc.Label,
                    buttonLeft: cc.Button,
                    buttonRight: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartOrderUpItemInfo"]), this.addClick(this.buttonUp), this.addClick(this.buttonLeft), this.addClick(this.buttonRight), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node), this.initPart(this.partOrder), ftc.isTv() && (this.buttonLeft.node.active = !1, this.buttonRight.node.active = !1)
                },
                setData: function (t, e, i) {
                    this.datas = e, this.index = i, this.partOrder.selectTeam(t), this.selectOrder(i)
                },
                selectOrder: function (t) {
                    this.index = t, ftc.isTv() || (this.buttonLeft.node.active = this.index > 1, this.buttonRight.node.active = this.index < this.datas.length - 1);
                    var e = this.datas[t];
                    this.partOrder.setOrder(e.id, !0), this.partOrder.setInteractable(!1), this.labelInfo.string = 3 === e.id ? ft.ExtDetail.getInfo(19) : ft.ExtPet.getInfo(e.id), this.listView.setListView([e, e, e, e, e]), this.updateNeeds()
                },
                updateNeeds: function () {
                    var t = this.datas[this.index];
                    if (ftc.ManagerRes.restoreNodeChildren(this.nodeLayout), t.up < ft.value.com.maxPetUp)
                        for (var e = ft.ExtPet.getUpNeedMaterials(t.up), i = 0; i < e.ids.length; i++)
                            if (e.nums[i] > 0) {
                                var a = ft.ExtItem.getNum(e.ids[i]),
                                    n = e.nums[i],
                                    s = this.newPart("PartItem");
                                s.node.scale = .8, s.setData(e.ids[i], void 0, !0), s.setName(a + "/" + n), s.setNameColor(ftc.newColor(a >= n ? ftc.value.color.normal : ftc.value.color.lackRed)), this.nodeLayout.addChild(s.node, i)
                            } var o = ft.ExtPet.getNextGold(t.up);
                    this.labelGold.string = o, this.labelGold.node.color = ftc.newColor(ft.ExtItem.getGold() >= o ? ftc.value.color.normal : ftc.value.color.lackRed), this.buttonUp.node.active = t.up < ft.value.com.maxPetUp, this.labelUp.node.active = !this.buttonUp.node.active
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        petUp: function (t, e) {
                            t > 0 ? (ftc.playEffect(ftc.type.effect.heroUp), ftc.showTip("突破成功"), this.partOrder.playAni(), this.listView.updateListViewItems(!0), this.updateNeeds()) : 0 == t ? ftc.showTip("材料不足") : ftc.showTip("阵法未解锁")
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonUp.node ? this.datas[this.index].up < ft.value.com.maxPetUp ? ftc.send("petUp", this.datas[this.index].id) : ftc.showTip("已突破至极限") : t.target === this.buttonLeft.node ? this.index > 1 && this.selectOrder(this.index - 1) : t.target === this.buttonRight.node ? this.index < this.datas.length - 1 && this.selectOrder(this.index + 1) : t.target === this.buttonClose.node && this.cancel()
                }
            })
        