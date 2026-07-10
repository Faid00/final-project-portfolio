const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.cjs")
const projectRoutes = require("./routes/projects.cjs")
const messageRoutes = require("./routes/messages.cjs")
const requireAuth = require("./middleware/auth.cjs")
const authRoutes = require("./routes/auth.cjs")

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

connectDB()

app.use("/api/projects", projectRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})