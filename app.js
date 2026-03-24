import express from "express";
import bookRoutes from "./routes/bookRoutes.js";

const app=express();

app.use(express.json());

// health endpoint API to check if the postman is able to connect to the backend or not
// app.get("/api/health", (req, res) => {
//   try {
//     const dbState = mongoose.connection.readyState;

//     return res.status(200).json({
//       status: "OK",
//       message: "Service is healthy",
//       uptime: process.uptime(),
//       timestamp: new Date(),
//       database: dbState === 1 ? "Connected" : "Disconnected",
//     });
//   } catch (error) {
//     console.error("Health check failed:", error);

//     return res.status(500).json({
//       status: "ERROR",
//       message: "Service is unhealthy",
//       error: error.message,
//     });
//   }
// });  //This is checking the Complete health that is server dependenices database connection

// Checking out the simple health connection:
app.get("/api/health", (req, res) => {
  res.status(200).json("Health is ok!");
});
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     uptime: process.uptime(),
//     timestamp: new Date()
//   });
// });

app.use("/api/books",bookRoutes);

export default app; //If there is a single export then only you write the default else you don't