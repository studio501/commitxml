
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelDesc: cc.Label,
                    spriteSelect: cc.Sprite,
                    spineFlash: sp.Skeleton,
                    spineFly: sp.Skeleton,
                    spineBoomFlash: sp.Skeleton
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.spineFlash.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "shan" === e.data.name && (this.spineFly.node.angle = 1 === this.index ? -30 : 0, this.buttonSelf.node.setScale(1.02), this.spineFly.setAnimation(0, "wait1"))
                    }.bind(this)), this.spineFly.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "shan" === e.data.name && (this.buttonSelf.node.setScale(1), this.spineBoomFlash.setAnimation(0, "wait1"))
                    }.bind(this)), this._item = this.newPart("PartItem"), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    this._item.setData(this.data.id, ft.getNumShow(ft.ExtItem.getNum(this.data.id))), this.labelName.string = ft.ExtItem.getName(this.data.id), this.labelDesc.string = this.data.desc, this.spriteSelect.node.active = this.index === t
                },
                playAni: function () {
                    this.spineFlash.setAnimation(0, "wait1")
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    ftc.sendClient("c_onSelectEquipLvUpItem", this)
                }
            })
        