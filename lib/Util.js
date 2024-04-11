const Timer = require("./Timer.js");

/**
 * Constructor
 */
class Util {

    /**
     * Check for running in a browser (https://stackoverflow.com/a/77033584/6487382).
     * 
     * @returns 
     */
    static isBrowser() {
        return (typeof window === "object" && "[object Window]" === window.toString.call(window));
    }

    /**
     * Check for being an object (https://bobbyhadz.com/blog/javascript-check-if-value-is-object).
     * 
     * @param {*} value 
     * @returns 
     */
    static isObject(value) {
        return (typeof value === "object" && value !== null && !Array.isArray(value));
    }

    /**
     * Check if a value is number in JavaScript (https://byby.dev/js-check-number).
     * 
     * @param {*} value 
     * @returns 
     */
    static isNumber(value) {
        return typeof value === "number" && !Number.isNaN(value);
    }

    /**
     * Format given date.
     * 
     * @param {*} now 
     * @returns 
     */
    static date(now) {
        const d = (now && Util.isNumber(now)) ? now : Date.now();
        const l = "de-CH";
        const o = {
            "weekday": "short",
            "year": "numeric",
            "month": "short",
            "day": "numeric",
            "hour": "2-digit",
            "minute": "2-digit",
            "second": "2-digit",
            "fractionalSecondDigits": 3
        };

        return new Intl.DateTimeFormat(l, o).format(new Date(d));
    }

    /**
     * Shuffle array items randomly.
     * 
     * @param {*} input 
     * @returns 
     */
    static shuffle(input) {

        // Initialize indicators
        let indicators = new Array();
        for (let i = 1; i < input.length; i++) {
            indicators.push(input[i]);
        }

        let randomIndex = 0;
        let currentIndex = indicators.length;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [indicators[currentIndex], indicators[randomIndex]] = [indicators[randomIndex], indicators[currentIndex]];
        }

        return indicators;
    }

    /**
     * Display indicators ID.
     * 
     * @param {*} indicators 
     * @param {*} prefix 
     * @param {*} suffix 
     * @param {*} delimiter 
     * @returns 
     */
    static displayIndicators(indicators, prefix, suffix, delimiter) {
        let elements = indicators || [];
        let output = [];

        elements.forEach(element => {
            if (element.hasOwnProperty("id")) {
                output.push(element.id);
            }
        });

        let p = prefix || "[";
        let s = suffix || "]";
        let d = delimiter || ", ";

        return p + output.join(d) + s;
    }

    /**
     * Generate UUDI.
     * 
     * @param {*} str 
     * @returns 
     */
    static generateUUID(str) {

        if (str === undefined || !str.length) {
            str = "" + Math.random() * new Date().getTime() + Math.random();
        }

        let c = 0;
        let r = "";

        const max = 0xfffffffffffff;
        const hi = 0x80000000;
        const lo = 0x7FFFFFFF;
        const and = (a, b) => (~~(a / hi) & ~~(b / hi)) * hi + ((a & lo) & (b & lo));
        for (let i = 0; i < str.length; i++) {
            c = c + (str.charCodeAt(i) * (i + 1) - 1);
            if (c > max) {
                c = and(c, max);
            }
        }

        str = str.substr(str.length / 2) + c.toString(16) + str.substr(0, str.length / 2);
        for (let i = 0, p = c + str.length; i < 32; i++) {
            if (i == 8 || i == 12 || i == 16 || i == 20) {
                r += "-";
            }

            c = p = (str[(i ** i + p + 1) % str.length]).charCodeAt(0) + p + i;
            if (i == 12) {
                c = (c % 5) + 1; //1-5
            } else if (i == 16) {
                c = (c % 4) + 8; //8-B
            } else {
                c %= 16; //0-F
            }

            r += c.toString(16);
        }

        return r;
    }
}

module.exports = Util;