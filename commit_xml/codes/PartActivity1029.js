
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelTxt: cc.Label,
                    nodeLayout: cc.Node
                },
                init: function () { },
                load: function () { },
                setData: function (t) {
                    this.data = t, this.labelTxt.string = ft.replaceAll(this.data.txt, "|", "\n");
                    var e = ft.ExtMsg.getActivityData(this.data),
                        i = e.ids,
                        a = e.nums;
                    ftc.ManagerRes.restoreNodeChildren(this.nodeLayout);
                    for (var n = 0; n < i.length; n++) {
                        var s = this.newPart("PartItem");
                        s.node.scale = .9, s.setData(i[n], a[n], !0), s.setNameColor(ftc.newColor(5841436)), this.nodeLayout.addChild(s.node, n)
                    }
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        