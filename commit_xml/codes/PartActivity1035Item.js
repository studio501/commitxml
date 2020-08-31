
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteBanner: cc.Sprite,
                    spriteDownload: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () { },
                updateData: function (e) {
                    if (this.data) {
                        this.spriteBanner.node.active = !0;
                        var i = ftc.ManagerLan.getLanguage(),
                            a = this.data.img;
                        if ("zh" != i && this.data["img_" + i] && (a = this.data["img_" + i]), a) (new (t("imageloader"))).imageLoadTool(ftc.resURL + a, function (t) {
                            t && (this.spriteBanner.node.active = !1, this.spriteDownload.spriteFrame = t)
                        }.bind(this))
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonSelf.node) {
                        if (!this.data) return;
                        "undefined" !== this.data.url ? ftc.showBroser(this.data.url) : ftc.sendClient("c_gotoActivity", this.data.id)
                    }
                }
            })
        