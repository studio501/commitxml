

window.ftapp = window.ftapp || {}, ftapp.value = {
    fishType0: {
        name: "activity_yu2",
        probability: 20,
        speed: 20,
        scale: 1,
        score: 10,
        size: [100, 70]
    },
    fishType1: {
        name: "activity_yu4",
        probability: 25,
        speed: 15,
        scale: .7,
        score: 30,
        size: [100, 80]
    },
    fishType2: {
        name: "activity_yu3",
        probability: 25,
        speed: 10,
        scale: .66,
        score: 50,
        size: [100, 80]
    },
    fishType3: {
        name: "activity_yu1",
        probability: 30,
        speed: 6,
        scale: .5,
        score: 70,
        size: [100, 54]
    }
}, ftapp.type = {
    fishState: {
        alive: 1,
        dead: 2
    }
}, ftapp.loadLayout = function (t, e, i) {
    ftc.showTop(!0), ftc.ManagerRes.newLayout(t, function (t) {
        ftc.cancelTop(), e && e(t)
    }, {
        field: "app",
        hide: i
    })
}, ftapp.setItem = function (t, e) {
    cc.sys.localStorage.setItem("app_" + t, e)
}, ftapp.getItem = function (t, e) {
    var i = cc.sys.localStorage.getItem("app_" + t);
    return i || e
}
