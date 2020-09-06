# -*- coding: utf-8 -*
import js2py
import json

esprima = js2py.require('esprima')
escodegen = js2py.require('escodegen')

str1 = """
var a;
void 0 != t ? ft._getMsgType(t) === ft._SERVER_MSG ? ftc._forbidSendMsg ? ftc.__delaySendMsgs.push([t, e, i]) : (ftc.__startShowSendWait(), ftc.openLog && ftc.log(ftc._sendMsgIndex + "send: " + t + (e ? ", " + JSON.stringify(e) : ""), 6), a = i ? {
    k: t,
    e: i
} : {
        k: t,
        v: e
    }, 0 == ftc._sendPackMsgs.l && (ftc._sendPackMsgs.i = ftc._sendMsgIndex), ftc._sendPackMsgs[ftc._sendPackMsgs.l++] = a) : ftc.sendClient(t, e, void 0, void 0, i) : this.err("send failed key==undefined")
"""
tree = esprima.parse(str1)
print(json.dumps(tree.to_dict(), indent=4))
ss = escodegen.generate(tree)

print(esprima)