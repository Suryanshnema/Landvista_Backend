const express = require('express');
const app = express();   // ✅ THIS LINE IS IMPORTANT

// middleware
app.use(express.json());

// routes
const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api', propertyRoutes);

// test route
app.get('/', (req, res) => {
  res.send("Server is working");
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});