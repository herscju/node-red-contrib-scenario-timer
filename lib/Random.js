/**
 * Constructor
 */
class Random {

    /**
     * Returns a random boolean (true or false) in JavaScript, which can be useful in games 
     * or in any scenario of decision-making.
     * 
     * See 'https://keploy.io/blog/community/javascript-random-number#generating-random-booleans-values'
     */
    static randomBoolean() {
        return Math.random() >= 0.5;
    }


    /**
     * 
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     * 
     * See 'https://stackoverflow.com/a/1527820/6487382'
     * 
     * @param {*} min 
     * @param {*} max 
     * @param {*} list 
     */
    static randomInteger(min = 0, max = 99, list) {
        const exclude = list || [];

        let random;

        min = Math.ceil(min);
        max = Math.floor(max);

        while (!random) {
            const x = Math.floor(Math.random() * (max - min + 1)) + min;
            if (exclude.indexOf(x) === -1) {
                random = x;
            }

        }

        return random;
    }

    /**
     * Constructor
     */
    constructor() {
        //
    }
}

module.exports = Random;