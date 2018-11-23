/*
    TODO
*/

let helpers, packs, modules, configs

exports.init = (package, state_update) => {
    // Package = JSON package from index
    // state_update = State update callback from index

    helpers = package.helpers
    packs = package.packs
    modules = package.modules
    configs = package.configs

    // Not much else to do in this module, set state to 1.
    state_update(package.name, 1)
}