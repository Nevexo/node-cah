/*

Log.js is a simple logging helper
that just makes console.log output pretty.

Called with helpers.log("invoker", "message")

*/

// Import modules

const chalk = require("chalk") // Used for pretty colours

module.log = (invoker, message) => {
    if (invoker == undefined || message == undefined) {
        console.error(chalk.red("[WARN] Invalid log call. ")) 
    }else {
        // Setup colours
        let colour;
        switch(invoker) {
            case "state":
                colour = "bgBlue"
                break;
            case "warning": 
                colour = "bgYellow"
                break;
            case "error":
                colour = "bgRed"
                break;
            case "ok":
                colour = "bgGreen"
                break;
            case "highlight": 
                colour = "bgMagenta"
                break;
            case "verbose":
                colour = "bold"
                break;
            default:
                colour = "white"
                break;
        }
        // Format string
        const date = new Date().toISOString().
            replace(/T/, ' '). 
            replace(/\..+/, '')

        let string = "[" + chalk["grey"](date) + "]" + 
            chalk[colour]("[" + invoker.toUpperCase() + "] ") + message
            
    }
}