class Person {
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  set setFirstName (newFirstName) {
    this.firstName = newFirstName;
  }

  set setLastName (newLastName) {
    this.lastName = newLastName;
  }

  get fullName () {
    return `${this.firstName} - ${this.lastName}`;
  }
}

const person = new Person('Albert', 'Einstein');
person.firstName = 'Issac';
person.lastName = 'Newton';
console.log(person.fullName);