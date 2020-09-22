
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeRoot: cc.Node,
                    spineFishes: [sp.Skeleton],
                    spineHero: sp.Skeleton,
                    buttonEnter: cc.Button,
                    labelInfo1: cc.Label,
                    labelInfo2: cc.Label,
                    labelInfo3: cc.Label,
                    labelInfo4: cc.Label,
                    progressBar: cc.ProgressBar,
                    nodePoints: [cc.Node],
                    spriteRedPoints: [cc.Sprite],
                    labelPoints: [cc.Label],
                    labelDate: cc.Label,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonEnter), this.addClick(this.buttonDetail, !0)
                },
                load: function () {
                    this.partItems = [], this._loadFish = 0, this._loadFishOver = !1, this._speeds = [100, 60, 70, 80];
                    for (var t = 0; t < this.spineFishes.length; t++) this.spineFishes[t].node.position = cc.v2(600 * Math.random(), 200 * Math.random() + 20), this.spineFishes[t].node.scale = [.5, 1, .66, .7][t], this.loadFish(this.spineFishes[t], "spine/view/activity_yu" + (t + 1))
                },
                loadFish: function (t, e) {
                    this.loadResource(e, sp.SkeletonData, function (e) {
                        e && (t.skeletonData = e, t.setAnimation(0, "wait1", !0), t.timeScale = .5, t.direction = 2, this._loadFish++, this._loadFish >= this.spineFishes.length && (this._loadFishOver = !0))
                    }.bind(this))
                },
                setData: function (t) {
                    this.data = t, this.activity = ft.ExtMsg.getActivityData(t);
                    for (var e = 0; e < this.activity.id2s.length; e++) {
                        if (!this.partItems[e]) {
                            var i = this.newPart("PartItem");
                            i.node.scale = .8, i.node.y = 63, this.nodePoints[e].addChild(i.node, e), this.partItems[e] = i
                        }
                        i.setData(this.activity.id2s[e][0], this.activity.num2s[e][0]), i.addClick(i.buttonSelf), this.nodePoints[e].x = this.activity.points[e] / this.activity.points[this.activity.points.length - 1] * this.progressBar.node.width, this.labelPoints[e].string = this.activity.points[e]
                    }
                    this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1), this.updateData()
                },
                cleanup: function () { },
                updateData: function () {
                    for (var t = this.data.ste.split(","), e = this.data.ext.split(","), i = Number(e[0]), a = 0, n = 0; n < this.partItems.length; n++) {
                        this.partItems[n].setCallback(), 1 === Number(t[n]) ? this.partItems[n].setStatus(1) : i >= this.activity.points[n] ? (this.partItems[n].setStatus(2), this.partItems[n].setCallback(this.awardGet.bind(this), n)) : this.partItems[n].setStatus(0), this.spriteRedPoints[n].node.active = i > this.activity.points[n], this.spriteRedPoints[n].node.active && a++
                    }
                    this.progressBar.progress = i / this.activity.points[this.activity.points.length - 1], this.labelInfo1.node.active = a < this.activity.points.length, this.labelInfo1.node.active && (this.labelInfo1.string = "距离下次奖励:" + (this.activity.points[a] - i)), this.labelInfo2.string = "今日最高积分:" + e[1], this.labelInfo3.string = "历史最高积分:" + ftapp.getItem("game_2_highest_score", 0), this.labelInfo4.string = "每日最高积分累计:" + i, this.updateDate()
                },
                updateDate: function () {
                    this.labelDate.string = ftc.language("剩余时间: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                awardGet: function (t) {
                    ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        index: t
                    })
                },
                tick: function (t) {
                    if (this._loadFishOver)
                        for (var e = 0; e < this.spineFishes.length; e++) {
                            var i = this.spineFishes[e],
                                a = i.node.x;
                            a > 750 && 2 === i.direction ? (i.direction = 1, i.node.scaleX = -i.node.scaleX, i.node.y = 200 * Math.random() + 20) : a < -60 && 1 === i.direction && (i.direction = 2, i.node.scaleX = -i.node.scaleX, i.node.y = 200 * Math.random() + 20), i.node.x += this._speeds[e] * t * (2 == i.direction ? 1 : -1)
                        }
                },
                onClick: function (t, e) {
                    t.target === this.buttonEnter.node ? ftapp.loadLayout("LayoutFish", function (t) {
                        t.setData(void 0, function (t) {
                            if (t > 0) {
                                var e = Number(this.data.ext.split(",")[1]);
                                t > e && ftc.send("msgActivityGet", {
                                    eid: this.data.entityId,
                                    score: t - e
                                })
                            }
                        }.bind(this), 60, 30, this.data.ext.split(",")[1])
                    }.bind(this), !0) : t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, ft.replaceAll(this.data.txt, "|", "\n"))
                }
            })
        