
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelDate: cc.Label,
                    nodeDays: cc.Node,
                    progressBar: cc.ProgressBar,
                    nodeRedPoints: cc.Node,
                    nodeLayoutAward: cc.Node,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonDetail), this.buttonDays = [], this.labelDays = [], this.spriteGets = [], this.spriteLights = [], this.spriteLantern1s = [], this.spriteLantern2s = [], this.nodeShadows = [];
                    for (var t = this.node.getChildByName("nodeShadow"), e = 0; e < this.nodeDays.children.length; e++) {
                        var i = this.nodeDays.children[e],
                            a = t.children[e];
                        this.buttonDays.push(i.getComponent(cc.Button)), this.spriteGets.push(i.getChildByName("spriteGet").getComponent(cc.Sprite)), this.spriteLantern1s.push(i.getChildByName("spriteLantern1").getComponent(cc.Sprite)), this.spriteLantern2s.push(i.getChildByName("spriteLantern2").getComponent(cc.Sprite)), this.labelDays.push(i.getChildByName("labelDay").getComponent(cc.Label)), this.nodeShadows.push(a), this.addClick(this.buttonDays[e]), this.labelDays[e].string = ftc.language("\u7b2c") + "\n" + (e + 1) + "\n" + ftc.language("\u5929"), this.spriteGets[e].node.active = !1, i.getChildByName("spriteLight") && (this.spriteLights.push(i.getChildByName("spriteLight").getComponent(cc.Sprite)), this.spriteLights[e].node.active = !1)
                    }
                    this.spriteRedPoints = [];
                    for (e = 0; e < this.nodeRedPoints.children.length; e++) this.spriteRedPoints.push(this.nodeRedPoints.children[e].getChildByName("spriteRedPoint").getComponent(cc.Sprite))
                },
                load: function () {
                    this.node.position = cc.v2(0, 0);
                    for (var t = 0; t < this.nodeDays.children.length; t++) this.spriteGets[t].node.active = !1, this.spriteLights[t] && (this.spriteLights[t].node.active = !1);
                    this.partItems = []
                },
                setData: function (t) {
                    this.data = t, this.updateDate();
                    var e, i, a = JSON.parse(this.data.base);
                    this.activity = a, 8 === a.ids.length ? (e = [-327, 204.4, -236.3, 127.4, -137.4, 158.8, -41.6, 97.3, 45.5, 154.6, 136.3, 117.5, 226.8, 182.4, 331.7, 184.3], i = [-336.7, -38.9, -244.1, -136.2, -134.1, -83, -42.4, -143.1, 48.6, -78.2, 138.6, -116.7, 234.7, -58.5, 338.4, -68.6]) : 7 === a.ids.length && (e = [-327, 204.4, -236.3, 110.9, -117.5, 148.9, -3, 92.9, 101.7, 156.8, 213.5, 119.4, 308.4, 187.9], i = [-336.7, -38.9, -244.1, -136.2, -124.2, -97.4, -.5, -162.1, 114.8, -82.2, 230.2, -120.7, 329.7, -56.5]);
                    for (var n = 0; n < a.ids.length; n++) this.buttonDays[n].node.active = !0, this.nodeShadows[n].active = !0, this.buttonDays[n].node.position = cc.v2(e[2 * n], e[2 * n + 1]), this.nodeShadows[n].position = cc.v2(i[2 * n], i[2 * n + 1]);
                    for (n = a.ids.length; n < this.buttonDays.length; n++) this.buttonDays[n].node.active = !1, this.nodeShadows[n].active = !1;
                    for (n = 0; n < a.extIds.length; n++) {
                        if (!this.partItems[n]) {
                            var s = this.newPart("PartItem");
                            1 == this.data.ui ? s.node.scale = .7 : 2 == this.data.ui && (s.node.scale = .52), this.nodeLayoutAward.addChild(s.node, n), this.partItems[n] = s
                        }
                        s.setData(a.extIds[n], a.extNums[n]), s.setName(ftc.language("\u7d2f\u8ba1\u767b\u5f55{0}\u5929").replace("{0}", n + 1)), s.setNameColor(cc.Color.WHITE), s.addClick(s.buttonSelf)
                    }
                    this.updateData(), this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function (t) {
                    for (var e = JSON.parse(this.data.base), i = this.data.ext.split(","), a = Number(i[0]), n = Number(i[1]), s = 0; s < e.ids.length; s++) this.spriteLantern1s[s].node.active = !0, this.spriteLantern2s[s].node.active = !1, 1 == this.data.ui && (this.labelDays[s].node.color = ftc.newColor(15971439), this.labelDays[s].node.getComponent(cc.LabelOutline).color = ftc.newColor(11744e3), this.spriteLights[s].node.active = !1), a == s && 0 == this.data.ste ? (this.spriteLantern1s[s].node.active = !1, this.spriteLantern2s[s].node.active = !0, 1 == this.data.ui && (this.labelDays[s].node.color = ftc.newColor(6563340), this.labelDays[s].node.getComponent(cc.LabelOutline).color = ftc.newColor(16243272), this.spriteLights[s].node.active = !0, this.spriteLights[s].node.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1)).repeatForever()))) : a > s && (this.spriteGets[s].node.active = !0);
                    for (s = 0; s < this.partItems.length; s++) this.partItems[s].setStatus(0), this.partItems[s].setCallback(), n <= s && s < a ? (this.partItems[s].setStatus(2), this.partItems[s].setCallback(function () {
                        ftc.send("msgActivityGet", {
                            eid: this.data.entityId,
                            index: 1
                        })
                    }.bind(this))) : n > s && this.partItems[s].setStatus(1), this.spriteRedPoints[s].node.active = n > s;
                    this.progressBar.progress = (n - 1) / (this.partItems.length - 1), this.updateDate()
                },
                updateDate: function () {
                    this.labelDate.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonDetail.node) ftc.showDetailInfo(this.buttonDetail.node, this.data.txt);
                    else
                        for (var i = this.data.ext.split(","), a = Number(i[0]), n = 0; n < this.buttonDays.length; n++)
                            if (t.target === this.buttonDays[n].node) {
                                a == n && 0 == this.data.ste ? ftc.send("msgActivityGet", {
                                    eid: this.data.entityId
                                }) : ftc.loadLayout("LayoutAwardPreview", function (t) {
                                    t.setData({
                                        ids: [this.activity.ids[n]],
                                        nums: [this.activity.nums[n]]
                                    })
                                }.bind(this));
                                break
                            }
                }
            })
        