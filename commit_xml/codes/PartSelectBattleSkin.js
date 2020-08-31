
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelName: cc.Label,
                    spineHero: sp.Skeleton,
                    labelInfo: cc.Label,
                    buttonEnable: cc.Button,
                    spriteGray: cc.Sprite,
                    spriteUsing: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonEnable)
                },
                load: function () { },
                setData: function (t, e) {
                    this.data = t, this.index = e
                },
                updateData: function (t) {
                    t && (this.param = t);
                    var e, i, a = this.data;
                    0 == a ? (e = ftd.Hero.get(this.param.id, "img"), i = !0) : (e = ftd.Item.get(a, "c_work"), i = !!ftc.ManagerData.get2Object("Item", a)), this.loadResource("spine/role/" + e, sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this)), this._canUse = !1, this.spriteUsing.node.active = !1;
                    var n = this.buttonEnable.node.getChildByName("Label").getComponent(cc.Label);
                    i ? (this._canUse = a != this.param.skin, n.string = this._canUse ? "\u4f7f\u7528" : "\u4f7f\u7528\u4e2d", this.spriteUsing.node.active = !this._canUse) : n.string = "\u672a\u83b7\u5f97", this.buttonEnable.interactable = i, this.spriteGray.node.active = !i;
                    var s = 0 == a;
                    this.labelName.string = s ? "\u9ed8\u8ba4" : ft.ExtItem.getName(a), this.labelInfo.string = s ? "\u8fd9\u53ea\u662f\u9ed8\u8ba4\u7684\u76ae\u80a4" : ft.ExtItem.getInfo(a)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonEnable.node && this._canUse && ftc.send("heroSetBattleSkin", {
                        id: this.param.id,
                        skin: this.data
                    })
                }
            })
        