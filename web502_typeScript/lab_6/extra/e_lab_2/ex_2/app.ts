interface Student {
  image: string,
  name: string,
  birthday: string,
  gender: string,
  score: number
};

// DECORATORS
function LogCreate(constructor: Function) { // class decorator
  console.log('Log Create: ', constructor);
}

function StudentManagerLogger(logString: string) { // decorator factory: return decorator and add prameter
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function PropertyStudentManagerLogger(target: any, propertyName: string | Symbol) {
  console.log('Student Manger Class: ', target);
  console.log('Selected Property of Student Manager Class: ', propertyName);
}

function MethodStudentManagerLogger(target: any, methodName: string | Symbol, propertyDescriptor: PropertyDescriptor) {
  console.log('Student Manger Class: ', target);
  console.log('Selected Method of Student Manager Class: ', methodName);
  console.log('Method Descriptor: ', propertyDescriptor);
}
// end DECORATORS

@LogCreate
@StudentManagerLogger('LOGGING: StudentManger')
class StudentManager {
  @PropertyStudentManagerLogger
  private fetchLink: string;

  constructor ( fetchLink: string ) {
    this.fetchLink = fetchLink;
  }

  @MethodStudentManagerLogger // Accesstor Decorator because it apply for SETTER or GETTER
  set newFetchLink(val: string) {
    this.fetchLink = val;
  }

  @MethodStudentManagerLogger
  private async getStudent () {
    const response: Response = await fetch(this.fetchLink);
    const data: any = await response.json();
  
    return data;
  }

  @MethodStudentManagerLogger
  public showStudent (container: HTMLElement) {
    this.getStudent().then((data: any) => {
      data.students.forEach((student: Student) => {
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
  };
}

const studentManager = new StudentManager('./db.json');
studentManager.showStudent(
  document.querySelector('#container')
);