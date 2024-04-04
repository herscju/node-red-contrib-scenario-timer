/**
 * Constructor
 */
class Emitter {

    events = {};

    // Constructor
    constructor() {
        //
    }

    //
    listenerCount(type) {
        let listeners = this.events[type] || [];

        return listeners.length;
    }

    // 
    addListener(type, listener) {
        // Check if the listener is a function and throw error if it is not
        if (typeof listener !== "function") {
            throw new Error("Listener must be a function!");
        }

        // Create the event listener property (array) if it does not exist.
        this.events[type] = this.events[type] || [];

        // Adds listners to the events array.
        this.events[type].push(listener);

        return this;
    }

    //
    on(type, listener) {
        return this.addListener(type, listener);
    }

    //
    emit(type, options) {
        // Checks if event is a property on Emitter
        if (this.events[type]) {
            // Loop through that events array and invoke all the listeners inside it.
            this.events[type].forEach((func) => func(options));
        }

        return this;
    }

}

module.exports = Emitter;