
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelText: cc.Label
                },
                init: function () { },
                update: function (t) { },
                updateData: function () { },
                cleanup: function () { },
                show: function (t) {
                    this.addTip(this.node), void 0 === this.initOpacity && (this.initOpacity = this.node.opacity), this.node.active = !0, this.node.opacity = 0, this.labelText.string = t.str, this.node.y = -15, cc.tween(this.node).parallel(cc.tween().by(.1, {
                        y: 15
                    }), cc.tween().sequence(cc.fadeTo(.05, this.initOpacity), cc.delayTime(t.duration), cc.fadeOut(.1), cc.callFunc(this.hide, this))).start()
                },
                hide: function () {
                    this.removeTip(this.node), ftc.ManagerRes.restoreNode(this.node)
                },
                addTip: function (t) {
                    void 0 === ftr._nodeTipBuffers && (ftr._nodeTipBuffers = []);
                    var e = ftr._nodeTipBuffers.length;
                    try {
                        for (var i = 0; i < e; i++) cc.tween(ftr._nodeTipBuffers[i]).by(.1, {
                            y: ftr._nodeTipBuffers[i].height + 5
                        }).start()
                    } catch (t) {
                        ftr._nodeTipBuffers = []
                    }
                    ftr._nodeTipBuffers.push(t), ftc.scene.node.addChild(t, 1024)
                },
                removeTip: function (t) {
                    for (var e = 0; e < ftr._nodeTipBuffers.length; e++)
                        if (ftr._nodeTipBuffers[e] == t) {
                            ftr._nodeTipBuffers.splice(e, 1);
                            break
                        }
                }
            })
        