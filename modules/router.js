/*
    node-cah router
    A simple HTTP router written with the express.js framework

    Used for basically everything
*/

const express = require("express") // API framework
const bodyparser = require("body-parser") // Used for POST request JSON bodies
const request = require("request") // Used for downloading stuff (might not use)

let pkg, app

exports.init = (package, state_update) => {
    // Setup the package
    
    pkg = package
    pkg["state_update"] = state_update // Allow other parts of the program to update state.

    // Start the API server
    app = express() // Setup app server
    app.use(bodyparser.json()) // Used for post requests

    router.init()

    app.listen(pkg.configs.general.servers.http.port, (err) => {
        if (err) throw err;
        pkg.helpers.log("ok", "[ROUTER] Now listening on " + pkg.configs.general.servers.http.port)
        state_update(package.name, 1)
    })
}

let router = {"handler": {}}

router.handler.version = (req, res) => {
    res.send(pkg.configs.general.versions)
}

router.init = () => {
    app.use((req, res, next) => { // Catch all requests
        // Log request
        pkg.helpers.log("verbose", "[ROUTER] [ACT] " + req.hostname + " " + req.method + " " + req.url)
        // Edit headers
        res.header("X-Powered-By", "Memes")
        res.type("application/json")
        // Continue
        next()
   })

   app.get("/api/version", router.handler.version)

}    