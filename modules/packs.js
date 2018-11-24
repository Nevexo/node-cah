/*
    TODO
*/

const request = require("request")
const fs = require("fs")
let pkg

exports.init = (package, state_update) => {
    // Package = JSON package from index
    // state_update = State update callback from index
    pkg = package
    pkg["state_update"] = state_update

    // Load or download packs:
    exports.get_packs((res) => {
        if (res) {
            pkg.helpers.log("ok", "[PACKS] Finished downloading packs.")
        }
    })

}

exports.get_packs = (callback) => {
    /*
    if (!fs.exists("../packs/json.json")) {
        pkg.helpers.log("pending", "[CARDS] Downloading cards...")
        // No cards, download them
        request.post("https://crhallberg.com/cah/output.php", {formData: pkg.configs.packs.formdata}, (err, res, body) => {
            if (err) {
                pkg.helpers.log("error", "[PACKS] Failed to pull cards: " + err)
                callback(false)
            }else {
                if (res.statusCode == 200) {
                    console.dir(body)
                    fs.writeFile("packs/json.json", body, (err) => {
                        if (err) {
                            pkg.helpers.log("error", "[PACKS] Failed to pull cards: " + err)
                            callback(false)
                        }else {
                            pkg.state_update(pkg.name, 1)
                            callback(true)
                        }
                    })
                }
            }
        })
    }else {
        pkg.state_update(pkg.name, 1)
    }
    */
}