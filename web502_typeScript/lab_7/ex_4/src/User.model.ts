interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  };
}

export class User {
  @Required
  private name: string;

  constructor () {
    this.name = 'Must login to get Username';
  }

  readonly login = (
    form: HTMLFormElement,
    callbackFn: Function
  ) => {
    form.addEventListener('submit', (ev: SubmitEvent) => {
      ev.preventDefault();

      this.name = form.userName.value;
      form.classList.add('d-none');

      callbackFn();
    });
  }

  readonly getUserName = () => {
    return this.name;
  }
}