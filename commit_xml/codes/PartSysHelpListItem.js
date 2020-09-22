
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelTitle: cc.Label,
                    labelType: cc.Label,
                    buttonSelf: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () { },
                updateData: function (t) {
                    var e = this.data.title.indexOf("】");
                    e > 0 ? (this.labelType.string = this.data.title.substr(1, e - 1), this.labelTitle.string = this.data.title.substr(e + 1)) : (this.labelType.string = "", this.labelTitle.string = this.data.title)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    ftc.sendClient("c_sysItemContent", this.data)
                }
            })
        