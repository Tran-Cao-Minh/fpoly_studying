var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
// DECORATORS
function LogCreate(constructor) {
    console.log('Log Create: ', constructor);
}
function StudentManagerLogger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function PropertyStudentManagerLogger(target, propertyName) {
    console.log('Student Manger Class: ', target);
    console.log('Selected Property of Student Manager Class: ', propertyName);
}
function MethodStudentManagerLogger(target, methodName, propertyDescriptor) {
    console.log('Student Manger Class: ', target);
    console.log('Selected Method of Student Manager Class: ', methodName);
    console.log('Method Descriptor: ', propertyDescriptor);
}
// end DECORATORS
let StudentManager = class StudentManager {
    constructor(fetchLink) {
        this.fetchLink = fetchLink;
    }
    set newFetchLink(val) {
        this.fetchLink = val;
    }
    getStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.fetchLink);
            const data = yield response.json();
            return data;
        });
    }
    showStudent(container) {
        this.getStudent().then((data) => {
            data.students.forEach((student) => {
                container.innerHTML += `
          <div class="row">
            <div class="col image">
              <img src="./images/${student.image}" alt="${student.name}">
            </div>
            <div class="col name">
              ${student.name}
            </div>
            <div class="col birthday">
              ${student.birthday}
            </div>
            <div class="col gender">
              ${student.gender}
            </div>
            <div class="col score">
              ${student.score}
            </div>
          </div>
        `;
            });
        });
    }
    ;
};
__decorate([
    PropertyStudentManagerLogger
], StudentManager.prototype, "fetchLink", void 0);
__decorate([
    MethodStudentManagerLogger // Accesstor Decorator because it apply for SETTER or GETTER
], StudentManager.prototype, "newFetchLink", null);
__decorate([
    MethodStudentManagerLogger
], StudentManager.prototype, "getStudent", null);
__decorate([
    MethodStudentManagerLogger
], StudentManager.prototype, "showStudent", null);
StudentManager = __decorate([
    LogCreate,
    StudentManagerLogger('LOGGING: StudentManger')
], StudentManager);
const studentManager = new StudentManager('./db.json');
studentManager.showStudent(document.querySelector('#container'));
