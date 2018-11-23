const configlocation = "configs/"
/*

    A cards against humanity backend service
    written in Node.JS with Express, ws &
    some other random stuff

    please see README.md for more information
*/

// Import helpers

const helpers = {
    "log": require("./helpers/log.js").log // Used for logging to the console
}

const fs = require("fs")

let configs // Used through the program
let module_instances = {} // Holds running modules
/*
    Module instance object:
    {"instance": Module, "state": state}
    States:
*/
const module_states = {
    0: "NOT_READY",
    1: "READY",
    2: "START_FAILED:REASON_UNKNOWN",
    3: "START_FAILED:MISSING_MODULES",
    4: "START_FAILED:MISSING_HELPERS",
    5: "START_FAILED:INVALID_PLATFORM",
    6: "PARTIALLY_READY:SEE_LOGS"
}
let packs = {}

// bad code bad code bad code (this makes it all okay.)
const load_configs = (callback) => {
    configs = {} // Reset the config object (incase of a reload)
    fs.readdir(configlocation, function(error, files) {
        if (error) {throw error;}
        loops = 0
        files.forEach(function(file) {
            //log("BOOTSTRAP", "Loading config file: " + file)
            fs.readFile(configlocation + file, function(error, content) {
                if (error) {
                    throw error
                }else {
                    configs[file.split(".")[0]] = JSON.parse(content)
                    helpers.log("bootstrap", "Loaded config: " + file.split(".")[0])
                    loops++
                    if (loops == files.length) {
                        callback()
                    }
                }
            })
        })
    })
}


load_configs(() => {
    // Configs ready, start modules

    const modules = [
        "./modules/router.js",
        "./modules/packs.js",
        "./modules/ws.js"
    ]
    const module_names = [
        "router",
        "packs",
        "socket"
    ]
    // TODO: Use module_name not path as name
    modules.forEach(Module => {
        module_instances[Module] = {"instance": require(Module), "state": 0} // Load the module
        // Call the module's init package with the following:
        const start_obj = {
            "name": Module,
            "configs": configs,
            "helpers": helpers, // Things like the logging module
            "modules": module_instances, // Access to all other modules.
            "packs": packs // Mostly handled by packs.js
        }

        module_instances[Module]["instance"].init(start_obj, (name, state) => {
            // Called whenever the program changes state:
            module_instances[name].state = state
            helpers.log("verbose", "[MOD] Module " + name + " changes to state: " + state + " (" + module_states[state] + ")")
        })
    })

    const await_start = setInterval(() => {
        // Check if modules are ready every 500ms:
        let service_unready = false; // Set to true if a service isn't yet ready

        for (var Module in module_instances) {
            if(!module_instances.hasOwnProperty(Module)) continue;
    
            const state = module_instances[Module].state
            if (state != 1) {
                service_unready = true
                if (state != 0) {
                    helpers.log("error", "[BOOTSTRAP] Module start error: " + Module + " " + module_states[state])
                    process.exit(1)
                }
            }
        }
        if (!service_unready) {
            // All modules are ready:
            helpers.log("ok", "[BOOTSTRAP] Pre-initialisation finished.")
            clearInterval(await_start)
        }
    }, 500)
}) 