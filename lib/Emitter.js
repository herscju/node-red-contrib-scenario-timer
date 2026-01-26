/**
 * Constructor
 */
class Emitter {

    events = {};

    /**
     * Constructor
     */
    constructor() {
        //
    }


    /**
     * Get number of listeners
     * 
     * @param {*} type 
     * @returns 
     */
    listenerCount(type) {
        let listeners = this.events[type] || [];

        return listeners.length;
    }


    /**
     * Add new listener
     */
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


    /**
     * Add new listener
     * 
     * @param {*} type 
     * @param {*} listener 
     * @returns 
     */
    on(type, listener) {
        return this.addListener(type, listener);
    }

    
    /**
     * Emit event
     * 
     * @param {*} type 
     * @param {*} options 
     * @returns 
     */
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