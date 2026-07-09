const path = require("path")
const mongoose = require("mongoose")
require("dotenv").config({ path: path.join(__dirname, "..", "config.env") })

async function connectDB() {
    try {
        if (!process.env.ATLAS_URI) {
            throw new Error("ATLAS_URI is not defined")
        }

        await mongoose.connect(process.env.ATLAS_URI)
        console.log("MongoDB connected")
    } catch (err) {
        console.error("MongoDB connection failed:", err)
        process.exit(1)
    }
}

module.exports = connectDB