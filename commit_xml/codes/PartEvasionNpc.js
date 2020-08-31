
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spine: sp.Skeleton,
                    sprite: cc.Sprite,
                    tx: 0,
                    ty: 0,
                    tw: 1,
                    th: 1
                },
                init: function () { },
                load: function () {
                    this.node.stopAllActions(), this.width = 0, this.height = 0
                },
                setData: function (t) {
                    cc.loader.loadRes("app/img/npc_" + t.id, cc.SpriteFrame, function (t, e) {
                        t || (this.sprite.spriteFrame = e)
                    }.bind(this)), this.width = 177, this.height = 46
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        