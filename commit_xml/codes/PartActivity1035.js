
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    spriteDownload: cc.Sprite,
                    buttonGo: cc.Button,
                    labelTitle: cc.Label,
                    hypertext: ftc.Hypertext
                },
                init: function () {
                    this.buttonGo && this.addClick(this.buttonGo)
                },
                load: function () {
                    this.data = void 0
                },
                setData: function (e) {
                    this.data = e;
                    var i = ft.ExtMsg.getActivityData(this.data);
                    if (0 == this.data.ui || 1 == this.data.ui) {
                        for (var a = [], n = 0; n < i.activityIds.length; n++) a.push({
                            id: i.activityIds[n],
                            url: i.urls[n],
                            img: i.imgs[n],
                            img_tr: i.imgs_tr[n]
                        });
                        if (1 == this.data.ui && a.length < 4)
                            for (n = a.length; n < 4; n++) a.push(null);
                        this.listView.setListView(a)
                    } else if (2 == this.data.ui) {
                        if (ftc.ManagerData.get2Object("Msg", i.activityIds[0])) {
                            var s = ftc.ManagerLan.getLanguage(),
                                o = i.imgs[0];
                            if ("zh" != s && i["imgs_" + s] && (o = i["imgs_" + s][0]), o) (new (t("imageloader"))).imageLoadTool(ftc.resURL + o, function (t) {
                                t && (this.spriteDownload.spriteFrame = t)
                            }.bind(this))
                        }
                    } else 3 == this.data.ui && this.setNoticeInfo(i.urls[0])
                },
                setNoticeInfo: function (t) {
                    this.hypertext.cleanHtml(), this.hypertext.node.opacity = 0, this.hypertext.http(t, null, function (t) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node)) {
                            var e = t.title.rendered,
                                i = e.indexOf("\u3011");
                            i > 0 && (e = e.substr(i + 1)), this.labelTitle.string = e;
                            var a = ft.replaceAll(t.content.rendered, "\n", "");
                            this.hypertext.setHtml(a, this.hyperTextClick), cc.tween(this.hypertext.node).to(1, {
                                opacity: 255
                            }).start()
                        }
                    }.bind(this))
                },
                hyperTextClick: function (t, e) { },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (this.buttonGo && t.target === this.buttonGo.node && 2 == this.data.ui) {
                        var i = ft.ExtMsg.getActivityData(this.data);
                        ftc.sendClient("c_gotoActivity", i.activityIds[0])
                    }
                }
            })
        