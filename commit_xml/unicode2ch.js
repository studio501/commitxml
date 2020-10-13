
if (process.argv.length !== 3) {
    console.log("usage node unicdoe2ch.js str");
    return;
}
var word = process.argv[2];
var obj1 = { ustr: word };

let jsonstr = '{"ustr": "' + word + '"}';
let obj = JSON.parse(jsonstr);
let ustr_n = obj.ustr;
console.log(ustr_n);