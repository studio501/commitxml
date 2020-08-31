
            
             ft.ExtPropName = {}, ftc && (ft.ExtPropName.getSpriteIcon = function (t) {
                var e = this.getImg(t);
                return ftc.ManagerRes.getSpriteFrame("program", "prop_" + e)
            }), ft.ExtPropName.getName = function (t) {
                return ftd.Propname.get(t, "name")
            }, ft.ExtPropName.getType = function (t) {
                return ftd.Propname.get(t, "type")
            }, ft.ExtPropName.getInfo = function (t) {
                return ftd.Propname.get(t, "info")
            }, ft.ExtPropName.getDefault = function (t) {
                return ftd.Propname.get(t, "default")
            }, ft.ExtPropName.getCouple = function (t) {
                return ftd.Propname.get(t, "couple")
            }, ft.ExtPropName.getImg = function (t) {
                return ftd.Propname.get(t, "img")
            }
        