
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    scrollView: cc.ScrollView,
                    partHeroBiographyItems: [t("PartHeroBiographyItem")]
                },
                init: function () { },
                load: function () {
                    for (var t = 0; t < this.partHeroBiographyItems.length; t++) this.initPart(this.partHeroBiographyItems[t])
                },
                setData: function (t) {
                    this.data = t, this.updateData(), this.toDelayUpdate = !0
                },
                cleanup: function () { },
                updateData: function () {
                    for (var t = !!ft.ExtItem.mapHeroLord[this.data.id], e = 1; e < this.partHeroBiographyItems.length - 2; e++) this.partHeroBiographyItems[e].node.active = t;
                    for (e = 0; e < this.partHeroBiographyItems.length; e++) this.partHeroBiographyItems[e].node.active && this.partHeroBiographyItems[e].setData(this.data, e)
                },
                tick: function (t) {
                    this.toDelayUpdate && (this.toDelayUpdate = void 0, ftc.isTv() ? this.scrollView.scrollToBottom(1) : this.scrollView.scrollToTop(.1))
                },
                onClick: function (t, e) { }
            })
        