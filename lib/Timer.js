const Util = require("./Util.js");
const Subject = require("./Subject.js");
const Emitter = require("./Emitter.js");

/**
 * Constructor
 */
class Timer {

    static TIMEOUT = 10;
    static INVOKE_KEY = "invoke";
    static PREVENT_KEY = "prevent";
    static INIT = { "status": -3, "message": "Initialized" };
    static RESET = { "status": -2, "message": "Reset" };
    static RUN = { "status": -1, "message": "Run" };
    static OFF = { "status": 0, "message": "Off" };
    static ON = { "status": 1, "message": "On" };
    static SLEEP = { "status": 2, "message": "Sleep" };
    static DONE = { "status": 3, "message": "Done" };
    static STATES = [Timer.INIT, Timer.RESET, Timer.RUN, Timer.OFF, Timer.ON, Timer.SLEEP, Timer.DONE];

    idx = Number.MIN_SAFE_INTEGER;
    old = Number.MIN_SAFE_INTEGER;
    isDebug = false;
    statusId = Timer.STATES.length - 1;
    sleepSetTimeoutID = 0;

    // Set up observer subject
    subject = new Subject();

    // Set up event emitter
    emitter = new Emitter();

    // Set up queue
    queue = Promise.resolve();

    // Run tasks
    addTask = (func => {
        this.queue.then(func).catch(e => this.subject.notifyAll({ "message": JSON.stringify(e) }));
    });

    /**
     * Constructor
     */
    constructor() {
        //
    }

    /**
     * Generate random number between min and max values (https://stackoverflow.com/a/62983419/6487382 and https://stackoverflow.com/a/71153568/6487382).
     * 
     * @param {*} isDebug 
     * @param {*} min 
     * @param {*} max 
     * @param {*} list 
     * @returns 
     */
    static randomNumber(isDebug, min, max, list) {
        const exclude = list || [];
        let random;

        while (!random) {
            const x = Math.floor(Math.random() * (max - min + 1)) + min;
            if (exclude.indexOf(x) === -1) {
                random = x;
            }
        }

        if (isDebug && exclude.length) {
            console.log("Min=" + min + ", Max=" + max + ", Exclude=[" + exclude.join("¦") + "], Random=" + random);
        }

        return random;
    }

    /**
     * Get state by status value.
     * 
     * @param {*} idx 
     * @returns 
     */
    static getStepByStatus(idx) {
        return Timer.STATES[idx];
    }

    /**
     * Waits for certain seconds.
     * 
     * @param {*} timeout 
     * @param {*} aborted 
     * @param {*} timerId 
     * @returns 
     */
    static wait(timeout, aborted, timerId) {

        if (timeout < 0) {
            return Promise.reject(new Error("Timeout must not be '" + timeout + "'!"));
        } else if (timeout === 0) {
            return Promise.reject(new Error("Timeout must be larger than '" + timeout + "'!"));
        } else if (timeout === 1) {
            if (!aborted) {
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        } else {
            let promise = new Promise(async (resolve, reject) => {
                if (!aborted) {
                    timerId = setTimeout(() => { resolve(timerId); }, (timeout || Timer.TIMEOUT) * 1000);
                } else {
                    clearTimeout(timerId);
                    reject("Wait: Terminate timer task. Cleared timeout with ID '" + timerId + "'. Timeout was set to '" + timeout + "'.");
                }
            });

            return promise;
        }
    }

    /**
     * Skips 'wait'.
     * 
     * @param {*} timeout 
     * @param {*} aborted 
     * @param {*} timerId 
     * @returns 
     */
    static skip(timeout, aborted, timerId) {

        return new Promise((resolve, reject) => {
            if (!aborted) {
                resolve();
            } else {
                reject("Skip: Terminate timer task. Cleared timeout with ID '" + timerId + "'. Timeout was set to '" + timeout + "'.");
            }
        });
    }

    /**
     * Round number (https://www.delftstack.com/de/howto/javascript/javascript-round-to-2-decimal-places/).
     * 
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
    static round(x, y) {
        let m = Number((Math.abs(x) * Math.pow(10, y)).toPrecision(15));

        return Math.round(m) / Math.pow(10, y) * Math.sign(x);
    }

    /**
     * Set debug mode.
     * 
     * @param {*} isDebug 
     * @returns 
     */
    setDebug(isDebug) {
        this.isDebug = isDebug;

        return this;
    }

    /**
     * Set listener.
     * 
     * @param {*} type 
     * @param {*} listener 
     * @returns 
     */
    setListener(type, listener) {
        this.emitter.addListener(type, listener);

        return this;
    }

    /**
     * Configure timer and subjects
     * 
     * @returns 
     */
    init() {
        Array.from(arguments).forEach(observer => this.subject.subscribe(observer));

        this.addTask(() => {
            this.subject.notifyAll({ "message": "Timer initialized (message = '" + Timer.INIT.message + "', value='" + this.statusId + "')." }, "Timer");
        });

        this.statusId = Timer.INIT.status;

        return this;
    }

    /**
     * Reset status.
     * 
     * @returns 
     */
    reset() {

        this.addTask(() => {
            this.subject.notifyAll({ "message": "Timer reset (message = '" + Timer.RESET.message + "', value='" + this.statusId + "')." }, "Timer");
        });

        this.statusId = Timer.RESET.status;

        return this;
    }

    /**
     * Runs and sleeps for certain time.
     * 
     * @param {*} timeout 
     * @param {*} indicators 
     * @returns 
     */
    run(timeout, indicators) {

        this.addTask(() => {
            this.idx = Timer.randomNumber(this.isDebug, 0, indicators.length - 1, [this.old]);
            this.subject.notifyAll({ "message": `Index '${this.idx}' -> '${this.old}'. Timeout is '${timeout}'.` }, "Timer");

            if (timeout <= 0) {
                clearTimeout(this.sleepSetTimeoutID);
                Promise.reject(new Error("Timeout must not be '" + timeout + "'! Cleared timeout with ID '" + this.sleepSetTimeoutID + "'."));
            } else {
                let promise = new Promise(async (resolve, reject) => {
                    this.emitter.emit(Timer.INVOKE_KEY, { "previous": this.idx, "indicator": indicators[this.idx] });
                    // this.subject.notifyAll({ "message": `Start sleeping for '${timeout}' seconds.` }, "Timer");

                    this.sleepSetTimeoutID = setTimeout(() => {
                        // this.subject.notifyAll({ "message": `End sleeping for '${timeout}' seconds.` }, "Timer");
                        this.emitter.emit(Timer.PREVENT_KEY, { "previous": this.idx, "indicator": indicators[this.idx] });

                        if (this.statusId < 0) {
                            clearTimeout(this.sleepSetTimeoutID);
                            reject("Timer: Something went wrong! Cleared timeout with ID '" + this.sleepSetTimeoutID + "'.");
                        } else {
                            resolve();
                        }
                    }, (Math.trunc(timeout) || Timer.TIMEOUT) * 1000);
                });

                promise.then(func => func()).catch(e => this.subject.notifyAll({ "message": JSON.stringify(e) }, "Timer"));
            }

        });

        this.statusId = Timer.RUN.status;

        return this;
    }

    /**
     * Toggles an indicator by key. Currently there are two keys: INVOKE and PREVENT.
     * 
     * @param {*} key 
     * @param {*} old 
     * @param {*} indicator 
     * @returns 
     */
    toggle(key, old, indicator) {

        this.old = old;

        switch (key) {
            case Timer.INVOKE_KEY:
                return this.invoke(indicator);

            case Timer.PREVENT_KEY:
                return this.prevent(indicator);
        }

        return this;
    }

    /**
     * Invokes or activates an indicator.
     * 
     * @param {*} indicator 
     * @returns 
     */
    invoke(indicator) {

        indicator.enabled = true;
        indicator.status = Timer.ON.status;
        indicator.message = Timer.ON.message;
        this.subject.notifyAll(indicator, "Timer");

        this.statusId = Timer.ON.status;

        return this;
    }

    /**
     * Prevents or switches off an indicator.
     * 
     * @param {*} indicator 
     * @returns 
    */
    prevent(indicator) {

        indicator.enabled = false;
        indicator.status = Timer.OFF.status;
        indicator.message = Timer.OFF.message;
        this.subject.notifyAll(indicator, "Timer");

        this.statusId = Timer.OFF.status;

        return this;
    }

    /**
     * Finishes the chain.
     * 
     * @returns 
     */
    done() {
        this.statusId = Timer.DONE.status;

        return this;
    }

    /**
     * Gets the current state back.
     * 
     * @returns 
     */
    status() {
        return Timer.getStepByStatus(this.statusId);
    }
}

module.exports = Timer;