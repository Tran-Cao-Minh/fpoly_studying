// 1 use arrow function to make code more concise

const multiply = (num1, num2) => {
  return num1 * num2;
};

const toCelcius = (fahrenheit) => {
  return (5 / 9) * (fahrenheit - 32);
};

const padZeros = (num, totalLen) => {
  let numStr = num.toString();
  const numZeros = totalLen - numStr.length;

  for (let i = 1; i <= numZeros; i++) {
    numStr = "0" + numStr;
  };

  return numStr;
};

const power = (base, exponent) => {
  let result = 1;

  for (let i = 0; i < exponent; i++) {
    result *= base;
  };

  return result;
};

const greet = (who) => {
  console.log('Hello ' + who);
};