const Entity = function (name, delay) {
  this.name = name;
  this.delay = delay;

  this.greet = () => {
    setTimeout(() => {
      console.log('Hello, my name is ', this.name);
    }, this.delay);
  };
};

const java = new Entity('Java', 5000);
const cpp = new Entity('C++', 30);

java.greet();
cpp.greet();