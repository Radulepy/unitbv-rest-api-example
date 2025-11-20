const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.router");
const logger = require("./middleware/logger")

app.use(express.json());
app.use(logger);
app.use("/api", todoRoutes);

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App Started PORT: ${PORT}`);
})

