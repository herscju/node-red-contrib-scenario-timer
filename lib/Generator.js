const Indicator = require("./Indicator.js");
const Util = require("./Util.js");
const Timer = require("./Timer.js");
const Subject = require("./Subject.js");
//const LedBulb = require("./LedBulb.js");
const Trigger = require("./Trigger.js");
const Emitter = require("./Emitter.js");
const { EventEmitter } = require("events");

/**
 * Constructor 
 */
class Generator {

    // https://stackoverflow.com/a/34550964
    static BROWSER = Util.isBrowser();
    static ABORT_KEY = "abort";
    static STROKE_KEY = "stroke";
    static GENERATE = "generate";
    static TERMINATE = "terminate";
    static LISTENERS = 2;
    static UPDATE = "update";
    static INIT = { "status": -1, "message": "Initialized" };
    static OFF = { "status": 0, "message": "Terminated" };
    static ON = { "status": 1, "message": "Running" };
    static DONE = { "status": 2, "message": "Ready" };
    static STATES = [Generator.INIT, Generator.OFF, Generator.ON, Generator.DONE];

    idx = 0;
    min = 1;
    max = 6;
    uuid = Util.generateUUID();
    status = Generator.DONE.status;
    startTime = 0;
    sleepSetIntervalID = 0;
    indicator = Indicator.Y;

    // Initialize indicators and shuffle it randomly
    indicators = Util.shuffle(Indicator.INDICATORS);

    // Set up timer
    timer = new Timer();

    // Set up observer subject
    subject = new Subject();

    // Set up abort controller
    controller = new AbortController();

    // Set up event emitter and target
    emitter = new EventEmitter();

    // Set up queue
    queue = Generator.initQueue(this.controller, this.emitter);

    // Run tasks
    addTask = (func => {
        this.queue.then(func).catch(e => console.error(`An error has been occured. ${e}`));
    });

    // Constructor
    constructor(timeout) {
        this.timeout = (timeout ? timeout : Timer.TIMEOUT);
    }

    // Get state by status value
    static getStepByStatus(status) {
        return Generator.STATES.find(item => item.status === status);
    }

    // Set up and configure queue
    static initQueue(controller, emitter) {

        return new Promise((resolve, reject) => {

            // https://stackoverflow.com/a/65805464/6487382
            const abortListener = ({ target }) => {
                controller.signal.removeEventListener(Generator.ABORT_KEY, abortListener);
                reject(target.reason);
            }
            controller.signal.addEventListener(Generator.ABORT_KEY, abortListener);

            if (emitter) {
                Generator.initEmitter(emitter, Generator.LISTENERS);
            }

            resolve();
        });
    }

    // Set up and configure emtter
    static initEmitter(emitter, listeners) {

        emitter.setMaxListeners(listeners || Generator.LISTENERS);

        const emitterListener = (func) => {
            emitter.off(Generator.STROKE_KEY, emitterListener);
            func();
        }
        emitter.on(Generator.STROKE_KEY, emitterListener);
    }

    // Set indicator
    setIndicator(indicator) {
        this.indicator = (indicator || Indicator.INDICATORS[0]);
        
        return this;
    }

    // Set (new) timeout
    setStartTime(startTime) {
        this.startTime = (startTime ? startTime : this.startTime);
        
        return this;
    }

    // Set (new) timeout
    setTimeout(timeout) {
        this.timeout = (timeout ? timeout : this.timeout);
        
        return this;
    }

    //
    init() {
        
        // Subscribe observers (arguments) to subject.
        let observers = Array.from(arguments)
        observers.forEach(observer => this.subject.subscribe(observer));

        // Set timer listener
        this.timer.setListener(Timer.INVOKE_KEY, (options) => { this.timer.toggle(Timer.INVOKE_KEY, options.previous, options.indicator); });
        this.timer.setListener(Timer.PREVENT_KEY, (options) => { this.timer.toggle(Timer.PREVENT_KEY, options.previous, options.indicator); });
        
        // Run timer initialization and subscribe observers
        this.timer.init.apply(this.timer, observers);
        
        // Set indicator to base setting
        this.indicators.forEach(indicator => {
            console.log("+++"+JSON.stringify(indicator));
            this.timer.prevent(indicator);
        });
        console.log("---"+JSON.stringify({ "item": this.indicator }));
        this.timer.prevent({ "item": this.indicator });

        this.subject.notifyAll({ "message": "Generator initialized (" + Util.date(this.setStartTime) + "). Timeout is '" + this.timeout + "'. UUID is '" + this.uuid + "'. Indicators are '" + Util.displayIndicators(this.indicators) + "'. Abort = '" + this.controller.signal.aborted + "'." }, "Generator");

        // Run beat
        if (!this.controller.signal.aborted) {
            this.addTask(() => {

                let promise = new Promise(async (resolve, reject) => {
                    // this.subject.notifyAll({ "message": `Start sleeping for '${this.timeout}' seconds. Status is '${this.status}'.` }, "Generator");

                    this.sleepSetIntervalID = setInterval(() => {
                        // this.subject.notifyAll({ "message": `End sleeping for '${this.timeout}' seconds. Status is '${this.status}'.` }, "Generator");

                        if (this.status === Generator.ON.status) {
                            resolve(() => { /** Nothing to do here */ });
                        } else {
                            clearInterval(this.sleepSetIntervalID);
                            reject("Generator: Something went wrong! Used generator might not be configured and initialized properly.");
                        }
                    }, this.timeout * 1000);
                });
                promise.then(func => func()).catch(e => this.subject.notifyAll({ "message": JSON.stringify(e) }, "Generator"));
            });
        } else {
            this.subject.notifyAll({ "message": "Clear data set during initialization." }, "Generator");

            clearInterval(this.sleepSetIntervalID);
            Promise.reject(this.controller.signal.reason + ": Cleared interval with ID '" + this.sleepSetIntervalID + "'.");
        }

        this.status = Generator.INIT.status;

        return this;
    }

    // Generate (or run) main tasks
    generate(date, timerId) {
        this.addTask(() => {
            let on = Timer.randomInteger(this.min, this.max) * this.timeout;
            let wait = this.timeout - 0.5;

            if (!this.controller.signal.aborted) {
                this.emitter.emit(Generator.STROKE_KEY, () => this.timer.run(on, this.indicators).done().reset());
                this.subject.notifyAll({ "message": "Wait for '" + wait + "' at '" + new Date(date).toLocaleTimeString("de-CH") + "'. ON='" + on + "'." }, "Generator");

                Timer.wait(0.5, this.controller.signal.aborted, timerId).then(() => {
                    this.timer.invoke(this.indicator);
                });
                Timer.wait(wait, this.controller.signal.aborted, timerId).then((timerId) => {
                    this.timer.prevent({ "item": this.indicator });
                    this.generate(Date.now(), timerId);
                }).catch(e => this.subject.notifyAll({ "message": JSON.stringify(e) }, "Generator"));


                Generator.initEmitter(this.emitter, Generator.LISTENERS);
            } else {
                this.indicators.forEach(indicator => {
                    this.timer.prevent(indicator);
                    this.subject.notifyAll({ "message": this.controller.signal.reason + ": Clear data of instance '" + this.uuid + "' set while generating. Current LED='" + indicator.item.id + "'." }, "Generator");
                    this.subject.clearAll(indicator, "Generator");
                });
                this.timer.prevent({ "item": this.indicator });
                this.subject.notifyAll({ "message": this.controller.signal.reason + ": Clear data of instance '" + this.uuid + "' set while generating. Current LED='" + this.indicator.item.id + "'." }, "Generator");
                this.subject.clearAll(this.indicator, "Generator");
            }
        });

        this.status = Generator.ON.status;

        return this;
    }

    // Everything done
    done() {
        this.status = Generator.DONE.status;

        return this;
    }

    // Terminate generation task
    terminate(reason) {
        this.controller.abort(reason);
        this.subject.notifyAll({ "message": this.controller.signal.reason + ": Clear data of instance '" + this.uuid + "' set while generating." }, "Generator");

        this.queue = Generator.initQueue(this.controller, this.emitter);
        this.status = Generator.OFF.status;

        return this;
    }

    // Get the current state
    state() {
        return Generator.getStepByStatus(this.status);
    }
}

module.exports = Generator;