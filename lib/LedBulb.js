/**
 * 
 */
const Util = require("./Util.js");
const Timer = require("./Timer.js");

/**
 * Constructor 
 * Implements observer pattern
 */
class LedBulb {

    // https://stackoverflow.com/a/34550964
    static BROWSER = Util.isBrowser();

    id = "DefaultLedBulb";
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
     * Toggle LED by condition
     * 
     * @param {*} condition 
     * @param {*} indicator 
     * @returns 
     */
    static toggle(condition, indicator) {
        if (condition) {
            LedBulb.on(indicator);
        } else {
            LedBulb.off(indicator);
        }

        return !condition;
    }

    
    /**
     * Turn LED on
     * 
     * @param {*} indicator 
     */
    static on(indicator) {
        if (LedBulb.BROWSER && document) {
            let led = document.getElementById(indicator.id);
            led.className = led.className.replace("off", "on");
        } else {
            // TODO: Implementation in Node-RED
        }
    }


    /**
     * Turn LED off
     * 
     * @param {*} indicator 
     */
    static off(indicator) {
        if (LedBulb.BROWSER && document) {
            let led = document.getElementById(indicator.id);
            led.className = led.className.replace("on", "off");
        } else {
            // TODO: Implementation in Node-RED
        }
    }


    /**
     * Update LED status
     * 
     * @param {*} indicator 
     * @param {*} source 
     */
    update(indicator, source) {
        switch (indicator.status) {
            case Timer.OFF.status:
                LedBulb.off(indicator);
                break;
            case Timer.ON.status:
                LedBulb.on(indicator);
                break;
            default:
                break;
        }
    }


    /**
     * Reset LED status
     * 
     * @param {*} indicator 
     * @param {*} source 
     */
    reset(indicator, source) {
        // TODO: Implementation in Node-RED
    }
}

module.exports = LedBulb;