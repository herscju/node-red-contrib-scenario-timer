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

    // Constructor
    constructor(id, node) {
        this.id = id || this.id;
        this.node = node || this.node;
    }

    // Update Trigger
    update(data, source) {
        let messages = new Array();

        if (data && (data.hasOwnProperty("position")) && data.position === 0) {
            let message = {};
            message.source = source;
            message.payload = data;
            messages.push(message);

            messages.push(null);
            messages.push(null);
            messages.push(null);

        } else {

            messages.push(null);

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

    // Reset Trigger
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

module.exports = Trigger;