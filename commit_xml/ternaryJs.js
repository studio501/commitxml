(function ()
{
    "use strict";

    function transform(string)
    {
        var questionMark = string.indexOf("?");
        var colon = string.indexOf(":", questionMark);

        if (questionMark === -1 || colon === -1)
        {
            return string;
        }

        var condition = string.substring(0, questionMark);
        var expressions = string.substring(questionMark + 1, string.length);
        var trueExpression = null;
        var falseExpression = null;

        console.log("expressions: " + expressions);

        // While looking in pairs, find the location where the colon occurs before the question mark.
        questionMark = expressions.indexOf("?");
        colon = expressions.indexOf(":");
        while ((questionMark !== -1 && colon !== -1) && (questionMark < colon))
        {
            questionMark = expressions.indexOf("?", questionMark + 1);
            colon = expressions.indexOf(":", colon + 1);
        }

        console.log("\t" + "questionMark: " + questionMark);
        console.log("\t" + "colon: " + colon);

        trueExpression = expressions.substring(0, colon);
        falseExpression = expressions.substring(colon + 1, expressions.length);

        console.log("condition: " + condition);
        console.log("trueExpression: " + trueExpression);
        console.log("falseExpression: " + falseExpression);

        console.log("-");

        return ("if (" + condition + ") {\n" + transform(trueExpression) + "\n} else {\n" + transform(falseExpression) + "\n}");
    }

    function unittest()
    {
        var str1 = `var a;
        void 0 != t ? ft._getMsgType(t) === ft._SERVER_MSG ? ftc._forbidSendMsg ? ftc.__delaySendMsgs.push([t, e, i]) : (ftc.__startShowSendWait(), ftc.openLog && ftc.log(ftc._sendMsgIndex + "发送: " + t + (e ? ", " + JSON.stringify(e) : ""), 6), a = i ? {
            k: t,
            e: i
        } : {
                k: t,
                v: e
            }, 0 == ftc._sendPackMsgs.l && (ftc._sendPackMsgs.i = ftc._sendMsgIndex), ftc._sendPackMsgs[ftc._sendPackMsgs.l++] = a) : ftc.sendClient(t, e, void 0, void 0, i) : this.err("发送消息失败key==undefined")`
        
        
        var str2 = transform(str1);
        console.log("------------------------------");
        console.log(str2);
        // console.log(transform("(i < 0 ? function1() : function2())"));
        // console.log("---");
        // console.log(transform("i < 0 ? function1() : function2()"));
        // console.log("---");
        // console.log(transform("i < 0 ? function1() : i === 0 ? function2() : function3()"));
        // console.log("---");
        // console.log(transform("i > 0 ? i === 1 ? function1() : function2() : function3()"));
        // console.log("---");
        // console.log(transform("i > 0 ? i === 1 ? function1() : i === 2 ? function2() : function3() : function4()"));
        // console.log("---");
        // console.log(transform("i > 0 ? i === 1 ? function1() : i === 2 ? function2() : function3() : i === 0 ? function4() : function5()"));
        // console.log("---");
        // console.log(transform("f&&!f.error?k.button.b==k.button.c.G?k.button.Q(b,e,f,c,d):k.button.b==k.button.c.o&&k.button.P(b,e,f,c,d):(console.error(f),f=f.error.message||chrome.i18n.getMessage(\"error_tooltip\"),k.button.v(b.id,f),d({action:\"error\"}))"));
    }

    unittest();
}());