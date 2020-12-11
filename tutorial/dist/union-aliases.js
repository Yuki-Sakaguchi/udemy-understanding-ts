"use strict";
function combine(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    if (resultConversion === 'as-number') {
        return parseFloat(result.toString());
    }
    else {
        return result.toString();
    }
}
var combineAges = combine(30, 50, 'as-number');
console.log(combineAges);
var combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
var combineStringAges = combine('30', '50', 'as-number');
console.log(combineAges);
