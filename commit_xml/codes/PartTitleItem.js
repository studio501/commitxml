
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelName: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    this.buttonSelf.interactable = this.index !== t, this.labelName.string = ft.ExtTitle.getName(this.data.id), -1 !== ftc.ManagerData.get1("ManagerTitle").titleIds.split(",").indexOf(this.data.id.toString()) && (this.labelName.string += ftc.language("(\u4f7f\u7528\u4e2d)"))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectTitleItem", this)
                }
            })
        