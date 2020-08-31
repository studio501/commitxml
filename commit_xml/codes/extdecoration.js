
            
             ft.ExtDecoration = {}, ft.ExtDecoration.load = function () {
                if (!ft.ExtDecoration.mapHeroHeader)
                    for (var t in ft.ExtDecoration.mapHeroHeader = {}, ftd.Decoration.data)
                        if (ft.ExtDecoration.getType(t) === ft.type.decoration.header) {
                            var e = ft.ExtDecoration.getHero(t);
                            e && (ft.ExtDecoration.mapHeroHeader[e] = t)
                        }
            }, ftc && (ft.ExtDecoration.getSpriteFrame = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program", "decoration_" + t)
            }, ft.ExtDecoration.getLvSpriteFrame = function (t) {
                if (0 < t && t <= 3) return ftc.ManagerRes.getSpriteFrame("program", "decorationlv_" + t)
            }, ft.ExtDecoration.getDatas = function (t) {
                var e = [],
                    i = [],
                    a = ftc.ManagerData.get2Object("Decoration");
                for (var n in ftd.Decoration.data) t === this.getType(n) && (a[n] ? e.push(n) : i.push(n));
                return e.sort(function (t, e) {
                    return ft.ExtDecoration.getIndex(t) - ft.ExtDecoration.getIndex(e)
                }), i.sort(function (t, e) {
                    return ft.ExtDecoration.getIndex(t) - ft.ExtDecoration.getIndex(e)
                }), e.concat(i)
            }, ft.ExtDecoration.getIconSprite = function (t) {
                if (this.getType(t) === ft.type.decoration.header) {
                    var e, i = this.getHero(t);
                    return e = i ? ft.ExtHero.getImg(i) : this.getImg(t), ftc.ManagerRes.getSpriteFrame("icon_header", "header" + (e || "_null"))
                }
                return ftc.ManagerRes.getSpriteFrame("program", "headerframe_" + this.getImg(t))
            }, ft.ExtDecoration.getCurSprite = function (t) {
                if (t === ft.type.decoration.header) {
                    var e, i = ftc.ManagerData.get1("ManagerDecoration").headerId,
                        a = this.getHero(i);
                    return 0 === (e = a ? ft.ExtHero.getImg(a) : this.getImg(i)) && (e = ft.ExtHero.getImg(ftc.ManagerData.get1("ManagerHero").commander0)), ftc.ManagerRes.getSpriteFrame("icon_header", "header" + e)
                }
                return ftc.ManagerRes.getSpriteFrame("program", "headerframe_" + this.getImg(ftc.ManagerData.get1("ManagerDecoration").headerFrameId))
            }), ft.ExtDecoration.getName = function (t) {
                return ftd.Decoration.get(t, "name")
            }, ft.ExtDecoration.getImg = function (t) {
                return ftd.Decoration.get(t, "img")
            }, ft.ExtDecoration.getType = function (t) {
                return ftd.Decoration.get(t, "type")
            }, ft.ExtDecoration.getInfo = function (t) {
                return ftd.Decoration.get(t, "info")
            }, ft.ExtDecoration.getIndex = function (t) {
                return ftd.Decoration.get(t, "index")
            }, ft.ExtDecoration.getHero = function (t) {
                return ftd.Decoration.get(t, "hero")
            }
        