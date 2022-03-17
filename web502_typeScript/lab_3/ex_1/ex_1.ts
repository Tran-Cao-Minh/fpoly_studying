// 1 arrow function

// 1.1 
// Viết hàm (function và arrow function) tính tổng có giá trị 
// trả về không dùng tham số.
function getSum () {
  let sum: number = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  };

  return sum;
}

const arguments = [1, 2];
const getSum = () => {
  let sum: number = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  };

  return sum;
};

// 1.2 
// Viết hàm arrow function tính tổng 2 số 
// (có sử dụng default value, optional parameter, rest parameter)
const getSuma = (
  a: number = 0,
  b?: number,
  ...rest: number[]
) => {
  let sum: number = a;

  if (b) {
    sum += b;
  };

  if (rest) {
    for (let i = 0; i < rest.length; i++) {
      sum += rest[i];
    };
  };

  return sum;
};

// 1.3
// Thực hiện ví dụ merging array with spread operator
// ARRAY
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(hobbies);
activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);
console.log(activeHobbies);