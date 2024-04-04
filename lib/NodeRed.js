const Util = require("./Util.js");

/**
 * Constructor 
 * Implements observer pattern
 */
class NodeRed {

    // https://stackoverflow.com/a/34550964
    static BROWSER = Util.isBrowser();

    id = "DefaultNodeRed";
    node = null;

    // Constructor
    constructor(id, node) {
        this.id = id || this.id;
        this.node = node || this.node;
    }

    // Update Node-RED element
    update(data, source) {
        if (NodeRed.BROWSER) {
            console.log((source ? source : "(n/a)") + " --> " + JSON.stringify(data));
        } else {
            // TODO: Implementation in Node-RED
            this.node.send({ "payload": (source ? source : "(n/a)") + " --> " + JSON.stringify(data) });
        }
    }

    // Reset Node-RED element
    reset(data, source) {
        // TODO: Implementation in Node-RED
    }
}

module.exports = NodeRed;