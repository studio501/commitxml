
            
             cc.OvalBy = cc.Class({
                name: "cc.OvalBy",
                extends: cc.ActionInterval,
                ctor: function (t, e) {
                    this._config = {}, e && cc.OvalBy.prototype.initWithDuration.call(this, t, e)
                },
                initWithDuration: function (t, e) {
                    return !!cc.ActionInterval.prototype.initWithDuration.call(this, t) && (this._config = e, this._config.initRad || (this._config.initRad = 0), !0)
                },
                startWithTarget: function (t) {
                    cc.ActionInterval.prototype.startWithTarget.call(this, t)
                },
                update: function (t) {
                    if (t = this._computeEaseTime(t), this.target) {
                        var e = this.getPositionXAtOval(t),
                            i = this.getPositionYAtOval(t);
                        this.target.x = this._config.centerPosition.x + e, this.target.y = this._config.centerPosition.y + i, (this._config.initRad + t) % 1 <= .5 ? this.target.zIndex = this._config.zOrder[0] : this.target.zIndex = this._config.zOrder[1], this.target.scale = .8 - .2 * i / this._config.b
                    }
                },
                reverse: function () {
                    var t = this._config;
                    t.moveInAnticlockwise = !t.moveInAnticlockwise;
                    var e = new cc.OvalBy(this._duration, t);
                    return this._cloneDecoration(e), this._reverseEaseList(e), e
                },
                getPositionXAtOval: function (t) {
                    return 0 == this._config.moveInAnticlockwise ? this._config.a * Math.cos(6.2831852 * (1 - (this._config.initRad + t))) : this._config.a * Math.cos(6.2831852 * (this._config.initRad + t))
                },
                getPositionYAtOval: function (t) {
                    return 0 == this._config.moveInAnticlockwise ? this._config.b * Math.sin(6.2831852 * (1 - (this._config.initRad + t))) : this._config.b * Math.sin(6.2831852 * (this._config.initRad + t))
                }
            }), cc.ovalBy = function (t, e) {
                return new cc.OvalBy(t, e)
            }
        