const express = require("express");
const config = require("config");
const swaggerDoc = require("./swaggerDoc");
const mongoose = require("mongoose");

const app = express();

const PORT = config.get("port") || 5000;

swaggerDoc(app);

app.use("/api/auth", express.json({extended: true}), require("./routes/auth.routes"));


async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log("app started on port ", PORT);
    });
  } catch (e) {
    console.log("Server error - ", e.message);
    process.exit(1);
  }
}

start();
