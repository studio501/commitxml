
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelInviteNum: cc.Label,
                    labelNum: cc.Label,
                    spriteIcon: cc.Sprite,
                    buttonAdd: cc.Button,
                    spriteGem: cc.Sprite,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonAdd), this.addClick(this.buttonGet)
                },
                load: function () { },
                updateData: function (t) {
                    this.param = t;
                    var e = ftc.ManagerData.get1("ManagerMsg").inviteCount,
                        i = Number(this.param.ext),
                        a = 5 * Number(this.param.ste);
                    a > 45 && (a = 45), this.labelInviteNum.string = ftc.language("邀请{0}人").replace("{0}", a + this.index + 1), this.labelNum.string = "+" + this.data.num;
                    var n = 0;
                    a + this.index < i ? n = 2 : a + this.index === i ? e > i && (n = 1) : a + this.index < e && (n = 3), this.spriteIcon.node.active = n >= 1, this.spriteGet.node.active = 2 === n, this.buttonGet.node.active = n < 2, this.buttonGet.interactable = 1 === n, this.buttonAdd.node.active = 0 === n
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonAdd.node ? ftc.ManagerH5.isH5() ? ftc.startShareKingWar(ft.type.share.invite) : ftc.callNativeFunction("openInvite", ftc.ManagerData.sid) : t.target === this.buttonGet.node && ftc.send("msgActivityGet", {
                        eid: this.param.entityId
                    })
                }
            })
        