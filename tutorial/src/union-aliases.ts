// エイリアス型
type Combinable = number | string;
type ConversiionDescriptor = 'as-number' | 'as-text'

function combine(input1: Combinable, input2: Combinable, resultConversion: ConversiionDescriptor) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString()
  }
  if (resultConversion === 'as-number') {
    return parseFloat(result.toString());
  } else {
    return result.toString();
  }
}

const combineAges = combine(30, 50, 'as-number');
console.log(combineAges)

const combinedNames = combine('Max', 'Anna', 'as-text')
console.log(combinedNames)

const combineStringAges = combine('30', '50', 'as-number');
console.log(combineAges)