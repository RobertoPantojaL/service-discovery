const express = require("express");
const Consul = require("consul");

const app = express();
const port = 3002;
const serviceName = "service-b";

const consul = new Consul({
  host: "localhost",
  port: 8500,
});

app.get("/info", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    service: serviceName,
  });
});

app.listen(port, () => {
  console.log(`${serviceName} listening at http://localhost:${port}`);

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
        console.error("Error registering service:", err);
      } else {
        console.log(`${serviceName} registered with Consul`);
      }
    },
  );
});

process.on("SIGINT", () => {
  consul.agent.service.deregister(serviceName, (err) => {
    if (err) {
      console.error("Error deregistering service:", err);
    } else {
      console.log(`${serviceName} deregistered from Consul`);
      process.exit();
    }
  });
});