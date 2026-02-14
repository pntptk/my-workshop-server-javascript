const express = require("express");
const cors = require("cors");
// const { error } = require("console");

const app = express();

app.use(express.json());
app.use(cors());

let todos = [
  {
    id: 1,
    name: "homework",
    description: "งาน คณิต",
    startDay: "2026-01-12",
    endDay: "2026-01-12",
    status: "",
    duration:5,
  },
];

app.get("/", (req, res) => res.status(200).json(error));

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { name, description, status, startDay, endDay } = req.body;

    if (!name) {
      res.status(400).json({message : "Name is required"});
      return;
    }
  const newTodo = {
    id: Date.now(),
    name,
    description,
    status,
    startDay,
    endDay,
    duration:5,
  };

  todos.push(newTodo);
  res.status(201).json(todos);
});


app.delete("/todos/:id",(req,res)=>{
  const id = req.params.id

})
// const server = createServer(app);

app.listen(3001, () => {
  console.log(`server running at http://localhost:3001`);
});
