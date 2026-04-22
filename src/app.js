// import express from "express";
// import cors from "cors";
// import routes from "./routes/index.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ Add this
// app.get("/", (req, res) => {
//   res.send("LandVista API Running 🚀");
// });

// app.use("/api", routes);

// export default app;
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// root
app.get("/", (req, res) => {
  res.send("LandVista API Running 🚀");
});

// ✅ mount routes
app.use("/api", routes);

export default app;