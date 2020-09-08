var esprima = require('esprima');
if (process.argv.length === 3) {
    var tree = esprima.parseScript(process.argv[2]);
    console.log(JSON.stringify(tree))
}
