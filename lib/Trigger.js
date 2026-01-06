<<<<<<< HEAD
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

=======
const Util = require("./Util.js");
const Indicator = require("./Indicator.js");

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
     * Update trigger.
     * 
     * @param {*} data 
     * @param {*} source 
     */
    update(data, source) {
        let messages = new Array();

        if (data && (data.hasOwnProperty("position")) && data.position === 0) {
            let message = new Object();
            message.source = source;
            message.payload = data;
            messages.push(message);
        }

        // Remember, first item is used as default indicator to show stroke / beat. Therefore start with index = 1.
        for (let idx = 1; idx < Indicator.INDICATORS.length; idx++) {
            let message = new Object();
            message.source = source;

            if (data && (data.hasOwnProperty("position")) && data.position === idx) {
                message.payload = data;
            } else {
                message.payload = null;
            }

            messages.push(message);
        }

        if (Trigger.BROWSER) {
            console.log(messages);
        } else {
            if (this.node) {
                this.node.send(messages);
            } else {
                console.log(messages);
            }
        }
    }


    /**
     * Reset trigger.
     * 
     * @param {*} data 
     * @param {*} source 
     */
    reset(data, source) {
        let messages = new Array();

        for (let idx = 0; idx < Indicator.INDICATORS.length; idx++) {
            let message = new Object();
            message.source = source;
            if (data && (data.hasOwnProperty("position")) && data.position === idx) {
                message.payload = data;
            }

            messages.push(message);
        }

        if (Trigger.BROWSER) {
            console.log(messages);
        } else {
            if (this.node) {
                this.node.send(messages);
            } else {
                console.log(messages);
            }
        }
    }
}

>>>>>>> fa6f617 (Updated Javasccript code with latest features.)
module.exports = Trigger;