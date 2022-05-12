import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab 1 Exercise';
  student = {
    name: 'Tran Cao Minh',
    gender: 1,
    birthDate: '2002-8-14',
    image: 'minhtc.jpg',
    score: 10,
    age: 20,
  }
}
