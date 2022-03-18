

function test() {
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

  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ['positive']
    };
  }
}