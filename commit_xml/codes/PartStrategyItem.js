
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    spriteLock: cc.Sprite,
                    spriteRedPoint: cc.Sprite,
                    labelName: cc.Label,
                    labelInfo: cc.Label,
                    spriteUpped: cc.Sprite,
                    labelSp: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        zone: 1
                    })
                },
                updateData: function (t) {
                    var e = this.data.id || this.data,
                        i = !this.data.id;
                    this.spriteIcon.spriteFrame = ft.ExtPet.getIconSprite(e), this.spriteLock.node.active = i, this.labelName.string = ft.ExtPet.getName(e), this.labelInfo.string = ft.ExtPet.getInfo(e), this.labelSp.string = ftc.language("\u7b56\u7565\u503c:") + ft.ExtPet.getSP(e);
                    var a = ftc.ManagerData.get1("ManagerPet")["selectArtifacts" + t.team].split(",");
                    this.spriteUpped.node.active = -1 !== a.indexOf(e.toString()), ft.isObject(this.data) ? this.spriteRedPoint.node.active = t.tips.length > 0 && -1 !== t.tips.split(",").indexOf(e.toString()) && !this.data.notShow : this.spriteRedPoint.node.active = !1
                },
                isUpped: function () {
                    return this.spriteUpped.node.active
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && (ftc.sendClient("c_onSelectStrategyItem", this), this.spriteRedPoint.node.active = !1, ft.isObject(this.data) && (this.data.notShow = !0))
                }
            })
        