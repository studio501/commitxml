
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelName: cc.Label,
                    spriteIcon: cc.Sprite,
                    spriteIconDownload: cc.Sprite,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0,
                        zone: 1
                    })
                },
                load: function () {
                    this.spriteIcon.spriteFrame = null
                },
                updateData: function (e) {
                    (this.labelName.string = ft.ExtMsg.getTitle(this.data), this.labelName.node.color = this.index !== e ? ftc.newColor(14131304) : ftc.newColor(16771537), this.buttonSelf.interactable = this.index !== e, this.spriteRedPoint.node.active = ft.ExtMsg.checkCanGet(this.data), this.spriteIcon.node.active = !1, this.spriteIconDownload.node.active = !1, this.data.img) ? (new (t("imageloader"))).imageLoadTool(ftc.resURL + this.data.img, function (t) {
                        t && (this.spriteIconDownload.node.active = !0, this.spriteIconDownload.spriteFrame = t)
                    }.bind(this)) : (this.spriteIcon.node.active = !0, this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "activity_icon_" + this.data.id))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectActivityItem", this)
                }
            })
        