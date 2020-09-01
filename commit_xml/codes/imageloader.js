

e.exports = function () {
    this.imageLoadTool = function (t, e) {
        if (ftc.ManagerH5.isH5()) ftc.ManagerH5.downloadFile(t, e);
        else {
            try {
                jsb
            } catch (t) {
                return void e(null)
            }
            var i = jsb.fileUtils.getWritablePath() + "downloadimage/",
                a = i + t.slice(t.lastIndexOf("/"));
            jsb.fileUtils.isFileExist(a) ? n() : ft.httpConnect("GET", t, null, function (t, s) {
                t && s && (jsb.fileUtils.isDirectoryExist(i) || jsb.fileUtils.createDirectory(i), s = new Uint8Array(s), fts._checkImageData(s) && jsb.fileUtils.writeDataToFile(s, a)) ? n() : e(null)
            }.bind(this), !0)
        }

        function n() {
            cc.loader.load(a, function (t, i) {
                if (t) e(null);
                else {
                    var a = new cc.SpriteFrame(i);
                    a && e(a)
                }
            })
        }
    }
}
