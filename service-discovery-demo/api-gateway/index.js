// /api-gateway/index.js
const express = require("express")
const Consul = require("consul")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors())

const PORT = 3000

const consul = new Consul({
  host: "localhost",
  port: 8500,
  promisify: true,
})

app.get("/:service/info", async (req, res) => {
  const serviceName = req.params.service
  console.log(`Received request for service: ${serviceName}`)

  try {
    console.log(`Querying Consul for service: ${serviceName}`)
    const services = await consul.catalog.service.nodes(serviceName)
    console.log(`Consul result:`, services)

    if (services && services.length > 0) {
      const service = services[0]
      const serviceUrl = `http://${service.ServiceAddress}:${service.ServicePort}/info`
      console.log(`Attempting to call service at: ${serviceUrl}`)

      const response = await axios.get(serviceUrl)
      console.log(`Service response:`, response.data)
      res.json(response.data)
    } else {
      console.log(`Service ${serviceName} not found in Consul`)
      res.status(404).json({ error: `Service ${serviceName} not found` })
    }
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Internal server error", details: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`)
})

