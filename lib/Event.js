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