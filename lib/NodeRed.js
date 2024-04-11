const Util = require("./Util.js");
const Indicator = require("./Indicator.js");

/**
 * Constructor
 * Implements observer pattern
 */
class NodeRed {

    // https://stackoverflow.com/a/34550964
    static BROWSER = Util.isBrowser();

    id = "DefaultNodeRed";
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

        if (data && data.hasOwnProperty("position") && data.position === 0) {
            let message = {};
            message.source = source;
            message.payload = data;
            messages.push(message);

            for (let idx = 1; idx < Indicator.INDICATORS.length; idx++) {
                messages.push({ "payload": null });
            }

        } else {

            messages.push({ "payload": null });

            // Remember, first item is used as default indicator to show stroke / beat / watchdog. Therefore start with index = 1.
            for (let idx = 1; idx < Indicator.INDICATORS.length; idx++) {
                let message = new Object();
                message.source = source;

                if (data && data.hasOwnProperty("position") && data.position === idx) {
                    message.payload = data;
                } else {
                    message.payload = null;
                }

                messages.push(message);
            }
        }

        if (NodeRed.BROWSER) {
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
     * @param {} data 
     * @param {*} source 
     */
    reset(data, source) {
        let messages = new Array();

        // Reset ALL indicators, independant of it's function (see method 'update')
        for (let idx = 0; idx < Indicator.INDICATORS.length; idx++) {
            let message = new Object();
            message.source = source;

            if (data && data.hasOwnProperty("position") && data.position === idx) {
                message.payload = data;
            }

            messages.push(message);
        }

        if (NodeRed.BROWSER) {
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

module.exports = NodeRed;