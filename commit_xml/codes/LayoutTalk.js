


function number_arr(t) {
    "@babel/helpers - typeof";
    return (number_arr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}
cc.Class({
    extends: ftc.BaseView,
    properties: {
        labelName: cc.Label,
        labelText: cc.Label,
        spriteQuality: cc.Sprite,
        spriteIcon: cc.Sprite,
        buttonClick: cc.Button,
        buttonQuick: cc.Button,
        spriteNextTip: cc.Sprite,
        buttonClicks: [cc.Button],
        nodeButtonList: cc.Node,
        nodeTip1: cc.Node,
        labelTvTip: cc.Label,
        _textIndex: 0,
        _callback: null,
        _isLast: !1
    },
    init: function () {
        for (var t = 0; t < this.buttonClicks.length; t++) this.addClick(this.buttonClicks[t]);
        this.addClick(this.buttonQuick, !0), this.addClick(this.buttonClick, !0), ftc.isTv() ? (this.nodeTip1.active = !1, this.labelTvTip.node.active = !1) : (this.nodeTip1.active = !0, this.labelTvTip.node.active = !1);
        var e = this.spriteNextTip.node.getComponent(cc.Widget);
        ftc.ManagerH5.hasRightTopMenu() ? e.right = 153 : e.right = 3, e.updateAlignment()
    },
    load: function () {
        this._isAutoTalk = !1, this.tickAdd = 0, this._tickText = !1, this._setNext = !1, this._texts = void 0, this._imgs = void 0, this._names = void 0, 0 == ftc.ManagerData.get1("Player").vip && (ftc.ManagerH5.isH5() ? ftc.ManagerH5.showBanner() : "1" == ftc.callNativeFunction("openAd") && (ft.ExtPlayer.getLevel(), ft.value.com.showAdLevel))
    },
    updateTvTip: function () {
        ftc.isTv() && (this.nodeButtonList.active || this._isAutoTalk ? this.labelTvTip.node.active = !1 : (this.labelTvTip.node.active = !0, this.labelTvTip.string = "\u3010\u83dc\u5355\u952e\u3011\u5feb\u8fdb\uff0c\u3010\u786e\u5b9a\u952e\u3011\u7ee7\u7eed"))
    },
    setData: function (t, e, i, n, s) {
        if (this.buttonQuick.node.active = !1, this.buttonClick.interactable = !0, this.nodeButtonList.active = !1, this._callback = i, this._texts = void 0, this.hold = n, this.npcId = s, t && t.length > 0) {
            this._texts = [], this._imgs = [], this._names = [];
            for (var o = 0; o < t.length; o++) {
                var r = t[o][2];
                if (r) {
                    "string" == typeof r && (r = [r]);
                    for (var c = 0; c < r.length; c++) this._imgs.push(t[o][0]), this._names.push(t[o][1]), this._texts.push(ft.replaceAll(r[c], "|", "\n"))
                }
            }
        }
        "object" == number_arr(e) ? this._buttonNames = e : this._buttonNames = "string" == typeof e ? [e] : null, this._texts && (ftc.isTv() || (this.buttonQuick.node.active = !0, this.buttonQuick.interactable = !0)), this._textIndex = -1, this._wordIndex = 0, this.labelText.string = "", this._setNext = !0, this.updateTvTip()
    },
    setNext: function () {
        if (this._texts && this._texts[this._textIndex] && this._texts[this._textIndex].length > this._wordIndex) return this._wordIndex = this._texts[this._textIndex].length, this.labelText.string = this._texts[this._textIndex], void (this._tickText = !1);
        if (this._textIndex++, this._imgs) {
            if (this.spriteQuality.node.active = !0, 0 === this._imgs[this._textIndex]) this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("icon_hero2", "image_0"), this._names[this._textIndex] ? this.labelName.string = this._names[this._textIndex] : this._textIndex < this._names.length && (this.labelName.string = "");
            else if (null != this._imgs[this._textIndex])
                if (-1 === this._imgs[this._textIndex]) {
                    var t = ftc.ManagerData.get1("ManagerHero").commander0;
                    this.spriteIcon.spriteFrame = ft.ExtHero.getImageSprite(t), this.labelName.string = ft.ExtHero.getName(t)
                } else -2 === this._imgs[this._textIndex] ? this.npcId ? (this.spriteIcon.spriteFrame = ft.ExtNpc.getImageSprite(this.npcId), this.labelName.string = ft.ExtNpc.getName(this.npcId)) : (this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("icon_hero2", "image_0"), this.labelName.string = this._names[this._textIndex]) : (this.spriteIcon.spriteFrame = ft.ExtHero.getImageSprite(this._imgs[this._textIndex], !0), this._names[this._textIndex] ? this.labelName.string = this._names[this._textIndex] : this.labelName.string = "")
        } else this.spriteQuality.node.active = !1;
        if (this._texts && null != this._texts[this._textIndex] && (this._wordIndex = 0, this._tickText = !0), !this._texts || this._textIndex >= this._texts.length - 1 && this._wordIndex >= this._texts[this._texts.length - 1].length) {
            if (this._buttonNames && this._buttonNames.length > 0) {
                this.nodeButtonList.getComponent(cc.Layout).spacingY = 200 - 40 * this._buttonNames.length, this.nodeButtonList.active = !0;
                for (var e = 0; e < this.buttonClicks.length; e++) this.buttonClicks[e].node.active = !1;
                for (e = 0; e < this._buttonNames.length; e++) {
                    this.buttonClicks[e].node.active = !0;
                    var i = this.buttonClicks[e].node.getChildByName("Text").getComponent(cc.Label);
                    i.string = ftc.language(this._buttonNames[e]), i.string.length > 10 ? this.buttonClicks[e].node.getComponent(cc.Layout).enabled = !0 : (this.buttonClicks[e].node.getComponent(cc.Layout).enabled = !1, this.buttonClicks[e].node.width = 320)
                }
                this.buttonClick.interactable = !1
            }
            return this._isLast = !0, this.buttonQuick.interactable = !1, ftc.ManagerTV.nextFrameSelect(), this.updateTvTip(), !0
        }
        return this._isLast = !1, !1
    },
    enter: function () {
        this.updateData()
    },
    updateData: function () { },
    tick: function (t) {
        this._setNext && (this.setNext(), this._setNext = !1), this.tickAdd += t;
        for (var e = 0; this.tickAdd >= .016;) e++, this.tickAdd -= .016;
        e > 0 && this.tickText(e), ftc.ManagerRes.topLayout() == this && ftc.ManagerTV.currentNode != this.node && (ftc.ManagerTV.currentNode = this.node, ftc.ManagerTV.nextSelect(void 0, this.node), this.updateTvTip())
    },
    tickText: function (t) {
        if (this._texts) {
            var e = this._texts[this._textIndex];
            e ? (this._wordIndex + t >= e.length ? (this._wordIndex = e.length, this._tickText = !1) : this._wordIndex += t, this.labelText.string = e.substr(0, this._wordIndex), this._wordIndex === e.length && this._isAutoTalk && (this._setNext = !0)) : this._isLast && this.buttonClick.interactable && this.cancelTalk(-1)
        }
    },
    cleanup: function () { },
    msg: function () {
        this.msg = {}
    },
    cancelTalk: function (t) {
        this.hold || (ftc.ManagerH5.isH5() ? ftc.ManagerH5.hideBanner() : "1" == ftc.callNativeFunction("openAd") && ftc.callNativeFunction("hideBanner"), this.cancel()), this._callback && this._callback(t)
    },
    onClick: function (t) {
        if (t.target === this.buttonClick.node) {
            if (this._isAutoTalk) return;
            this._isLast ? this.cancelTalk(-1) : this._setNext = !0, this.updateTvTip()
        } else if (t.target === this.buttonQuick.node) this.buttonQuick.node.active = !1, this._isAutoTalk = !0, this._tickText = !0, this.updateTvTip();
        else
            for (var e = 0; e < this.buttonClicks.length; e++)
                if (this.buttonClicks[e].node == t.target) {
                    this.cancelTalk(e + 1);
                    break
                }
    },
    onKeyMenu: function (t) {
        if (!t && !this.nodeButtonList.active && !this._isAutoTalk) return this.onClick({
            target: this.buttonQuick.node
        }), !0
    },
    onKeyOk: function (t) {
        if (!t && !this.nodeButtonList.active && !this._isAutoTalk) return this.onClick({
            target: this.buttonClick.node
        }), !0
    }
})
