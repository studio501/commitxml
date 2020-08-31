
            
             ft.ExtDetail = {}, ft.ExtDetail.getInfo = function (t) {
                var e = ftd.Detail.get(t, "info");
                return ft.replaceAll(e, "|", "\n")
            }
        