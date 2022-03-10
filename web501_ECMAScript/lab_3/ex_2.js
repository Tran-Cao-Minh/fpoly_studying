// 2 use arrow function to return sum of an array

let arr = [1, 2, 3, 4, 5, 6, 7];
const arrSum = (arr) => {
  let result = 0;

  arr.forEach(item => {
    result += item;
  });

  return result;
};
arr = arrSum(arr);

console.log(arr);