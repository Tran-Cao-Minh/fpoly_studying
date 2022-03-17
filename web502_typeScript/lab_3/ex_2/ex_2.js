// 2 Thực hiện bài tập ví dụ
// 2.1 Function & void
var sum = function (x, y) {
    if (x === void 0) { x = 5; }
    return x + y;
};
var speech = function (output) {
    console.log('Result: ' + output);
};
speech(sum(5, 12));
console.log(speech(sum(8, 5)));
// 2.2 Never & void
var something = undefined;
var nothing = null; // Error: Type 'null' is not assignable to type 'never'
function throwError(errorMsg) {
    throw new Error(errorMsg);
}
// 2.3 Function & callback
function AddAndHandle(x, y, cb) {
    var result = x + y;
    cb(result);
}
AddAndHandle(10, 20, function (result) { console.log(result); });
