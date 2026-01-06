<<<<<<< HEAD:lib/GeneratorEvent.js
/**
 * Constructor
 * https://hellocoding.de/blog/coding-language/javascript/custom-events
 * https://blog.logrocket.com/custom-events-in-javascript-a-complete-guide/
 */
class GeneratorEvent {

    static ID = "GeneratorEvent";
    static BUBBLES = true;
    static COMPOSED = false;
    static CANCELABLE = false;
    static MESSAGE = "Status change";
    static TIMEOUT = 60;

    // Constructor
    constructor() {
        //
    }

    static create(id, indicator) {

        return new CustomEvent(id || GeneratorEvent.ID, {
            "bubbles": GeneratorEvent.BUBBLES,
            "composed": GeneratorEvent.COMPOSED,
            "cancelable": GeneratorEvent.CANCELABLE,
            "detail": {
                "indicator": indicator,
                "message": GeneratorEvent.MESSAGE,
                "timeout": GeneratorEvent.TIMEOUT
            }
        });
    }
}

module.exports = GeneratorEvent;
=======
/**
 * Constructor
 * https://hellocoding.de/blog/coding-language/javascript/custom-events
 * https://blog.logrocket.com/custom-events-in-javascript-a-complete-guide/
 */
class Event {

    static ID = "Event";
    static BUBBLES = true;
    static COMPOSED = false;
    static CANCELABLE = false;
    static MESSAGE = "Status change";
    static TIMEOUT = 60;


    /**
     * Create a new Javascript custom event.
     * 
     * @param {*} id 
     * @param {*} indicator 
     * @returns 
     */
    static create(id, indicator) {

        return new CustomEvent(id || Event.ID, {
            "bubbles": Event.BUBBLES,
            "composed": Event.COMPOSED,
            "cancelable": Event.CANCELABLE,
            "detail": {
                "indicator": indicator,
                "message": Event.MESSAGE,
                "timeout": Event.TIMEOUT
            }
        });
    }


    /**
     * Constructor
     */
    constructor() {
        //
    }
}

module.exports = Event;
>>>>>>> fa6f617 (Updated Javasccript code with latest features.):lib/Event.js
