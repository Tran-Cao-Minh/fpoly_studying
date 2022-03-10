let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Typescript';
userName = userInput;
userName = <string> userInput;
if (typeof userInput === 'string') {
  userName = userInput;
}