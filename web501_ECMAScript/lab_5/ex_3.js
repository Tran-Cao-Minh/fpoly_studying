// convert clock object to JS Class
class Clock {
  constructor ({ template }) {
    this.template = template;
  }

  render(template) {
    const date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    const output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(this.render.bind(this), 1000);
  }
};

let clock = new Clock({template: 'h:m:s'});
clock.start();
setTimeout(() => {
  clock.stop()
}, 5000);