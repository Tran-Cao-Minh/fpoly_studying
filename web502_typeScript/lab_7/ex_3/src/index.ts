import { Person } from './interface/person';
import {Student} from './model/student';

function greeter (person: Person){
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let student: Student = new Student('Thi', 'Hong', 'Nguyen');

document.body.innerHTML = greeter(student);