
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelText: cc.Label,
                    button: cc.Button
                },
                init: function () {
                    this.addClick(this.button)
                },
                load: function () { },
                updateData: function () {
                    var t;
                    switch (this.labelText.string = this.data.t + "(" + this.data.num + ")", this.data.s.length > 60 ? this.labelText.string += this.data.s.substr(0, 57) + "..." : this.labelText.string += this.data.s, this.data.c) {
                        case 0:
                            t = cc.color(255, 255, 255);
                            break;
                        case 1:
                            t = cc.color(234, 0, 0);
                            break;
                        case 2:
                            t = cc.color(255, 0, 255);
                            break;
                        case 3:
                            t = cc.color(0, 128, 255);
                            break;
                        case 4:
                            t = cc.color(40, 255, 40);
                            break;
                        case 5:
                            t = cc.color(255, 220, 53);
                            break;
                        case 6:
                            t = cc.color(255, 175, 96);
                            break;
                        case 7:
                            t = cc.color(184, 112, 112);
                            break;
                        case 8:
                            t = cc.color(175, 175, 97);
                            break;
                        case 9:
                            t = cc.color(224, 224, 224)
                    }
                    this.labelText.node.color = t
                },
                tick: function (t) { },
                onClick: function (t) {
                    ft.console("点击日志：" + this.data.s), 3 != this.data.c ? ftr.getTestPart().showDetail(this.data.s, this.labelText.node.color) : ftr.getTestPart().fillEditor(this.data.s)
                }
            })
        