
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeItem1: cc.Node,
                    spriteStar1: cc.Sprite,
                    nodeItem2: cc.Node,
                    spriteStar2: cc.Sprite,
                    nodeLayout: cc.Node,
                    labelCondition: cc.Label,
                    buttonDetail: cc.Button,
                    buttonUp: cc.Button,
                    spriteNothing: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonDetail), this.addClick(this.buttonUp), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                load: function () {
                    this.partWakeUpMaterials = [];
                    for (var t = 0; t < 4; t++) {
                        var e = this.newPart("PartWakeUpMaterial");
                        this.nodeLayout.addChild(e.node), this.partWakeUpMaterials.push(e)
                    }
                    this._item1 = this.newPart("PartItem"), this.nodeItem1.addChild(this._item1.node), this._item2 = this.newPart("PartItem"), this.nodeItem2.addChild(this._item2.node)
                },
                setData: function (t) {
                    t && (this.data = t);
                    var e = ft.ExtEquip.getMaxStar(this.data.id);
                    if (this.data.star >= e) return this.nodeItem1.parent.active = !1, this.nodeItem1.active = !1, this.nodeItem2.active = !1, this.nodeLayout.active = !1, this.labelCondition.string = e > 0 ? ftc.language("\u5df2\u7a81\u7834\u81f3\u6ee1\u7ea7") : ftc.language("\u4e0d\u53ef\u7a81\u7834"), void (this.spriteNothing.node.active = !0);
                    this.nodeItem1.parent.active = !0, this.nodeLayout.active = !0, this.spriteNothing.node.active = !1, this.nodeItem1.active = !0, this._item1.setEquipData({
                        id: this.data.id,
                        lv: this.data.lv,
                        star: 0
                    }), this.spriteStar1.spriteFrame = ft.ExtEquip.getStarSprite(this.data.star), this.nodeItem2.active = !0, this._item2.setEquipData({
                        id: this.data.id,
                        lv: this.data.lv,
                        star: 0
                    }), this.spriteStar2.spriteFrame = ft.ExtEquip.getStarSprite(this.data.star + 1), this._materialEnough = !0;
                    var i = ft.ExtEquip.getConsumeStar(this.data.id, this.data.star);
                    if (i && i.ids) {
                        for (var a = i.ids, n = i.nums, s = 0; s < a.length; s++) {
                            var o = ft.ExtItem.getNum(a[s]),
                                r = n[s];
                            this.partWakeUpMaterials[s].node.active = !0, this.partWakeUpMaterials[s].setData(a[s], o + "/" + r), o < r && (this._materialEnough = !1)
                        }
                        for (s = a.length; s < 4; s++) this.partWakeUpMaterials[s].node.active = !1
                    } else
                        for (s = 0; s < 4; s++) this.partWakeUpMaterials[s].node.active = !1;
                    this.labelCondition.node.active = !0, this.labelCondition.string = ftc.language("\u88c5\u5907\u7b49\u7ea7\u9700\u8981") + ft.value.equipStarNeed[this.data.star] + ftc.language("\u7ea7"), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function () {
                    this.setData()
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node ? ftc.showDetailInfo(this.buttonDetail.node, ft.ExtDetail.getInfo(ft.value.detail.equip_wakeup)) : t.target === this.buttonUp.node && (ftd.Equip.get(this.data.id, "a_advanceditem") ? this.data.star >= ft.ExtEquip.getMaxStar(this.data.id) ? ftc.showTip("\u5df2\u7a81\u7834\u81f3\u6ee1\u661f") : this.data.lv < ft.value.equipStarNeed[this.data.star] ? ftc.showTip("\u7b49\u7ea7\u4e0d\u8db3") : this._materialEnough ? ftc.loadLayout("LayoutEquipStarUpTip", function (t) {
                        t.setData(this.data, this.data.star), ftc.send("equipStarUp", {
                            eid: this.data.entityId,
                            up: 1
                        })
                    }.bind(this)) : ftc.showTip("\u6750\u6599\u4e0d\u8db3") : ftc.showTip("\u6b64\u88c5\u5907\u4e0d\u53ef\u7a81\u7834"))
                }
            })
        