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
const Generator = require("./lib/Generator.js").default;
const Indicator = require("./lib/Indicator.js");
const LedBulb = require("./lib/LedBulb.js");
const NodeRed = require("./lib/NodeRed.js");
const Subject = require("./lib/Subject.js");
const Trigger = require("./lib/Trigger.js");
const Timer = require("./lib/Timer.js");
const Util = require("./lib/Util.js");

// Module definitions
module.exports = function (RED) {

    function ScenarioTimerNode(config) {

        RED.nodes.createNode(this, config);

        this.timeout = config.timeout;
        this.maxNumber = config.maxnumber;
        this.minOnTime = config.minontime;
        this.update = config.update;

        let node = this;

        // Prepare observers
        let ledBulb = new LedBulb("ledbulb", node);
        let nodeRed = new NodeRed("nodered", node);
        let trigger = new Trigger("trigger", node);

        // Get new instance of generator
        const generator = new Generator();
        let status = generator.setIndicator(Indicator.INDICATORS[0]).state();

        // Set start status message
        this.status({ "fill": "grey", "shape": "ring", "text": "Ready" });

        node.on("input", (msg) => {
        
            // Check input. Payload must by a valid number, preferably a timestamp.
            if ((msg.payload === true || msg.payload === false) && msg.action && !Number.isNaN(msg.time)) {

                generator.setTimeout(node.timeout) //
                    .setMaxNumber(node.maxNumber) //
                    .setMinOnTime(node.minOnTime) //
                    .init(ledBulb, nodeRed, trigger);

                switch (msg.action) {
                    case Generator.GENERATE:
                        status = generator.generate(msg.time, Number.MIN_SAFE_INTEGER).state();

                        // Update status
                        this.status({ "fill": "green", "shape": "dot", "text": status.message });
                        break;

                    case Generator.TERMINATE:
                        status = generator.terminate("Terminate generation and timer tasks").state();

                        // Update status
                        this.status({ "fill": "red", "shape": "ring", "text": status.message });
                        break;

                    case Generator.UPDATE:
                        status = generator.done().state();

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
    }

    RED.nodes.registerType("scenario-timer", ScenarioTimerNode);
}
