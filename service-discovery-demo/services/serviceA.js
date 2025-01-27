// services/serviceA.js

const express = require("express")
const Consul = require("consul")

const app = express()
const port = 3001
const serviceName = "service-a"

function connectToConsul() {
  const consul = new Consul({
    host: "localhost",
    port: 8500,
  })

  consul.agent.service.register(
    {
      name: serviceName,
      address: "localhost",
      port: port,
      check: {
        http: `http://localhost:${port}/info`,
        interval: "10s",
      },
    },
    (err) => {
      if (err) {
        console.error("Error registering service:", err)
        console.log("Retrying in 5 seconds...")
        setTimeout(connectToConsul, 5000)
      } else {
        console.log(`${serviceName} registered with Consul`)
      }
    },
  )

  return consul
}

app.get("/info", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    service: serviceName,
  })
})

app.listen(port, () => {
  console.log(`${serviceName} listening at http://localhost:${port}`)
  const consul = connectToConsul()

  process.on("SIGINT", () => {
    consul.agent.service.deregister(serviceName, (err) => {
      if (err) {
        console.error("Error deregistering service:", err)
      } else {
        console.log(`${serviceName} deregistered from Consul`)
      }
      process.exit()
    })
  })
})

