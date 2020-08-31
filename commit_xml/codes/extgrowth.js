
            
             ft.ExtGrowth = {}, ft.ExtGrowth.getQuality = function (t) {
                return ftd.Growth.get(t, "quality")
            }, ft.ExtGrowth.getValue = function (t, e) {
                return ftd.Growth.get(t, "value" + e)
            }
        