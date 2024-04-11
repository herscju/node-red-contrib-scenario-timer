/**
 * Constructor
 * Implements subject pattern
 */
class Subject {

    observers = null;

    /**
     * Constructor
     */
    constructor() {
        this.observers = new Array();
    }

    /**
     * Builder for subject
     * 
     * @returns 
     */
    static build() {
        let subject = new Subject();
        Array.from(arguments).forEach(observer => subject.subscribe(observer));

        return subject;
    }

    /**
     * Subscribe new observer (Subject/Observer pattern).
     * 
     * @param {*} observer 
     * @returns 
     */
    subscribe(observer) {

        // Avoid push multiple time the same observer
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }

        return this;
    }

    /**
     * Usubscribe observer (Subject/Observer pattern).
     * 
     * @param {*} observer 
     * @returns 
     */
    unsubscribe(observer) {
        this.observers = this.observers.filter((o) => o !== observer);

        return this;
    }

    /**
     * Notify particular observer (Subject/Observer pattern).
     * 
     * @param {*} observer 
     * @param {*} data 
     * @param {*} source 
     * @returns 
     */
    notify(observer, data, source) {
        let idx = this.observers.indexOf(observer);
        if (idx > -1) {
            this.observers[idx].update(data, source);
        }

        return this;
    }

    /**
     * Notify all observers (Subject/Observer pattern).
     * 
     * @param {*} data 
     * @param {*} source 
     * @returns 
     */
    notifyAll(data, source) {
        this.observers.forEach((observer) => observer.update(data, source));

        return this;
    }

    /**
     * Clear or reset particular observer (Subject/Observer pattern).
     * 
     * @param {*} observer 
     * @param {*} data 
     * @param {*} source 
     * @returns 
     */
    clear(observer, data, source) {
        let idx = this.observers.indexOf(observer);
        if (idx > -1) {
            this.observers[idx].reset(data, source);
        }

        return this;
    }

    /**
     * Clear or reset all observers (Subject/Observer pattern).
     * 
     * @param {} data 
     * @param {*} source 
     * @returns 
     */
    clearAll(data, source) {
        this.observers.forEach((observer) => observer.reset(data, source));

        return this;
    }
}

module.exports = Subject;