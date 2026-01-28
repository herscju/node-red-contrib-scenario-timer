/**
 * 
 */
const Timer = require("./Timer.js");

/**
 * Constructor 
 */
class Indicator {

    // CMYK
    static C = { "id": "cy", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(0, 255, 255, 1)" };
    static M = { "id": "ma", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 0, 255, 1)" };
    static Y = { "id": "ye", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 255, 0, 1)" };
    static K = { "id": "bk", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(92, 92, 92, 1)" };

    // RGB
    static R = { "id": "rd", "position": 1, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 0, 0, 1)" };
    static G = { "id": "gn", "position": 2, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(171, 255, 0, 1)" };
    static B = { "id": "bl", "position": 3, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(36, 224, 255, 1)" };

    // Orange
    static O = { "id": "or", "position": 4, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 172, 28, 1)" };

    // Default indicators
    static INDICATORS = [Indicator.Y, Indicator.R, Indicator.G, Indicator.B, Indicator.O];


    /**
     * Constructor
     */
    constructor() {
        //
    }
}

module.exports = Indicator;