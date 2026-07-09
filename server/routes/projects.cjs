const express = require("express")
const router = express.Router()
const Project = require("../models/project.cjs")
const requireAuth = require("../middleware/auth.cjs")

router.get("/", async (req, res) => {
    try {
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch projects" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if (!project) return res.status(404).json({ error: "Project not found" })
        res.status(200).json(project)
    } catch (err) {
        res.status(400).json({ error: "Invalid project ID" })
    }
})

router.post("/", requireAuth, async (req, res) => {
    try {
        const newProject = new Project(req.body)
        const saved = await newProject.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ error: "Failed to create project" })
    }
})

router.put("/:id", requireAuth, async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updated) return res.status(404).json({ error: "Project not found" })
        res.status(200).json(updated)
    } catch (err) {
        res.status(400).json({ error: "Failed to update project" })
    }
})

router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ error: "Project not found" })
        res.status(200).json({ message: "Project deleted" })
    } catch (err) {
        res.status(400).json({ error: "Failed to delete project" })
    }
})

module.exports = router