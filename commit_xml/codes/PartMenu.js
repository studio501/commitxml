
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonSelf: cc.Button,
                    nodeLayout: cc.Node,
                    buttonMenus: [cc.Button]
                },
                init: function () {
                    this.addClick(this.buttonSelf);
                    for (var t = 0; t < this.buttonMenus.length; t++) this.addClick(this.buttonMenus[t])
                },
                load: function () {
                    for (var t = 0; t < this.buttonMenus.length; t++) this.buttonMenus[t].node.active = !1
                },
                setData: function (t, e) {
                    this.callback = e;
                    for (var i = 0; i < t.length; i++) this.buttonMenus[i].node.active = !0, this.buttonMenus[i].node.getChildByName("Label").getComponent(cc.Label).string = t[i]
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonSelf.node) this.node.active = !1;
                    else {
                        if (!this.callback) return;
                        for (var i = 0; i < this.buttonMenus.length; i++)
                            if (t.target === this.buttonMenus[i].node) {
                                this.callback(i), this.node.active = !1;
                                break
                            }
                    }
                }
            })
        