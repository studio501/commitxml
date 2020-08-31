
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonDetail: cc.Button,
                    nodeProp: cc.Node,
                    nodeSkillLayout: cc.Node,
                    buttonSkin: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonDetail), this.buttonSkin && this.addClick(this.buttonSkin), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                setData: function (t) {
                    this.data = t, this.id = this.data.id || this.data;
                    for (var e = !!this.data.id, i = 0; i < this.nodeProp.children.length; i++) {
                        var a = this.nodeProp.children[i],
                            n = a.getChildByName("spriteIcon").getComponent(cc.Sprite),
                            s = a.getChildByName("labelName").getComponent(cc.Label),
                            o = a.getChildByName("labelValue").getComponent(cc.Label);
                        n.spriteFrame = ft.ExtPropName.getSpriteIcon(i + 1), s.string = ft.ExtPropName.getName(i + 1), o.string = e ? ft.ExtHero.getValue(this.data, i + 1) : ft.ExtHero.getSelfValue(this.data, i + 1)
                    }
                    ftc.ManagerRes.restoreNodeChildren(this.nodeSkillLayout);
                    for (i = 0; i < 3; i++) {
                        var r = this.newPart("PartHeroSkill");
                        r.setData(this.data, i), this.nodeSkillLayout.addChild(r.node)
                    }
                    ftc.isTv() && (this.buttonDetail.node.active = !1), this.buttonSkin && (this.buttonSkin.node.active = e && ft.ExtItem.mapHeroBattleSkin[this.id])
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node ? ftc.loadLayout("LayoutHeroPropDetail", function (t) {
                        t.setData(this.data)
                    }.bind(this)) : this.buttonSkin && t.target === this.buttonSkin.node && ftc.loadLayout("LayoutSelectBattleSkin", function (t) {
                        t.setData(this.id)
                    }.bind(this))
                }
            })
        