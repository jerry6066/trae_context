function greet(name) {
  return `你好, ${name}! 欢迎来到工作区。`;
}

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log(greet('Developer'));
console.log(`Sum of ${numbers.join(', ')} is ${sum}`);
console.log(`5 + 3 = ${add(5, 3)}`);
console.log(`5 * 3 = ${multiply(5, 3)}`);
