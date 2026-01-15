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