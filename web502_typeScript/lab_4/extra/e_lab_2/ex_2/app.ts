interface Student {
  image: string,
  name: string,
  birthday: string,
  gender: string,
  score: number
};

class StudentManager {
  private fetchLink: string;

  constructor ( fetchLink: string ) {
    this.fetchLink = fetchLink;
  }

  private getStudent = async () => {
    const response: Response = await fetch(this.fetchLink);
    const data: any = await response.json();
  
    return data;
  }

  readonly showStudent = (container: HTMLElement) => {
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