# explain this in JS
The this keyword refers to different objects depending on how it is used:

> 1. In an object method, this refers to the object
ex: 
const person = {
  firstName: 'Cao Minh',
  lastName: 'Tran',
  id: 'ps18817',
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
};

> 2. Alone and in a function, this refers to the global object
ex:
function getThis () {
  return this;
};
console.log(getThis()); // result is [object Window]

> 3. In a function, in strict mode, this is undefined
> Because strict mode in JS does not allow default binding
ex: 
'use strict'
function getThis () {
  return this;
};
console.log(getThis()); // result is undefined

> 4. In an event, this refers to the element that received the event
ex in HTML: 
<button onclick="this.style.display='none'">Click to Remove Me!</button>