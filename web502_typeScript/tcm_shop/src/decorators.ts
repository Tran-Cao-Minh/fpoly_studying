const LogCreateWithName = (name: string) => { // decorator factory: return decorator and add prameter
  return (constructor: Function) => {
    console.log(name, constructor);
  };
};

const PropertyLogger = (target: any, propertyName: string | Symbol) => {
  console.log('Main Class: ', target, 'Selected Property: ', propertyName);
};

const MethodLogger = (target: any, methodName: string | Symbol, propertyDescriptor: PropertyDescriptor) => {
  console.log('Main Class: ', target, 'Selected Method: ', methodName, 'Method Descriptor: ', propertyDescriptor);
};

export {
  LogCreateWithName,
  PropertyLogger,
  MethodLogger
};