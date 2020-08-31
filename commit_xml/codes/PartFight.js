
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteFights: [cc.Sprite]
                },
                init: function () { },
                load: function () {
                    this.tickAdd = 0, this.node.opacity = 255
                },
                setData: function (t, e, i) {
                    this.fight = t, this.fight2 = 0, this.fightAdd = 0, this.hide = i, e && (this.fight2 = e, this.fightAdd = Math.ceil((this.fight2 - this.fight) / 60)), t > 99999999 && (t = 99999999), this.setFight(t)
                },
                setFight: function (t) {
                    for (var e = []; t;) e.splice(0, 0, t % 10), t = parseInt(t / 10);
                    for (var i = 0; i < e.length; i++) this.spriteFights[i].node.active = !0, this.spriteFights[i].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "fight_" + e[i]);
                    for (i = e.length; i < this.spriteFights.length; i++) this.spriteFights[i].node.active = !1
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) {
                    if (this.fight >= this.fight2) this.hide && (this.node.runAction(cc.sequence(cc.fadeOut(3), cc.callFunc(function () {
                        this.node.removeFromParent(!1)
                    }.bind(this)))), this.hide = !1);
                    else
                        for (this.tickAdd += t; this.tickAdd > .016;) this.fight + this.fightAdd > this.fight2 && (this.fightAdd = this.fight2 - this.fight), this.fight += this.fightAdd, this.setFight(this.fight), this.tickAdd -= .016
                },
                onClick: function (t, e) { }
            })
        