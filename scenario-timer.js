/**
 * https://www.freecodecamp.org/news/how-to-use-promises-in-javascript/
 * 
 * https://leanylabs.com/blog/cancel-promise-abortcontroller/
 * https://www.nearform.com/insights/using-abortsignal-in-node-js/
 * https://blog.logrocket.com/complete-guide-abortcontroller-node-js/
 * 
 * https://www.demirjasarevic.com/asynchrone-programmierung-javascript/
 * https://entwickler.de/javascript/asynchronitat-in-javascript-ein-werkzeug-fur-jedes-problem
 * https://www.a-coding-project.de/ratgeber/javascript/setinterval
 * 
 * @param {*} RED 
 */
const Indicator = require("./lib/Indicator.js");
const LedBulb = require("./lib/LedBulb.js");
const NodeRed = require("./lib/NodeRed.js");
const Trigger = require("./lib/Trigger.js");
const Subject = require("./lib/Subject.js");
const Util = require("./lib/Util.js");
const Generator = require("./lib/Generator.js");
const Timer = require("./lib/Timer.js");

// Module definitions
module.exports = function (RED) {

    function ScenarioTimerNode(config) {

        RED.nodes.createNode(this, config);

        this.timeout = config.timeout;
        this.update = config.update;

        let node = this;

        // Prepare observers
        const ledBulb = new LedBulb("ledbulb", node);
        const nodeRed = new NodeRed("nodered", node);
        const trigger = new Trigger("trigger", node);

        // Get new instance of generator
        const generator = new Generator();
        let status = generator.setIndicator(Indicator.INDICATORS[0]).setDebug(true).status();

        // Set start status message
        this.status({ "fill": "grey", "shape": "ring", "text": "Ready" });

        node.on('input', (msg) => {

            // Check input. Payload must by a valid number, preferably a timestamp.
            if (!isNaN(msg.payload)) {

                switch (msg.action) {
                    case Generator.GENERATE:
                        status = generator.setTimeout(node.timeout).init(ledBulb, nodeRed, trigger).generate(Date.now(), Number.MIN_SAFE_INTEGER).status();

                        // Update status
                        this.status({ "fill": "green", "shape": "dot", "text": status.message });
                        break;

                    case Generator.TERMINATE:
                        status = generator.terminate("Terminate generator and timer tasks").status();

                        // Update status
                        this.status({ "fill": "red", "shape": "ring", "text": status.message });
                        break;

                    case Generator.UPDATE:
                        status = generator.done().status();

                        // Update status
                        this.status({ "fill": "green", "shape": "ring", "text": status.message });
                        break;

                    default:
                        status = Generator.OFF;

                        // Update status
                        this.status({ "fill": "grey", "shape": "ring", "text": "Ready" });
                }
            } else {
                this.status({ "fill": "red", "shape": "dot", "text": "Input is not valid!" });
            }

            // Set return messages "node.send(messages);" is not neccessary here. It is done within the registered observers!
        });

        // https://nodered.org/docs/creating-nodes/node-js
        node.on('close', (removed, done) => {
            node.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            if (removed) {
                status = generator.terminate("Terminate generator and timer tasks").status();

                // Update status
                this.status({ "fill": "red", "shape": "ring", "text": status.message });
            }
            node.log(done);
            done.then(f).catch(e => console.error(`An error has been occured. ${e}`));
        });
    }

    RED.nodes.registerType("scenario-timer", ScenarioTimerNode);
}
