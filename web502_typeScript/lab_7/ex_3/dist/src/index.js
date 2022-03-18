import { Student } from './model/student.js';
function greeter(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
var student = new Student('Thi', 'Hong', 'Nguyen');
document.body.innerHTML = greeter(student);
