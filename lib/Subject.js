/**
 * Constructor
 * Implements subject pattern
 */
class Subject {

    observers = null;

    // Constructor
    constructor() {
        this.observers = new Array();
    }

    static build() {
        let subject = new Subject();
        Array.from(arguments).forEach(observer => subject.subscribe(observer));

        return subject;
    }

    // Subject/Observer pattern
    subscribe(observer) {

        // Avoid push multiple time the same observer
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }

        return this;
    }

    // Subject/Observer pattern
    unsubscribe(observer) {
        this.observers = this.observers.filter((o) => o !== observer);

        return this;
    }

    // Subject/Observer pattern
    notify(observer, data, source) {
        let idx = this.observers.indexOf(observer);
        if (idx > -1) {
            this.observers[idx].update(data, source);
        }
    }

    // Subject/Observer pattern
    notifyAll(data, source) {
        this.observers.forEach((o) => o.update(data, source));
    }

    // Subject/Observer pattern
    clear(observer, data, source) {
        let idx = this.observers.indexOf(observer);
        if (idx > -1) {
            this.observers[idx].reset(data, source);
        }

    }

    // Subject/Observer pattern
    clearAll(data, source) {
        this.observers.forEach((o) => o.reset(data, source));
    }
}

module.exports = Subject;