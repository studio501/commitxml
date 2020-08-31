
            
             cc.Class({
                extends: cc.Component,
                properties: {
                    index: -1,
                    _parentListView: null
                },
                update: function (t) {
                    this.tick && this.tick(t)
                },
                onDestroy: function () {
                    ftc.ManagerRes.releaseResource(this), this.cleanup && this.cleanup()
                },
                setData: function (t, e, i) {
                    this.data = e, this.updateIndex(t), this.updateData && this.updateData(i)
                },
                addClick: function (t, e, i, a) {
                    ftc.ManagerRes.addClick(this, t, e, i, a, 2)
                },
                updateIndex: function (t) {
                    this.index = t
                },
                initPart: function (t) {
                    ftc.ManagerRes.initPart(t, this)
                },
                newPart: function (t, e) {
                    return ftc.ManagerRes.newPart(t, e, this)
                },
                loadResource: function (t, e, i) {
                    return ftc.ManagerRes.loadResource(t, e, i, this)
                }
            })
        