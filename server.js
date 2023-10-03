import { app } from "./app.js";
import { connectDB } from "./data/database.js";
const PORT = process.env.PORT;

connectDB();
// console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT} in ${process.env.node_env} mode`);
});
