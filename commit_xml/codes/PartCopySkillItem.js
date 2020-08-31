
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelName: cc.Label,
                    labelDesc: cc.Label
                },
                init: function () { },
                load: function () { },
                updateData: function (t) {
                    this.labelName.string = ft.ExtSkill.getName(this.data), this.labelDesc.string = ft.ExtSkill.getInfo(this.data)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        