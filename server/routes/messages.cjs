const express = require("express")
const router = express.Router()
const Message = require("../models/message.cjs")

router.post("/", async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        await newMessage.save()
        res.status(201).json({ message: "Message sent successfully" })
    } catch (err) {
        res.status(400).json({ error: "Failed to send message" })
    }
})

router.get("/", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" })
    }
})

module.exports = router