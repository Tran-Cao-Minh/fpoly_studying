// 1 arrow function
// 1.1 
// Viết hàm (function và arrow function) tính tổng có giá trị 
// trả về không dùng tham số.
function getSum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    ;
    return sum;
}
var arguments = [1, 2];
var getSum = function () {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    ;
    return sum;
};
// 1.2 
// Viết hàm arrow function tính tổng 2 số 
// (có sử dụng default value, optional parameter, rest parameter)
var getSuma = function (a, b) {
    if (a === void 0) { a = 0; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    var sum = a;
    if (b) {
        sum += b;
    }
    ;
    if (rest) {
        for (var i = 0; i < rest.length; i++) {
            sum += rest[i];
        }
        ;
    }
    ;
    return sum;
};
// 1.3
// Thực hiện ví dụ merging array with spread operator
// ARRAY
var hobbies = ['Sports', 'Cooking'];
var activeHobbies = ['Hiking'];
activeHobbies.push(hobbies);
activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push.apply(activeHobbies, hobbies);
console.log(activeHobbies);
