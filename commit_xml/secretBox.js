var secretBox = [];
secretBox["_arithmetic"] = function (stack) {
    var i = 1, offset = 0, len = stack.length - 1;
    while (i < len) {
        offset && (stack[i] = stack[i + offset]);
        switch (stack[i]) {
            case '*':
                stack[i - 1] = stack[i - 1] * stack[i + 1 + offset];
                offset += 2, len -= 2;
                break;
            case '/':
                stack[i - 1] = stack[i - 1] / stack[i + 1 + offset];
                offset += 2, len -= 2;
                break;
            default :
                i++;
                break;
        }
    }
    if (!len) return stack[0];
    offset && (stack[i] = stack[i + offset]);
    i = 0, offset = 0;
    while (i < len) {
        offset && (stack[i] = stack[i + offset]);
        switch (stack[i]) {
            case '+':
                if (i > 0) {
                    stack[i - 1] = stack[i - 1] + stack[i + 1 + offset];
                    offset += 2, len -= 2;
                } else {
                    stack[i] = stack[i + 1 + offset];
                    offset += 1, len -= 1, i++;
                }
                break;
            case '-':
                if (i > 0 && ft.isNumber(stack[i - 1])) {
                    stack[i - 1] = stack[i - 1] - stack[i + 1 + offset];
                    offset += 2, len -= 2;
                } else {
                    stack[i] = -stack[i + 1 + offset];
                    offset += 1, len -= 1, i++;
                }
                break;
            default :
                i++;
                break;
        }
    }
    if (!len) return stack[0];
    offset && (stack[i] = stack[i + offset]);
    i = 0, offset = 0;
    while (i < len) {
        offset && (stack[i] = stack[i + offset]);
        if (stack[i] === '!') {
            stack[i] = !stack[i + 1 + offset];
            offset += 1, len -= 1;
        }
        i++;
    }
    if (!len) return stack[0];
    offset && (stack[i] = stack[i + offset]);
    if (len > 1) {
        i = 1, offset = 0;
        while (i < len) {
            offset && (stack[i] = stack[i + offset]);
            switch (stack[i]) {
                case ">":
                    stack[i - 1] = stack[i - 1] > stack[i + 1 + offset];
                    offset += 2, len -= 2;
                    break;
                case "<":
                    stack[i - 1] = stack[i - 1] < stack[i + 1 + offset];
                    offset += 2, len -= 2;
                    break;
                case ">=":
                    stack[i - 1] = stack[i - 1] >= stack[i + 1 + offset];
                    offset += 2, len -= 2;
                    break;
                case "<=":
                    stack[i - 1] = stack[i - 1] <= stack[i + 1 + offset];
                    offset += 2, len -= 2;
                    break;
                case "<>":
                    stack[i - 1] = stack[i - 1] != stack[i + 1 + offset];
                    offset += 2, len -= 2;
                    break;
                case "==":
                    stack[i - 1] = stack[i - 1] == stack[i + 1 + offset];
                    offset += 2, len -= 2;
                    break;
                default :
                    i++;
                    break;
            }
        }
        if (!len) return stack[0];
        offset && (stack[i] = stack[i + offset]);
        i = 1, offset = 0;
        while (i < len) {
            offset && (stack[i] = stack[i + offset]);
            if (stack[i] === '&') {
                stack[i - 1] = !!(stack[i - 1] && stack[i + 1 + offset]);
                offset += 2, len -= 2;
            } else {
                i++;
            }
        }
        if (!len) return stack[0];
        offset && (stack[i] = stack[i + offset]);
        i = 1, offset = 0;
        while (i < len) {
            offset && (stack[i] = stack[i + offset]);
            if (stack[i] === '|') {
                stack[i - 1] = !!(stack[i - 1] || stack[i + 1 + offset]);
                offset += 2, len -= 2;
            } else {
                i++;
            }
        }
        if (!len) return stack[0];
    }
};
secretBox["_getBaseValue"] = function (key) {
    switch (key) {
        case true:
        case 'true':
            return true;
        case false:
        case 'false':
            return false;
        case null:
        case 'null':
            return null;
        case 'while':
            return '@A';
        case 'switch':
            return '@B';
        case 'if':
            return '@C';
        case 'end':
            return '@D';
        case 'break':
            return '@E';
        case 'else':
            return '@F';
        case 'endif':
            return '@G';
        case 'block':
            return '@H';
        case 'store':
            return '@I';
        case 'global':
            return '@J';
        case 'elseif':
            return '@K';
        case 'and':
            return '&';
        case 'or':
            return '|';
        case 'not':
            return '!';
        default :
            if (!isNaN(key)) return Number(key);
            return key;
    }
};
ftc.player.system.secretBox = secretBox;
ftc.isWindows() && ftc.player.setAesKeyIv("tcU4Ivq8UeAPodOF", "qSDPiXB8wdjAuzbu");