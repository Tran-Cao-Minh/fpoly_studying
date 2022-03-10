function add (x = 5) {
  let phrase = 'Result is ';

  // phrase = 10; // error - false type
  // x = '2.8'; // error - false type

  return phrase + x;
}

// let result: number = add(); // error - false type, redeclare in 1.ts
let otherResult: string = add();