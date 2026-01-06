<<<<<<< HEAD
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

=======
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
     * Builder pattern for subjects.
     * 
     * @returns 
     */
    static build() {
        let subject = new Subject();
        Array.from(arguments).forEach(observer => subject.subscribe(observer));

        return subject;
    }


    /**
     * Subject/Observer pattern -> Subscrcibe an observer to a subject.
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
     * Subject/Observer pattern -> Unsubscribe an observer from a subject.
     *  
     * @param {*} observer 
     * @returns 
     */
    unsubscribe(observer) {
        this.observers = this.observers.filter((o) => o !== observer);

        return this;
    }


    /**
     * Subject/Observer pattern -> Notify a particular subscribed observers.
     * 
     * @param {*} observer 
     * @param {*} data 
     * @param {*} source 
     */
    notify(observer, data, source) {
        let idx = this.observers.indexOf(observer);
        if (idx > -1) {
            this.observers[idx].update(data, source);
        }
    }


    /**
     * Subject/Observer pattern -> Notify all registered subscribed observers.
     * 
     * @param {*} data 
     * @param {*} source 
     */
    notifyAll(data, source) {
        this.observers.forEach((o) => o.update(data, source));
    }


    /**
     * Subject/Observer pattern -> Clear a particular subscribed observers.
     *
     * @param {*} observer 
     * @param {*} data
     * @param {*} source
     */
    clear(observer, data, source) {
        let idx = this.observers.indexOf(observer);
        if (idx > -1) {
            this.observers[idx].reset(data, source);
        }

    }


    /**
     * Clear all registered subscribed observers.
     * 
     * @param {*} data 
     * @param {*} source 
     */
    clearAll(data, source) {
        this.observers.forEach((o) => o.reset(data, source));
    }
}

>>>>>>> fa6f617 (Updated Javasccript code with latest features.)
module.exports = Subject;