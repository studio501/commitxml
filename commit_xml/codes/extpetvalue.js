
            
             ft.ExtPetValue = {}, ftc, ft.ExtPetValue.load = function () {
                if (!this.mapPetPosValue)
                    for (var t in this.mapPetPosValue = {}, ftd.Petvalue.data) {
                        var e = this.getPet(t),
                            i = this.getPos(t);
                        this.mapPetPosValue[e] || (this.mapPetPosValue[e] = {}), this.mapPetPosValue[e][i] = t
                    }
            }, ft.ExtPetValue.getPet = function (t) {
                return ftd.Petvalue.get(t, "pet")
            }, ft.ExtPetValue.getPos = function (t) {
                return ftd.Petvalue.get(t, "pos")
            }, ft.ExtPetValue.getId = function (t, e) {
                return this.mapPetPosValue[t][e]
            }, ft.ExtPetValue.get = function (t, e, i, a) {
                var n = this.getId(t, e);
                return ftd.Petvalue.get(n, i)[a]
            }, ft.ExtPetValue.getWljs = function (t, e, i) {
                return this.get(t, e, "a_wljs", i)
            }, ft.ExtPetValue.getWljm = function (t, e, i) {
                return this.get(t, e, "a_wljm", i)
            }, ft.ExtPetValue.getYsjs = function (t, e, i) {
                return this.get(t, e, "a_ysjs", i)
            }, ft.ExtPetValue.getYsjm = function (t, e, i) {
                return this.get(t, e, "a_ysjm", i)
            }, ft.ExtPetValue.getProp1 = function (t, e, i) {
                return this.get(t, e, "a_prop1", i)
            }, ft.ExtPetValue.getValue1 = function (t, e, i) {
                return this.get(t, e, "a_value1", i)
            }, ft.ExtPetValue.getPer1 = function (t, e, i) {
                return this.get(t, e, "a_per1", i)
            }, ft.ExtPetValue.getProp2 = function (t, e, i) {
                return this.get(t, e, "a_prop2", i)
            }, ft.ExtPetValue.getValue2 = function (t, e, i) {
                return this.get(t, e, "a_value2", i)
            }, ft.ExtPetValue.getPer2 = function (t, e, i) {
                return this.get(t, e, "a_per2", i)
            }, ft.ExtPetValue.getSkill = function (t, e, i) {
                return this.get(t, e, "a_skill", i)
            }
        