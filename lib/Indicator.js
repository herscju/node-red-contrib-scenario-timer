<<<<<<< HEAD
const Timer = require("./Timer.js");

/**
 * Constructor 
 */
class Indicator {

    // OFF color
    static COLOR = "rgba(192, 192, 192, 1)";

    // CMYK
    static C = { "id": "cy", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(0, 255, 255, 1)" };
    static M = { "id": "ma", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 0, 255, 1)" };
    static Y = { "id": "ye", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 255, 0, 1)" };
    static K = { "id": "bk", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(92, 92, 92, 1)" };

    // RGB
    static R = { "id": "rd", "position": 1, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 0, 0, 1)" };
    static G = { "id": "gn", "position": 2, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(171, 255, 0, 1)" };
    static B = { "id": "bl", "position": 3, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(36, 224, 255, 1)" };

    // Additional color
    static O = { "id": "or", "position": 4, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 172, 28, 1)" };

    static INDICATORS = [Indicator.Y, Indicator.R, Indicator.G, Indicator.B, Indicator.O];

    /**
     * Constructor
     */
    constructor() {
        //
    }
}

=======
const Timer = require("./Timer.js");

/**
 * Constructor 
 */
class Indicator {

    // CMYK colored indicators (cyan, magenta, yellow, black)
    static C = { "id": "cy", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(0, 255, 255, 1)" };
    static M = { "id": "ma", "position": 0, "enabled": true, "status": Timer.OFF.status, "message": Timer.DONE.message, "color": "rgba(255, 0, 255, 1)" };
    static Y = { "id": "ye", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 255, 0, 1)" };
    static K = { "id": "bk", "position": 0, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(92, 92, 92, 1)" };

    // RGB colored indicators (red, green, blue)
    static R = { "id": "rd", "position": 1, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 0, 0, 1)" };
    static G = { "id": "gn", "position": 2, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(171, 255, 0, 1)" };
    static B = { "id": "bl", "position": 3, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(36, 224, 255, 1)" };

    // Orange colored indicator
    static O = { "id": "or", "position": 4, "enabled": false, "status": Timer.OFF.status, "message": Timer.OFF.message, "color": "rgba(255, 172, 28, 1)" };

    // List of available indicators
    static INDICATORS = [Indicator.Y, Indicator.R, Indicator.G, Indicator.B, Indicator.O];


    /**
     * Constructor
     */
    constructor() {
        //
    }
}

>>>>>>> fa6f617 (Updated Javasccript code with latest features.)
module.exports = Indicator;