

cc.Class({
    extends: cc.Component,
    properties: {
        trSpriteFrame: cc.SpriteFrame,
        enSpriteFrame: cc.SpriteFrame,
        jaSpriteFrame: cc.SpriteFrame
    },
    onLoad: function () {
        this._sprite = this.getComponent(cc.Sprite), this._sprite && this.updateSprite(ftc.ManagerLan.curLang)
    },
    update: function () { },
    getSpriteFrameByLang: function (t) {
        switch (t) {
            case ftc.ManagerLan.TR:
                return this.trSpriteFrame;
            case ftc.ManagerLan.EN:
                return this.enSpriteFrame;
            case ftc.ManagerLan.JA:
                return this.jaSpriteFrame
        }
    },
    updateSprite: function (t) {
        if (t != ftc.ManagerLan.ZH) {
            var e = this.getSpriteFrameByLang(t);
            void 0 !== e && (this._sprite.spriteFrame = e)
        }
    }
})
