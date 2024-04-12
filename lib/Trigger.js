const Util = require("./Util.js");

/**
 * Constructor 
 * Implements observer pattern
 */
class Trigger {

    // https://stackoverflow.com/a/34550964
    static BROWSER = Util.isBrowser();

    id = "DefaultTrigger";
    node = null;

    /**
     * Constructor
     * 
     * @param {*} id 
     * @param {*} node 
     */
    constructor(id, node) {
        this.id = id || this.id;
        this.node = node || this.node;
    }

    /**
     * Update Node-RED element.
     * 
     * @param {*} data 
     * @param {*} source 
     */
    update(data, source) {
        if (Trigger.BROWSER) {
            this.log((source ? source : "(n/a)") + " --> " + JSON.stringify(data));
        } else {
            // TODO: Implementation in Node-RED
            this.log((source ? source : "(n/a)") + " --> " + JSON.stringify(data));
        }
    }

    /**
     * Reset Node-RED element.
     * 
     * @param {*} data 
     * @param {*} source 
     */
    reset(data, source) {
        // TODO: Implementation in Node-RED
    }

    /**
     * Log message.
     * 
     * @param {*} message 
     */
    log(message) {
        if (this.node) {
            this.node.log(message);
        } else {
            console.log(message);
        }

    }
}

module.exports = Trigger;