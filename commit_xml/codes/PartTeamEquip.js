
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonSelf: cc.Button,
                    spriteBg: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteStar: cc.Sprite,
                    spriteQuality: cc.Sprite,
                    labelLv: cc.Label,
                    spriteRedPoint: cc.Sprite,
                    spriteUp: cc.Sprite,
                    spineLvUp: sp.Skeleton
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.spineLvUp.node.active = !1
                },
                setData: function (t, e) {
                    this.data = t, this.index = e;
                    var i = !!this.data;
                    this.isChange = !i, this.spriteIcon.node.active = i, this.spriteQuality.node.active = i, this.spriteStar.node.active = i, this.labelLv.node.active = i, this.spriteRedPoint.node.active = !1, this.spriteUp.node.active = !1, i && (this.spriteQuality.spriteFrame = ft.ExtEquip.getQualitySprite(this.data.id), this.spriteIcon.spriteFrame = ft.ExtEquip.getIconSprite(this.data.id), this.spriteStar.spriteFrame = ft.ExtEquip.getStarSprite(this.data.star), this.labelLv.string = this.data.lv + ftc.language("\u7ea7"))
                },
                getData: function () {
                    return this.data
                },
                setPart: function (t) {
                    this._part !== t && (this._part = t, t !== ft.type.part.exclusive && (this.spriteBg.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "equip_icon_bg" + t)))
                },
                getPart: function () {
                    return this._part
                },
                setRedPoint: function (t) {
                    this.spriteRedPoint.node.active = t
                },
                setUpTip: function (t) {
                    this.spriteUp.node.active = t
                },
                playLvUp: function () {
                    this.spineLvUp.node.active = !0, this.spineLvUp.setAnimation(0, "wait1", !1)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && (this.isChange ? ftc.sendClient("c_onClickTeamEquip1", this) : ftc.sendClient("c_onClickTeamEquip2", this))
                }
            })
        