module.exports = {
    init: async (args) => {
        return {
            type: "play",
            message: args.args[1]
        }
    }
}