const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" })
const Project = require("./models/project.cjs")

const projects = [
    {
        title: "Clothing Store Management System",
        description: "A Java-based management system for handling clothing store inventory, sales, and customer records.",
        problem: "Small clothing stores often rely on manual or spreadsheet-based tracking, which is error-prone and hard to scale.",
        technologies: ["Java", "OOP", "Exception Handling"],
        githubUrl: "",
        liveUrl: "",
        contribution: "Worked as part of a group to design and implement core classes, including inheritance structures, abstract classes, and interfaces for the store's product and inventory system.",
        challenges: "Structuring the class hierarchy correctly to support polymorphism and overriding without creating tightly coupled code.",
        lessonsLearned: "Gained a deeper understanding of when to use abstract classes vs interfaces, and how exception handling improves program reliability.",
        featured: true
    },
    {
        title: "PhumGame 2.0",
        description: "A front-end video game store website showcasing game listings in a clean, browsable layout.",
        problem: "Wanted to practice building a realistic e-commerce style layout for a gaming-focused audience.",
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "",
        liveUrl: "https://faid00.github.io/PhumGame-2.0/",
        contribution: "Designed and built the entire site independently, including layout, styling, and page structure.",
        challenges: "Keeping the layout clean and consistent across different game listing cards.",
        lessonsLearned: "Improved skills in structuring HTML/CSS for a product-style layout.",
        featured: false
    },
    {
        title: "Whack-a-Mole",
        description: "A browser-based Whack-a-Mole game built with JavaScript, focused on interactivity and timing logic.",
        problem: "Wanted to practice DOM manipulation and event-driven game logic.",
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "",
        liveUrl: "https://faid00.github.io/Whack-a-Mole-test/",
        contribution: "Built independently, including game logic, scoring, and timer mechanics.",
        challenges: "Getting the timing and randomization of moles appearing to feel fair and responsive.",
        lessonsLearned: "Learned how to manage game state and timed events using JavaScript.",
        featured: false
    }
]

async function seedDB() {
    try {
        await mongoose.connect(process.env.ATLAS_URI)
        console.log("MongoDB connected")

        await Project.deleteMany({})
        console.log("Cleared existing projects")

        await Project.insertMany(projects)
        console.log("Inserted 3 projects")

        process.exit(0)
    } catch (err) {
        console.error("Seeding failed:", err)
        process.exit(1)
    }
}

seedDB()