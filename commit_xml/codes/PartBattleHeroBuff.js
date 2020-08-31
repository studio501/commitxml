
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteIcon: cc.Sprite,
                    labelName: cc.Label,
                    labelInfo1: cc.Label,
                    labelInfo2: cc.Label,
                    labelInfo3: cc.Label
                },
                init: function () { },
                load: function () { },
                setData: function (t, e) {
                    this.data = t;
                    var i = this.data,
                        a = i[0],
                        n = i[1],
                        s = i[2].split(","),
                        o = i[3],
                        r = i[4],
                        c = i[5];
                    r || (r = Math.abs(ftd.Skillbuff.get(n, "addnum")));
                    var h = r;
                    if (1 == c && (r = Math.abs(r) + "%"), this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "play_buff" + a), this.labelName.string = e, d = ftd.Skillbuff.get(n, "info")) {
                        var f = d.split("|"),
                            d = (e = f[0], f[1]);
                        this.labelInfo1.string = e + ":", this.labelInfo2.string = d
                    } else {
                        var l = ftd.Skillbuff.get(n, "addtype");
                        if (l) (e = ft.ExtPropName.getName(l)).length > 4 ? this.labelInfo1.string = "\u7279\u6b8a:" : this.labelInfo1.string = e + ":", this.labelInfo2.string = "\u672c\u56de\u5408" + ft.ExtPropName.getName(l) + (h > 0 ? "\u4e0a\u5347" : "\u4e0b\u964d") + r;
                        o = -2
                    }
                    if (-1 == o) this.labelInfo3.string = "\u6c38\u4e45";
                    else if (-2 == o) this.labelInfo3.string = "";
                    else {
                        var u = [];
                        s && (-1 != s.indexOf(ft.buffRemoveTimes.afterRound) && u.push(o + "\u56de\u5408"), -1 != s.indexOf(ft.buffRemoveTimes.afterHit) && u.push("\u53d7\u51fb\u540e\u79fb\u9664"), -1 != s.indexOf(ft.buffRemoveTimes.afterHurt) && u.push("\u53d7\u4f24\u540e\u79fb\u9664"), -1 != s.indexOf(ft.buffRemoveTimes.afterAct) && u.push("\u884c\u52a8\u540e\u79fb\u9664")), this.labelInfo3.string = u.join("/")
                    }
                },
                updateData: function () { },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        