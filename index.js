const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./config");
const userRouter = require("./routes/User.route");
const auth = require("./middlewears/auth.user");
const noteRouter = require("./routes/notes");
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use(auth);
//
app.use("/note", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Something Went Wrong");
    console.log(err.message);
  }
  console.log("server is running at port 8080");
});
