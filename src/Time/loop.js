const isNode = () => (typeof process !== 'undefined');

class Loop {
  constructor(callback, fps) {
    this.callback = callback;
    this.cache = {
      isRunning: false,
      animationId : null
    };
    this.fps = fps;
    this.startTime = null;
    this.i=0;
  }

  get time_step() {
    return 1000 / this.fps;
  }

  start() {
    if (!this.cache.isRunning) {
      this.cache.isRunning = true;
      this.startTime = Date.now();
      this.animate();
    }
    return this;
  }

  stop() {
    if (this.cache.isRunning) {
      clearTimeout(this.cache.animationId);
      this.cache.isRunning = false;
    }
    return this;
  }

  animate = () => {
    if (!this.cache.isRunning) {
      return;
    }

    const now = Date.now();
    const delta = now - this.startTime;

    if (delta > this.time_step) {
      this.callback(this);
      this.i++;
      this.startTime = now - (delta % this.time_step);
    }

    this.cache.animationId = setTimeout(this.animate, 0);
  };
}

const loop = (callback, fps) => new Loop(callback, fps);


  // const a = loop((e) => console.log(e.i), 1);
  // a.start();

export {loop}
