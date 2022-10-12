const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// Basic Meta information about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Inventory management API", version: "1.0.0" },
    },
    apis: [],
}

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
const swaggerDocs = (app, port) => {
    // Route-Handler to visit our docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Make our docs in JSON format available
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    )
}

module.exports = { swaggerDocs }
