
            
             cc.Class({
                extends: cc.Component,
                properties: {},
                update: function (t) {
                    this.tick && this.tick(t)
                },
                onDestroy: function () {
                    ftc.ManagerRes.releaseResource(this), this.cleanup && this.cleanup()
                },
                addClick: function (t, e, i, a) {
                    ftc.ManagerRes.addClick(this, t, e, i, a, 1)
                },
                initPart: function (t) {
                    ftc.ManagerRes.initPart(t, this)
                },
                newPart: function (t, e) {
                    return ftc.ManagerRes.newPart(t, e, this)
                },
                loadResource: function (t, e, i) {
                    return ftc.ManagerRes.loadResource(t, e, i, this)
                },
                releaseResource: function (t) {
                    ftc.ManagerRes.releaseResource(this, t)
                },
                cancel: function (t) {
                    ftc.ManagerRes.restoreNode(this.node, t)
                }
            })
        