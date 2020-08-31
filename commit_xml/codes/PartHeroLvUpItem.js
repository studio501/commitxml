
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelDesc: cc.Label,
                    spriteSelect: cc.Sprite,
                    spineFlash: sp.Skeleton,
                    spineFly: sp.Skeleton
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.spineFlash.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "shan" === e.data.name && (this.spineFly.node.angle = 1 === this.index ? -30 : 0, this.spineFly.setAnimation(0, "wait1"), this.buttonSelf.node.setScale(1.02))
                    }.bind(this)), this.spineFly.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "shan" === e.data.name && (ftc.sendClient("c_onHeroExpLvUpItem", this), this.buttonSelf.node.setScale(1))
                    }.bind(this)), this._item = this.newPart("PartItem"), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    this._item.setData(this.data, ft.ExtItem.getNum(this.data) + "/1"), this.labelName.string = ft.ExtItem.getName(this.data), this.labelDesc.string = ft.ExtItem.getInfo(this.data), this.spriteSelect.node.active = this.index === t
                },
                playAni: function () {
                    this.spineFlash.setAnimation(0, "wait1")
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    ftc.sendClient("c_onSelectLvUpItem", this)
                }
            })
        