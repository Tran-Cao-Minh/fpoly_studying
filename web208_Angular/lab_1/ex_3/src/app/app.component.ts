import { Component } from '@angular/core';
import Inventor from './inventor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inventorList: Array<Inventor> = [
    { id: 1, lastName: 'Abalakov', firstName: 'Vitaly', birthYear: 1906, deathYear: 1986 },
    { id: 2, lastName: 'Karl Abbe', firstName: 'Ernst', birthYear: 1840, deathYear: 1905 },
    { id: 3, lastName: 'Adamian', firstName: 'Hovannes', birthYear: 1879, deathYear: 1932 },
    { id: 2, lastName: 'W. Alderson', firstName: 'Samuel', birthYear: 1914, deathYear: 2005 },
    { id: 2, lastName: 'Alexeieff', firstName: 'Alexandre', birthYear: 1901, deathYear: 1982 },
  ];

  show(codeHTML: string) {
    const result: HTMLElement = document.querySelector('#inventorList')!;
    result.innerHTML = codeHTML;
  }

  render() {
    const codeHTML: string = this.inventorList.map(i => `
      <p class="py-3"> 
        ${i.id}. ${i.firstName.toUpperCase()} ${i.lastName.toUpperCase()} 
        (${i.birthYear} - ${i.deathYear}) - 
        Age: ${i.deathYear - i.birthYear}
      </p>
    `).join('');
    this.show(codeHTML);
  }
}
