const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

async function main() {
    const Db = process.env.ATLAS_URI
    const client = new MongoClient(Db)

    try {
        await client.connect()
        console.log("Connected to MongoDB Atlas")
    } catch (err) {
        console.error("Connection failed:", err)
    } finally {
        await client.close()
    }
}

main()