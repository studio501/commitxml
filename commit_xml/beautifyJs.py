# -*- coding: utf-8 -*
import js2py
import json

esprima = js2py.require('esprima')
escodegen = js2py.require('escodegen')

str1 = """
var t = {a:100}
var a = t.a;
b(function(t){
    var c = t;
})
"""
tree = esprima.parse(str1)
print(json.dumps(tree.to_dict(), indent=4))
ss = escodegen.generate(tree)

print(esprima)