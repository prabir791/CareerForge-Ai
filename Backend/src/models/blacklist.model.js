const mongoose = require('mongoose')

const blacklisttokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required to blacklist"],
    }
},{
    timestamps: true
})

const blacklisttokenModel = mongoose.model("blacklisttokens", blacklisttokenSchema)

module.exports = blacklisttokenModel