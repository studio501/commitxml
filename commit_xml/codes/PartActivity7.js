
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeLayout: cc.Node,
                    spriteRemoveAdd: cc.Sprite,
                    buttonGo: cc.Button,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonGo), this.addClick(this.buttonDetail)
                },
                setData: function (t) {
                    t && (this.data = t);
                    for (var e = this.nodeLayout.children.length - 1; e >= 0; e--) ftc.ManagerRes.restoreNode(this.nodeLayout.children[e]);
                    var i = ft.ExtMsg.getActivityData(this.data).items[0],
                        a = i.id2s,
                        n = i.num2s;
                    for (e = 0; e < a.length; e++) {
                        var s = this.newPart("PartItem");
                        s.setData(a[e], n[e]), this.nodeLayout.addChild(s.node)
                    }
                    0 == this.data.ste && ftc.ManagerData.get1("Player").rmb < ft.value.com.giftVipNeed ? this.buttonGo.node.getChildByName("Label").getComponent(cc.Label).string = ftc.language("前往充值") : this.buttonGo.node.getChildByName("Label").getComponent(cc.Label).string = ftc.language("领取");
                    var o = ftc.ManagerData.get2("Pet"),
                        r = [];
                    for (var e in o) {
                        var c = ft.ExtPet.getType(o[e].id);
                        c != ft.type.pet.embattle && (r[c - 2] = o[e])
                    }
                    this.unlockPets = [];
                    e = 0;
                    for (var h = ft.value.com.strategySize; e < h; e++) r[e] || this.unlockPets.push(ft.value.strategies[e]);
                    this.unlockPets.sort(function (t, e) {
                        return ft.ExtPet.getType(t) - ft.ExtPet.getType(e)
                    }), this.spriteRemoveAdd.node.active = ftc.isIos()
                },
                cleanup: function () { },
                updateData: function () {
                    this.setData()
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonGo.node) ftc.ManagerData.get1("Player").rmb < ft.value.com.giftVipNeed ? ftc.openBuyGem() : ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    });
                    else if (t.target === this.buttonDetail.node) {
                        var i = "";
                        if (this.unlockPets.length > 0) {
                            i += "未解锁策略\n";
                            for (var a = 0; a < this.unlockPets.length; a++) i += ft.ExtPet.getName(this.unlockPets[a]) + "\n"
                        } else i = "所有策略已解锁";
                        ftc.showDetailInfo(t.target, i)
                    }
                }
            })
        