
            
             ft.ExtPlayer = {}, ftc && (ft.ExtPlayer.getLevel = function () {
                return ftc.ManagerData.get1("Player").level
            }), ft.ExtPlayer.getNextExp = function (t) {
                return Math.round(Math.pow(1.1, t - 1) * t * 50)
            }, ft.ExtPlayer.getPowerSize = function (t) {
                return t > 120 ? Math.floor((t - 120) / 5 + 120) : 120
            }
        