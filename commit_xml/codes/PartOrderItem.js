
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteSelect: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteLock: cc.Sprite,
                    labelLock: cc.Label,
                    labelName: cc.Label,
                    spriteRedPoint: cc.Sprite,
                    spriteSelect2: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                updateData: function (t) {
                    var e = this.data.id || this.data;
                    this.spriteIcon.spriteFrame = ft.ExtPet.getIconSprite(e), this.spriteLock.node.active = !this.data.id, this.spriteLock.node.active && (this.labelLock.string = ft.ExtPet.getLevel(e) + "\u7ea7\u89e3\u9501");
                    var i = ft.ExtPet.getName(e);
                    if (this.data.up && (i += "+" + this.data.up), this.labelName.string = i, t && (this.buttonSelf.interactable = this.index !== t.index, this.spriteSelect.node.active = this.index === t.index, this.spriteSelect2.node.active = e == t.selectPet), ft.isObject(this.data)) {
                        var a = !1;
                        if (ftc.ManagerData.get1("ManagerPet").addTipsEmbattle.length > 0)
                            for (var n = ftc.ManagerData.get1("ManagerPet").addTipsEmbattle.split(","), s = 0; s < n.length; s++)
                                if (n[s] == e) {
                                    a = !0;
                                    break
                                } this.spriteRedPoint.node.active = a && !this.data.notShow
                    } else this.spriteRedPoint.node.active = !1
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && (ftc.sendClient("c_onSelectOrderItem", this), this.spriteRedPoint.node.active = !1, ft.isObject(this.data) && (this.data.notShow = !0))
                }
            })
        