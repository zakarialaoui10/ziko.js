const isNode = () => (typeof process !== 'undefined');

class Loop {
  constructor(callback, {fps,step,t=[0,null],start=true}={}) {
    this.callback = callback;
    this.cache = {
      isRunning: false,
      animationId : null,
      startTime : null,
      step,
      fps,
      t,
      started:start
    };
    this.adjust();
    this.i=0;
  }
  adjust(){
    if(this.cache.step && this.cache.fps){
      console.warn(`Fps will be adjusted from ${this.cache.fps} to ${1000/this.cache.step} to ensure a smoother animation`);
      this.cache.fps=1000/this.cache.step;
    }
    if(this.cache.started){
      const t=this.cache.t;
      t[0]?this.startAfter(t[0]):this.start();
      if(t[1])this.stopAfter(t[1]);
    }
    return this;
  }
  get TIME_STEP() {
    return this.cache.step?this.cache.step:1000 / this.cache.fps;
  }
  start() {
    if (!this.cache.isRunning) {
      this.i=0;
      this.cache.isRunning = true;
      this.cache.startTime = Date.now();
      this.animate();
    }
    return this;
  }
  pause() {
    if (this.cache.isRunning) {
      clearTimeout(this.cache.animationId);
      this.cache.isRunning = false;
    }
    return this;
  }
  stop(){
    this.pause();
    this.i=0;
    return this;
  }
  resume(){
    this.cache.isRunning=true;
    this.animate();
    return this;
  }
  startAfter(t=1000){
    setTimeout(this.start.bind(this),t);
    return this;
  }
  stopAfter(t=1000){
    setTimeout(this.stop.bind(this),t);
    return this;   
  }
  animate = () => {
    if (this.cache.isRunning) {
      const now = Date.now();
      const delta = now - this.cache.startTime;
      if (delta > this.TIME_STEP) {
        this.callback(this);
        this.i++;
        this.cache.startTime = now - (delta % this.TIME_STEP);
      }
      this.cache.animationId = setTimeout(this.animate, 0);
    };
  }
}

const loop = (callback, options) => new Loop(callback, options);


//const a = loop((e) => console.log(e.i), {step:100,fps:30,t:[500,4001],start:true});
export {loop}
