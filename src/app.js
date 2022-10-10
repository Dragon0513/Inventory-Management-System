const express = require("express")
const apicache = require("apicache")

// const v1WorkoutRouter = require("./v1/routes/workoutRoutes")
// const { swaggerDocs: v1SwaggerDocs } = require("./v1/swagger")

const app = express()
// Cache middleware
const cache = apicache.middleware
// Set server port
const PORT = process.env.PORT || 5000
// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cache("2 minutes"))
// app.use("/api/v1/workouts", v1WorkoutRouter)
app.get("/", function (req, res) {
    res.json({ message: "Hello world" })
})

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
    // v1SwaggerDocs(app, PORT)
})
