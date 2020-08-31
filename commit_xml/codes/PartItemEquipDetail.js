
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelType: cc.Label,
                    labelValue0: cc.Label,
                    labelValue1: cc.Label,
                    labelValue2: cc.Label,
                    labelInfo: cc.Label,
                    nodeLayoutMenu: cc.Node,
                    buttonMenu: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonMenu)
                },
                setData: function (t) { },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target, this.buttonMenu.node
                }
            })
        