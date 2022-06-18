const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: "Votre accès a été bloqué pendant 5 minutes pour cause de connexions intempestives"
})

module.exports = { limiter }