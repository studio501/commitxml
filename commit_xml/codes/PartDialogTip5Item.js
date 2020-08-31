
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteSelect: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.spriteSelect.node.zIndex = 10
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.y = 10, this._item.setInteractable(!1), this.node.addChild(this._item.node)
                },
                updateData: function (t) {
                    var e = this.data.id,
                        i = this.data.num;
                    this._item.setData(e, i, !0), this.spriteSelect.node.active = t === this.index
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectDialogTip5Item", this)
                }
            })
        