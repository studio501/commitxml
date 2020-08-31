
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    spriteIcon2: cc.Sprite,
                    spriteStatus: cc.Sprite,
                    labelName: cc.Label,
                    labelContent: cc.Label,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                updateData: function (t) {
                    this.labelName.string = ft.ExtMsg.getTitle(this.data), this.labelContent.string = ft.ExtMsg.getIntro(this.data), this.buttonSelf.interactable = t !== this.index, this.spriteIcon.node.active = 0 === Number(this.data.ext), this.spriteIcon2.node.active = 0 !== Number(this.data.ext);
                    var e = ft.ExtMsg.getMsgAward(this.data);
                    this.spriteRedPoint.node.active = 0 === Number(this.data.ext) || 2 != this.data.ext && e && e.ids && e.ids.length > 0
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectMailItem", this)
                }
            })
        