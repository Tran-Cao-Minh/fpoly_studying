// 2 Thực hiện bài tập ví dụ

// 2.1 Function & void
let sum = (x: number = 5, y?: number) => { return x + <number>y };
let speech = (output: any): void => {
  console.log('Result: ' + output);
};
speech(sum(5, 12));
console.log(speech(sum(8, 5)));

// 2.2 Never & void
let something: void = undefined;
let nothing: never = null; // Error: Type 'null' is not assignable to type 'never'
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

// 2.3 Function & callback
function AddAndHandle(x: number, y: number, cb: (num: number) => void) {
  const result = x + y;
  cb(result);
}
AddAndHandle(10, 20, (result) => { console.log(result); });