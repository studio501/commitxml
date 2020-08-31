
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelDesc1: cc.Label,
                    labelDesc2: cc.Label
                },
                init: function () { },
                load: function () { },
                updateData: function (t) {
                    this.labelDesc1.string = ft.ExtAchievement.getInfo(this.data.id) + " x " + this.data.ext, this.labelDesc2.string = ft.ExtAchievement.getConditions(this.data.id)[0] * this.data.ext
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        