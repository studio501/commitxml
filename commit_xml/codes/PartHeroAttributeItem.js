
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    scrollview: cc.ScrollView,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelDesc: cc.Label,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    spriteSelect: cc.Sprite,
                    spineFlash: sp.Skeleton,
                    spineFly: sp.Skeleton
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.posY = 0, this.scrollview.node.on("scrolling", this.scrollviewCallback, this)
                },
                load: function () {
                    this.spineFlash.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "shan" === e.data.name && (this.updataFlyRoation(), this.spineFly.setAnimation(0, "wait1"), this.buttonSelf.node.setScale(1.02))
                    }.bind(this)), this.spineFly.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "shan" === e.data.name && (this.buttonSelf.node.setScale(1), ftc.sendClient("c_onHeroBoomFlash", this))
                    }.bind(this)), this._item = this.newPart("PartItem"), this.nodeItem.addChild(this._item.node)
                },
                updataFlyRoation: function () {
                    0 == this.index ? this.posY >= 0 && (this.spineFly.node.angle = .2 * this.posY) : 1 == this.index ? this.posY >= 0 && (this.spineFly.node.angle = .1 * this.posY) : 2 == this.index ? this.posY >= 160 ? this.spineFly.node.angle = 0 : 80 < this.posY && this.posY < 160 ? this.spineFly.node.angle = .11 * -this.posY : 0 == this.posY ? this.spineFly.node.angle = -50 : 1 < this.posY && this.posY < 80 && (this.spineFly.node.angle = -(.2 * this.posY + 20)) : 3 == this.index && (0 < this.posY && this.posY <= 140 ? this.spineFly.node.angle = -45 : this.posY > 140 && (this.spineFly.node.angle = -30))
                },
                scrollviewCallback: function (t) {
                    this.posY = Math.round(t.getScrollOffset().y) ? Math.round(t.getScrollOffset().y) : 0
                },
                playAni: function () {
                    this.spineFlash.setAnimation(0, "wait1")
                },
                updateData: function (t) {
                    var e = this.data.num < this.data.needNum,
                        i = this.data.itemNum + "/" + (e ? 1 : this.data.up + 1);
                    this._item.setData(this.data.itemId, i), this.labelName.string = ft.ExtItem.getName(this.data.itemId), this.labelDesc.string = this.data.desc, this.progressBar.progress = this.data.num / this.data.needNum, this.labelProgress.string = this.data.num + "/" + this.data.needNum, this.spriteSelect.node.active = this.index === t, this.index
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    ftc.send("c_onSelectAttributeItem", this)
                }
            })
        