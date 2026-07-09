const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    problem: String,
    technologies: [String],
    imageUrl: String,
    githubUrl: String,
    liveUrl: String,
    contribution: String,
    challenges: String,
    lessonsLearned: String,
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Project", projectSchema)