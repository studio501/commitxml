
            e.exports = function (t) {
                for (var e, i = t.length; i--;) {
                    if (255 !== (e = t.readUInt8(i))) {
                        e++, t.writeUInt8(e, i);
                        break
                    }
                    t.writeUInt8(0, i)
                }
            }
        