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
    duration: 5,
  },
];

app.get("/", (req, res) => res.status(200).json(error));

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { name, description, status, startDay, endDay } = req.body;

  if (!name) {
    res.status(400).json({ message: "Name is required" });
    return;
  }
  const newTodo = {
    id: Date.now(),
    name,
    description,
    status,
    startDay,
    endDay,
    duration: 5,
  };

  todos.push(newTodo);
  res.status(201).json(todos);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  const initialLength = todos.length;

  todos = todos.filter((t) => t.id !== parseInt(id));

  if (todos.length === initialLength) {
    return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการ" });
  }

  res.status(200).json({ message: "ลบสำเร็จ", todos });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, status } = req.body;

  const index = todos.findIndex((t) => t.id === parseInt(id));

  if (index !== -1) {
    todos[index] = { ...todos[index], name, description, status };
    return res.status(200).json({ message: "update data", todos });
  } else {
    return res.status(404).json({message : "not found id",todos});
  }
});
// const server = createServer(app);

app.listen(3001, () => {
  console.log(`server running at http://localhost:3001`);
});
