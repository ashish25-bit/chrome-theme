class EventEmitter {
  #events;

  constructor() {
    this.#events = {};
  }

  on(eventName, callback) {
    if (this.#events.hasOwnProperty(eventName))
      this.#events[eventName].push(callback);
    else
      this.#events[eventName] = [callback];
  }

  trigger(eventName, ...args) {
    console.log(args)
    if (this.#events.hasOwnProperty(eventName)) {
      this.#events[eventName].forEach(cb => {
        cb.apply(null, args);
      })
    }

    else {
      console.log(eventName, 'event is not there')
    }
  }
}

